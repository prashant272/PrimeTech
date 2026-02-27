import React from 'react';
import { Zap, Shield, Code2, Smartphone, Cloud, Bot } from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: 'Blazing Fast Delivery',
        desc: 'We deliver production-ready software on time, every time. Agile sprints, CI/CD pipelines, and zero compromise on quality.',
    },
    {
        icon: Code2,
        title: 'Clean, Scalable Code',
        desc: 'Our engineers write maintainable, well-documented code. Your product grows with your business — no rewrites needed.',
    },
    {
        icon: Shield,
        title: 'Security First',
        desc: 'Every project is audited for vulnerabilities. OWASP standards, secure auth, and data encryption built in from day one.',
    },
    {
        icon: Smartphone,
        title: 'Mobile Optimized',
        desc: 'Responsive designs and native-quality mobile apps. Your product looks stunning on every device, every screen size.',
    },
    {
        icon: Cloud,
        title: 'Cloud Native',
        desc: 'AWS, Azure, GCP — we architect for the cloud. Auto-scaling, serverless, containers, and 99.9% uptime SLAs.',
    },
    {
        icon: Bot,
        title: 'AI-Powered Features',
        desc: 'Embed intelligence into your product. Chatbots, recommendation engines, predictive analytics, and NLP — all within reach.',
    },
];

const ITFeatures = () => {
    return (
        <section className="py-20 relative">
            <div className="absolute inset-0" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')", opacity: 0.03 }}></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-sm font-bold tracking-[0.2em] uppercase block mb-2" style={{ color: '#3b82f6' }}>
                        Why Choose Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Why Choose{' '}
                        <span className="text-blue-gradient">
                            Prime Impact IT Solutions?
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto opacity-50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="p-10 rounded-[2rem] bg-white/5 border border-white/10 transition-all duration-500 group hover:-translate-y-2 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 cursor-default relative overflow-hidden"
                        >
                            {/* Inner glow effect */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="w-16 h-16 mx-auto mb-8 rounded-2xl flex items-center justify-center transition-all duration-500 bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-lg relative z-10">
                                <f.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 text-center relative z-10" style={{ fontFamily: '"Outfit", sans-serif' }}>{f.title}</h3>
                            <p className="text-gray-300 text-[15px] leading-relaxed text-center relative z-10 font-medium opacity-80 group-hover:opacity-100 transition-opacity">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ITFeatures;
