import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';

const ITContactModal = ({ isOpen, onClose, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        category: initialData?.category || '',
        serviceType: initialData?.serviceType || '',
        productType: '',
        visaPersons: '',
        visaDestination: '',
        requirement: initialData?.requirement || '',
        resume: null
    });

    useEffect(() => {
        if (isOpen && initialData) {
            setFormData(prev => ({
                ...prev,
                ...initialData
            }));
        }
    }, [isOpen, initialData]);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'resume') {
            setFormData({ ...formData, resume: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            if (formData.category === 'job') {
                // Handle Job Application with File Upload
                const data = new FormData();
                data.append('candidateName', formData.name);
                data.append('email', formData.email);
                data.append('mobile', formData.mobile);
                data.append('jobTitle', formData.requirement.replace('Application for ', ''));
                data.append('message', formData.requirement);
                data.append('resume', formData.resume);

                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recruit/apply`, {
                    method: 'POST',
                    body: data
                });
                
                if (!response.ok) throw new Error('Submission failed');
            } else {
                // Handle General Inquiries (JSON)
                let interestString = formData.category || 'General';
                if (formData.category === 'service') {
                    interestString = `Service: ${formData.serviceType} | Req: ${formData.requirement}`;
                } else if (formData.category === 'product') {
                    interestString = `Product: ${formData.productType} | Req: ${formData.requirement}`;
                } else if (formData.category === 'visa') {
                    interestString = `Visa: ${formData.visaDestination} (For ${formData.visaPersons} Person)`;
                }

                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/leads`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        mobile: formData.mobile,
                        source: 'Consultation Form',
                        interest: interestString
                    })
                });
                if (!response.ok) throw new Error('Submission failed');
            }

            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    name: '', email: '', mobile: '', category: '', serviceType: '',
                    productType: '', visaPersons: '', visaDestination: '', requirement: '', resume: null
                });
                onClose();
            }, 3000);
        } catch (error) {
            console.error("Error submitting form", error);
            alert("Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#070b14]/90 backdrop-blur-md"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-lg bg-[#111827] border border-blue-500/20 rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                
                {/* Header */}
                <div className="flex justify-between items-center p-5 md:p-6 border-b border-white/5 flex-shrink-0">
                    <h2 className="text-lg md:text-2xl font-bold text-white tracking-widest uppercase">
                        Book <span className="text-blue-500">Consultation</span>
                    </h2>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-5 md:p-6 overflow-y-auto custom-scrollbar">
                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
                            <CheckCircle size={64} className="text-green-500 mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-white/70 text-sm">Thank you for contacting us. Our team will get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5 ml-1">Name</label>
                                    <input 
                                        type="text" name="name" required
                                        value={formData.name} onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5 ml-1">Mobile No</label>
                                    <input 
                                        type="tel" name="mobile" required
                                        value={formData.mobile} onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                        placeholder="+91..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                                <input 
                                    type="email" name="email" required
                                    value={formData.email} onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5 ml-1">Category</label>
                                <select 
                                    name="category" required
                                    value={formData.category} onChange={handleChange}
                                    className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="service" className="bg-[#111827]">Service Information</option>
                                    <option value="product" className="bg-[#111827]">Product Inquiry</option>
                                    <option value="visa" className="bg-[#111827]">Visa Consultation</option>
                                    <option value="job" className="bg-[#111827]">Job Application</option>
                                </select>
                            </div>

                            {formData.category === 'service' && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5 ml-1">Service Type</label>
                                    <select 
                                        name="serviceType" required
                                        value={formData.serviceType} onChange={handleChange}
                                        className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 cursor-pointer"
                                    >
                                        <option value="" disabled>What type of service?</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="App Development">App Development</option>
                                        <option value="Cloud/DevOps">Cloud & DevOps</option>
                                        <option value="SEO/Marketing">Digital Marketing & SEO</option>
                                        <option value="Other">Other IT Service</option>
                                    </select>
                                </div>
                            )}

                            {formData.category === 'product' && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5 ml-1">Product Type</label>
                                    <select 
                                        name="productType" required
                                        value={formData.productType} onChange={handleChange}
                                        className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 cursor-pointer"
                                    >
                                        <option value="" disabled>Which product?</option>
                                        <option value="ERP">ERP System</option>
                                        <option value="CRM">CRM Engine</option>
                                        <option value="Hospital Management">Hospital Management Software</option>
                                        <option value="School Management">School Management System</option>
                                        <option value="Other">Other Product</option>
                                    </select>
                                </div>
                            )}

                            {formData.category === 'visa' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div>
                                        <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5 ml-1">No. of People</label>
                                        <input 
                                            type="number" name="visaPersons" min="1" required
                                            value={formData.visaPersons} onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
                                            placeholder="Eg. 2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5 ml-1">Destination</label>
                                        <input 
                                            type="text" name="visaDestination" required
                                            value={formData.visaDestination} onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
                                            placeholder="Eg. UK, Australia..."
                                        />
                                    </div>
                                </div>
                            ) : formData.category === 'job' ? (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div>
                                        <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5 ml-1">Upload Resume (PDF/DOCX)</label>
                                        <div className="relative group">
                                            <input 
                                                type="file" name="resume" required
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="w-full bg-white/5 border border-dashed border-white/20 rounded-xl px-4 py-6 text-center group-hover:border-blue-500/50 transition-all">
                                                <p className="text-sm text-white/60 font-medium">
                                                    {formData.resume ? formData.resume.name : "Click or drag to upload resume"}
                                                </p>
                                                <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest font-bold">Max size: 5MB</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5 ml-1">Message / Cover Note</label>
                                        <textarea 
                                            name="requirement" rows="3" required
                                            value={formData.requirement} onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none"
                                            placeholder="Introduce yourself briefly..."
                                        ></textarea>
                                    </div>
                                </div>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5 ml-1">Requirement</label>
                                    <textarea 
                                        name="requirement" rows="3" required
                                        value={formData.requirement} onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none transition-all"
                                        placeholder="Describe your requirement briefly..."
                                    ></textarea>
                                </div>
                            )}

                            <div className="pt-2">
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black uppercase tracking-[0.2em] rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                <style>{`
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.5); border-radius: 10px; }
                `}</style>
            </div>
        </div>
    );
};

export default ITContactModal;
