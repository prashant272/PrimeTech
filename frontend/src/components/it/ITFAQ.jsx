import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const ITFAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const questions = [
        {
            q: "How long does a typical project take?",
            a: "Landing pages take 3-7 days, while complex web or mobile apps range from 4 to 12 weeks. We follow agile principles, so you see progress every 2 weeks."
        },
        {
            q: "What technologies do you specialize in?",
            a: "We are experts in the MERN stack (MongoDB, Express, React, Node), Next.js, Flutter, AWS/Azure for cloud, and Python for AI/ML solutions."
        },
        {
            q: "Do you provide post-launch support?",
            a: "Yes, we offer 30 days of free support after launch. We also provide yearly maintenance contracts for 24/7 monitoring and updates."
        },
        {
            q: "What is your payment structure?",
            a: "Usually, we follow a milestone-based payment: 25% upfront, 50% during mid-development, and 25% upon successful deployment."
        },
        {
            q: "Can you help with app store submissions?",
            a: "Absolutely! We handle the entire process of deploying to the Apple App Store, Google Play Store, and configuring your web hosting."
        }
    ];

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">FAQ</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-8" style={{ fontFamily: '"Outfit", sans-serif', lineHeight: 1.2 }}>
                            Frequently Asked <span className="text-blue-gradient">Questions</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-10 leading-relaxed font-medium">
                            Everything you need to know about our process, technology, and support. If you have more questions, feel free to contact us.
                        </p>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600/15 via-purple-600/5 to-transparent border border-white/10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-colors"></div>
                            <h4 className="text-xl font-bold text-white mb-2 relative z-10">Still have questions?</h4>
                            <p className="text-gray-400 text-sm mb-6 relative z-10">Can't find the answer you're looking for? Please chat with our friendly team.</p>
                            <a href="/contact" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/25 relative z-10">
                                Contact Team
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {questions.map((item, i) => (
                            <div key={i} className={`rounded-2xl border transition-all duration-300 ${openIndex === i ? 'bg-white/10 border-blue-500/30 shadow-xl shadow-blue-500/5' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                    className="w-full p-6 text-left flex justify-between items-center bg-transparent focus:outline-none group"
                                >
                                    <span className={`font-bold transition-colors duration-300 ${openIndex === i ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{item.q}</span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 group-hover:text-gray-200'}`}>
                                        {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                                    </div>
                                </button>

                                <div className={`transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                    <div className="p-6 pt-0 text-gray-400 text-[15px] leading-relaxed border-t border-white/5 font-medium">
                                        {item.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ITFAQ;
