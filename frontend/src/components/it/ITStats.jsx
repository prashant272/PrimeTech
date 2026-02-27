import React, { useState, useEffect, useRef } from 'react';

const stats = [
    { value: 200, suffix: '+', label: 'Projects Delivered' },
    { value: 50, suffix: '+', label: 'Happy Clients' },
    { value: 8, suffix: '+', label: 'Years Experience' },
    { value: 99, suffix: '.9%', label: 'Uptime SLA' },
    { value: 24, suffix: '/7', label: 'Support Available' },
];

const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const totalFrames = Math.round(duration / 16);
        const increment = end / totalFrames;
        let frame = 0;

        const timer = setInterval(() => {
            frame++;
            const nextCount = Math.min(Math.round(increment * frame), end);
            setCount(nextCount);

            if (frame === totalFrames) {
                clearInterval(timer);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, end, duration]);

    return <span ref={elementRef}>{count}</span>;
};

const ITStats = () => {
    return (
        <section className="relative py-16 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-40 bg-blue-600/10 blur-[100px] rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-40 bg-purple-600/10 blur-[100px] rounded-full"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10">
                    {stats.map((stat, i) => (
                        <div key={i} className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:bg-white/[0.04] overflow-hidden text-center">
                            {/* Inner Pulsing Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur"></div>

                            <div className="relative z-10">
                                <div className="text-4xl md:text-5xl font-black mb-3 tracking-tighter"
                                    style={{
                                        fontFamily: '"Outfit", sans-serif',
                                        background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #38bdf8)',
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                        color: 'transparent',
                                        filter: 'drop-shadow(0 0 20px rgba(224, 59, 246, 0.2))'
                                    }}>
                                    <CountUp end={stat.value} />
                                    <span className="text-2xl md:text-3xl">{stat.suffix}</span>
                                </div>
                                <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white group-hover:text-white transition-colors font-black">
                                    {stat.label}
                                </div>
                            </div>

                            {/* Decorative line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-full transition-all duration-700"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ITStats;
