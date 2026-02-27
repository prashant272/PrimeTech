import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ITNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Services', to: '/services' },
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500`}
            style={{
                padding: isScrolled ? '0.6rem 0' : '1rem 0',
                background: isScrolled ? 'rgba(7,11,20,0.85)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(16px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none'
            }}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <span className="text-2xl font-bold tracking-wider"
                        style={{ fontFamily: '"Outfit", sans-serif', background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                        Prime Impact IT Solutions
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map(link => (
                        <Link key={link.label} to={link.to}
                            className="text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 relative group/link"
                            style={{ color: 'rgba(255,255,255,0.7)' }}
                        >
                            <span className="group-hover/link:text-blue-400 transition-colors">{link.label}</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover/link:w-full"></span>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:block">
                    <Link to="/contact"
                        className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-105 active:scale-95"
                        style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', boxShadow: '0 8px 25px -5px rgba(37,99,235,0.4)' }}>
                        Get Free Quote
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg bg-white/5" style={{ color: '#60a5fa' }}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full py-8 flex flex-col items-center space-y-6"
                    style={{ background: 'rgba(7,11,20,0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    {navLinks.map(link => (
                        <Link key={link.label} to={link.to}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-base uppercase tracking-[0.2em] font-bold"
                            style={{ color: 'rgba(255,255,255,0.7)' }}>
                            {link.label}
                        </Link>
                    ))}
                    <Link to="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-10 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-white"
                        style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                        Get Free Quote
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default ITNavbar;
