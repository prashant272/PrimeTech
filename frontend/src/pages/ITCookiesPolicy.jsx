import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Settings, BarChart, Info, ShieldCheck, CheckCircle } from 'lucide-react';
import ITBackground3D from '../components/it/ITBackground3D';

const ITCookiesPolicy = () => {
    const cookieTypes = [
        {
            icon: <ShieldCheck className="text-emerald-500" />,
            name: "Essential Cookies",
            desc: "These are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services."
        },
        {
            icon: <BarChart className="text-blue-500" />,
            name: "Analytics Cookies",
            desc: "They allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular."
        },
        {
            icon: <Settings className="text-purple-500" />,
            name: "Functional Cookies",
            desc: "These enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages."
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
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-10"
                    >
                        <Cookie size={14} /> Personalization
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Cookies <span className="text-emerald-gradient">Policy</span>
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        We use cookies to tailor your experience. Learn more about how they work and how you can manage them.
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto space-y-16">
                    <section className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-4 mb-8">
                            <Info className="text-emerald-500" size={24} />
                            <h2 className="text-2xl font-bold text-white tracking-tight">What are Cookies?</h2>
                        </div>
                        <p className="text-white/70 text-lg leading-relaxed text-justify break-words">
                            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 gap-8">
                        {cookieTypes.map((type, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-[2rem] bg-white/[0.04] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col md:flex-row gap-8 items-start"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                                    {type.icon}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-white tracking-tight">{type.name}</h3>
                                    <p className="text-white/70 text-base md:text-lg leading-relaxed text-justify">{type.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <section className="p-8 md:p-12 rounded-[2.5rem] bg-emerald-500/[0.03] border border-emerald-500/10">
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                             How to manage cookies?
                        </h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-8 text-justify">
                            Most browsers allow you to refuse to accept cookies and to delete cookies. The methods for doing so vary from browser to browser, and from version to version. You can obtain up-to-date information about blocking and deleting cookies via these links:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['Chrome', 'Firefox', 'Safari', 'Edge'].map(browser => (
                                <div key={browser} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <CheckCircle size={16} className="text-emerald-500" />
                                    <span className="text-white font-medium">{browser} Settings</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ITCookiesPolicy;
