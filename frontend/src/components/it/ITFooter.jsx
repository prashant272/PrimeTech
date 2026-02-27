import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ITFooter = () => {
    return (
        <footer className="relative text-white pt-24 pb-12 overflow-hidden border-t border-white/5 bg-transparent backdrop-blur-[2px]">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center gap-4 group">
                            <div className="relative">
                                <img src="/logo.png" alt="Prime Impact IT Solutions" className="h-16 w-auto rounded-xl transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute -inset-2 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tighter text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                    Prime Impact IT Solutions
                                </span>
                            </div>
                        </Link>

                        <p className="text-gray-400 text-lg leading-relaxed font-light">
                            Pioneering the future of digital excellence. We build robust, scalable, and innovative solutions for the modern enterprise.
                        </p>

                        <div className="flex gap-4">
                            {[
                                { Icon: Facebook, color: '#1877F2', href: '#' },
                                { Icon: Instagram, color: '#E4405F', href: '#' },
                                { Icon: Twitter, color: '#1DA1F2', href: '#' },
                                { Icon: Linkedin, color: '#0A66C2', href: '#' }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ scale: 1.15, y: -5 }}
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-white/[0.03] border border-white/5 hover:border-white/20 group relative"
                                >
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-opacity" style={{ backgroundColor: social.color }}></div>
                                    <social.Icon size={20} className="transition-colors group-hover:text-white" style={{ color: social.color }} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:pl-10">
                        <h4 className="text-white font-black uppercase tracking-[0.2em] mb-10 text-sm flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-blue-500 rounded-full"></span>
                            Navigation
                        </h4>
                        <ul className="space-y-4">
                            {['Home', 'Services', 'About Us', 'Contact', 'Portfolio', 'Case Studies'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`}
                                        className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center group text-[15px] font-medium"
                                    >
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-blue-400 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] mb-10 text-sm flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-purple-500 rounded-full"></span>
                            Get in Touch
                        </h4>
                        <ul className="space-y-8">
                            <li className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-blue-500/20">
                                    <MapPin size={18} className="text-blue-400" />
                                </div>
                                <span className="text-gray-400 text-[15px] leading-relaxed">
                                    T-1, 3rd Floor, Ruff Toff,<br />New Delhi, India
                                </span>
                            </li>
                            <li className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-purple-500/20">
                                    <Phone size={18} className="text-purple-400" />
                                </div>
                                <span className="text-gray-400 text-[15px] font-medium group-hover:text-white transition-colors">
                                    +91 9319 9319 06
                                </span>
                            </li>
                            <li className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-emerald-500/20">
                                    <Mail size={18} className="text-emerald-400" />
                                </div>
                                <span className="text-gray-400 text-[15px] font-medium group-hover:text-white transition-colors">
                                    hello@primeimpact.in
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-full"></div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] mb-10 text-sm flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-white rounded-full"></span>
                            Newsletter
                        </h4>
                        <p className="text-gray-400 text-[15px] mb-8 leading-relaxed font-light">
                            Join 5,000+ tech leaders and get the latest insights delivered weekly.
                        </p>
                        <form className="relative group" onSubmit={e => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600 pr-16"
                            />
                            <button className="absolute right-2 top-2 bottom-2 w-12 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-all shadow-lg shadow-blue-900/40 group-hover:scale-105 active:scale-95">
                                <ArrowRight size={20} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-gray-500 text-sm font-medium">
                        © {new Date().getFullYear()} Prime Impact IT Solutions. All rights reserved.
                    </p>
                    <div className="flex gap-10 text-sm font-bold text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ITFooter;
