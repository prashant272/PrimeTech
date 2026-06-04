const { GoogleGenerativeAI } = require("@google/generative-ai");
const ChatLog = require("../models/ChatLog");

const fuzzyMatchPercentage = (query, keyword) => {
    const q = query.toLowerCase().trim();
    const kw = keyword.toLowerCase().trim();
    
    // Split into individual words
    const qWords = q.split(/[^a-zA-Z0-9]+/).filter(w => w.length > 0);
    const kwWords = kw.split(/[^a-zA-Z0-9]+/).filter(w => w.length > 0);
    
    if (kwWords.length === 0) return 0;
    
    let matches = 0;
    for (const kwWord of kwWords) {
        if (kwWord.length <= 3) {
            // For short keywords/words, require exact word matching to prevent false triggers (e.g. 'hi' in 'hiring')
            if (qWords.includes(kwWord)) {
                matches++;
            }
        } else {
            // For longer words, partial/substring match is accepted
            const found = qWords.some(qw => qw.includes(kwWord) || kwWord.includes(qw));
            if (found) {
                matches++;
            }
        }
    }
    
    return matches / kwWords.length;
};

const chatWithGemini = async (req, res) => {
    try {
        const { query, context } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is missing in .env");
            return res.status(500).json({ message: "Gemini API Key not configured" });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Using Gemini 2.5 Flash as requested
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Retrieve pre-configured rules to evaluate
        const ChatConfig = require("../models/ChatConfig");
        const chatConfig = await ChatConfig.findOne();
        const candidateRules = [];

        if (chatConfig && chatConfig.rules) {
            for (const rule of chatConfig.rules) {
                const keywords = rule.keyword.split(',').map(k => k.trim());
                for (const kw of keywords) {
                    if (fuzzyMatchPercentage(query, kw) >= 0.5) {
                        candidateRules.push({
                            keyword: rule.keyword,
                            response: rule.value
                        });
                        break;
                    }
                }
            }
        }

        const rulePrompt = candidateRules.length > 0
            ? `
            We have pre-defined FAQ rules that match the user's query keywords:
            ${candidateRules.map((c, i) => `Rule #${i+1}: Keyword(s): "${c.keyword}" -> Expected Response: "${c.response}"`).join('\n')}

            IMPORTANT RULE MATCHING INSTRUCTIONS:
            - Analyze if the User's Query intent matches any of the pre-defined Rules above.
            - If YES, you MUST respond EXACTLY with that rule's expected response. Do not change a single word.
            - If NO, ignore these rules and generate your own response.
            `
            : '';

        const systemPrompt = `
            You are "Prime Assistant", a friendly, real Indian human support/sales teammate representing Prime Impact Solutions. 
            
            CRITICAL RULES TO NOT SOUND LIKE A ROBOT:
            1. NEVER use robotic AI scripts or cliches (e.g. "Sure, I can help you with that!", "As an AI assistant...", "I am happy to assist you...", "Certainly!"). Just reply directly and naturally.
            2. Talk exactly like a friendly, professional, but casual Indian human chatting on WhatsApp.
            3. Use warm, colloquial Indian terms and phrasing (e.g. "Ji bilkul", "Haan", "Aap bataiye", "Bhai", "Arey", "kya haal-chal") ONLY when the user's query is in Hindi/Hinglish and you are replying in Hinglish. Never mix them in English replies.
            4. Keep responses extremely short, punchy, and conversational (1-2 sentences maximum, never format as long structured lists unless specifically asked).

            EXAMPLES OF HUMAN-LIKE RESPONSES:
            - User: "what services do you offer?"
              Bot: "We offer custom web development, mobile apps (Android/iOS), AI automation, and cloud support. What kind of project are you looking to build?"
            - User: "aap kya kaam karte ho?"
              Bot: "Hum log custom web development, mobile apps (Android/iOS), AI automations, aur cloud support provide karte hain. Aapko kis type ka project banwana hai?"
            - User: "who is the owner?"
              Bot: "The founder and CEO of Prime Impact Solutions is Mr. Prashant Kumar Jha."
            - User: "owner kaun hai?"
              Bot: "Prime Impact Solutions ke founder aur CEO Mr. Prashant Kumar Jha hain."
            - User: "how many projects done?"
              Bot: "We have delivered over 200 successful projects since 2018!"
            - User: "can we connect?"
              Bot: "Sure! Just share your name and WhatsApp number, and we'll get in touch with you directly."

            Company Info:
            - Name: Prime Impact Solutions
            - Owner/Founder/CEO: Mr. Prashant Kumar Jha. He is the visionary behind Prime Impact Solutions.
            - Focus: Web Dev, Mobile Apps (iOS/Android), AI Automation, Cloud, Cybersecurity.
            - Status: 200+ successful projects since 2018.
            - Tone: Casual, helpful, warm, polite, and very human-like.
            - Language: English (Primary default) and Hinglish (Romanized Hindi - only when user asks in Hindi/Hinglish).

            Identity & Communication Instructions:
            1. ONLY mention Mr. Prashant Kumar Jha as the Founder, Owner, and CEO if the user specifically asks about the owner, founder, CEO, or who is in charge of the company. 
            2. Primary response language is English. You MUST reply in natural, friendly English by default.
            3. ONLY reply in Hinglish (Romanized Hindi) if the user's query is in Hinglish or Hindi.
            4. Use the "Real-time Website Knowledge" provided below to answer specific questions.

            Real-time Website Knowledge:
            ${JSON.stringify(context)}
            
            ${rulePrompt}

            User Query: ${query}
            
            Additional Instructions:
            1. **Lead Collection Strategy**: If the user shows interest in Services, Careers, or Products, answer their query first, and then naturally ask for their **Full Name** or **WhatsApp Number** to provide more details or a proposal in a friendly, conversational manner.
            2. If someone asks for something not in the context, use your general knowledge but mention that they can contact info@primeimpact.in for official details.
            3. Keep answers short and sweet (max 2-3 sentences).
            4. STRICT LANGUAGE RULE: If the User Query is written in English (even with typos like 'aviaable'), you MUST reply ONLY in English. Do NOT mix Hindi or Hinglish words (such as "Haan ji", "bilkul", "aapka", "hamare", "achha", "bhai") under any circumstances in English responses. Only reply in Hinglish if the User Query itself is written in Hindi/Hinglish.
        `;

        let result;
        try {
            result = await model.generateContent([systemPrompt, query]);
        } catch (error) {
            console.warn("Retrying with gemini-pro fallback...");
            const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });
            result = await fallbackModel.generateContent([systemPrompt, query]);
        }

        const responseText = result.response.text();

        // --- Smart Lead Extraction (Auto-save details from chat) ---
        const phoneRegex = /(\+?\d{1,4}[\s-])?(\(?\d{3}\)?[\s-])?\d{3}[\s-]\d{4}|\d{10,12}/g;
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

        const foundPhones = query.match(phoneRegex);
        const foundEmails = query.match(emailRegex);

        if (foundPhones || foundEmails) {
            const Lead = require("../models/Lead");
            await Lead.create({
                name: "AI Lead (From Chat)",
                mobile: foundPhones ? foundPhones[0] : "Not provided",
                email: foundEmails ? foundEmails[0] : "Not provided",
                reason: "Auto-collected from AI Chat: " + query,
                source: "chatbot_ai"
            });
        }

        // Save to ChatLog for admin review (training)
        await ChatLog.create({
            query: query,
            response: responseText,
            source: 'gemini',
            isTrained: false // Not trained yet, requires admin approval
        });
        console.log(`[Chat-Log] Saved: ${query}`);

        res.json({ response: responseText });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ message: "Something went wrong with AI", error: error.message });
    }
};

const getChatLogs = async (req, res) => {
    try {
        const logs = await ChatLog.find().sort({ createdAt: -1 });
        res.json({ success: true, data: logs });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch logs" });
    }
};

const logInteraction = async (req, res) => {
    try {
        const { query, response, source } = req.body;
        const log = await ChatLog.create({
            query,
            response,
            source: source || 'rule'
        });
        res.json({ success: true, data: log });
    } catch (error) {
        res.status(500).json({ message: "Failed to log interaction" });
    }
};

const trainLog = async (req, res) => {
    try {
        const log = await ChatLog.findById(req.params.id);
        if (!log) {
            return res.status(404).json({ message: "Log not found" });
        }

        log.isTrained = true;
        await log.save();

        // Add to ChatConfig rules so chatbot learns it only when admin explicitly approves
        const ChatConfig = require("../models/ChatConfig");
        let config = await ChatConfig.findOne();
        if (config) {
            const cleanQuery = log.query.trim().toLowerCase();
            const exists = config.rules.some(r => r.keyword.toLowerCase() === cleanQuery);
            if (!exists) {
                config.rules.push({
                    keyword: log.query.trim(),
                    action: 'message',
                    value: log.response
                });
                await config.save();
                console.log(`[Manual-Train] Rule added for: "${log.query}"`);
            }
        }

        res.json({ success: true, data: log });
    } catch (error) {
        console.error("Failed to train log:", error);
        res.status(500).json({ message: "Failed to update log" });
    }
};

module.exports = { chatWithGemini, getChatLogs, logInteraction, trainLog };
