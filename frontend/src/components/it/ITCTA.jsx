import React from 'react';
import { Rocket, Calendar, Phone, CheckCircle } from 'lucide-react';

const ITCTA = () => {
    return (
        <section className="py-10">
            <div className="container mx-auto px-6">
                <div className="relative rounded-[2rem] overflow-hidden p-12 md:p-20 text-center">
                    {/* Background with gradient and mesh effect */}
                    <div className="absolute inset-0 bg-[#0d1117]/60"></div>
                    <div className="absolute inset-0 opacity-40"
                        style={{
                            background: 'radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.5), transparent 60%), radial-gradient(circle at 80% 50%, rgba(124, 58, 237, 0.5), transparent 60%)'
                        }}>
                    </div>
                    <div className="absolute inset-0 opacity-15"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }}>
                    </div>
                    <div className="absolute inset-0 border border-white/10 rounded-[2rem]"></div>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
                            <Rocket className="text-blue-500" size={32} />
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: '"Outfit", sans-serif', lineHeight: 1.1 }}>
                            Ready to Build Your Next <br />
                            <span className="text-blue-gradient">Digital Product?</span>
                        </h2>

                        <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                            Let's turn your idea into a scalable, high-performance solution. No matter where you are in your journey, we're here to help you navigate it.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                            <a href="/contact"
                                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/40 flex items-center justify-center gap-3">
                                🚀 Book Free Strategy Call
                            </a>
                            <a href="https://calendly.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-10 py-5 bg-white/10 text-white font-bold rounded-xl uppercase tracking-widest text-sm hover:bg-white/15 transition-all border border-white/20 shadow-xl flex items-center justify-center gap-3">
                                <Calendar size={18} /> Calendly Booking
                            </a>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:border-blue-500/30 group">
                                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                    <Phone size={20} className="text-blue-400" />
                                </div>
                                <span className="text-2xl font-bold text-white tracking-widest font-display">+91 9319 9319 06</span>
                            </div>
                            <div className="flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-[0.2em] animate-pulse">
                                <CheckCircle size={14} className="text-green-500" /> Available 24/7 for Consultations
                            </div>
                        </div>

                        <div className="mt-16 pt-12 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-20">
                            <div className="text-center group">
                                <div className="text-2xl font-extrabold text-white mb-1 group-hover:text-blue-400 transition-colors">100%</div>
                                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em]">Confidentiality</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-2xl font-extrabold text-white mb-1 group-hover:text-purple-400 transition-colors">Free</div>
                                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em]">Consultation</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-2xl font-extrabold text-white mb-1 group-hover:text-blue-400 transition-colors">48h</div>
                                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em]">Fast Planning</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ITCTA;
