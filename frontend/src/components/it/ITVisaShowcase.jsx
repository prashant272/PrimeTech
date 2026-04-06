import React, { useState } from 'react';
import { ArrowRight, Plane, Globe, ShieldCheck, Clock, CheckCircle2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import ITContactModal from './ITContactModal';

const visas = [
    {
        id: 'uk-visa',
        emoji: '🇬🇧',
        title: 'United Kingdom',
        subtitle: 'Standard Visitor · Study',
        desc: 'Expert guidance for UK standard visitor visas, family visits, and short-term study applications.',
        tags: ['High Success', 'Doc Review', 'Priority'],
        bg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'australia-visa',
        emoji: '🇦🇺',
        title: 'Australia',
        subtitle: 'Subclass 600 · Tourist',
        desc: 'Experience the Land Down Under with our seamless digital visa processing for tourism and business.',
        tags: ['Digital Process', 'E-Visa', 'Fast Track'],
        bg: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'dubai-visa',
        emoji: '🇦🇪',
        title: 'Dubai (UAE)',
        subtitle: '30/60 Days · Express',
        desc: 'Instant Dubai eVisas with minimal documentation. Get approval in as little as 24-48 hours.',
        tags: ['24h Approval', 'No Physical Doc', 'Express'],
        bg: '../dubai.jpg'
    },
    {
        id: 'schengen-visa',
        emoji: '🇪🇺',
        title: 'Schengen Europe',
        subtitle: 'France · Germany · Italy',
        desc: 'Access 29 European countries with a single visa. We help you choose the right embassy for approval.',
        tags: ['Multi-Country', 'Itinerary Prep', 'Expert'],
        bg: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'singapore-visa',
        emoji: '🇸🇬',
        title: 'Singapore',
        subtitle: 'Tourist eVisa · Business',
        desc: 'Authorized processing for Singapore eVisas with detailed guidance on Form 14A and invitations.',
        tags: ['Authorized Agent', 'Multi Entry', '3-5 Days'],
        bg: 'https://images.unsplash.com/photo-1525625239513-94c9475c90f1?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'us-visa',
        emoji: '🇺🇸',
        title: 'United States',
        subtitle: 'B1/B2 · 10 Year Multi',
        desc: 'Meticulous DS-160 filling and interview preparation for a confident face-to-face with the visa officer.',
        tags: ['Interview Prep', 'DS-160 Audit', '10yr Validity'],
        bg: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80'
    }
];

const ITVisaShowcase = () => {
    const [hovered, setHovered] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleApplyClick = (visa) => {
        setModalData({
            category: 'visa',
            visaDestination: visa.title,
            visaPersons: 1,
            requirement: `Visa Inquiry for ${visa.title}`
        });
        setIsModalOpen(true);
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-blue-400 font-bold tracking-[0.3em] uppercase block mb-4 text-xs">
                        Global Mobility
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Trusted <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Visa Assistance</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Navigate complex immigration rules with we ease. We provide expert documentation support for all major travel destinations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {visas.map((visa, i) => (
                        <div
                            key={i}
                            className="group relative h-[450px] rounded-[3rem] overflow-hidden transition-all duration-700 hover:-translate-y-4"
                            style={{
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: hovered === i ? '0 40px 80px -20px rgba(0,0,0,0.8)' : 'none'
                            }}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src={visa.bg} 
                                    alt={visa.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    style={{ filter: 'brightness(0.3) contrast(1.2)' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 origin-left text-glow">
                                    {visa.emoji}
                                </div>
                                
                                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                    {visa.title}
                                </h3>

                                <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
                                    {visa.subtitle}
                                </p>

                                <p className="text-white/70 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 transition-transform">
                                    {visa.desc}
                                </p>

                                <div className="flex items-center justify-between">
                                    <button 
                                        onClick={() => handleApplyClick(visa)}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
                                    >
                                        Apply Now <ArrowRight size={14} />
                                    </button>
                                    
                                    <div className="flex gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                                            <ShieldCheck size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ITContactModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                initialData={modalData}
            />
        </section>
    );
};

export default ITVisaShowcase;
