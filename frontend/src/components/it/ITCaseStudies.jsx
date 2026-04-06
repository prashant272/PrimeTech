import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, Zap, TrendingUp, BarChart3, Globe2, Target, Activity, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const iconMap = {
    CheckCircle2, Zap, TrendingUp, BarChart3, Globe2, Target, Activity, ShieldCheck
};

const ITCaseStudies = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await api.get('/content/case-studies');
                if (res.data && res.data.data) {
                    setCases(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch case studies:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCases();
    }, []);

    if (loading && cases.length === 0) {
        return (
            <section className="py-24 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </section>
        );
    }

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
                        <div 
                            key={item._id || i} 
                            onClick={() => navigate(`/case-studies/${item.slug}`)}
                            className="group relative rounded-2xl overflow-hidden bg-[#0d1117] border border-white/5 hover:border-blue-500/30 transition-all duration-500 cursor-pointer shadow-2xl"
                        >
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden text-left">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                        <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                            {item.industry}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] to-transparent md:block hidden"></div>
                                </div>
                                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                                    <div className="text-left">
                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                                        <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">{item.description}</p>

                                        <div className="space-y-3 mb-8">
                                            <div className="text-xs font-bold uppercase text-blue-400 flex items-center gap-2">
                                                <div className="w-4 h-[1px] bg-blue-500"></div> Key Metrics
                                            </div>
                                            <div className="grid grid-cols-1 gap-3">
                                                {item.results.slice(0, 2).map((res, j) => {
                                                    const Icon = iconMap[res.icon] || CheckCircle2;
                                                    return (
                                                        <div key={j} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 group-hover:bg-white/10 transition-all duration-300">
                                                            <Icon size={18} style={{ color: res.color }} />
                                                            <span className={`text-sm font-black ${res.bold ? 'text-white' : 'text-gray-200'} tracking-tight`}>{res.text}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-widest group/btn border-t border-white/5 pt-6 w-full text-left">
                                        View Full Story <ArrowUpRight size={14} className="translate-y-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ITCaseStudies;
