import React from 'react';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

const ITProcess = () => {
    const steps = [
        {
            icon: Search,
            title: "Discovery & Analysis",
            description: "We deep-dive into your business goals, target audience, and functional requirements to build a solid foundation.",
            tags: ["Requirement Gathering", "Market Research", "POC"]
        },
        {
            icon: PenTool,
            title: "Planning & Architecture",
            description: "We design the blueprint, choosing the right tech stack and defining a seamless user experience.",
            tags: ["UI/UX Design", "System Design", "Tech Stack Selection"]
        },
        {
            icon: Code,
            title: "Development & Testing",
            description: "Our engineers build the product in agile sprints with rigorous automated testing for maximum reliability.",
            tags: ["Agile Development", "Quality Assurance", "CI/CD"]
        },
        {
            icon: Rocket,
            title: "Deployment & Support",
            description: "We go live with continuous monitoring and performance optimization to ensure long-term success.",
            tags: ["Launch", "24/7 Monitoring", "Maintenance"]
        }
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Workflow</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mt-4 mb-8 leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        How We Turn <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Ideas</span> into Reality
                    </h2>
                    <p className="text-white/80 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                        A structured, high-performance process ensures that every project we deliver is scalable, secure, and world-class.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-8 opacity-30"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="group p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-all duration-700 relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]">
                            {/* Inner glow effect */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Step Number */}
                            <div className="absolute top-6 right-8 text-7xl font-black text-white/[1] group-hover:text-yellow-500 transition-colors pointer-events-none">
                                0{i + 1}
                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:border-blue-500/30 shadow-lg">
                                <step.icon className="text-white group-hover:text-blue-400 transition-colors" size={32} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{step.title}</h3>
                            <p className="text-white/70 text-sm leading-relaxed mb-8 min-h-[4rem] group-hover:text-white transition-colors">
                                {step.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {step.tags.map((tag, j) => (
                                    <span key={j} className="text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-white/60 group-hover:text-white group-hover:border-blue-500/30 transition-all">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ITProcess;
