import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Clock, 
    ArrowRight, 
    CheckCircle2, 
    ShieldCheck, 
    FileText, 
    Users, 
    Zap, 
    Globe, 
    Plane,
    Calendar,
    ChevronRight,
    HelpCircle,
    Info,
    Briefcase,
    HeartPulse,
    Map,
    Lock
} from 'lucide-react';
const iconMap = {
    Globe: Globe,
    ShieldCheck: ShieldCheck,
    Calendar: Calendar,
    Clock: Clock,
    CheckCircle2: CheckCircle2,
    FileText: FileText,
    Users: Users,
    Zap: Zap,
    Briefcase: Briefcase,
    Plane: Plane,
    HeartPulse: HeartPulse,
    Map: Map,
    Lock: Lock
};

const VisaDetail = () => {
    const { visaSlug } = useParams();
    const [visa, setVisa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/content/visas/${visaSlug}`);
                if (response.data.success) {
                    setVisa(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching visa details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
        
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        window.scrollTo(0, 0);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visaSlug]);

    if (loading) return (
        <div className="min-h-screen bg-[#0a1120] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!visa) {
        return (
            <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold mb-4">Visa Category Not Found</h2>
                <Link to="/" className="text-blue-400 hover:underline flex items-center gap-2">
                    <ArrowRight className="rotate-180" size={18} /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent text-white selection:bg-blue-500/30 relative overflow-hidden">
            {/* animated circuit lines background - copied from home */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] transition-transform duration-300"
                style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="circuit-visa" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M0 40 H30 M50 40 H80 M40 0 V30 M40 50 V80" stroke="#3b82f6" strokeWidth="0.5" fill="none" />
                            <circle cx="40" cy="40" r="3" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                            <circle cx="0" cy="40" r="2" fill="#3b82f6" />
                            <circle cx="80" cy="40" r="2" fill="#3b82f6" />
                            <circle cx="40" cy="0" r="2" fill="#3b82f6" />
                            <circle cx="40" cy="80" r="2" fill="#3b82f6" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit-visa)" />
                </svg>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden min-h-[60vh] flex items-center">
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 scale-110 transition-transform duration-700"
                        style={{
                            backgroundImage: `url('${visa.bgImage}')`,
                            transform: `scale(1.1) translateY(${scrollY * 0.2}px)`
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#070b14]/80 to-[#070b14]"></div>
                </div>

                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                Premium Visa Services
                            </span>
                            <div className="h-px w-12 bg-blue-500/30"></div>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
                            style={{ fontFamily: '"Outfit", sans-serif' }}
                        >
                            {visa.title} <span className="text-blue-500 font-black">.</span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl"
                        >
                            {visa.heroDesc} {visa.fullDesc}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Content Tabs / Info Cards */}
            <section className="py-20 bg-white/[0.02]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Requirements & Info */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Visa Types Table */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="bg-white/5 border border-white/10 rounded-3xl p-8"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400">
                                        <Info size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold tracking-tight">Available Visa Categories</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="py-4 text-white/40 text-[10px] uppercase font-black tracking-widest">Visa Type</th>
                                                <th className="py-4 text-white/40 text-[10px] uppercase font-black tracking-widest">Duration</th>
                                                <th className="py-4 text-white/40 text-[10px] uppercase font-black tracking-widest">Starting Fees</th>
                                                <th className="py-4 text-white/40 text-[10px] uppercase font-black tracking-widest">Processing Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {visa.types.map((type, idx) => (
                                                <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                                                    <td className="py-5 font-bold text-white/90">{type.type}</td>
                                                    <td className="py-5 text-white/60">{type.duration}</td>
                                                    <td className="py-5 text-blue-400 font-bold">{type.fee}</td>
                                                    <td className="py-5 text-white/60">
                                                        <span className="flex items-center gap-2">
                                                            <Clock size={14} className="text-blue-500" />
                                                            {type.processing}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>

                            {/* Document Checklist */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                        <FileText className="text-blue-500" /> Mandatory Documents
                                    </h3>
                                    <ul className="space-y-4">
                                        {visa.documents.map((doc, i) => (
                                            <li key={i} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                                                <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={16} />
                                                {doc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-blue-600/5 border border-blue-500/20 rounded-3xl p-8">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-blue-400">
                                        <ShieldCheck /> Why Process With Us?
                                    </h3>
                                    <ul className="space-y-4">
                                        {visa.whyChooseUs.map((point, i) => (
                                            <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2"></div>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar / Form Area */}
                        <div className="lg:col-span-4 h-fit">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="bg-[#0f172a] border border-blue-500/30 rounded-[2rem] p-8 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.3)] sticky top-32"
                            >
                                <h3 className="text-xl font-bold mb-2">Apply for {visa.title}</h3>
                                <p className="text-sm text-white/40 mb-8">Fill the form, our experts will call you in 2 hours.</p>
                                
                                <form className="space-y-4">
                                    <div>
                                        <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 focus:outline-none transition-all" />
                                    </div>
                                    <div>
                                        <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 focus:outline-none transition-all" />
                                    </div>
                                    <div>
                                        <input type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 focus:outline-none transition-all" />
                                    </div>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-xl transition-all shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]">
                                        Start Visa Process
                                    </button>
                                </form>
                                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-white/30">
                                    <span className="flex items-center gap-1"><ShieldCheck size={14} /> Secure</span>
                                    <span className="flex items-center gap-1"><Zap size={14} /> Express</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Timeline */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Our Expert Process</h2>
                        <p className="text-white/40 max-w-xl mx-auto">We follow a rigorous protocol to ensure every application has the best chance of success.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {visa.process.map((step, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative group"
                            >
                                <div className="mb-6 p-6 bg-white/5 border border-white/10 rounded-2xl group-hover:border-blue-500/50 transition-all duration-500">
                                    <div className="text-4xl font-black text-blue-500/10 mb-4">0{idx + 1}</div>
                                    <h4 className="text-lg font-bold mb-3">{step.title}</h4>
                                    <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                                </div>
                                {idx < visa.process.length - 1 && (
                                    <ChevronRight className="hidden md:block absolute top-[20%] -right-4 text-white/10" size={32} />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-blue-600/[0.03]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {visa.features.map((feature, i) => {
                            const Icon = iconMap[feature.icon] || Info;
                            return (
                                <motion.div 
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] transition-all hover:bg-white/[0.08]"
                                >
                                    <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 font-black">
                                        <Icon size={28} />
                                    </div>
                                    <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                                    <p className="text-sm text-white/40 leading-relaxed font-medium">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight">Ready to travel to {visa.title.split(' ')[0]}?</h2>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Link to="/contact" className="px-12 py-5 bg-white text-[#070b14] font-black rounded-2xl hover:scale-105 transition-all uppercase tracking-widest text-sm">
                            Speak to a Consultant
                        </Link>
                        <button className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all uppercase tracking-widest text-sm shadow-xl shadow-blue-600/20">
                            Download Checklist
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VisaDetail;
