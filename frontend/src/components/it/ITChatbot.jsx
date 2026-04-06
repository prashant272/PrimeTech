import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Laptop, Globe, Briefcase, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const ITChatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState('welcome'); // welcome, ask_mobile, ask_email, confirmed
    const [userData, setUserData] = useState({ name: '', mobile: '', email: '', interest: '' });
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Hi! I'm Prime AI. I can help you with IT Services, Management Products, or Visa assistance. What's your name?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            showOptions: true
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    const initialOptions = [
        { label: 'IT Services', icon: <Laptop size={14} />, route: '/services' },
        { label: 'Management Products', icon: <Briefcase size={14} />, route: '/' },
        { label: 'Visa Assistance', icon: <Globe size={14} />, route: '/visa/uk-visa' }
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const addMessage = (type, text, options = false) => {
        const newMsg = {
            id: Date.now(),
            type,
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            showOptions: options
        };
        setMessages(prev => [...prev, newMsg]);
    };

    const handleOptionClick = (option) => {
        if (step !== 'confirmed') {
            setUserData(prev => ({ ...prev, interest: option.label }));
            addMessage('user', `I am interested in ${option.label}`);
            setIsTyping(true);
            setTimeout(() => {
                addMessage('bot', `That's great! Before we dive into ${option.label}, may I know your name?`);
                setIsTyping(false);
            }, 800);
        } else {
            addMessage('bot', `Taking you to our ${option.label} section...`);
            setTimeout(() => {
                navigate(option.route);
                if (option.label === 'Management Products') {
                    // Scroll to products section if on home
                    const el = document.getElementById('products-showcase');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);
        }
    };

    const handleSend = (text) => {
        const input = text || inputValue;
        if (!input.trim()) return;

        addMessage('user', input);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            processStep(input);
            setIsTyping(false);
        }, 1000);
    };

    const processStep = (input) => {
        const lowInput = input.toLowerCase();

        if (step === 'welcome') {
            setUserData(prev => ({ ...prev, name: input }));
            addMessage('bot', `Pleasure to meet you, ${input}! Can you share your Mobile Number? Our experts will contact you with customized solutions.`);
            setStep('ask_mobile');
        } else if (step === 'ask_mobile') {
            setUserData(prev => ({ ...prev, mobile: input }));
            addMessage('bot', `Thank you. And your Email Address to send the proposal?`);
            setStep('ask_email');
        } else if (step === 'ask_email') {
            const finalData = { ...userData, email: input };
            setUserData(finalData);
            addMessage('bot', `All set! You're now a verified Prime Impact partner. How can I assist you further?`, true);
            setStep('confirmed');
            submitLead(finalData);
        } else {
            // Smart routing based on keywords
            if (lowInput.includes('visa')) {
                addMessage('bot', "Navigating you to our Global Visa section...");
                setTimeout(() => navigate('/visa/uk-visa'), 1500);
            } else if (lowInput.includes('service') || lowInput.includes('it')) {
                addMessage('bot', "Showing you our core IT Services...");
                setTimeout(() => navigate('/services'), 1500);
            } else if (lowInput.includes('product') || lowInput.includes('erp')) {
                addMessage('bot', "Opening our Enterprise Product list...");
                setTimeout(() => navigate('/'), 1500);
            } else {
                addMessage('bot', "Thank you for the message. Our senior consultant will reach out to you within the next hour.");
            }
        }
    };

    const submitLead = async (data) => {
        try {
            await api.post('/leads', {
                name: data.name,
                email: data.email,
                mobile: data.mobile,
                interest: data.interest || 'General Inquiry',
                message: "Lead captured via Professional AI Chatbot"
            });
            console.log('Lead submitted to Prime Systems DB');
        } catch (error) {
            console.error('Lead submission failed:', error);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100000]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        className="absolute bottom-20 right-0 w-[92vw] md:w-[400px] h-[580px] max-h-[75vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] border border-white/10 backdrop-blur-3xl bg-[#0a1120]/95"
                    >
                        {/* Header */}
                        <div className="p-6 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20 relative">
                                    <Bot className="text-white" size={24} />
                                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#0a1120] rounded-full animate-pulse"></span>
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-white font-black text-sm tracking-tight">Prime AI Pro</h4>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-blue-400 text-[9px] font-black uppercase tracking-[0.2em]">Enterprise Intelligence</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 transition-all active:scale-90">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-8 scrollbar-hide bg-gradient-to-b from-transparent to-blue-600/[0.03]">
                            {messages.map((msg) => (
                                <div key={msg.id} className="space-y-4">
                                    <div className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex gap-3 max-w-[88%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                            <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center ${msg.type === 'user' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 border border-white/10 text-blue-400'}`}>
                                                {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                                            </div>
                                            <div className="space-y-2">
                                                <div className={`p-5 rounded-[1.5rem] text-[14px] leading-relaxed shadow-sm ${
                                                    msg.type === 'user' 
                                                    ? 'bg-blue-600 text-white rounded-tr-none font-medium' 
                                                    : 'bg-white/10 text-white/90 border border-white/10 rounded-tl-none backdrop-blur-md'
                                                }`}>
                                                    {msg.text}
                                                </div>
                                                <span className="text-[10px] text-white/20 px-1 font-bold">{msg.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Inline Options if bot message has them */}
                                    {msg.showOptions && (
                                        <div className="flex flex-wrap gap-2 pl-12 animate-in fade-in slide-in-from-left-4 duration-700">
                                            {initialOptions.map((opt, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleOptionClick(opt)}
                                                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-500/10 hover:bg-blue-600/30 border border-blue-500/20 rounded-xl text-[11px] font-black uppercase tracking-wider text-blue-400 transition-all hover:scale-105 active:scale-95 group"
                                                >
                                                    {opt.icon} {opt.label} <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {isTyping && (
                                <div className="flex justify-start pl-12">
                                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1.5">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div 
                                                    key={i}
                                                    animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }} 
                                                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} 
                                                    className="w-1.5 h-1.5 bg-blue-500 rounded-full" 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-white/5 bg-white/[0.03]">
                            <div className="relative group">
                                <input 
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                                    placeholder={
                                        step === 'welcome' ? "Enter your name..." : 
                                        step === 'ask_mobile' ? "Enter mobile number..." : 
                                        step === 'ask_email' ? "Enter email address..." : "Type your query here..."
                                    }
                                    className="w-full bg-[#0a1120] border border-white/10 rounded-2xl py-4.5 pl-6 pr-16 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                                />
                                <button 
                                    onClick={() => handleSend(inputValue)}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center text-white transition-all shadow-lg shadow-blue-600/40 active:scale-90"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-5 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Sparkles size={10} className="text-blue-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Advanced AI Core</span>
                                <Sparkles size={10} className="text-blue-400" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500 border border-white/10 ${
                    isOpen ? 'bg-white text-blue-600' : 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white'
                }`}
            >
                <AnimatePresence mode='wait'>
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X size={32} />
                        </motion.div>
                    ) : (
                        <motion.div key="open" className="relative" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <Bot size={32} />
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-white items-center justify-center">
                                    <Sparkles size={10} className="text-blue-600" />
                                </span>
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default ITChatbot;
