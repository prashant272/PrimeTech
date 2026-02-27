import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        name: 'Harsh Jha',
        role: 'CEO, Prime Time',
        text: 'Prime Impact IT Solutions provided us with top-tier media streaming capabilities. Their technical expertise is unmatched in the industry.',
        rating: 5,
        image: '/prime.gif'
    },
    {
        name: 'Saurabh Tyagi',
        role: 'Director, TimeCyberMedia',
        text: 'The digital transformation of our media house was seamless. Their team delivered a robust and scalable platform ahead of schedule.',
        rating: 5,
        image: '/time.png'
    },
    {
        name: 'Mohammed Zaid',
        role: 'Founder, BiryaniYOYO',
        text: 'Our food delivery app performance improved significantly. The user engagement has increased by 40% since the new update.',
        rating: 5,
        image: 'biryani.jpeg'
    },
    {
        name: 'Karan Singh',
        role: 'Creative Director, xoom studio',
        text: 'Working with them was a breeze. They understood our creative vision and implemented it with high-quality code and design.',
        rating: 5,
        image: '/xoom.jpg'
    },
    {
        name: 'Dr. Sameer Khan',
        role: 'CMO, india Top doctor',
        text: 'The healthcare portal they developed is highly secure and easy for patients to use. Truly professional work.',
        rating: 5,
        image: '/Topdoctor.png'
    },
    {
        name: 'Anjali Sharma',
        role: 'Founder, School2College',
        text: 'Our educational portal has seen 100k+ users now! The performance is lightning fast and the support is always available.',
        rating: 5,
        image: '/school.jpeg'
    },
    {
        name: 'Rohan Verma',
        role: 'CEO, Carrercommando',
        text: 'Their recruitment platform automation saved us hundreds of manual hours. The ROI on this project has been incredible.',
        rating: 5,
        image: '/carrer.jpeg'
    },
    {
        name: 'Devraj Singh',
        role: 'MD, Devraj Express',
        text: 'Logistics tracking has never been this accurate. Their IoT integration is a game-changer for our delivery fleet.',
        rating: 5,
        image: '/dev.jpeg'
    }
];

const ITTestimonials = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const prev = () => {
        setDirection(-1);
        setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    };
    const next = () => {
        setDirection(1);
        setCurrent((c) => (c + 1) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [current]);

    const t = testimonials[current];

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        })
    };

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-blue-400 font-bold tracking-[0.2em] uppercase block mb-3 text-xs">
                        Growth Stories
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Trusted by <span className="text-blue-gradient">Global Leaders</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
                </div>

                <div className="max-w-4xl mx-auto relative px-4">
                    <div className="relative h-[450px] md:h-[400px]">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.4 }
                                }}
                                className="absolute inset-0"
                            >
                                <div className="h-full rounded-[3rem] p-8 md:p-14 relative flex flex-col items-center justify-center text-center overflow-hidden"
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        backdropFilter: 'blur(10px)'
                                    }}>

                                    {/* Decorative Icon */}
                                    <div className="absolute top-10 left-10 opacity-5">
                                        <Quote size={120} className="text-blue-400 rotate-180" />
                                    </div>

                                    <div className="relative z-10 w-full flex flex-col items-center">
                                        {/* Company Logo/Icon */}
                                        <div className="w-24 h-24 mb-8 rounded-2xl bg-white p-3 flex items-center justify-center shadow-2xl relative">
                                            <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full"></div>
                                            <img src={t.image} alt={t.role} className="w-full h-full object-contain relative z-10" />
                                        </div>

                                        {/* Stars */}
                                        <div className="flex justify-center gap-1.5 mb-8">
                                            {[...Array(t.rating)].map((_, i) => (
                                                <Star key={i} size={18} className="fill-blue-500 text-blue-500" />
                                            ))}
                                        </div>

                                        <h3 className="text-gray-200 text-xl md:text-2xl leading-relaxed font-medium italic mb-10 px-4">
                                            "{t.text}"
                                        </h3>

                                        <div className="flex flex-col items-center">
                                            <div className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px] py-1.5 px-4 bg-blue-500/10 rounded-full border border-blue-500/20">
                                                {t.role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-10 mt-12">
                        <button onClick={prev} className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all bg-white/[0.03] border border-white/10 text-white hover:bg-white/[0.08] hover:border-blue-500/30 group">
                            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        </button>

                        <div className="hidden md:flex gap-3">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setDirection(i > current ? 1 : -1);
                                        setCurrent(i);
                                    }}
                                    className="h-1.5 rounded-full transition-all duration-500"
                                    style={{
                                        width: i === current ? '3rem' : '0.75rem',
                                        backgroundColor: i === current ? '#3b82f6' : 'rgba(255,255,255,0.1)'
                                    }}
                                />
                            ))}
                        </div>

                        <button onClick={next} className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all bg-white/[0.03] border border-white/10 text-white hover:bg-white/[0.08] hover:border-blue-500/30 group">
                            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ITTestimonials;
