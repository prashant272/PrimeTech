import React, { useState } from 'react';
import { ArrowRight, ExternalLink, MessageSquare, AppWindow, Shield, Users, ShoppingCart, Activity, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
    {
        id: 'school-management',
        emoji: '🏫',
        title: 'School Management',
        subtitle: 'Education · ERP · Fees',
        desc: 'Complete digital ecosystem to manage students, staff, exams, and fees with real-time parent communication.',
        tags: ['Attendance', 'Exam Result', 'Fee Portal'],
        icon: <AppWindow size={20} />
    },
    {
        id: 'hospital-management',
        emoji: '🏥',
        title: 'Hospital Management',
        subtitle: 'EMR · OPD · Pharmacy',
        desc: 'Patient-centric healthcare records, doctor scheduling, and billing system for clinics and hospitals.',
        tags: ['Lab Reports', 'Doctor Panel', 'E-Prescription'],
        icon: <Shield size={20} />
    },
    {
        id: 'hr-management',
        emoji: '👥',
        title: 'HRMS Solution',
        subtitle: 'Payroll · Attendance · KPI',
        desc: 'Automate your entire employee lifecycle from onboarding to payroll and performance management.',
        tags: ['Biometric', 'Salary Slips', 'Leave Mgmt'],
        icon: <Users size={20} />
    },
    {
        id: 'transport-management',
        emoji: '🚛',
        title: 'Transport Management',
        subtitle: 'Logistics · Tracking · POD',
        desc: 'Optimized fleet management, load balancing, and digital proof-of-delivery for logistics businesses.',
        tags: ['Route Opt', 'Fuel Track', 'Digital LR'],
        icon: <Truck size={20} />
    },
    {
        id: 'gym-management',
        emoji: '💪',
        title: 'Gym Management',
        subtitle: 'Membership · Renewal',
        desc: 'Membership tracking, automated renewals, and biometric entry system for modern fitness centers.',
        tags: ['Renewal Alerts', 'POS', 'Diet Plans'],
        icon: <Activity size={20} />
    },
    {
        id: 'ecommerce-platform',
        emoji: '🛍️',
        title: 'E-commerce Platform',
        subtitle: 'Multi-vendor · Payments',
        desc: 'Scalable online store solution with integrated payments, inventory, and abandoned cart recovery.',
        tags: ['Shiprocket', 'Razorpay', 'Inventory'],
        icon: <ShoppingCart size={20} />
    }
];

const ITProductShowcase = () => {
    const [hovered, setHovered] = useState(null);

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((prod, i) => (
                        <div
                            key={i}
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
                                {prod.emoji}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                {prod.title}
                            </h3>

                            <p className="text-xs uppercase tracking-[0.2em] font-black mb-6 flex items-center gap-2" style={{ color: '#3b82f6' }}>
                                {prod.icon} {prod.subtitle}
                            </p>

                            <p className="text-white/60 text-[15px] leading-relaxed mb-8 flex-grow">
                                {prod.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10">
                                {prod.tags.map(tag => (
                                    <span key={tag} className="text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest bg-white/[0.03] text-white/40 border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Link
                                    to={`/product/${prod.id}`}
                                    className="flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/10"
                                >
                                    Details <ExternalLink size={14} />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all bg-blue-600 text-white hover:bg-blue-500"
                                >
                                    Demo <MessageSquare size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ITProductShowcase;
