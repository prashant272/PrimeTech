const { GoogleGenerativeAI } = require("@google/generative-ai");
const ChatLog = require("../models/ChatLog");

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

        const systemPrompt = `
            You are "Prime Assistant", the official AI representative of Prime Impact Solutions. 

            Company Info:
            - Name: Prime Impact Solutions
            - Owner/Founder/CEO: Mr. Prashant Kumar Jha. He is the visionary behind Prime Impact Solutions.
            - Focus: Web Dev, Mobile Apps (iOS/Android), AI Automation, Cloud, Cybersecurity.
            - Status: 200+ successful projects since 2018.
            - Tone: Professional, helpful, and warm. 
            - Language: You can speak English and Hinglish (Romanized Hindi).

            Identity Instructions:
            1. ONLY mention Mr. Prashant Kumar Jha as the Founder, Owner, and CEO if the user specifically asks about the owner, founder, CEO, or who is in charge of the company. 
            2. For general queries, introduce yourself simply as "Prime Assistant".
            3. Use the "Real-time Website Knowledge" provided below to answer specific questions about jobs, services, or products.
            4. Answer in Hinglish (Romanized Hindi) for Indian users.

            Real-time Website Knowledge:
            ${JSON.stringify(context)}
            
            User Query: ${query}
            
            Additional Instructions:
            1. **Lead Collection Strategy**: If the user shows interest in Services, Careers, or Products, answer their query first, and then naturally ask for their **Full Name** or **WhatsApp Number** to provide more details or a proposal.
            2. If someone asks for something not in the context, use your general knowledge but mention that they can contact info@primeimpact.in for official details.
            3. Keep answers short and sweet (max 2-3 sentences).
            4. Match the user's language perfectly. If the user asks in English, reply ONLY in English. If they use Hinglish (Romanized Hindi), reply in Hinglish.
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
            isTrained: true // Marking as auto-trained
        });
        console.log(`[Chat-Log] Saved: ${query}`);

        // --- AUTOMATIC SELF-TRAINING LOGIC ---
        try {
            const ChatConfig = require("../models/ChatConfig");
            // Always update the first/only config document
            let config = await ChatConfig.findOne();
            
            if (config) {
                // Normalize query for comparison
                const cleanQuery = query.trim().toLowerCase();
                const exists = config.rules.some(r => r.keyword.toLowerCase() === cleanQuery);
                
                if (!exists) {
                    config.rules.push({
                        keyword: query.trim(),
                        action: 'message',
                        value: responseText
                    });
                    await config.save();
                    console.log(`[Auto-Train] Success! New rule added. Total rules: ${config.rules.length}`);
                } else {
                    console.log(`[Auto-Train] Skipped: Keyword "${cleanQuery}" already exists.`);
                }
            } else {
                console.log("[Auto-Train] Warning: No ChatConfig document found to update.");
            }
        } catch (trainErr) {
            console.error("[Auto-Train] Error:", trainErr);
        }

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
        const log = await ChatLog.findByIdAndUpdate(req.params.id, { isTrained: true }, { returnDocument: 'after' });
        res.json({ success: true, data: log });
    } catch (error) {
        res.status(500).json({ message: "Failed to update log" });
    }
};

module.exports = { chatWithGemini, getChatLogs, logInteraction, trainLog };
