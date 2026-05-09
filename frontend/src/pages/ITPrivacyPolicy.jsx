import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Server, Globe } from 'lucide-react';
import ITBackground3D from '../components/it/ITBackground3D';

const ITPrivacyPolicy = () => {
    const sections = [
        {
            icon: <Shield className="text-blue-500" />,
            title: "Introduction",
            content: "At Prime Impact Solutions, we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our IT services."
        },
        {
            icon: <Eye className="text-purple-500" />,
            title: "Data Collection",
            content: "We collect information that you provide directly to us, such as when you fill out a contact form, apply for a job, or subscribe to our newsletter. This may include your name, email address, phone number, and professional background."
        },
        {
            icon: <Lock className="text-emerald-500" />,
            title: "How We Use Your Data",
            content: "Your data is used to provide and improve our services, communicate with you about projects, and ensure a personalized experience on our platform. We never sell your personal information to third parties."
        },
        {
            icon: <Server className="text-orange-500" />,
            title: "Data Security",
            content: "We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. Our servers are secured with advanced encryption and monitoring systems."
        },
        {
            icon: <Globe className="text-cyan-500" />,
            title: "Cookies & Tracking",
            content: "We use cookies to analyze website traffic and optimize your browsing experience. You can control cookie settings through your browser, though some features of our site may be affected."
        },
        {
            icon: <FileText className="text-pink-500" />,
            title: "Your Rights",
            content: "You have the right to access, correct, or delete your personal data. If you have any questions or requests regarding your information, please contact our data protection officer at privacy@primeimpact.in."
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
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-10"
                    >
                        <Shield size={14} /> Security & Trust
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Privacy <span className="text-blue-gradient">Policy</span>
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Transparency is at the heart of our operations. Learn how we handle your digital footprint with care.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="max-w-4xl mx-auto space-y-12">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 md:p-10 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all group"
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                                    {section.icon}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                        {section.title}
                                    </h3>
                                    <p className="text-white/70 text-lg leading-relaxed text-justify break-words whitespace-normal">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Last Update */}
                <div className="mt-20 text-center">
                    <p className="text-white/20 text-sm font-black uppercase tracking-[0.3em]">
                        Last Updated: May 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ITPrivacyPolicy;
