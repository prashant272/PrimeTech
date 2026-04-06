import React, { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';

const ITQuestionModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        question: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.mobile,
                    source: 'FAQ / Quick Question',
                    interest: `Question: ${formData.question}`
                })
            });
        } catch (error) {
            console.error("Error submitting question", error);
        }

        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', mobile: '', question: '' });
            onClose();
        }, 3000);
    };

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#070b14]/90 backdrop-blur-md"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-lg bg-[#111827] border border-blue-500/20 rounded-[2rem] shadow-[0_0_50px_rgba(37,99,235,0.2)] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-8 border-b border-white/5 flex-shrink-0">
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            Ask a <span className="text-blue-500">Question</span>
                        </h2>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">We'll get back to you within 24 hours</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-white/30 hover:text-white transition-colors p-3 hover:bg-white/5 rounded-full"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-8">
                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle size={40} className="text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Question Received!</h3>
                            <p className="text-white/50 text-sm">Thank you for your patience. Our experts will respond shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                    <input 
                                        type="text" name="name" required
                                        value={formData.name} onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-2 ml-1">Mobile No</label>
                                    <input 
                                        type="tel" name="mobile" required
                                        value={formData.mobile} onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                        placeholder="+91..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                <input 
                                    type="email" name="email" required
                                    value={formData.email} onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-2 ml-1">Your Question</label>
                                <textarea 
                                    name="question" rows="4" required
                                    value={formData.question} onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none transition-all font-medium"
                                    placeholder="What would you like to know?"
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <button 
                                    type="submit"
                                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_15px_40px_rgba(37,99,235,0.3)] text-xs flex items-center justify-center gap-3"
                                >
                                    Send Question <Send size={16} />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <style>{`
                input::placeholder, textarea::placeholder {
                    color: rgba(255,255,255,0.15);
                }
            `}</style>
        </div>
    );
};

export default ITQuestionModal;
