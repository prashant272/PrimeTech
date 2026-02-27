import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Zap, Target, Shield, Layout, Settings, LineChart, ShoppingCart, Brain } from 'lucide-react';

const serviceData = {
    'web-development': {
        title: 'Web Development',
        icon: Layout,
        heroDesc: 'Engineered for Performance. Built for Growth.',
        fullDesc: 'We build enterprise-grade web applications that combine stunning aesthetics with robust backend systems. Our approach focuses on scalability, security, and exceptional user experience.',
        process: [
            { title: 'Discovery', desc: 'Analyzing your vision and technical requirements.' },
            { title: 'Architecture', desc: 'Designing the blueprint for a scalable infrastructure.' },
            { title: 'Agile Dev', desc: 'Sprint-based development with continuous feedback.' },
            { title: 'Deployment', desc: 'Secure launch with performance monitoring.' }
        ],
        impact: [
            'Up to 300% faster load times',
            'Cross-browser and device compatibility',
            'Seamless API and third-party integrations',
            'Future-proof technology stack'
        ]
    },
    'mobile-development': {
        title: 'Mobile App Development',
        icon: Zap,
        heroDesc: 'Your business in their hands.',
        fullDesc: 'From native iOS and Android apps to cross-platform solutions, we create mobile experiences that keep users engaged and deliver real business value.',
        process: [
            { title: 'User Research', desc: 'Understanding mobile user behaviors and needs.' },
            { title: 'Prototyping', desc: 'Interactive wireframes for intuitive navigation.' },
            { title: 'Cross-Plat Dev', desc: 'Single codebase for iOS & Android without compromise.' },
            { title: 'App Store Launch', desc: 'Ensuring your app meets all store guidelines.' }
        ],
        impact: [
            'Intuitive touch-first interfaces',
            'High-conversion mobile checkout flows',
            'Offline capabilities and push notifications',
            'Optimized device battery usage'
        ]
    },
    'cloud-devops': {
        title: 'Cloud & DevOps',
        icon: Settings,
        heroDesc: 'Scale infinitely. Deploy confidently.',
        fullDesc: 'We help you migrate to the cloud and automate your deployment cycles. Our DevOps experts ensure your infrastructure is secure, redundant, and cost-effective.',
        process: [
            { title: 'Cloud Audit', desc: 'Analyzing your current infrastructure and costs.' },
            { title: 'Automation', desc: 'Setting up CI/CD pipelines for rapid delivery.' },
            { title: 'Monitoring', desc: 'Real-time observability and auto-scaling.' },
            { title: 'Security Hardening', desc: 'Zero-trust architecture for total protection.' }
        ],
        impact: [
            'Zero-downtime deployment cycles',
            '99.99% infrastructure uptime',
            'Significantly reduced hosting costs',
            'Automated security compliance'
        ]
    },
    'ai-ml': {
        title: 'AI & Machine Learning',
        icon: Target,
        heroDesc: 'Intelligence that drives innovation.',
        fullDesc: 'Harness the power of AI to automate complex processes and gain predictive insights. We integrate LLMs and ML models into your existing systems.',
        process: [
            { title: 'Data Analysis', desc: 'Identifying opportunities for automation.' },
            { title: 'Model Selection', desc: 'Choosing the right AI architecture for your goal.' },
            { title: 'Integration', desc: 'Connecting AI modules to your core application.' },
            { title: 'Continuous Learning', desc: 'Fine-tuning models for maximum accuracy.' }
        ],
        impact: [
            'Automated customer support streams',
            'Data-driven predictive analytics',
            'Personalized user experiences',
            'Significant operational cost savings'
        ]
    },
    'ui-ux-design': {
        title: 'UI/UX Design',
        icon: Layout,
        heroDesc: 'Design with purpose. Impact by default.',
        fullDesc: 'We combine psychology with aesthetics to create interfaces that don\'t just look good but perform exceptionally well. Every pixel serves a business goal.',
        process: [
            { title: 'UX Research', desc: 'Mapping user journeys and identifying friction.' },
            { title: 'Wireframing', desc: 'Focusing on structure and information hierarchy.' },
            { title: 'Visual Design', desc: 'Creating a high-end, cohesive brand identity.' },
            { title: 'Testing', desc: 'Iterating based on real user feedback loop.' }
        ],
        impact: [
            'Higher user retention rates',
            'Reduced bounce rates and friction',
            'Stronger brand trust and authority',
            'Responsive design for all viewports'
        ]
    },
    'cybersecurity': {
        title: 'Cybersecurity & Audit',
        icon: Shield,
        heroDesc: 'Uncompromising security for your digital assets.',
        fullDesc: 'We proactively identify vulnerabilities and implement defense-in-depth strategies to protect your business from sophisticated cyber threats.',
        process: [
            { title: 'Risk Audit', desc: 'Comprehensive scan for potential entry points.' },
            { title: 'Pen Testing', desc: 'Simulated attacks to test defense strength.' },
            { title: 'Remediation', desc: 'Fixing vulnerabilities and patching systems.' },
            { title: 'Compliance', desc: 'Ensuring SOC 2, HIPAA, or ISO alignment.' }
        ],
        impact: [
            'Proactive threat detection',
            'Full regulatory compliance',
            'Customer data protection',
            'Resilient software supply chains'
        ]
    },
    'digital-marketing': {
        title: 'Digital Growth & SEO',
        icon: LineChart,
        heroDesc: 'Dominate the search result. Scale your reach.',
        fullDesc: 'We specialize in data-driven marketing strategies that increase visibility and drive conversions. From technical SEO audits to high-ROI paid campaigns, we ensure your brand gets noticed by the right audience.',
        process: [
            { title: 'SEO Audit', desc: 'Analyzing technical and content-based growth barriers.' },
            { title: 'Strategy', desc: 'Developing a multi-channel roadmap for visibility.' },
            { title: 'Campaign Op', desc: 'Managing and optimizing paid ads for maximum ROI.' },
            { title: 'Analytics', desc: 'Continuous tracking and iteration based on data.' }
        ],
        impact: [
            'Significant organic traffic growth',
            'Lower cost-per-acquisition (CPA)',
            'Improved search engine rankings',
            'Higher conversion rate optimization'
        ]
    },
    'ecommerce-solutions': {
        title: 'E-Commerce Solutions',
        icon: ShoppingCart,
        heroDesc: 'Selling made simple, secure, and scalable.',
        fullDesc: 'We build high-converting e-commerce platforms that offer seamless shopping experiences. Whether it\'s a custom-built marketplace or a Shopify store, we focus on performance and conversion.',
        process: [
            { title: 'Store Design', desc: 'Creating intuitive shopping journeys and checkouts.' },
            { title: 'Platform Build', desc: 'Developing robust, secure e-commerce systems.' },
            { title: 'Integrations', desc: 'Connecting payments, 3PL, and CRM systems.' },
            { title: 'Beta Testing', desc: 'Rigorous testing of the entire buying flow.' }
        ],
        impact: [
            'Optimized checkout conversion rates',
            'Mobile-first shopping experiences',
            'Secure and multi-currency payments',
            'Scalable inventory management'
        ]
    },
    'it-consulting': {
        title: 'IT Consulting & Strategy',
        icon: Brain,
        heroDesc: 'Strategic clarity for complex technical challenges.',
        fullDesc: 'We provide expert guidance on digital transformation, MVP planning, and long-term tech roadmaps. We help you choose the right architecture to scale your business effectively.',
        process: [
            { title: 'MVP Scoping', desc: 'Defining the core features for rapid market entry.' },
            { title: 'System Design', desc: 'Architecting for high availability and scale.' },
            { title: 'Tech Review', desc: 'Evaluating existing stacks for modernization.' },
            { title: 'Roadmap', desc: 'Strategic planning for long-term technical growth.' }
        ],
        impact: [
            'Clear technical growth roadmap',
            'Risk-mitigated infrastructure planning',
            'Optimized development budget',
            'Scalable system architecture'
        ]
    }
};

const ITServiceDetail = () => {
    const { serviceId } = useParams();
    const service = serviceData[serviceId];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [serviceId]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#070b14] text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                    <Link to="/services" className="text-blue-400 hover:text-blue-300">Back to Services</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent text-white pt-32 pb-20 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full"></div>
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Back Button */}
                <Link to="/services" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 uppercase tracking-widest text-xs font-bold">
                    <ArrowLeft size={16} /> Back to Services
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <div>
                        <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Service vertical</span>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            {service.title}
                        </h1>
                        <p className="text-2xl text-blue-400/80 font-medium mb-10 leading-relaxed">
                            {service.heroDesc}
                        </p>
                        <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-xl">
                            {service.fullDesc}
                        </p>
                        <div className="flex gap-6">
                            <Link to="/contact" className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-900/20 active:scale-95">
                                Start Project
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 backdrop-blur-3xl flex items-center justify-center p-20 shadow-2xl relative overflow-hidden group">
                            {/* Decorative rings */}
                            <div className="absolute inset-0 border border-white/5 rounded-full scale-150 group-hover:scale-125 transition-transform duration-1000"></div>
                            <div className="absolute inset-0 border border-white/5 rounded-full scale-125 group-hover:scale-100 transition-transform duration-1000 delay-100"></div>

                            <service.icon size={180} className="text-blue-400 drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]" />
                        </div>
                    </div>
                </div>

                {/* Process Section */}
                <div className="mb-32">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black mb-6" style={{ fontFamily: '"Outfit", sans-serif' }}>Our Design & Engineering Approach</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto opacity-30"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {service.process.map((p, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all duration-500 group">
                                <div className="text-4xl font-black text-white/5 mb-6 group-hover:text-blue-500/10 transition-colors">0{idx + 1}</div>
                                <h3 className="text-xl font-bold text-white mb-4">{p.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Impact / Deliverables */}
                <div className="bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent rounded-[3rem] p-12 md:p-20 border border-white/10 relative overflow-hidden group">
                    {/* Floating particles background mockup */}
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-black text-white mb-8" style={{ fontFamily: '"Outfit", sans-serif' }}>Key Impact & Outcome</h2>
                            <p className="text-white/60 text-lg mb-10 leading-relaxed font-light">
                                Every service we deliver is measured by its impact on your bottom line and technical resilience.
                            </p>
                            <div className="space-y-6">
                                {service.impact.map((point, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <CheckCircle2 className="text-blue-400 shrink-0" size={24} />
                                        <span className="text-white font-medium text-lg">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-10 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.1)] transition-all duration-700">
                            <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">Technical Excellence</h3>
                            <p className="text-white/50 leading-relaxed mb-8">
                                Our commitment to engineering precision ensures that your {service.title.toLowerCase()} project is not just completed, but perfected for long-term operational success.
                            </p>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 w-[95%]"></div>
                            </div>
                            <div className="mt-4 flex justify-between text-xs font-bold uppercase tracking-widest text-blue-400">
                                <span>Reliability</span>
                                <span>95%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-32 text-center border-t border-white/5 pt-20">
                    <p className="text-white/40 mb-8 uppercase tracking-[0.3em] font-bold text-xs">Ready to innovate?</p>
                    <Link to="/contact" className="text-4xl md:text-6xl font-black text-white hover:text-blue-400 transition-colors tracking-tighter" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Let's build something <span className="underline decoration-blue-600/50 underline-offset-8">extraordinary</span> together.
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ITServiceDetail;
