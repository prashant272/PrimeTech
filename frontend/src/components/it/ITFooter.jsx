import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ITFooter = () => {
    return (
        <footer className="relative text-white pt-10 pb-5 overflow-hidden border-t border-white/5 bg-transparent backdrop-blur-[2px]">
            {/* Dynamic Background Decorations */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"
            ></motion.div>
            <motion.div 
                animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.1, 0.2, 0.1],
                    rotate: [0, -90, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2"
            ></motion.div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="flex flex-col gap-4 group">
                            <div className="relative w-fit">
                                <img src="/logo.png" alt="Prime Impact Logo" className="h-20 w-auto rounded-2xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-3" />
                                <div className="absolute -inset-4 bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full -z-10"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-black tracking-tighter transition-all duration-500 group-hover:tracking-tight" 
                                    style={{ 
                                        fontFamily: '"Outfit", sans-serif',
                                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                        color: 'transparent'
                                    }}>
                                    Prime Impact
                                </span>
                                <span className="text-blue-400 font-bold text-xs uppercase tracking-[0.4em] mt-1 opacity-70">
                                    Solutions
                                </span>
                            </div>
                        </Link>

                        <p className="text-gray-200 text-lg leading-relaxed font-light max-w-sm">
                            Pioneering the future of digital excellence. We build robust, scalable, and innovative solutions for the modern enterprise.
                        </p>

                        <div className="flex gap-4">
                            {[
                                { Icon: Facebook, color: '#1877F2', href: 'https://www.facebook.com/profile.php?id=61586386790496' },
                                { Icon: Instagram, color: '#E4405F', href: 'https://www.instagram.com/primeimpactus/' },
                                { Icon: Phone, color: '#25D366', href: 'https://wa.me/919801017333' },
                                { Icon: Linkedin, color: '#0A66C2', href: 'https://www.linkedin.com/company/prime-impact-it-solutions/' }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-white/[0.03] border border-white/5 hover:border-white/20 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <social.Icon size={20} className="transition-all duration-500 group-hover:scale-110 z-10" style={{ color: social.color }} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:pl-10">
                        <h4 className="text-white font-black uppercase tracking-[0.3em] mb-6 text-sm flex items-center gap-3">
                            <span className="w-10 h-[1px] bg-gradient-to-r from-blue-500 to-transparent"></span>
                            Explore
                        </h4>
                        <ul className="space-y-3">
                            {['Home', 'Services', 'About Us', 'Contact', 'Portfolio', 'Case Studies'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`}
                                        className="text-white hover:text-blue-400 transition-all duration-300 flex items-center group text-[15px] font-bold"
                                    >
                                        <span className="w-0 group-hover:w-6 h-[1px] bg-blue-500 mr-0 group-hover:mr-4 transition-all duration-500"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-1">
                        <h4 className="text-white font-black uppercase tracking-[0.3em] mb-4 text-sm flex items-center gap-3">
                            <span className="w-10 h-[1px] bg-gradient-to-r from-purple-500 to-transparent"></span>
                            Presence
                        </h4>
                        <div className="space-y-4">
                            {/* India Office Card */}
                            <motion.div 
                                whileHover={{ x: 5 }}
                                className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all duration-500 group/card"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                        <MapPin size={14} className="text-blue-400" />
                                    </div>
                                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Delhi, India</h5>
                                </div>
                                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                                    T-1, 3rd Floor HL Plaza, Dwarka Sector 12, New Delhi
                                </p>
                                <div className="flex gap-4 items-center">
                                    <Phone size={14} className="text-blue-400 opacity-60" />
                                    <div className="flex flex-col text-[13px] text-white font-bold">
                                        <span>+91 9319 9319 06</span>
                                        <span>+91 9801 0173 33</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* UAE Office Card */}
                            <motion.div 
                                whileHover={{ x: 5 }}
                                className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all duration-500 group/card"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                        <MapPin size={14} className="text-emerald-400" />
                                    </div>
                                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Ajman, U.A.E.</h5>
                                </div>
                                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                                    Near Lucky Roundabout, 3912, Ajman, U.A.E.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="relative">
                        <h4 className="text-white font-black uppercase tracking-[0.3em] mb-4 text-sm flex items-center gap-3">
                            <span className="w-10 h-[1px] bg-gradient-to-r from-emerald-500 to-transparent"></span>
                            Newsletter
                        </h4>
                        <p className="text-white text-lg mb-4 leading-relaxed font-medium">
                            Join our elite list of 5,000+ tech visionaries.
                        </p>
                        <form className="relative group/form" onSubmit={e => e.preventDefault()}>
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-20 group-focus-within/form:opacity-50 transition-opacity duration-500"></div>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="relative w-full bg-[#0d121f] border border-white/10 rounded-[1.8rem] px-8 py-6 text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-gray-600 pr-20 font-bold text-white"
                            />
                            <button className="absolute right-3 top-3 bottom-3 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 flex items-center justify-center transition-all shadow-xl shadow-blue-900/20 group-hover:scale-105 active:scale-95 text-white">
                                <ArrowRight size={22} strokeWidth={2.5} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-10 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                        <p className="text-white text-[13px] md:text-sm font-bold tracking-tight">
                            © {new Date().getFullYear()} <span className="text-blue-400">Prime Impact Solutions.</span>
                        </p>
                        <div className="flex gap-8 text-[11px] md:text-[12px] font-black text-white uppercase tracking-[0.2em]">
                            <Link to="/privacy" className="hover:text-blue-400 transition-all duration-300 hover:tracking-[0.3em]">Privacy</Link>
                            <Link to="/terms" className="hover:text-purple-400 transition-all duration-300 hover:tracking-[0.3em]">Terms</Link>
                            <Link to="/cookies" className="hover:text-emerald-400 transition-all duration-300 hover:tracking-[0.3em]">Cookies</Link>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6 group">
                        <div className="h-8 w-[1px] bg-white/20 hidden md:block group-hover:bg-blue-500/50 transition-colors duration-500"></div>
                        <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] text-white/40 group-hover:text-blue-400 transition-all duration-700 italic">
                            Designed for Excellence
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ITFooter;
