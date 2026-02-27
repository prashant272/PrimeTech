import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Zap, TrendingUp, X, BarChart3, Globe2, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ITCaseStudies = () => {
    const [selectedCase, setSelectedCase] = useState(null);

    const cases = [
        {
            title: "E-Commerce Scale-up",
            industry: "Retail & E-commerce",
            description: "Transformed a legacy retail store into a high-performance digital empire.",
            problem: "Low conversion rates and 5s+ page load times.",
            solution: "Next.js migration with Headless CMS & Global CDN.",
            fullStory: "Our client was struggling with a slow, outdated WooCommerce platform that couldn't handle their growing traffic. We migrated them to a headless architecture using Next.js and a cloud-based CMS. By optimizing every asset and leveraging global edge caching, we reduced page load times by over 60%. The result was a dramatic increase in user engagement and a 45% boost in annual revenue.",
            challenge: "Handling peak seasonal traffic of 50k+ concurrent users while maintaining sub-second performance.",
            approach: "Decoupled frontend from backend, implemented incremental static regeneration (ISR), and integrated high-speed search with Algolia.",
            results: [
                { icon: TrendingUp, text: "45% Revenue Growth", color: "#10b981", bold: true },
                { icon: Zap, text: "60% Faster Load Time", color: "#3b82f6", bold: true }
            ],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "AI Support Automation",
            industry: "FinTech & Banking",
            description: "Implemented custom LLM-based support for a FinTech startup.",
            problem: "High support costs and 12-hour response latency.",
            solution: "Custom RAG-based AI Chatbot integrated with CRM.",
            fullStory: "The client faced a bottleneck in customer support, where queries often took hours to resolve manually. We built a custom AI agent powered by GPT-4, fine-tuned on their specific financial documentation and compliance rules. The AI now handles 70% of initial queries autonomously with 98% accuracy. Support costs dropped by 30% within the first quarter, and response times went from hours to seconds.",
            challenge: "Building an AI that strictly follows financial compliance and never 'hallucinates' on legal advice.",
            approach: "Implemented a Retrieval-Augmented Generation (RAG) pipeline with strict system prompts and human-in-the-loop escalation.",
            results: [
                { icon: CheckCircle2, text: "30% Cost Reduction", color: "#8b5cf6", bold: true },
                { icon: Zap, text: "90% Faster Response", color: "#f59e0b", bold: true }
            ],
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "SaaS Platform Launch",
            industry: "Software & Technology",
            description: "Developed a comprehensive SaaS platform for project management.",
            problem: "Lack of real-time collaboration and slow performance.",
            solution: "React with Real-time WebSockets and GraphQL API.",
            fullStory: "A tech startup needed to build a highly collaborative workspace tool. We engineered a real-time engine using WebSockets that allows hundreds of users to work on the same document without conflict. The platform scales effortlessly thanks to a microservices architecture and a globally distributed database. Within 6 months of launch, they secured 10,000+ paid users and a Series A funding round.",
            challenge: "Ensuring zero-latency data synchronization across global regions for live collaboration.",
            approach: "Utilized GraphQL subscriptions and a conflict-free replicated data type (CRDT) system for real-time state management.",
            results: [
                { icon: CheckCircle2, text: "50% Higher Productivity", color: "#10b981", bold: true },
                { icon: Zap, text: "Zero Lag Experience", color: "#3b82f6", bold: true }
            ],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Global Logistics Hub",
            industry: "Logistics & Supply Chain",
            description: "Built a real-time tracking system for a global logistics provider.",
            problem: "Inaccurate tracking and manual data entry errors.",
            solution: "IoT Integration with customized dashboard and mobile apps.",
            fullStory: "A logistics giant was losing 5% of their ROI due to manual data entry errors and lack of live tracking for their fleet. We installed custom IoT sensors across their vehicles and integrated them into a centralized dashboard. This allowed for real-time monitoring of cargo temperature, speed, and fuel consumption. The system eliminated manual errors completely and increased overall logistical efficiency by 40%.",
            challenge: "Integrating hardware IoT sensors with a legacy warehouse management system (WMS).",
            approach: "Developed an API gateway to bridge the gap between sensor data streams and the legacy SQL-based warehouse system.",
            results: [
                { icon: TrendingUp, text: "40% Efficiency Boost", color: "#ec4899", bold: true },
                { icon: CheckCircle2, text: "100% Tracking Accuracy", color: "#3b82f6", bold: true }
            ],
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mb-16 text-left">
                    <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">Real Impact</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Case Studies & <span className="text-blue- gradient" style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Success Stories</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        We don't just write code; we deliver business results. Explore how we've helped our clients scale.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {cases.map((item, i) => (
                        <div key={i} className="group relative rounded-2xl overflow-hidden bg-[#0d1117] border border-white/5 hover:border-blue-500/30 transition-all duration-500">
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                        <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                            {item.industry}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] to-transparent md:block hidden"></div>
                                </div>
                                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">{item.description}</p>

                                        <div className="space-y-3 mb-8">
                                            <div className="text-xs font-bold uppercase text-blue-400 flex items-center gap-2">
                                                <div className="w-4 h-[1px] bg-blue-500"></div> Results & Authority
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                {item.results.map((res, j) => (
                                                    <div key={j} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 group-hover:bg-white/10 transition-all duration-300">
                                                        <res.icon size={22} style={{ color: res.color }} />
                                                        <span className={`text-base font-black ${res.bold ? 'text-white' : 'text-gray-200'} tracking-tight`}>{res.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setSelectedCase(item)}
                                        className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-wider group/btn"
                                    >
                                        View Full Story <ArrowUpRight size={18} className="translate-y-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Case Study Modal */}
            <AnimatePresence>
                {selectedCase && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCase(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[2.5rem] bg-[#0d1117] border border-white/10 shadow-2xl flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedCase(null)}
                                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Left Side: Image & Stats */}
                            <div className="md:w-2/5 relative overflow-hidden bg-blue-600/10">
                                <img src={selectedCase.image} alt={selectedCase.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>

                                <div className="absolute bottom-10 left-10 right-10">
                                    <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full inline-block mb-4 shadow-lg shadow-blue-900/40">
                                        {selectedCase.industry}
                                    </span>
                                    <h2 className="text-4xl font-bold text-white mb-6 leading-tight">{selectedCase.title}</h2>

                                    <div className="grid grid-cols-1 gap-3">
                                        {selectedCase.results.map((res, j) => (
                                            <div key={j} className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-xl">
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5">
                                                    <res.icon size={20} style={{ color: res.color }} />
                                                </div>
                                                <span className="text-lg font-black text-white tracking-tight">{res.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Detailed Story */}
                            <div className="md:w-3/5 p-8 md:p-16 overflow-y-auto custom-scrollbar">
                                <div className="space-y-12">
                                    <section>
                                        <div className="flex items-center gap-3 text-blue-400 font-black uppercase tracking-[0.2em] text-xs mb-4">
                                            <Target size={16} /> The Problem
                                        </div>
                                        <p className="text-2xl text-white font-medium leading-relaxed italic border-l-4 border-blue-500 pl-6 py-2">
                                            "{selectedCase.problem}"
                                        </p>
                                    </section>

                                    <section>
                                        <div className="flex items-center gap-3 text-purple-400 font-black uppercase tracking-[0.2em] text-xs mb-4">
                                            <Globe2 size={16} /> The Full Story
                                        </div>
                                        <p className="text-gray-300 text-lg leading-relaxed font-light">
                                            {selectedCase.fullStory}
                                        </p>
                                    </section>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <section>
                                            <div className="flex items-center gap-3 text-pink-400 font-black uppercase tracking-[0.2em] text-xs mb-4">
                                                <Zap size={16} /> The Challenge
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {selectedCase.challenge}
                                            </p>
                                        </section>
                                        <section>
                                            <div className="flex items-center gap-3 text-blue-400 font-black uppercase tracking-[0.2em] text-xs mb-4">
                                                <BarChart3 size={16} /> The Approach
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {selectedCase.approach}
                                            </p>
                                        </section>
                                    </div>

                                    <div className="pt-8 border-t border-white/5">
                                        <button
                                            onClick={() => {
                                                setSelectedCase(null);
                                                window.location.href = '/contact';
                                            }}
                                            className="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]"
                                        >
                                            Start Your Own Story 🚀
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ITCaseStudies;
