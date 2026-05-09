import React from 'react';
import { motion } from 'framer-motion';
import { Scale, CheckCircle, AlertCircle, FileText, Globe, Zap } from 'lucide-react';
import ITBackground3D from '../components/it/ITBackground3D';

const ITTermsConditions = () => {
    const terms = [
        {
            icon: <Zap className="text-yellow-500" />,
            title: "Acceptance of Terms",
            content: "By accessing and using the services provided by Prime Impact Solutions, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please refrain from using our platform."
        },
        {
            icon: <Scale className="text-blue-500" />,
            title: "Service Delivery",
            content: "We strive to deliver high-quality IT solutions. However, project timelines and deliverables are subject to the specific Master Service Agreement (MSA) signed between Prime Impact Solutions and the client."
        },
        {
            icon: <CheckCircle className="text-emerald-500" />,
            title: "Intellectual Property",
            content: "All code, designs, and content created during the course of a project remain the property of Prime Impact Solutions until full payment is received, after which ownership is transferred as per the agreement."
        },
        {
            icon: <AlertCircle className="text-red-500" />,
            title: "Liability Limitation",
            content: "Prime Impact Solutions shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our digital products or services."
        },
        {
            icon: <FileText className="text-purple-500" />,
            title: "User Conduct",
            content: "Users agree not to use our website or services for any unlawful purpose or to transmit any harmful code (viruses, malware) that could compromise our infrastructure."
        },
        {
            icon: <Globe className="text-cyan-500" />,
            title: "Governing Law",
            content: "These terms are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in New Delhi."
        }
    ];

    return (
        <div className="min-h-screen bg-[#070b14] pt-32 pb-20 overflow-hidden relative">
            <ITBackground3D />
            
            <div className="container mx-auto px-6 relative z-10">
                {/* Hero */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-10"
                    >
                        <Scale size={14} /> Legal Framework
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Terms & <span className="text-purple-gradient">Conditions</span>
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        The legal foundation of our partnership. Professional, clear, and transparent.
                    </p>
                </div>

                {/* Terms Grid */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {terms.map((term, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all group flex flex-col h-full"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 shrink-0 group-hover:rotate-12 transition-transform">
                                {term.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                {term.title}
                            </h3>
                            <p className="text-white/70 text-sm md:text-base leading-relaxed text-justify break-words whitespace-normal flex-grow">
                                {term.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Disclaimer */}
                <div className="mt-20 p-8 rounded-[2rem] bg-gradient-to-r from-blue-600/5 to-purple-600/5 border border-white/5 max-w-3xl mx-auto text-center">
                    <p className="text-white/40 text-xs md:text-sm font-medium leading-relaxed">
                        Note: These terms are subject to change without prior notice. We encourage you to review this page periodically for updates.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ITTermsConditions;
