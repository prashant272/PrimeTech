import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, 
    CheckCircle2, 
    Zap, 
    Target, 
    Globe2, 
    BarChart3, 
    ShieldCheck,
    TrendingUp,
    Activity,
    ChevronRight,
    MessageSquare,
    Sparkles,
    Calendar,
    Briefcase,
    Quote
} from 'lucide-react';
import api from '../api/axios';
import ITNavbar from '../components/it/ITNavbar';
import ITFooter from '../components/it/ITFooter';
import ITBackground3D from '../components/it/ITBackground3D';

const iconMap = {
    CheckCircle2, Zap, TrendingUp, BarChart3, Globe2, Target, ShieldCheck, Activity
};

const ITCaseStudyDetail = () => {
    const { slug } = useParams();
    const [caseStudy, setCaseStudy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCaseStudy = async () => {
            try {
                const res = await api.get(`/content/case-studies/${slug}`);
                if (res.data && res.data.data) {
                    setCaseStudy(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch case study:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCaseStudy();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#070b14] flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!caseStudy) {
        return (
            <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center text-white p-6 text-center">
                <h1 className="text-4xl font-black mb-4">Case Study Not Found</h1>
                <Link to="/" className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-2">
                    <ArrowLeft size={20} /> Back to Home
                </Link>
            </div>
        );
    }

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    return (
        <div className="min-h-screen bg-[#070b14] text-white selection:bg-blue-500/30 relative">
            <ITBackground3D />
            <ITNavbar />

            {/* Hero Spotlight Section */}
            <section className="relative pt-32 pb-20 overflow-hidden text-center">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-4 mb-10 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl"
                        >
                            <Link to="/" className="text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em] text-[9px] font-black flex items-center gap-2 group">
                                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Case Study
                            </Link>
                            <div className="h-3 w-px bg-white/20"></div>
                            <span className="text-blue-400 uppercase tracking-[0.2em] text-[9px] font-black">{caseStudy.industry || "Technology"}</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tighter text-white drop-shadow-2xl"
                            style={{ fontFamily: '"Outfit", sans-serif' }}
                        >
                            {caseStudy.title}
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl font-light text-white/80 leading-relaxed max-w-2xl mx-auto mb-14"
                        >
                            {caseStudy.description}
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center justify-center gap-12"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Market Sector</span>
                                <span className="text-white font-bold text-lg">{caseStudy.industry}</span>
                            </div>
                            <div className="h-8 w-px bg-white/10 hidden md:block"></div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Project Lead</span>
                                <span className="text-white font-bold text-lg">Prime Solutions</span>
                            </div>
                            <div className="h-8 w-px bg-white/10 hidden md:block"></div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Validation</span>
                                <span className="text-emerald-400 font-bold text-lg flex items-center gap-2">
                                    <ShieldCheck size={18} /> Direct Impact
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Media Showcase */}
            <section className="relative pb-40">
                <div className="container mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 60 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative max-w-6xl mx-auto rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/20 group"
                    >
                        {/* Soft Glow Ambient Background */}
                        <div className="absolute inset-0 bg-blue-600/10 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <img 
                            src={caseStudy.image} 
                            alt={caseStudy.title} 
                            className="w-full h-auto object-cover max-h-[650px] transform transition-transform duration-[2s] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/80 via-transparent to-transparent"></div>
                    </motion.div>
                </div>
            </section>

            {/* Strategic Analysis Grid */}
            <section className="relative pb-40">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
                            <motion.div 
                                {...fadeInUp}
                                className="p-14 bg-white/[0.04] border border-white/10 rounded-[3.5rem] backdrop-blur-2xl relative overflow-hidden group shadow-2xl"
                            >
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/5 blur-[80px] rounded-full"></div>
                                <Quote className="text-red-500/20 absolute bottom-10 right-10" size={120} strokeWidth={1} />
                                <div className="flex items-center gap-4 text-red-500 font-black uppercase tracking-[0.3em] text-[10px] mb-10 relative z-10">
                                    <Target size={20} /> The Critical Challenge
                                </div>
                                <p className="text-2xl text-white font-medium leading-relaxed italic relative z-10">
                                    "{caseStudy.problem}"
                                </p>
                            </motion.div>

                            <motion.div 
                                {...fadeInUp}
                                transition={{ delay: 0.1 }}
                                className="p-14 bg-blue-600/[0.05] border border-blue-500/20 rounded-[3.5rem] backdrop-blur-2xl relative overflow-hidden group shadow-2xl"
                            >
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 blur-[80px] rounded-full"></div>
                                <Sparkles className="text-blue-500/20 absolute bottom-10 right-10" size={120} strokeWidth={1} />
                                <div className="flex items-center gap-4 text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] mb-10 relative z-10">
                                    <Zap size={20} /> Strategic Intelligence
                                </div>
                                <p className="text-2xl text-white font-medium leading-relaxed italic relative z-10">
                                    "{caseStudy.solution}"
                                </p>
                            </motion.div>
                        </div>

                        {/* The Narrative Story */}
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-center gap-8 mb-20">
                                <div className="h-px w-24 bg-gradient-to-r from-transparent to-white/20"></div>
                                <h3 className="text-white font-black uppercase tracking-[0.5em] text-xs">The Full Narrative</h3>
                                <div className="h-px w-24 bg-gradient-to-l from-transparent to-white/20"></div>
                            </div>

                            <article className="text-white text-xl md:text-2xl leading-[1.8] space-y-12 font-medium">
                                {caseStudy.fullStory.split('\n').map((para, i) => (
                                    <p key={i} className={i === 0 ? "first-letter:text-7xl first-letter:font-black first-letter:text-blue-500 first-letter:mr-5 first-letter:float-left first-letter:leading-[0.8] pt-4" : ""}>
                                        {para}
                                    </p>
                                ))}
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            {/* Performance Metrics Dashboard */}
            <section className="relative pb-40">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div 
                            {...fadeInUp}
                            className="bg-white/[0.03] border border-white/10 rounded-[4rem] p-16 md:p-24 backdrop-blur-3xl shadow-3xl overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            
                            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 relative z-10">
                                <div>
                                    <h3 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: '"Outfit", sans-serif' }}>Impact Metrics</h3>
                                    <p className="text-white/60 text-lg max-w-lg">Validated data showing the direct transformation achieved through our specialized engineering approach.</p>
                                </div>
                                <div className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
                                    Final Validation Complete
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                                {caseStudy.results.map((res, i) => {
                                    const Icon = iconMap[res.icon] || CheckCircle2;
                                    return (
                                        <motion.div 
                                            key={i} 
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all group"
                                        >
                                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 mb-8 group-hover:scale-110 transition-transform">
                                                <Icon size={32} style={{ color: res.color }} />
                                            </div>
                                            <div className="text-4xl font-black text-white mb-2 tracking-tighter" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                                {res.text}
                                            </div>
                                            <div className="text-[10px] uppercase font-black tracking-widest text-white/40">Observed Growth</div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="relative pb-40">
                <div className="container mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto p-16 md:p-24 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[4rem] text-center shadow-[0_30px_80px_rgba(37,99,235,0.4)] relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <h4 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 leading-tight">Secure your future <br /> success story today.</h4>
                        <p className="text-white/80 text-xl md:text-2xl mb-14 font-medium relative z-10">Partner with Prime Solutions for world-class IT transformation.</p>
                        <Link 
                            to="/contact"
                            className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-white text-blue-600 font-extrabold uppercase tracking-[0.2em] rounded-3xl hover:scale-[1.05] active:scale-[0.95] transition-all shadow-2xl relative z-10 text-sm"
                        >
                            Initiate Partnership <ChevronRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <ITFooter />

            <style>{`
                .article-glow p {
                    text-shadow: 0 0 40px rgba(255,255,255,0.05);
                }
                .text-blue-gradient {
                    background: linear-gradient(to right, #60a5fa, #a78bfa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
        </div>
    );
};

export default ITCaseStudyDetail;
