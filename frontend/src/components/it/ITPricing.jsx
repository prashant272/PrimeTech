import React from 'react';
import { Check, ArrowRight, Star } from 'lucide-react';

const ITPricing = () => {
    const plans = [
        {
            name: "Starter",
            price: "Custom",
            description: "Perfect for startups and simple landing pages seeking a professional edge.",
            features: [
                "Basic Website",
                "Mobile Responsive Design",
                "SEO Optimized Structure",
                "3 Months Basic Support",
                "Domain & Hosting Setup"
            ],
            cta: "Get Started",
            popular: false
        },
        {
            name: "Growth",
            price: "Custom",
            description: "Ideal for growing businesses needing dynamic, high-performance apps.",
            features: [
                "Multi-page Web Applications",
                "Custom Dashboard & CRM",
                "API Integrations",
                "Advanced SEO & Analytics",
                "6 Months Dedicated Support",
                "Performance Optimization"
            ],
            cta: "Scale Now",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Scaling high-demand enterprise applications with robust architecture.",
            features: [
                "Full-stack Custom Platforms",
                "Mobile App (iOS & Android)",
                "AI/ML Implementation",
                "24/7 Priority Support",
                "Infrastructure Automation",
                "Security & Load Audits"
            ],
            cta: "Contact Us",
            popular: false
        }
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Pricing Plans</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mt-4 mb-8 leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Flexible <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Solutions</span> for Every Stage
                    </h2>
                    <p className="text-white/60 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                        Precision engineering tailored to your vision. We provide scalable pricing models designed for impact and sustained growth.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-8 opacity-30"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`p-10 rounded-[2.5rem] transition-all duration-700 relative overflow-hidden group 
                                ${plan.popular
                                    ? 'bg-white/[0.03] border-2 border-blue-500/40 scale-105 z-10 shadow-[0_0_50px_rgba(59,130,246,0.15)]'
                                    : 'bg-white/[0.02] border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.04]'
                                }`}
                        >
                            {/* Inner glow effect on hover */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {plan.popular && (
                                <div className="absolute top-0 right-0 py-2 px-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rotate-45 transform translate-x-12 translate-y-6 flex items-center gap-2 shadow-2xl">
                                    <Star size={10} fill="currentColor" /> Popular
                                </div>
                            )}

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white/70 mb-2 uppercase tracking-widest">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-5xl font-black text-white">{plan.price}</span>
                                </div>

                                <p className="text-white/50 text-sm mb-10 leading-relaxed min-h-[3rem] font-medium">
                                    {plan.description}
                                </p>

                                <div className="space-y-5 mb-12">
                                    {plan.features.map((feat, j) => (
                                        <div key={j} className="flex items-start gap-4 group/item">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors duration-300">
                                                <Check size={12} className={plan.popular ? 'text-blue-400 group-hover/item:text-white' : 'text-blue-500 group-hover/item:text-white'} />
                                            </div>
                                            <span className="text-[15px] text-white/70 group-hover/item:text-white transition-colors duration-300 font-medium">{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg
                                    ${plan.popular
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/25 hover:brightness-110'
                                        : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-blue-500/30'
                                    }`}
                                >
                                    {plan.cta} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ITPricing;
