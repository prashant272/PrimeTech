import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, Send, MessageSquare, User, Mail, Phone } from 'lucide-react';
import api from '../api/axios';

export default function LeadCapturePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasClosedOnce, setHasClosedOnce] = useState(false);
    const [isSecondTime, setIsSecondTime] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        reason: 'Service',
        customReason: ''
    });

    // Reasons for dropdown
    const reasons = ["Service", "Product", "Visa", "Careers", "Others"];

    // Check if user already submitted or dismissed
    useEffect(() => {
        const submitted = localStorage.getItem('lead_submitted');
        const closedOnce = localStorage.getItem('lead_closed_once');
        
        if (submitted) return;

        if (closedOnce) {
            setHasClosedOnce(true);
        }

        // Trigger 1: 300ms delay on first load
        const timer = setTimeout(() => {
            if (!submitted) {
                setIsOpen(true);
            }
        }, );

        return () => clearTimeout(timer);
    }, []);

    // Trigger 2: Scroll Trigger (300px) only AFTER it has been closed once
    useEffect(() => {
        if (isSubmitted || !hasClosedOnce || isOpen) return;

        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsOpen(true);
                setIsSecondTime(true); // Mark as second time (blocking mode)
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isSubmitted, hasClosedOnce, isOpen]);

    const handleClose = () => {
        if (isSecondTime) return; // Cannot close if it's the second time
        setIsOpen(true);
        setHasClosedOnce(true);
        localStorage.setItem('lead_closed_once', 'true');
    };

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const activityLogs = JSON.parse(localStorage.getItem('pending_activity_logs') || '[]');

            const payload = {
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                source: 'Popup',
                interest: formData.reason === 'Others' ? formData.customReason : formData.reason,
                activityLogs: activityLogs
            };

            const response = await api.post('/leads', payload);

            if (response.data.success) {
                setIsSubmitted(true);
                localStorage.setItem('lead_submitted', 'true');
                
                // Save lead ID with 30-day expiry
                const expiry = new Date().getTime() + (30 * 24 * 60 * 60 * 1000); // 30 Days
                localStorage.setItem('captured_lead_data', JSON.stringify({
                    id: response.data.data._id,
                    expiry: expiry
                }));

                localStorage.removeItem('pending_activity_logs');
                setTimeout(() => setIsOpen(false), 3000);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setError('Submission failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />

                {/* Modal */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-[#0a0f1c] border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
                    
                    {/* Close Button - Only show if it's NOT the second time */}
                    {!isSecondTime && !isSubmitted && (
                        <button 
                            onClick={handleClose}
                            className="absolute top-6 right-6 p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all z-10"
                        >
                            <X size={20} />
                        </button>
                    )}

                    <div className="p-8 md:p-10">
                        {isSubmitted ? (
                            <div className="flex flex-col items-center text-center py-10 space-y-4">
                                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-2">
                                    <CheckCircle2 className="text-blue-500 w-10 h-10" />
                                </div>
                                <h2 className="text-3xl font-black text-white">Thank You!</h2>
                                <p className="text-white/40 text-sm">We've received your inquiry and will get back to you shortly.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-black text-white flex items-center gap-3">
                                        Let's Connect <MessageSquare className="text-blue-500" size={24} />
                                    </h2>
                                    <p className="text-white/40 text-sm font-medium">Please share your details to proceed.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name */}
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                        <input 
                                            required
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-semibold"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                        <input 
                                            required
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-semibold"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>

                                    {/* Mobile */}
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                        <input 
                                            required
                                            type="tel"
                                            placeholder="WhatsApp Number"
                                            maxLength={10}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-semibold"
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})}
                                        />
                                    </div>

                                    {/* Reason Dropdown */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Reason for Inquiry</label>
                                        <select 
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-semibold appearance-none cursor-pointer"
                                            value={formData.reason}
                                            onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                        >
                                            {reasons.map(r => (
                                                <option key={r} value={r} className="bg-[#0a0f1c]">{r}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Custom Reason */}
                                    {formData.reason === 'Others' && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            className="overflow-hidden"
                                        >
                                            <input 
                                                required
                                                type="text"
                                                placeholder="Please specify"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all font-semibold"
                                                value={formData.customReason}
                                                onChange={(e) => setFormData({...formData, customReason: e.target.value})}
                                            />
                                        </motion.div>
                                    )}

                                    {/* Error Message */}
                                    {error && (
                                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>
                                    )}

                                    {/* Submit Button */}
                                    <button 
                                        disabled={isLoading}
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all mt-4 group"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                SUBMIT INQUIRY <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-5 bg-white/5 border-t border-white/5 flex items-center justify-center gap-2">
                        <ShieldCheck className="text-white/20" size={14} />
                        <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">
                            Secure Data Protection Active
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
