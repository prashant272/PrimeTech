import React from 'react';
import { ShieldCheck, Award, CheckCircle } from 'lucide-react';

const ITCertifications = () => {
    const certs = [
        {
            name: "AWS Partner",
            status: "Cloud Specialized",
            color: "#FF9900",
            icon: "AWS"
        },
        {
            name: "Microsoft Partner",
            status: "Gold Solutions",
            color: "#00A4EF",
            icon: "MS"
        },
        {
            name: "Google Cloud",
            status: "Certified Partner",
            color: "#4285F4",
            icon: "GC"
        },
        {
            name: "ISO 27001",
            status: "Security Verified",
            color: "#10b981",
            icon: "ISO"
        }
    ];

    return (
        <section className="relative py-16 overflow-hidden border-y border-white/5 bg-transparent">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 transition-all duration-700">
                    {certs.map((cert, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all transform group-hover:scale-110"
                                style={{ borderColor: `${cert.color}40` }}>
                                <span className="font-black text-xl transition-colors" style={{ color: cert.color }}>
                                    {cert.icon}
                                </span>
                            </div>
                            <div>
                                <h4 className="text-[#ffffff] font-bold text-sm transition-colors uppercase tracking-widest">{cert.name}</h4>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <CheckCircle size={10} className="text-green-500" />
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Certified</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ITCertifications;
