import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Smartphone, Cloud, MessageSquare, AppWindow } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../api/axios';
import ITContactModal from './ITContactModal';

const ITNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const navRef = useRef(null);
    const location = useLocation();

    // Close dropdown on scroll or click outside
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            // Optional: Close dropdown on scroll if desired
            // setActiveDropdown(null);
        };

        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close all menus when location changes
    useEffect(() => {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
    }, [location]);

    const [dynamicProducts, setDynamicProducts] = useState({
        'Mobility Services': [],
        'Cloud Telephony Services': [],
        'WhatsApp Services': [],
        'Application': []
    });
    const [dynamicVisas, setDynamicVisas] = useState([]);
    const [dynamicJobs, setDynamicJobs] = useState([]);

    useEffect(() => {
        const fetchNavData = async () => {
            try {
                // Fetch Products
                const pRes = await api.get('/content/products');
                if (pRes.data && pRes.data.data) {
                    const grouped = pRes.data.data.reduce((acc, p) => {
                        const cat = p.category || 'Application';
                        if (!acc[cat]) acc[cat] = [];
                        acc[cat].push({ name: p.title, slug: p.slug });
                        return acc;
                    }, {
                        'Mobility Services': [],
                        'Cloud Telephony Services': [],
                        'WhatsApp Services': [],
                        'Application': []
                    });
                    setDynamicProducts(grouped);
                }

                // Fetch Visas
                const vRes = await api.get('/content/visas');
                if (vRes.data && vRes.data.data) {
                    setDynamicVisas(vRes.data.data.map(v => ({ name: v.title, slug: v.slug })));
                }

                // Fetch Jobs
                const jRes = await api.get('/content/jobs');
                if (jRes.data && jRes.data.data) {
                    setDynamicJobs(jRes.data.data.filter(j => j.active).map(j => ({ name: j.title, id: j._id })));
                }
            } catch (err) {
                console.error('Navbar data fetch failed:', err);
            }
        };
        fetchNavData();
    }, []);

    const productCategories = [
        {
            title: 'Mobility Services',
            icon: <Smartphone className="text-blue-400" size={20} />,
            items: dynamicProducts['Mobility Services']
        },
        {
            title: 'Cloud Telephony Services',
            icon: <Cloud className="text-purple-400" size={20} />,
            items: dynamicProducts['Cloud Telephony Services']
        },
        {
            title: 'WhatsApp Services',
            icon: <MessageSquare className="text-green-400" size={20} />,
            items: dynamicProducts['WhatsApp Services']
        },
        {
            title: 'Application',
            icon: <AppWindow className="text-blue-500" size={20} />,
            items: dynamicProducts['Application']
        }
    ];

    const visaCategories = dynamicVisas.length > 0 ? dynamicVisas : [
        { name: 'Australia Visa', slug: 'australia-visa' },
        { name: 'Malaysia Visa', slug: 'malaysia-visa' },
        { name: 'Dubai Visa', slug: 'dubai-visa' },
        { name: 'Schengen Visa', slug: 'schengen-visa' },
        { name: 'Singapore Visa', slug: 'singapore-visa' },
        { name: 'UK Visa', slug: 'uk-visa' },
        { name: 'Vietnam Evisa', slug: 'vietnam-evisa' },
        { name: 'US Visa', slug: 'us-visa' }
    ];

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Services', to: '/services' },
        { label: 'Product', type: 'dropdown' },
        { label: 'Visa', type: 'dropdown' },
        { label: 'Blog', to: '/blog' },
        { label: 'Careers', type: 'dropdown' },
        { label: 'Contact', to: '/contact' },
    ];

    return (
        <nav
            ref={navRef}
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
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <div 
                            key={link.label} 
                            className="relative group/nav-item"
                            onMouseEnter={() => link.type === 'dropdown' && setActiveDropdown(link.label)}
                            onMouseLeave={() => link.type === 'dropdown' && setActiveDropdown(null)}
                        >
                            {link.type === 'dropdown' ? (
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                                    className="text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 relative group/link flex items-center gap-1"
                                    style={{ color: activeDropdown === link.label ? '#60a5fa' : 'rgba(255,255,255,0.7)' }}
                                >
                                    <span>{link.label}</span>
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-blue-500 transition-all duration-300 ${activeDropdown === link.label ? 'w-full' : 'w-0'}`}></span>
                                </button>
                            ) : (
                                <Link to={link.to}
                                    className="text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 relative group/link"
                                    style={{ color: 'rgba(255,255,255,0.7)' }}
                                >
                                    <span className="group-hover/link:text-blue-400 transition-colors uppercase">{link.label}</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover/link:w-full"></span>
                                </Link>
                            )}

                            {/* Mega Menu for Product */}
                            {link.label === 'Product' && activeDropdown === 'Product' && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[900px]">
                                    <div className="p-8 rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative"
                                        style={{ 
                                            background: 'rgba(7,11,20,0.95)', 
                                            backdropFilter: 'blur(20px)',
                                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)'
                                        }}>
                                        {/* Background Glow */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] -z-10"></div>
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[80px] -z-10"></div>

                                        <div className="grid grid-cols-4 gap-8">
                                            {productCategories.map((cat, idx) => (
                                                <div key={idx} className="flex flex-col gap-4">
                                                    <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                                                        {cat.icon}
                                                        <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/90">
                                                            {cat.title}
                                                        </h4>
                                                    </div>
                                                    <ul className="flex flex-col gap-2">
                                                        {cat.items.map((item, i) => (
                                                            <li key={i}>
                                                                <Link 
                                                                    to={`/products/${item.slug}`} 
                                                                    onClick={() => setActiveDropdown(null)}
                                                                    className="text-[13px] text-white hover:text-blue-400 transition-all duration-300 block py-1 font-medium"
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Simple Dropdown for Visa */}
                            {link.label === 'Visa' && activeDropdown === 'Visa' && (
                                <div className="absolute top-full left-0 pt-4 w-64">
                                    <div className="p-4 rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                                        style={{ 
                                            background: 'rgba(7,11,20,0.95)', 
                                            backdropFilter: 'blur(20px)',
                                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)'
                                        }}>
                                        <ul className="flex flex-col gap-1">
                                            {visaCategories.map((visa, i) => (
                                                <li key={i}>
                                                    <Link 
                                                        to={`/visa/${visa.slug}`} 
                                                        onClick={() => setActiveDropdown(null)}
                                                        className="text-[13px] text-white hover:text-blue-400 transition-all duration-300 block py-2 px-3 rounded-lg hover:bg-white/5 font-medium uppercase tracking-wider"
                                                    >
                                                        {visa.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Simple Dropdown for Careers (Jobs) */}
                            {link.label === 'Careers' && activeDropdown === 'Careers' && (
                                <div className="absolute top-full left-0 pt-4 w-64">
                                    <div className="p-4 rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                                        style={{ 
                                            background: 'rgba(7,11,20,0.95)', 
                                            backdropFilter: 'blur(20px)',
                                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)'
                                        }}>
                                        <div className="px-3 pb-2 mb-2 border-b border-white/5">
                                            <Link to="/careers" onClick={() => setActiveDropdown(null)} className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 hover:text-white transition-colors">
                                                View All Openings
                                            </Link>
                                        </div>
                                        <ul className="flex flex-col gap-1 max-h-64 overflow-y-auto custom-scrollbar">
                                            {dynamicJobs.length > 0 ? (
                                                dynamicJobs.map((job, i) => (
                                                    <li key={i}>
                                                        <Link 
                                                            to={`/careers`} 
                                                            onClick={() => setActiveDropdown(null)}
                                                            className="text-[12px] text-white hover:text-blue-400 transition-all duration-300 block py-2 px-3 rounded-lg hover:bg-white/5 font-medium"
                                                        >
                                                            {job.name}
                                                        </Link>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-3 py-2 text-[11px] text-white/40 italic">No active openings</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:block">
                    <button 
                        onClick={() => setIsContactModalOpen(true)}
                        className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', boxShadow: '0 8px 25px -5px rgba(37,99,235,0.4)' }}>
                        Get Free Quote
                    </button>
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
                        <div key={link.label} className="w-full text-center">
                            {link.type === 'dropdown' ? (
                                <div className="flex flex-col items-center">
                                    <button 
                                        onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                                        className="text-base uppercase tracking-[0.2em] font-bold flex items-center gap-2"
                                        style={{ color: 'rgba(255,255,255,0.7)' }}>
                                        {link.label}
                                        <ChevronDown size={18} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                                    </button>
                                    {activeDropdown === link.label && link.label === 'Product' && (
                                        <div className="mt-4 flex flex-col items-center space-y-4 w-full bg-white/5 py-4 rounded-xl">
                                            {productCategories.map((cat, idx) => (
                                                <div key={idx} className="flex flex-col items-center">
                                                    <span className="text-[10px] uppercase tracking-[.2em] text-blue-400 font-black mb-2">{cat.title}</span>
                                                    {cat.items.map((item, i) => (
                                                        <Link key={i} to={`/products/${item.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-white py-1">
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {activeDropdown === link.label && link.label === 'Visa' && (
                                        <div className="mt-4 flex flex-col items-center space-y-2 w-full bg-white/5 py-4 rounded-xl">
                                            {visaCategories.map((visa, i) => (
                                                <Link key={i} to={`/visa/${visa.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-white py-1 uppercase tracking-tight">
                                                    {visa.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                    {activeDropdown === link.label && link.label === 'Careers' && (
                                        <div className="mt-4 flex flex-col items-center space-y-2 w-full bg-white/5 py-4 rounded-xl">
                                            <Link to="/careers" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-2">
                                                All Openings
                                            </Link>
                                            {dynamicJobs.length > 0 ? (
                                                dynamicJobs.map((job, i) => (
                                                    <Link key={i} to={`/careers`} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-white py-1">
                                                        {job.name}
                                                    </Link>
                                                ))
                                            ) : (
                                                <span className="text-xs text-white/20 italic">No openings</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to={link.to}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base uppercase tracking-[0.2em] font-bold"
                                    style={{ color: 'rgba(255,255,255,0.7)' }}>
                                    {link.label}
                                </Link>
                            )}
                        </div>
                    ))}
                    <button 
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsContactModalOpen(true);
                        }}
                        className="px-10 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-white cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                        Get Free Quote
                    </button>
                </div>
            )}

            {/* Global Contact Modal */}
            <ITContactModal 
                isOpen={isContactModalOpen} 
                onClose={() => setIsContactModalOpen(false)} 
            />
        </nav>
    );
};

export default ITNavbar;
