import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Star } from 'lucide-react';

const slides = [
    {
        heading: 'Innovative',
        headingAccent: 'IT Solutions',
        badge: 'Prime Impact',
        tagline: 'Web Development · Mobile Apps · Cloud Services · Digital Transformation',
        cta: { label: '🚀 Get Started', href: '#services' },
        bg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1950&q=80',
    },
    {
        heading: 'Custom',
        headingAccent: 'Web Development',
        badge: 'Full Stack · React · Node.js · Next.js',
        tagline: 'Modern · Scalable · Fast · SEO Optimized · Beautiful Designs That Convert',
        cta: { label: '📱 See Our Work', href: '#services' },
        bg: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1950&q=80',
    },
    {
        heading: 'Mobile App',
        headingAccent: 'Development',
        badge: 'iOS · Android · React Native · Flutter',
        tagline: 'Cross Platform · High Performance · Beautiful UI · App Store Ready',
        cta: { label: '📲 Build Your App', href: '#contact' },
        bg: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1950&q=80',
    },
    {
        heading: 'Cloud &',
        headingAccent: 'DevOps Solutions',
        badge: 'AWS · Azure · Docker · Kubernetes',
        tagline: 'Auto-Scaling · Zero Downtime · CI/CD Pipelines · 99.9% Uptime SLA',
        cta: { label: '☁️ Cloud Setup', href: '#contact' },
        bg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1950&q=80',
    },
    {
        heading: 'AI & Machine',
        headingAccent: 'Learning',
        badge: 'AI Solutions · Automation · NLP · Computer Vision',
        tagline: 'Smart Automation · Data Analytics · AI Chatbots · Predictive Systems',
        cta: { label: '🤖 Explore AI', href: '#services' },
        bg: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1950&q=80',
    },
    {
        heading: 'Cybersecurity',
        headingAccent: '& Compliance',
        badge: 'Security Audits · Penetration Testing · ISO 27001',
        tagline: 'Secure By Design · VAPT · Compliance Ready · Data Protection First',
        cta: { label: '🔐 Secure Now', href: '#contact' },
        bg: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1950&q=80',
    },
];

const services = [
    { label: 'Web Development', emoji: '💻', href: '#services' },
    { label: 'Mobile Apps', emoji: '📱', href: '#services' },
    { label: 'Cloud & DevOps', emoji: '☁️', href: '#services' },
    { label: 'AI Solutions', emoji: '🤖', href: '#services' },
];

const RotatingLogo = () => {
    return (
        <div className="relative w-full h-[250px] md:h-[350px] lg:h-[450px] flex items-center justify-center perspective-[1000px]">
            <style>
                {`
                :root {
                    --cube-size: 140px;
                    --translate-z: 70px;
                    --glow-size: 180px;
                }
                @media (min-width: 768px) {
                    :root {
                        --cube-size: 240px;
                        --translate-z: 120px;
                        --glow-size: 300px;
                    }
                }
                @media (min-width: 1024px) {
                    :root {
                        --cube-size: 350px;
                        --translate-z: 175px;
                        --glow-size: 450px;
                    }
                }

                @keyframes rotate3d {
                    0% { transform: rotateY(0deg) rotateX(0deg); }
                    100% { transform: rotateY(360deg) rotateX(360deg); }
                }
                .cube-container {
                    width: var(--cube-size);
                    height: var(--cube-size);
                    position: relative;
                    transform-style: preserve-3d;
                    animation: rotate3d 10s linear infinite;
                }
                .cube-face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, rgba(7, 11, 20, 0.85) 80%);
                    border: 2px solid rgba(59, 130, 246, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 30px rgba(59, 130, 246, 0.2);
                    backface-visibility: visible;
                    border-radius: 50%; /* Makes the faces circular */
                }
                .face-front  { transform: translateZ(var(--translate-z)); }
                .face-back   { transform: rotateY(180deg) translateZ(var(--translate-z)); }
                .face-right  { transform: rotateY(90deg) translateZ(var(--translate-z)); }
                .face-left   { transform: rotateY(-90deg) translateZ(var(--translate-z)); }
                .face-top    { transform: rotateX(90deg) translateZ(var(--translate-z)); }
                .face-bottom { transform: rotateX(-90deg) translateZ(var(--translate-z)); }
                
                .core-glow {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
                    border-radius: 50%;
                    filter: blur(20px);
                    opacity: 0.8;
                    z-index: 5;
                    animation: core-pulse 2s ease-in-out infinite;
                }
                @keyframes core-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.2); opacity: 0.8; }
                }

                .glow-orb {
                    position: absolute;
                    width: var(--glow-size);
                    height: var(--glow-size);
                    background: radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%);
                    border-radius: 50%;
                    filter: blur(60px);
                    animation: pulse 4s ease-in-out infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; scale: 1; }
                    50% { opacity: 1; scale: 1.1; }
                }
                `}
            </style>

            {/* Background Glow */}
            <div className="glow-orb"></div>

            {/* 3D Rotating Cube */}
            <div className="cube-container">
                {/* Central Core Glow */}
                <div className="core-glow" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>

                <div className="cube-face face-front">
                    <img src="/logo1.png" alt="Logo" className="w-3/4 h-auto opacity-90" />
                </div>
                <div className="cube-face face-back">
                    <img src="/logo1.png" alt="Logo" className="w-3/4 h-auto opacity-90" />
                </div>
                <div className="cube-face face-right">
                    <img src="/logo1.png" alt="Logo" className="w-3/4 h-auto opacity-90" />
                </div>
                <div className="cube-face face-left">
                    <img src="/logo1.png" alt="Logo" className="w-3/4 h-auto opacity-90" />
                </div>
                <div className="cube-face face-top">
                    <img src="/logo1.png" alt="Logo" className="w-3/4 h-auto opacity-90" />
                </div>
                <div className="cube-face face-bottom">
                    <img src="/logo1.png" alt="Logo" className="w-3/4 h-auto opacity-90" />
                </div>
            </div>

            {/* Floating Particles (simplified) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random(),
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

const ITHero = () => {
    const [current, setCurrent] = useState(0);
    const [visible, setVisible] = useState(true);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        const timer = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % slides.length);
                setVisible(true);
            }, 600);
        }, 5000);

        return () => {
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const slide = slides[current];

    return (
        <section className="relative min-h-screen w-full flex items-center overflow-hidden">

            {/* ── Full-Screen Background Slider ── */}
            <div className="absolute inset-0 z-0">
                {slides.map((s, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${index === current ? 'opacity-40' : 'opacity-0'}`}
                    >
                        <img
                            src={s.bg}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover object-center scale-110"
                            style={{ transform: `scale(1.1) translateY(${scrollY * 0.2}px)` }}
                        />
                        <div className="absolute inset-0 bg-black/60 lg:bg-black/50"></div>
                        <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, #070b14 0%, #070b14ab 30%, transparent 60%, #070b14ab 85%, #070b14 100%)' }}></div>
                        <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to bottom, #070b14 0%, transparent 50%, #070b14 100%)' }}></div>
                    </div>
                ))}
            </div>

            {/* animated circuit lines - Parallax enabled */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 transition-transform duration-300"
                style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M0 40 H30 M50 40 H80 M40 0 V30 M40 50 V80" stroke="#3b82f6" strokeWidth="0.5" fill="none" />
                            <circle cx="40" cy="40" r="3" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                            <circle cx="0" cy="40" r="2" fill="#3b82f6" />
                            <circle cx="80" cy="40" r="2" fill="#3b82f6" />
                            <circle cx="40" cy="0" r="2" fill="#3b82f6" />
                            <circle cx="40" cy="80" r="2" fill="#3b82f6" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20 lg:left-auto lg:translate-x-0 lg:bottom-10 lg:right-10">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { setVisible(false); setTimeout(() => { setCurrent(i); setVisible(true); }, 400); }}
                        className={`h-1.5 rounded-full transition-all duration-500`}
                        style={{ width: i === current ? '2.5rem' : '0.5rem', backgroundColor: i === current ? '#3b82f6' : 'rgba(255,255,255,0.3)' }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-12 lg:pt-16 lg:pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                    {/* ─── Left Column ─── */}
                    <div className="lg:col-span-7 text-center lg:text-left relative">
                        {/* Content Glow Backdrop for better text isolation */}
                        <div className="absolute -inset-20 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none z-[-1] hidden lg:block"></div>

                        {/* Badge */}
                        <div
                            className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                            style={{ background: 'rgba(7, 11, 20, 0.4)', border: '1px solid rgba(59,130,246,0.5)' }}
                        >
                            <span className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" style={{ backgroundColor: '#3b82f6' }}></span>
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] drop-shadow-sm" style={{ color: '#60a5fa' }}>
                                {slide.badge}
                            </span>
                        </div>

                        {/* Heading */}
                        <h1
                            className={`text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1] transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{
                                fontFamily: '"Outfit", sans-serif',
                                textShadow: '0 4px 12px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.1)'
                            }}
                        >
                            {slide.heading} <br />
                            <span className="relative inline-block">
                                <span style={{
                                    background: 'linear-gradient(to right, #60a5fa, #a78bfa, #38bdf8)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                                }}>
                                    {slide.headingAccent}
                                </span>
                                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent"></span>
                            </span>
                        </h1>

                        {/* Tagline */}
                        <p
                            className={`text-white text-base md:text-lg mb-8 font-medium tracking-widest uppercase leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
                        >
                            {slide.tagline}
                        </p>

                        {/* Stats strip */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                            <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} style={{ color: '#60a5fa', fill: '#60a5fa' }} />
                                ))}
                                <span className="text-white text-xs font-bold ml-2">5.0 RATING</span>
                            </div>
                            <div className="w-px h-5 bg-white/10 hidden sm:block"></div>
                            <span className="text-white/60 text-xs font-bold tracking-widest uppercase">200+ PROJECTS</span>
                            <div className="w-px h-5 bg-white/10 hidden sm:block"></div>
                            <span className="text-white/60 text-xs font-bold tracking-widest uppercase">50+ CLIENTS</span>
                        </div>

                        {/* CTA buttons */}
                        <div
                            className={`flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        >
                            <a
                                href={slide.cta.href}
                                className="px-8 md:px-12 py-4 md:py-5 font-black uppercase tracking-[0.2em] transition-all transform hover:scale-110 active:scale-95 flex items-center gap-3 shadow-[0_20px_40px_rgba(37,99,235,0.3)] rounded-2xl text-xs md:text-base text-white"
                                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                            >
                                {slide.cta.label}
                            </a>
                            <a
                                href="#contact"
                                className="px-8 md:px-12 py-4 md:py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-xl rounded-2xl text-xs md:text-base"
                            >
                                📞 CONSULTATION
                            </a>
                        </div>
                    </div>

                    {/* ─── Right Column: 360 Rotating Logo ─── */}
                    <div className="lg:col-span-5 mb-12 lg:mb-0 relative flex justify-center lg:justify-center order-first lg:order-last">
                        <RotatingLogo />
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40 hidden lg:flex">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Scroll</span>
                <ChevronDown size={24} className="text-white" />
            </div>
        </section>
    );
};

export default ITHero;
