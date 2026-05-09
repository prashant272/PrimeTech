import React from 'react';
import { X, MapPin, Clock, Briefcase, CheckCircle, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ITJobDetailModal = ({ isOpen, onClose, job, onApply }) => {
    if (!isOpen || !job) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-[#070b14]/95 backdrop-blur-xl" onClick={onClose}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-3xl bg-[#0f172a] border border-white/10 rounded-[1.8rem] md:rounded-[2.5rem] shadow-[0_0_50px_rgba(37,99,235,0.2)] overflow-hidden flex flex-col max-h-[92vh] md:max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Ambient Glows */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] -mr-24 -mt-24"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 blur-[80px] -ml-24 -mb-24"></div>

                {/* Header */}
                <div className="p-5 md:p-10 border-b border-white/5 bg-white/[0.02] flex justify-between items-start relative z-10">
                    <div className="pr-6 md:pr-8">
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                            <span className="px-2.5 py-1 md:px-4 md:py-1.5 bg-blue-500/20 text-blue-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] rounded-md md:rounded-lg border border-blue-500/20">
                                {job.department}
                            </span>
                            <span className="px-2.5 py-1 md:px-4 md:py-1.5 bg-purple-500/20 text-purple-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] rounded-md md:rounded-lg border border-purple-500/20">
                                {job.type}
                            </span>
                        </div>
                        <h2 className="text-xl md:text-4xl font-bold text-white mb-3 md:mb-6 leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            {job.title}
                        </h2>
                        <div className="flex flex-wrap gap-4 md:gap-8">
                            <div className="flex items-center gap-2 text-white/50 text-[9px] md:text-[11px] font-black uppercase tracking-widest">
                                <MapPin size={12} className="text-blue-500" /> {job.location}
                            </div>
                            <div className="flex items-center gap-2 text-white/50 text-[9px] md:text-[11px] font-black uppercase tracking-widest">
                                <Clock size={12} className="text-purple-500" /> Full-Time
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/30 hover:text-white transition-all p-2 hover:bg-white/5 rounded-xl border border-white/5 shrink-0">
                        <X size={18} className="md:w-6 md:h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 md:p-10 overflow-y-auto custom-scrollbar flex-grow space-y-8 md:space-y-12 relative z-10">
                    {/* Description */}
                    <section>
                        <h4 className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> 
                            Role Overview
                        </h4>
                        <p className="text-white/90 text-sm md:text-lg leading-relaxed font-medium break-words whitespace-normal text-justify">
                            {job.description}
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                        {/* Responsibilities */}
                        <section>
                            <h4 className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-purple-400 mb-5 md:mb-8 flex items-center gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> 
                                Key Responsibilities
                            </h4>
                            <div className="space-y-2.5 md:space-y-4">
                                {job.responsibilities?.map((item, idx) => (
                                    <div key={idx} className="flex gap-3 p-3.5 md:p-5 rounded-[1.2rem] md:rounded-[1.5rem] bg-white/[0.03] border border-white/5 group hover:border-purple-500/30 transition-all">
                                        <div className="mt-0.5 shrink-0">
                                            <CheckCircle size={14} className="text-purple-500" />
                                        </div>
                                        <p className="text-[11px] md:text-sm text-white/70 font-semibold leading-relaxed break-words whitespace-normal text-justify">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Requirements */}
                        <section>
                            <h4 className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-blue-400 mb-5 md:mb-8 flex items-center gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> 
                                Requirements
                            </h4>
                            <div className="space-y-2.5 md:space-y-4">
                                {job.requirements?.map((item, idx) => (
                                    <div key={idx} className="flex gap-3 p-3.5 md:p-5 rounded-[1.2rem] md:rounded-[1.5rem] bg-white/[0.03] border border-white/5 group hover:border-blue-500/30 transition-all">
                                        <div className="mt-0.5 shrink-0">
                                            <CheckCircle size={14} className="text-blue-500" />
                                        </div>
                                        <p className="text-[11px] md:text-sm text-white/70 font-semibold leading-relaxed break-words whitespace-normal text-justify">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Culture Tip */}
                    <div className="p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5 flex flex-col sm:flex-row items-center gap-4 md:gap-6 text-center sm:text-left">
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 shrink-0">
                            <Sparkles size={20} className="md:w-8 md:h-8" />
                        </div>
                        <div>
                            <h5 className="text-white text-sm md:text-base font-bold mb-0.5">Why join us?</h5>
                            <p className="text-white/40 text-[10px] md:text-sm leading-relaxed font-semibold">Competitive salaries, remote flexibility, and a high-performance culture.</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-5 md:p-10 border-t border-white/5 bg-white/[0.02] relative z-10 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/20 italic hidden sm:block">Ready to make an impact?</p>
                    <button 
                        onClick={() => {
                            onClose();
                            onApply(job);
                        }}
                        className="w-full md:w-auto px-10 md:px-12 py-4 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-xl md:rounded-2xl uppercase tracking-[0.2em] text-[10px] md:text-[11px] hover:scale-[1.05] active:scale-95 transition-all shadow-2xl shadow-blue-600/40 flex items-center justify-center gap-3"
                    >
                        Apply For This Position <Send size={14} />
                    </button>
                </div>

                <style>{`
                    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 20px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.5); }
                `}</style>
            </motion.div>
        </div>
    );
};

export default ITJobDetailModal;
