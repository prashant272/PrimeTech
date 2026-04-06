import React, { useState } from 'react';
import { ArrowRight, ExternalLink, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ITContactModal from './ITContactModal';

const services = [
    {
        id: 'web-development',
        emoji: '💻',
        title: 'Web Development',
        subtitle: 'Full Stack · React · Node.js',
        desc: 'High-performance web applications built for speed, security, and scalability. From dynamic SaaS to complex enterprise solutions.',
        tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    },
    {
        id: 'mobile-development',
        emoji: '📱',
        title: 'Mobile App Development',
        subtitle: 'iOS · Android · Cross Platform',
        desc: 'Experience-driven mobile apps with smooth performance and native-like feel using cutting-edge frameworks.',
        tags: ['React Native', 'Flutter', 'Firebase', 'Swift'],
    },
    {
        id: 'cloud-devops',
        emoji: '☁️',
        title: 'Cloud & DevOps',
        subtitle: 'AWS · Azure · CI/CD',
        desc: 'Automated deployment pipelines and cloud infrastructure optimization to ensure your systems are always up and scaling.',
        tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    },
    {
        id: 'ai-ml',
        emoji: '🤖',
        title: 'AI & Machine Learning',
        subtitle: 'Automation · NLP · Analytics',
        desc: 'Intelligent solutions that drive business efficiency through automated decision making and predictive data insights.',
        tags: ['Python', 'OpenAI', 'LangChain', 'FastAPI'],
    },
    {
        id: 'ui-ux-design',
        emoji: '🎨',
        title: 'UI/UX Design',
        subtitle: 'Figma · Prototyping',
        desc: 'Conversion-optimized interfaces that provide intuitive user journeys and strong brand identity across all platforms.',
        tags: ['Figma', 'Prototyping', 'Design System', 'UX'],
    },
    {
        id: 'cybersecurity',
        emoji: '🔐',
        title: 'Cybersecurity & Audit',
        subtitle: 'VAPT · Compliance',
        desc: 'Comprehensive security assessments and continuous monitoring to keep your digital assets safe from evolving threats.',
        tags: ['VAPT', 'Audit', 'SOC 2', 'Pen Testing'],
    },
    {
        id: 'digital-marketing',
        emoji: '📈',
        title: 'Digital Growth & SEO',
        subtitle: 'SEO · Paid Ads · CRO',
        desc: 'Data-driven marketing strategies to increase visibility, traffic, and conversions through technical SEO and high-ROI campaigns.',
        tags: ['SEO', 'Google Ads', 'Meta Ads', 'Analytics'],
    },
    {
        id: 'ecommerce-solutions',
        emoji: '🛒',
        title: 'E-Commerce Solutions',
        subtitle: 'Custom Stores · Marketplaces',
        desc: 'End-to-end e-commerce platforms optimized for sales, performance, and seamless user experience across all devices.',
        tags: ['Shopify', 'WooCommerce', 'Stripe', 'Razorpay'],
    },
    {
        id: 'it-consulting',
        emoji: '🧠',
        title: 'IT Consulting & Strategy',
        subtitle: 'Startup MVP · Architecture',
        desc: 'Technology consulting to help businesses plan, build, and scale digital products efficiently with the right architecture.',
        tags: ['MVP Planning', 'System Design', 'Scalability', 'Tech Roadmap'],
    },
];

const ITServices = () => {
    const [hovered, setHovered] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleGetQuote = (svc) => {
        setModalData({
            category: 'service',
            requirement: `Inquiry for ${svc.title}`,
            serviceType: svc.title.includes('Web') ? 'Web Development' : 
                         svc.title.includes('App') ? 'App Development' :
                         svc.title.includes('Cloud') ? 'Cloud/DevOps' :
                         svc.title.includes('SEO') ? 'SEO/Marketing' : 'Other'
        });
        setIsModalOpen(true);
    };

    return (
        <section id="services" className="py-8 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-blue-400 font-bold tracking-[0.3em] uppercase block mb-4 text-xs">
                        Premier Solutions
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Expert <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>IT Services</span>
                    </h2>
                    <p className="text-white/70 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        We don't just build software; we engineer growth through technical excellence. Explore our core service verticals.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto -mt-10 opacity-30"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((svc, i) => (
                        <div
                            key={i}
                            className="rounded-[2.5rem] p-10 transition-all duration-700 group cursor-default flex flex-col h-full relative overflow-hidden"
                            style={{
                                background: hovered === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                                border: hovered === i ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.1)',
                                transform: hovered === i ? 'translateY(-12px)' : 'translateY(0)',
                                boxShadow: hovered === i ? '0 30px 60px -12px rgba(0,0,0,0.5), 0 10px 30px -10px rgba(59,130,246,0.2)' : 'none'
                            }}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500 origin-left drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">{svc.emoji}</div>

                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                    {svc.title}
                                </h3>

                                <p className="text-xs uppercase tracking-[0.2em] font-black mb-6" style={{ color: '#3b82f6' }}>
                                    {svc.subtitle}
                                </p>

                                <p className="text-white/60 text-[15px] leading-relaxed mb-8 flex-grow group-hover:text-white/90 transition-colors font-medium">
                                    {svc.desc}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-10">
                                    {svc.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest transition-all"
                                            style={{
                                                background: 'rgba(255,255,255,0.03)',
                                                color: 'rgba(255,255,255,0.5)',
                                                border: '1px solid rgba(255,255,255,0.05)'
                                            }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Link
                                        to={`/services/${svc.id}`}
                                        className="flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/10 hover:border-blue-500/30"
                                    >
                                        Learn More <ExternalLink size={14} />
                                    </Link>
                                    <button
                                        onClick={() => handleGetQuote(svc)}
                                        className="flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20"
                                    >
                                        Get Quote <MessageSquare size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Integration */}
            <ITContactModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                initialData={modalData}
            />
        </section>
    );
};

export default ITServices;
