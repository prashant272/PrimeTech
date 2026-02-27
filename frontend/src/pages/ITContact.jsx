import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

const ITContact = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            question: 'How much does a website or app cost?',
            answer: 'Pricing depends on complexity. A simple landing page starts around ₹15,000. A full-stack web app or mobile app can range from ₹50,000 to ₹5,00,000+. Contact us for a free, detailed quote.',
        },
        {
            question: 'How long does it take to build a project?',
            answer: 'A landing page typically takes 3–7 days. A web app or mobile app takes 4–12 weeks depending on features. We follow agile sprints so you get working software every 2 weeks.',
        },
        {
            question: 'Do you provide maintenance and support after launch?',
            answer: 'Yes! We offer 24/7 monitoring and dedicated support contracts. Every project includes 30 days of free post-launch support.',
        },
        {
            question: 'Can you work with existing codebases?',
            answer: 'Absolutely. We can audit, refactor, and extend your existing codebase. We\'ve rescued many struggling projects and legacy systems with modern tech.',
        },
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 text-white bg-transparent" id="contact">
            {/* Header */}
            <div className="container mx-auto px-6 text-center mb-16">
                <span className="text-sm font-bold tracking-[0.2em] uppercase block mb-4" style={{ color: '#60a5fa' }}>
                    Contact Us
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    Get in Touch with{' '}
                    <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                        Prime Impact IT Solutions
                    </span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Have a project idea? Need a free consultation? We'd love to hear from you. Let's build something amazing together.
                </p>
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-12">
                    {/* Contact Details Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { icon: MapPin, title: 'Our Office', info: 'T-1, 3rd Floor, Ruff Toff\nNew Delhi, India' },
                            { icon: Phone, title: 'Call / WhatsApp', info: '9319 9319 06' },
                            { icon: Mail, title: 'Email Us', info: 'hello@primeimpact.in' },
                            { icon: Clock, title: 'Working Hours', info: 'Mon – Sat\n10:00 AM – 7:00 PM' },
                        ].map((card, i) => (
                            <div key={i} className="p-6 rounded-lg transition-all cursor-default"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                                <card.icon className="mb-4" size={28} style={{ color: '#60a5fa' }} />
                                <h3 className="font-bold text-white mb-2">{card.title}</h3>
                                <p className="text-gray-400 text-sm whitespace-pre-line">{card.info}</p>
                            </div>
                        ))}
                    </div>

                    {/* Map */}
                    <div className="rounded-lg overflow-hidden h-64 md:h-80 w-full relative" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562095818956!2d77.20902121508218!3d28.61393908242409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd35fc8239e9%3A0x64426550a296710!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1628151234567!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Prime Impact IT Solutions Office Map"
                        ></iframe>
                        <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ background: 'rgba(59,130,246,0.1)' }}></div>
                    </div>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/919319931906"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-3 text-white font-bold py-4 rounded-lg transition-all uppercase tracking-wider hover:opacity-90"
                        style={{ background: '#25D366' }}
                    >
                        <MessageCircle size={24} />
                        Chat on WhatsApp
                    </a>
                </div>

                {/* Right Column */}
                <div className="space-y-12">
                    {/* Contact Form */}
                    <div className="p-8 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            Connect with <span className="text-blue-gradient">Prime Impact IT Solutions</span>
                        </h1>
                        <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#60a5fa' }}>Name</label>
                                    <input type="text" className="w-full p-3 text-white focus:outline-none transition-colors rounded"
                                        style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
                                        placeholder="Your Name"
                                        onFocus={e => e.target.style.borderColor = '#3b82f6'}
                                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#60a5fa' }}>Phone</label>
                                    <input type="tel" className="w-full p-3 text-white focus:outline-none transition-colors"
                                        style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
                                        placeholder="+91 XXXXX XXXXX"
                                        onFocus={e => e.target.style.borderColor = '#3b82f6'}
                                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#60a5fa' }}>Email</label>
                                <input type="email" className="w-full p-3 text-white focus:outline-none"
                                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
                                    placeholder="your@email.com"
                                    onFocus={e => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#60a5fa' }}>Service Needed</label>
                                <select className="w-full p-3 text-white focus:outline-none"
                                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}>
                                    <option value="">Select a service...</option>
                                    <option>Web Development</option>
                                    <option>Mobile App Development</option>
                                    <option>Cloud & DevOps</option>
                                    <option>AI & Machine Learning</option>
                                    <option>UI/UX Design</option>
                                    <option>Cybersecurity & Audit</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#60a5fa' }}>Message</label>
                                <textarea rows="4" className="w-full p-3 text-white focus:outline-none"
                                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
                                    placeholder="Tell us about your project..."
                                    onFocus={e => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}></textarea>
                            </div>
                            <button className="w-full py-4 font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
                                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', borderRadius: '0.5rem' }}>
                                Send Message 🚀
                            </button>
                        </form>
                    </div>

                    {/* FAQ */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: '"Outfit", sans-serif' }}>Common Questions</h3>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                                    >
                                        <span className="font-bold text-gray-200">{faq.question}</span>
                                        {openFaq === index
                                            ? <ChevronUp style={{ color: '#60a5fa' }} />
                                            : <ChevronDown style={{ color: 'rgba(255,255,255,0.3)' }} />}
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-6 pb-4 text-gray-400 text-sm pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center p-8 rounded-xl" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
                        <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: '"Outfit", sans-serif' }}>Ready to build something amazing?</h4>
                        <p className="text-gray-400 text-sm mb-6">Get a free consultation and project estimate today!</p>
                        <a href="tel:+919319931906" className="inline-block px-8 py-3 font-bold uppercase tracking-widest text-white transition-all hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', borderRadius: '0.5rem' }}>
                            📞 Call Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ITContact;
