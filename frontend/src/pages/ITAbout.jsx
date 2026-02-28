import React from 'react';
import { Code2, Award, Globe, Users, Cpu, Target } from 'lucide-react';
import SEO from '../components/SEO';

const ITAbout = () => {
    return (
        <div className="min-h-screen pt-24 pb-20 text-white bg-transparent">
            <SEO
                title="About Prime Impact | Leading IT & Software Development Company"
                description="Learn about Prime Impact Solutions. We are a trusted IT company building impactful web, mobile, and AI software for global clients."
                keywords="About Prime Impact, Prime Impact Solutions, Prime Impact IT, Software Company"
            />
            {/* Hero Section */}
            <div className="relative h-[40vh] mb-20 flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1950&q=80')",
                        opacity: 0.3,
                    }}
                ></div>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #070b14, transparent, #070b14)' }}></div>
                <div className="relative z-10 text-center px-6">
                    <span className="text-sm font-bold tracking-[0.2em] uppercase block mb-4" style={{ color: '#60a5fa' }}>
                        Our Story
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-2" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Welcome to{' '}
                        <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                            Prime Impact IT Solutions
                        </span>
                    </h1>
                    <div style={{ width: '6rem', height: '4px', background: 'linear-gradient(to right, transparent, #3b82f6, transparent)', margin: '1.5rem auto 0' }}></div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl">
                {/* Introduction */}
                <section className="text-center mb-24">
                    <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Building Technology That Creates{' '}
                        <span style={{ color: '#60a5fa', fontStyle: 'italic' }}>Impact</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
                        Founded with a passion for cutting-edge technology and modern software engineering,{' '}
                        <strong className="text-white">Prime Impact</strong> is an innovative IT company dedicated to delivering
                        high-quality web applications, mobile apps, cloud infrastructure, and AI solutions. We don't just write code —
                        we engineer business transformation.
                    </p>
                </section>

                {/* What We Offer */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="relative">
                        <div className="absolute -inset-4 rounded-lg transform rotate-3" style={{ border: '1px solid rgba(59,130,246,0.2)' }}></div>
                        <img
                            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
                            alt="Software Development"
                            className="relative rounded-lg shadow-2xl hover:grayscale transition-all duration-500"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#60a5fa' }}>What We Build</h3>
                        <h2 className="text-4xl font-bold mb-8 text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>Beyond Just Code</h2>
                        <ul className="space-y-4">
                            {[
                                'Custom Web Applications & SaaS',
                                'iOS & Android Mobile Apps',
                                'Cloud Infrastructure & DevOps',
                                'AI & Machine Learning Solutions',
                                'UI/UX Design & Branding',
                                'Cybersecurity & Compliance Audits',
                            ].map((item, index) => (
                                <li key={index} className="flex items-center space-x-4 group">
                                    <span className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                                        style={{ background: 'rgba(255,255,255,0.05)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.color = '#000'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#60a5fa'; }}>
                                        <Code2 size={14} />
                                    </span>
                                    <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-gray-400 text-sm italic pl-4" style={{ borderLeft: '2px solid #3b82f6' }}>
                            "Every project is built with clean architecture, scalable design, and a deep understanding of your business goals."
                        </p>
                    </div>
                </section>

                {/* Our Commitment */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#60a5fa' }}>Why Choose Us</h3>
                        <h2 className="text-4xl font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>Our Commitment</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Code2, title: 'Clean Code', desc: 'Maintainable, documented, scalable.' },
                            { icon: Award, title: 'Premium Quality', desc: 'Best-in-class tech stack only.' },
                            { icon: Globe, title: 'Global Standards', desc: 'OWASP, ISO 27001, GDPR ready.' },
                            { icon: Users, title: 'Client-First', desc: 'Your success is our priority.' },
                            { icon: Target, title: 'On-Time Delivery', desc: 'Agile sprints, zero delays.' },
                            { icon: Cpu, title: 'Innovation', desc: 'Latest tech, AI-powered solutions.' },
                        ].map((feature, idx) => (
                            <div key={idx} className="p-6 rounded-lg text-center transition-all hover:-translate-y-2 cursor-default"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                            >
                                <feature.icon className="mx-auto mb-4" size={32} style={{ color: '#60a5fa' }} />
                                <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                                <p className="text-xs text-gray-500">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Vision */}
                <section className="rounded-2xl p-12 text-center relative overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(59,130,246,0.15)' }}>
                    <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(to right, transparent, #3b82f6, transparent)' }}></div>
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-6" style={{ color: '#60a5fa' }}>Our Vision</h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        "To become India's most trusted IT partner — delivering cutting-edge solutions that transform businesses and create lasting value."
                    </h2>
                    <p className="text-lg text-gray-300 font-light">
                        At <strong className="text-white">Prime Impact IT Solutions</strong>, every line of code is crafted with purpose and delivered with pride.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default ITAbout;
