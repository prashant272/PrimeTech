import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Plus, Trash2, Upload, Briefcase, GraduationCap, MapPin, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ITJobApplicationModal = ({ isOpen, onClose, jobTitle }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        candidateName: '',
        email: '',
        mobile: '',
        address: '',
        highestQualification: { degree: '', branch: '', percentage: '' },
        otherQualifications: [],
        certifications: '',
        workFromOffice: false,
        resume: null
    });

    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setIsSubmitted(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleQualificationChange = (index, field, value, isHighest = false) => {
        if (isHighest) {
            setFormData(prev => ({
                ...prev,
                highestQualification: { ...prev.highestQualification, [field]: value }
            }));
        } else {
            const newOthers = [...formData.otherQualifications];
            newOthers[index] = { ...newOthers[index], [field]: value };
            setFormData(prev => ({ ...prev, otherQualifications: newOthers }));
        }
    };

    const addQualification = () => {
        setFormData(prev => ({
            ...prev,
            otherQualifications: [...prev.otherQualifications, { degree: '', branch: '', percentage: '' }]
        }));
    };

    const removeQualification = (index) => {
        setFormData(prev => ({
            ...prev,
            otherQualifications: prev.otherQualifications.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append('candidateName', formData.candidateName);
            data.append('email', formData.email);
            data.append('mobile', formData.mobile);
            data.append('address', formData.address);
            data.append('jobTitle', jobTitle);
            data.append('highestQualification', JSON.stringify(formData.highestQualification));
            data.append('otherQualifications', JSON.stringify(formData.otherQualifications));
            data.append('certifications', formData.certifications);
            data.append('workFromOffice', formData.workFromOffice);
            data.append('resume', formData.resume);

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recruit/apply`, {
                method: 'POST',
                body: data
            });

            if (!response.ok) throw new Error('Submission failed');

            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (error) {
            console.error("Error submitting application", error);
            alert("Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#070b14]/95 backdrop-blur-xl" onClick={onClose}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(37,99,235,0.2)] overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-8 border-b border-white/5 flex-shrink-0 bg-white/[0.02]">
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight uppercase italic" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            Join <span className="text-blue-500">PrimeTech</span>
                        </h2>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mt-1">Applying for: {jobTitle}</p>
                    </div>
                    <button onClick={onClose} className="text-white/30 hover:text-white transition-colors p-3 hover:bg-white/5 rounded-2xl">
                        <X size={24} />
                    </button>
                </div>

                {/* Progress Bar */}
                {!isSubmitted && (
                    <div className="h-1.5 w-full bg-white/5">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                            initial={{ width: '0%' }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                )}

                {/* Body */}
                <div className="p-8 overflow-y-auto custom-scrollbar flex-grow">
                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle size={48} className="text-emerald-500" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4 uppercase italic">Application Submitted!</h3>
                            <p className="text-white/50 max-w-sm mx-auto font-medium leading-relaxed">
                                Your professional profile has been received. Our recruitment team will review your credentials and contact you shortly.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div 
                                        key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                <Briefcase size={16} />
                                            </div>
                                            <h4 className="text-sm font-black text-white uppercase tracking-widest">Personal Information</h4>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                                <input 
                                                    type="text" name="candidateName" required value={formData.candidateName} onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 ml-1">Mobile No</label>
                                                <input 
                                                    type="tel" name="mobile" required value={formData.mobile} onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                                    placeholder="+91 99999 99999"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                            <input 
                                                type="email" name="email" required value={formData.email} onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 ml-1">Current Address</label>
                                            <textarea 
                                                name="address" rows="3" required value={formData.address} onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none transition-all font-medium"
                                                placeholder="Enter your complete residential address..."
                                            ></textarea>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div 
                                        key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                                                <GraduationCap size={16} />
                                            </div>
                                            <h4 className="text-sm font-black text-white uppercase tracking-widest">Academic Background</h4>
                                        </div>

                                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Highest Qualification</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input 
                                                    placeholder="Degree Name (e.g. B.Tech)"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-blue-500/50"
                                                    value={formData.highestQualification.degree}
                                                    onChange={(e) => handleQualificationChange(null, 'degree', e.target.value, true)}
                                                    required
                                                />
                                                <input 
                                                    placeholder="Branch (e.g. CSE)"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-blue-500/50"
                                                    value={formData.highestQualification.branch}
                                                    onChange={(e) => handleQualificationChange(null, 'branch', e.target.value, true)}
                                                    required
                                                />
                                            </div>
                                            <input 
                                                placeholder="Percentage / CGPA"
                                                className="w-full md:w-1/3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-blue-500/50"
                                                value={formData.highestQualification.percentage}
                                                onChange={(e) => handleQualificationChange(null, 'percentage', e.target.value, true)}
                                                required
                                            />
                                        </div>

                                        {formData.otherQualifications.map((q, idx) => (
                                            <div key={idx} className="p-6 bg-white/[0.01] border border-white/5 rounded-3xl space-y-4 relative group">
                                                <button 
                                                    type="button" onClick={() => removeQualification(idx)}
                                                    className="absolute top-4 right-4 text-red-500/50 hover:text-red-500"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Additional Qualification</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <input 
                                                        placeholder="Degree Name"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none"
                                                        value={q.degree}
                                                        onChange={(e) => handleQualificationChange(idx, 'degree', e.target.value)}
                                                    />
                                                    <input 
                                                        placeholder="Branch"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none"
                                                        value={q.branch}
                                                        onChange={(e) => handleQualificationChange(idx, 'branch', e.target.value)}
                                                    />
                                                </div>
                                                <input 
                                                    placeholder="Percentage"
                                                    className="w-full md:w-1/3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none"
                                                    value={q.percentage}
                                                    onChange={(e) => handleQualificationChange(idx, 'percentage', e.target.value)}
                                                />
                                            </div>
                                        ))}

                                        <button 
                                            type="button" onClick={addQualification}
                                            className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-blue-400 hover:border-blue-500/30 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Plus size={14} /> Add Another Qualification
                                        </button>

                                        <div>
                                            <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 ml-1">Certifications (Optional)</label>
                                            <textarea 
                                                name="certifications" rows="2" value={formData.certifications} onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none transition-all font-medium"
                                                placeholder="Eg. AWS Certified, Google Cloud Engineer..."
                                            ></textarea>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div 
                                        key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                <Award size={16} />
                                            </div>
                                            <h4 className="text-sm font-black text-white uppercase tracking-widest">Final Submission</h4>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 ml-1">Upload Resume (PDF/DOCX ONLY)</label>
                                            <div className="relative group">
                                                <input 
                                                    type="file" name="resume" required accept=".pdf,.doc,.docx" onChange={handleChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="w-full bg-white/5 border-2 border-dashed border-white/10 rounded-3xl px-8 py-12 text-center group-hover:border-blue-500/50 transition-all group-hover:bg-blue-500/[0.02]">
                                                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                        <Upload className="text-blue-500" size={24} />
                                                    </div>
                                                    <p className="text-sm text-white font-bold mb-1">
                                                        {formData.resume ? formData.resume.name : "Choose file or drag & drop"}
                                                    </p>
                                                    <p className="text-[10px] text-white/20 uppercase tracking-widest font-black">Support: PDF, DOCX (Max 5MB)</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div 
                                            className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between cursor-pointer group hover:bg-blue-500/10 transition-all"
                                            onClick={() => setFormData(prev => ({ ...prev, workFromOffice: !prev.workFromOffice }))}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                    <MapPin size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-white uppercase tracking-wider">Office Preference</p>
                                                    <p className="text-[10px] text-white/40 uppercase font-black">Dwarka Office, Delhi</p>
                                                </div>
                                            </div>
                                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.workFromOffice ? 'bg-blue-500 border-blue-500 text-white' : 'border-white/10'}`}>
                                                {formData.workFromOffice && <CheckCircle size={14} />}
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-white/20 font-bold uppercase text-center">Are you comfortable to come and work in our Dwarka office?</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Footer / Buttons */}
                            <div className="flex gap-4 pt-6">
                                {step > 1 && (
                                    <button 
                                        type="button" onClick={prevStep}
                                        className="px-8 py-5 border border-white/10 rounded-2xl text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
                                    >
                                        Back
                                    </button>
                                )}
                                {step < 3 ? (
                                    <button 
                                        type="button" onClick={nextStep}
                                        className="flex-grow py-5 bg-white text-[#0f172a] font-black rounded-2xl uppercase tracking-[0.2em] text-[11px] hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-white/5"
                                    >
                                        Next Stage
                                    </button>
                                ) : (
                                    <button 
                                        type="submit" disabled={isSubmitting}
                                        className="flex-grow py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-[11px] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-blue-500/20 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Finalizing...' : 'Submit Professional Application'}
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </div>

                <style>{`
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.5); border-radius: 10px; }
                `}</style>
            </motion.div>
        </div>
    );
};

export default ITJobApplicationModal;
