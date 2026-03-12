import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { productData } from '../api/productData';
import { motion } from 'framer-motion';

const ITProductDetail = () => {
    const { productId } = useParams();
    const product = productData[productId];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#070b14] text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                    <Link to="/" className="text-blue-400 hover:text-blue-300">Back to Home</Link>
                </div>
            </div>
        );
    }

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const staggerContainer = {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { staggerChildren: 0.1 }
    };

    return (
        <div className="min-h-screen bg-transparent text-white pt-32 pb-20 overflow-hidden relative">
            <SEO
                title={`${product.title} | Prime Impact Solutions`}
                description={product.fullDesc}
                keywords={`${product.title}, Bulk SMS, WhatsApp Business, Cloud Telephony, IT Solutions`}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Back Button */}
                <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 uppercase tracking-widest text-xs font-bold">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-blue-400 font-bold tracking-[0.4em] uppercase text-xs mb-6 block border-l-2 border-blue-600 pl-4">Product Innovation</span>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            {product.title}
                        </h1>
                        <p className="text-2xl text-blue-400/80 font-medium mb-10 leading-relaxed max-w-xl">
                            {product.heroDesc}
                        </p>
                        <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-xl font-light">
                            {product.fullDesc}
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <Link to="/contact" className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_15px_35px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_45px_-10px_rgba(37,99,235,0.6)] active:scale-95 group">
                                Start Free Trial <ChevronRight className="inline ml-1 group-hover:translate-x-1 transition-transform" size={18} />
                            </Link>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-[4rem] bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent border border-white/5 backdrop-blur-3xl flex items-center justify-center p-16 shadow-2xl relative overflow-hidden group">
                            {/* Animated Background Rings */}
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-white/5 rounded-full scale-150"
                            ></motion.div>
                            <motion.div 
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-white/5 rounded-full scale-125"
                            ></motion.div>

                            <product.icon size={220} className="text-blue-400 drop-shadow-[0_0_60px_rgba(59,130,246,0.4)] relative z-10" />
                            
                            {/* Glossy Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
                        </div>
                        {/* Status Float Card Example */}
                        <motion.div 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 p-6 rounded-2xl bg-[#0d1117]/90 border border-white/10 backdrop-blur-xl shadow-2xl"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-sm font-bold tracking-widest uppercase">System Secure</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* What is Section */}
                <motion.div 
                    {...fadeInUp}
                    className="mb-40"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-4">
                            <h2 className="text-4xl font-black leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                What is <br />
                                <span className="text-blue-400">{product.title}?</span>
                            </h2>
                            <div className="w-20 h-1.5 bg-blue-600 mt-6 rounded-full"></div>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light">
                                {product.detailedInfo.split('\n\n').map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Service Features Grid */}
                <div className="mb-40">
                    <motion.div {...fadeInUp} className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: '"Outfit", sans-serif' }}>Our Service Features</h2>
                        <p className="text-white/50 max-w-2xl mx-auto">Discover the powerful technical capabilities that make our {product.title} unmatched in the industry.</p>
                    </motion.div>
                    <motion.div 
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {product.features.map((feat, idx) => (
                            <motion.div 
                                key={idx}
                                variants={fadeInUp}
                                className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 group flex flex-col items-center text-center hover:bg-white/[0.04] hover:-translate-y-2 cursor-pointer"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                    <feat.icon size={40} className="text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors uppercase tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>{feat.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed font-medium">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Why Choose Us Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
                    <motion.div 
                         initial={{ opacity: 0, x: -50 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.8 }}
                         className="relative"
                    >
                        <div className="p-12 rounded-[3.5rem] bg-gradient-to-br from-blue-600/10 to-purple-600/5 border border-white/10 shadow-3xl">
                             <h2 className="text-4xl font-black mb-12 leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                Why Choose <span className="text-blue-gradient">Prime Impact</span> <br /> 
                                for {product.title}?
                             </h2>
                             <div className="space-y-6">
                                {product.whyChooseUs.map((point, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * idx }}
                                        className="flex items-start gap-5 group"
                                    >
                                        <div className="mt-1 w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-600/40 transition-colors">
                                            <CheckCircle2 className="text-blue-400" size={14} />
                                        </div>
                                        <p className="text-white/70 font-medium leading-relaxed group-hover:text-white transition-colors">
                                            {point}
                                        </p>
                                    </motion.div>
                                ))}
                             </div>
                        </div>
                        {/* Decorative background circle */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/10 blur-[60px] rounded-full -z-10 animate-pulse"></div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="relative inline-block">
                             {/* Large Illustration Placeholder Icon */}
                             <div className="text-[200px] text-blue-400/10 drop-shadow-2xl opacity-20 transform -rotate-12">
                                <product.icon />
                             </div>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                                <div className="text-9xl font-black text-white/5 select-none" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                   QUALITY
                                </div>
                             </div>
                        </div>
                    </motion.div>
                </div>

                {/* Process Section (Smaller) */}
                <div className="mb-40 border-t border-white/5 pt-32">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-8">
                        <div>
                            <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Approach</span>
                            <h2 className="text-4xl font-black" style={{ fontFamily: '"Outfit", sans-serif' }}>Implementation Process</h2>
                        </div>
                        <p className="text-white/50 max-w-md">Our streamlined 4-step engineering process ensures a successful and secure deployment for every project.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {product.process.map((p, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx }}
                                className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col gap-6"
                            >
                                <div className="text-6xl font-black text-white/5">0{idx + 1}</div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                                    <p className="text-white/40 text-xs uppercase font-black tracking-widest leading-loose">{p.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Final CTA Bar */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.03] backdrop-blur-3xl rounded-[3.5rem] p-16 md:p-24 border border-white/10 relative overflow-hidden text-center shadow-2xl"
                >
                    {/* Background Noise/Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-50"></div>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            Ready to transform your <br />
                            <span className="text-blue-400">business communication?</span>
                        </h2>
                        <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto font-medium">
                            Join thousands of forward-thinking companies already building the future with Prime Impact IT Solutions.
                        </p>
                        <Link to="/contact" className="inline-block px-14 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/20">
                            Request a Demo
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ITProductDetail;
