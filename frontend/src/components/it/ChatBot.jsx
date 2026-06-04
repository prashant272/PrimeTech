import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Volume2, VolumeX, ChevronRight, Sparkles, Mic, MicOff, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState(null);
    const [userData, setUserData] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [isFlowActive, setIsFlowActive] = useState(false);
    const [dynamicContext, setDynamicContext] = useState({
        jobs: [],
        products: [],
        visas: []
    });

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const chatEndRef = useRef(null);
    const navigate = useNavigate();

    // Website Knowledge Base (Static Fallbacks)
    const websiteContext = {
        careers: "At Prime Impact, we're always looking for exceptional talent. Current openings include Senior Full Stack Developers, UI/UX Designers, and AI Engineers. Type 'Start' to apply.",
        services: "Prime Impact offers Web Development, Mobile Apps (iOS/Android), AI & Automation, and Cloud Solutions.",
        about: "Prime Impact Solutions is a premier technology partner based in India, delivering 200+ successful projects since 2018.",
        visa: "Our Global Visa Division provides assistance for UK Skilled Worker Visas and European Work Permits with a 98% success rate."
    };

    const qualificationFlow = [
        { question: "Excellent! To get started, what is your full name?", saveToField: "name" },
        { question: "Great to meet you! Can I have your mobile number to contact you?", saveToField: "mobile" },
        { question: "And your email address for the proposal?", saveToField: "email" },
        { question: "Which service or job are you interested in?", saveToField: "interest" }
    ];

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await api.get('/admin/chat-config', { headers: { Authorization: '' } });
                setConfig(response.data);
                if (response.data?.enabled) {
                    const initialMsg = response.data.greetingMessage || "Namaste! I'm Prime AI. How can I assist you today?";
                    setMessages([{
                        id: 1,
                        text: initialMsg,
                        sender: 'bot',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }]);
                }
            } catch (error) {
                console.error('ChatBot config fetch failed:', error);
            }
        };
        fetchConfig();

        const fetchWebsiteData = async () => {
            try {
                const [jobsRes, productsRes, visasRes] = await Promise.all([
                    api.get('/content/jobs'),
                    api.get('/content/products'),
                    api.get('/content/visas')
                ]);
                setDynamicContext({
                    jobs: (jobsRes.data?.data || []).filter(j => j.active),
                    products: productsRes.data?.data || [],
                    visas: visasRes.data?.data || []
                });
            } catch (err) {
                console.error("Failed to fetch dynamic chatbot context:", err);
            }
        };
        fetchWebsiteData();
        window.speechSynthesis.getVoices();
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    useEffect(() => {
        const autoOpenTimer = setTimeout(() => {
            setIsOpen(prev => {
                if (!prev) {
                    const greeting = `${getGreeting()}! I am Prime AI, your assistant. I noticed you've been exploring our site. Need any help?`;
                    const welcomeMsg = {
                        id: 'welcome',
                        text: greeting,
                        sender: 'bot',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setMessages(prevMsgs => prevMsgs.length === 0 ? [welcomeMsg] : prevMsgs);
                    playVoice(greeting);
                    return true;
                }
                return prev;
            });
        }, 30000);
        return () => clearTimeout(autoOpenTimer);
    }, []);

    const [isListening, setIsListening] = useState(false);

    // Voice Recognition Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (recognition) {
        recognition.continuous = false;
        recognition.lang = 'en-IN';
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);
            // Auto-send voice input
            setTimeout(() => {
                handleVoiceSubmit(transcript);
            }, 500);
        };

        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);
    }

    const startListening = () => {
        if (!recognition) {
            alert("Your browser does not support voice recognition. Please use Chrome.");
            return;
        }
        setIsListening(true);
        recognition.start();
    };

    const handleVoiceSubmit = (transcript) => {
        if (!transcript.trim()) return;
        const userMsg = {
            id: Date.now(),
            text: transcript,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);
        processRule(transcript);
    };

    const playVoice = (text) => {
        if (!('speechSynthesis' in window) || isMuted || !text) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(v => (v.lang === 'en-IN' || v.lang === 'hi-IN')) || voices[0];
        if (voice) utterance.voice = voice;
        utterance.pitch = 1.1;
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    };

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = {
            id: Date.now(),
            text: input,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');
        setIsTyping(true);
        processRule(currentInput);
    };

    const isFuzzyMatch = (input, target) => {
        if (!input || !target) return false;
        const a = input.toLowerCase().trim();
        const b = target.toLowerCase().trim();

        // If exact match
        if (a === b) return true;

        // Prevent short keywords from matching substrings (e.g. 'hi' matching 'hiring')
        if (b.length <= 3) {
            const words = a.split(/[^a-zA-Z0-9]+/).filter(w => w.length > 0);
            return words.includes(b);
        }

        const getLevenshteinDistance = (s1, s2) => {
            const costs = [];
            for (let i = 0; i <= s1.length; i++) {
                let lastValue = i;
                for (let j = 0; j <= s2.length; j++) {
                    if (i === 0) costs[j] = j;
                    else if (j > 0) {
                        let newValue = costs[j - 1];
                        if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
                if (i > 0) costs[s2.length] = lastValue;
            }
            return costs[s2.length];
        };

        const dist = getLevenshteinDistance(a, b);
        const maxLen = Math.max(a.length, b.length);
        return (1 - (dist / maxLen)) >= 0.9; // 90% threshold
    };

    const finishResponse = (response) => {
        setIsTyping(false);
        const botMsg = {
            id: Date.now(),
            text: response,
            sender: 'bot',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
        playVoice(response);
    };

    const processRule = async (userInput) => {
        const lowInput = userInput.toLowerCase();
        let botResponse = "";

        const synonyms = {
            jobs: ['vacancy', 'hiring', 'job', 'opening', 'naukri', 'placement', 'carres', 'carer'],
            services: ['service', 'development', 'website', 'marketing', 'kaam', 'what you do'],
            about: ['about', 'company', 'kaun ho', 'who are you', 'intro'],
            visa: ['visa', 'permit', 'abroad', 'viza']
        };

        const hasSynonym = (key) => synonyms[key].some(s => isFuzzyMatch(userInput, s));

        if (isFlowActive) {
            const rejectionKeywords = ['no', 'nahi', 'nope', 'never', 'cancel', 'stop'];
            if (rejectionKeywords.some(k => lowInput.includes(k))) {
                setIsFlowActive(false);
                setCurrentStep(0);
                botResponse = "No problem! If you need anything else, feel free to ask. I'm here to help!";
            } else {
                const step = qualificationFlow[currentStep];
                const updatedData = { ...userData, [step.saveToField]: userInput };
                setUserData(updatedData);

                if (currentStep < qualificationFlow.length - 1) {
                    const nextStep = currentStep + 1;
                    setCurrentStep(nextStep);
                    botResponse = qualificationFlow[nextStep].question;
                } else {
                    setIsFlowActive(false);
                    setCurrentStep(0);
                    botResponse = `Thank you ${updatedData.name || 'there'}! I've saved your interest in ${updatedData.interest}. Our team will contact you soon!`;
                    try {
                        await api.post('/leads', { ...updatedData, message: `Captured via ChatBot. Interest: ${updatedData.interest}` });
                    } catch (err) { console.error(err); }
                }
                return finishResponse(botResponse);
            }
        }

        // 1. Start Flow
        if (lowInput.includes('start') || lowInput.includes('apply') || lowInput.includes('register')) {
            setIsFlowActive(true);
            setCurrentStep(0);
            botResponse = qualificationFlow[0].question;
        }
        // 2. Jobs
        else if (hasSynonym('jobs')) {
            if (dynamicContext.jobs.length > 0) {
                const jobList = dynamicContext.jobs.map(j => `• ${j.title} (${j.location})`).join('\n');
                botResponse = `We have active openings:\n${jobList}\n\nType 'Start' to apply!`;
            } else {
                botResponse = "We don't have open vacancies right now, but you can leave your details. Type 'Start' to register.";
            }
        }
        // 3. Local High-Confidence Rules (90% match)
        else {
            const matchedRule = config?.rules?.find(rule => {
                const keywords = rule.keyword.split(',').map(k => k.trim());
                return keywords.some(k => isFuzzyMatch(userInput, k));
            });

            if (matchedRule && !lowInput.includes('owner') && !lowInput.includes('founder')) {
                if (matchedRule.action === 'navigate') {
                    botResponse = `Sure! Taking you to the ${matchedRule.keyword} page.`;
                    setTimeout(() => navigate(matchedRule.value), 2000);
                } else {
                    botResponse = matchedRule.value;
                }
            } else {
                // 4. Backend Gemini AI
                try {
                    const aiRes = await api.post('/ai/chat', {
                        query: userInput,
                        context: {
                            jobs: dynamicContext.jobs,
                            products: dynamicContext.products,
                            visas: dynamicContext.visas,
                            services: websiteContext.services
                        }
                    });
                    botResponse = aiRes.data.response;
                } catch (err) {
                    botResponse = "I'm not sure about that. Can I help you with our Services or Careers? Type 'Start' to connect with us.";
                }
            }
        }

        // Log non-Gemini interactions (Rules, Synonyms, etc.)
        if (botResponse && !botResponse.includes("I'm not sure about that")) {
            const isGemini = !lowInput.includes('start') && !hasSynonym('jobs') &&
                !config?.rules?.some(r => r.keyword.split(',').some(k => isFuzzyMatch(userInput, k))) &&
                !hasSynonym('services') && !hasSynonym('about') && !hasSynonym('visa');

            if (!isGemini) {
                api.post('/ai/log', {
                    query: userInput,
                    response: botResponse,
                    source: lowInput.includes('start') ? 'static' : 'rule'
                }).catch(e => console.error("Log error", e));
            }
        }

        finishResponse(botResponse);
    };

    if (!config?.enabled) return null;

    return (
        <>
            {/* Toggle Button Container */}
            <div className={`fixed z-[10000] transition-all duration-500 ease-in-out
                ${isOpen
                    ? 'bottom-8 right-28 md:bottom-[104px] md:right-8'
                    : 'bottom-[104px] right-8'
                }`}
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 relative overflow-hidden group
                        ${isOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600'}`}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {isOpen ? <X size={28} className="text-white" /> : <Sparkles size={28} className="text-white animate-pulse" />}

                    {!isOpen && (
                        <span className="absolute top-2 right-2 w-3 h-3 bg-emerald-400 rounded-full border-2 border-blue-600 animate-ping"></span>
                    )}
                </motion.button>
            </div>

            {/* Chat Window Container */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40, x: 20 }}
                        className="fixed bottom-28 right-8 w-[90vw] md:w-[400px] h-[75vh] md:h-[600px] bg-[#0a0a0c]/95 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-[9999] overflow-hidden flex flex-col"
                        style={{ maxHeight: 'calc(100vh - 140px)' }}
                    >
                        {/* Premium Header */}
                        <div className="p-6 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-inner">
                                            <Bot className="text-white" size={28} />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#0d121f]"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg tracking-tight">Prime Intelligence</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce"></span>
                                                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                            </div>
                                            <span className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em]">Live & Online</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/5"
                                    >
                                        {isMuted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gradient-to-b from-transparent to-white/[0.02]">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-[85%] flex flex-col ${msg.sender === 'bot' ? 'items-start' : 'items-end'}`}>
                                        <div className={`px-5 py-4 rounded-[2rem] text-sm font-medium leading-relaxed shadow-xl
                                            ${msg.sender === 'bot'
                                                ? 'bg-white/5 border border-white/10 text-white rounded-tl-none'
                                                : 'bg-blue-600 text-white rounded-tr-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[9px] text-white/30 mt-2 font-bold uppercase tracking-widest px-3">{msg.time}</span>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl rounded-tl-none flex gap-2 items-center shadow-lg">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 pt-2 bg-[#0d121f]">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[1.5rem] blur opacity-20 group-focus-within:opacity-50 transition-opacity"></div>
                                <div className="relative flex items-center bg-[#1a2235] border border-white/10 rounded-[1.5rem] p-2 focus-within:border-white/20 transition-all shadow-inner">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder={isListening ? "Listening..." : "Ask Prime AI anything..."}
                                        className="flex-grow bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none"
                                    />
                                    <div className="flex items-center gap-2 pr-2">
                                        <button
                                            type="button"
                                            onClick={startListening}
                                            className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                            title="Voice Search"
                                        >
                                            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                                        </button>
                                        <button
                                            onClick={handleSend}
                                            className="w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-2xl flex items-center justify-center text-white transition-all shadow-lg shadow-blue-900/40 active:scale-95 group"
                                        >
                                            <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-2 text-[9px] text-white/10 font-bold uppercase tracking-[0.3em]">
                                <Sparkles size={10} />
                                Powered by Prime Intelligence
                                <Sparkles size={10} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
