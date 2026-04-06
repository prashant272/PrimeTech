import React, { useState, useEffect } from 'react';
import { ExternalLink, MessageSquare, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import ITContactModal from './ITContactModal';

const CATEGORY_EMOJIS = {
    'Mobility Services': '📱',
    'Cloud Telephony Services': '☁️',
    'WhatsApp Services': '💬',
    'Application': '🖥️'
};

const ITProductShowcase = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hovered, setHovered] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleDemoClick = (prod) => {
        setModalData({
            category: 'product',
            productType: ['ERP', 'CRM', 'School Management', 'Hospital Management'].includes(prod.title) ? prod.title : 'Other',
            requirement: `Request for Demo: ${prod.title}`
        });
        setIsModalOpen(true);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/content/products');
                if (res.data && res.data.data) {
                    setProducts(res.data.data);
                }
            } catch (err) {
                console.warn('Product showcase fetch failed:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="py-20 relative overflow-hidden bg-white/[0.01]">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-blue-400 font-bold tracking-[0.3em] uppercase block mb-4 text-xs">
                        Enterprise Solutions
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Smart <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Management Products</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Ready-to-deploy enterprise software designed to automate your industry-specific operational challenges.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center text-white/30 py-16">
                        <Package size={40} className="mx-auto mb-4 opacity-30" />
                        <p className="font-bold uppercase tracking-widest text-sm">No Products Yet</p>
                        <p className="text-xs mt-2">Add products from the Admin Dashboard.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((prod, i) => (
                            <div
                                key={prod._id || i}
                                className="rounded-[2.5rem] p-10 transition-all duration-700 group cursor-default flex flex-col h-full relative overflow-hidden"
                                style={{
                                    background: hovered === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                                    border: hovered === i ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(255,255,255,0.1)',
                                    transform: hovered === i ? 'translateY(-12px)' : 'translateY(0)',
                                    boxShadow: hovered === i ? '0 30px 60px -12px rgba(0,0,0,0.5), 0 10px 30px -10px rgba(59,130,246,0.2)' : 'none'
                                }}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500 origin-left drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                    {CATEGORY_EMOJIS[prod.category] || '📦'}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                    {prod.title}
                                </h3>

                                <p className="text-xs uppercase tracking-[0.2em] font-black mb-6 text-blue-500">
                                    {prod.category}
                                </p>

                                <p className="text-white/60 text-[15px] leading-relaxed mb-8 flex-grow">
                                    {prod.heroDesc || prod.fullDesc}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mt-auto">
                                    <Link
                                        to={`/products/${prod.slug}`}
                                        className="flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/10"
                                    >
                                        Details <ExternalLink size={14} />
                                    </Link>
                                    <button
                                        onClick={() => handleDemoClick(prod)}
                                        className="flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20"
                                    >
                                        Demo <MessageSquare size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ITContactModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                initialData={modalData}
            />
        </section>
    );
};

export default ITProductShowcase;
