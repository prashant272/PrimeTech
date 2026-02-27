import React from 'react';
import ITServices from '../components/it/ITServices';
import { ArrowRight } from 'lucide-react';

const ITServicesPage = () => {
    return (
        <div className="min-h-screen pt-24 pb-20 text-white bg-transparent">
            {/* Header */}
            <ITServices />

            {/* Bottom CTA */}
            <div className="container mx-auto px-6 mt-8 text-center">
                <div className="rounded-2xl p-12 relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))', border: '1px solid rgba(59,130,246,0.2)' }}>
                    <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(to right, transparent, #3b82f6, transparent)' }}></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Have a project in mind?
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Let's build it together. Get a free consultation and detailed project estimate — no commitment required.
                    </p>
                    <a href="/contact"
                        className="inline-flex items-center gap-3 px-10 py-4 font-bold uppercase tracking-widest text-white transition-all hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', borderRadius: '0.75rem', boxShadow: '0 10px 30px rgba(37,99,235,0.4)' }}>
                        Get Free Quote <ArrowRight size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ITServicesPage;
