import React from 'react';

const ITTrustedBy = () => {
    const partners = [
        { name: "Prime Time", logo: "/prime.gif" },
        { name: "TimeCyberMedia", logo: "/time.png" },
        { name: "BiryaniYOYO", logo: "biryani.jpeg" },
        { name: "xoom studio", logo: "/xoom.jpg" },
        { name: "india Top doctor", logo: "/Topdoctor.png" },
        { name: "School2College", logo: "/school.jpeg" },
        { name: "Carrercommando", logo: "/carrer.jpeg" },
        { name: "Devraj Express", logo: "/dev.jpeg" }
    ];

    // Double the array for a truly seamless infinite scroll
    const slidingPartners = [...partners, ...partners];

    return (
        <section className="py-20 relative overflow-hidden">

            <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                <span className="text-white/40 text-xs font-black uppercase tracking-[0.5em] block mb-4">
                    SCALING GLOBAL TECHNOLOGICAL IMPACT
                </span>
                <h2 className="text-white font-black text-3xl md:text-6xl tracking-tighter" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    Powering <span className="italic opacity-90">Industry Innovators</span>
                </h2>
                <div className="w-16 h-[2px] bg-white/10 mx-auto mt-8"></div>
            </div>

            <div className="relative flex overflow-x-hidden group">
                {/* Horizontal Gradient Overlays for Fade Effect */}
                <div className="absolute inset-y-0 left-0 w-20 md:w-24 bg-gradient-to-r from-[#070b14] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-20 md:w-24 bg-gradient-to-l from-[#070b14] to-transparent z-20 pointer-events-none"></div>

                <div className="flex animate-marquee whitespace-nowrap items-center py-10">
                    {slidingPartners.map((partner, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center justify-center mx-6 md:mx-10"
                        >
                            <div className="w-32 h-32 md:w-64 md:h-48 bg-white rounded-[2rem] flex items-center justify-center transition-all duration-700 hover:scale-110 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden group/card relative">
                                {/* Subtle inner shadow for depth */}
                                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none"></div>

                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="w-full h-full object-contain transition-all duration-500 transform group-hover/card:scale-110"
                                    onError={(e) => {
                                        // Fallback icon style
                                        e.target.parentElement.classList.add('bg-white/5', 'backdrop-blur-xl', 'border', 'border-white/10');
                                        e.target.parentElement.innerHTML = `<span class="text-white/60 font-black text-3xl">${partner.name}</span>`;
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ITTrustedBy;
