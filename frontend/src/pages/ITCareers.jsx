import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, Search, ChevronRight, X, Mail, Phone, Send, CheckCircle, Sparkles, Filter } from 'lucide-react';
import ITJobApplicationModal from '../components/it/ITJobApplicationModal';
import ITJobDetailModal from '../components/it/ITJobDetailModal';
import ITBackground3D from '../components/it/ITBackground3D';

const ITCareers = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    
    // Modal state
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get('/content/jobs');
                if (response.data && response.data.data) {
                    setJobs(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const jobTypes = ['All', 'Full-time', 'Contract', 'Internship'];

    const filteredJobs = jobs.filter(job => {
        const query = searchTerm.toLowerCase();
        const matchesSearch = job.title.toLowerCase().includes(query) || 
                             job.department.toLowerCase().includes(query) ||
                             job.location.toLowerCase().includes(query);
        const matchesType = activeFilter === 'All' || job.type === activeFilter;
        return matchesSearch && matchesType;
    });

    const handleApply = (job) => {
        setSelectedJob(job);
        setIsApplyModalOpen(true);
    };

    const handleViewDetails = (job) => {
        setSelectedJob(job);
        setIsDetailModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#070b14] pt-32 pb-20 overflow-hidden relative">
            <ITBackground3D />
            
            {/* Ambient Backgrounds */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] -ml-64 -mb-64"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-6 md:mb-10"
                    >
                        <Sparkles size={14} /> Join Our Elite Team
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-bold text-white mb-6 md:mb-8"
                        style={{ fontFamily: '"Outfit", sans-serif', lineHeight: 1.1 }}
                    >
                        Shape the Future <br className="hidden md:block" />
                        <span className="text-blue-gradient">of Technology</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4 md:px-0"
                    >
                        We are looking for visionary engineers, designers, and thinkers who are ready to build the next generation of digital products.
                    </motion.p>
                </div>

                {/* Filters Row */}
                <div className="max-w-6xl mx-auto mb-10 md:mb-12 flex flex-col lg:flex-row gap-6 md:gap-8 items-center justify-between border-b border-white/5 pb-10 md:pb-12">
                    <div className="relative w-full lg:w-[450px]">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                            type="text"
                            placeholder="Find your next challenge..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 md:py-5 pl-14 pr-6 text-white text-sm md:text-base focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                        />
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-none w-full lg:w-auto">
                        <Filter size={16} className="text-white/20 mr-2 shrink-0 hidden sm:block" />
                        {jobTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setActiveFilter(type)}
                                className={`px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                                    activeFilter === type 
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-600/20' 
                                    : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Jobs Grid */}
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-40 bg-white/5 rounded-[2rem] border border-white/10 animate-pulse"></div>
                            ))}
                        </div>
                    ) : filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            <AnimatePresence mode='popLayout'>
                                {filteredJobs.map((job, idx) => (
                                    <motion.div
                                        layout
                                        key={job._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        className="group p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:bg-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        
                                        <div className="flex-grow space-y-3 md:space-y-4 relative z-10 w-full">
                                            <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                                <span className="px-3 py-1 md:px-4 md:py-1.5 bg-blue-500/10 text-blue-400 text-[8px] md:text-[10px] font-black uppercase tracking-[.2em] rounded-lg border border-blue-500/10">
                                                    {job.department}
                                                </span>
                                                <span className="px-3 py-1 md:px-4 md:py-1.5 bg-purple-500/10 text-purple-400 text-[8px] md:text-[10px] font-black uppercase tracking-[.2em] rounded-lg border border-purple-500/10">
                                                    {job.type}
                                                </span>
                                            </div>
                                            <h3 className="text-xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                                {job.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-4 md:gap-8 pt-1">
                                                <div className="flex items-center gap-2 text-white/40 text-[10px] md:text-sm font-bold uppercase tracking-widest">
                                                    <MapPin size={14} className="text-blue-500" /> {job.location}
                                                </div>
                                                <div className="flex items-center gap-2 text-white/40 text-[10px] md:text-sm font-bold uppercase tracking-widest">
                                                    <Clock size={14} className="text-purple-500" /> Full-Time
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full md:w-auto mt-2 md:mt-0 relative z-10">
                                            <button 
                                                onClick={() => handleViewDetails(job)}
                                                className="w-full sm:w-auto px-6 md:px-8 py-4 md:py-5 bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 font-bold rounded-xl md:rounded-2xl uppercase tracking-widest text-[9px] md:text-[11px] transition-all flex items-center justify-center gap-2 md:gap-3"
                                            >
                                                View Details
                                            </button>
                                            <button 
                                                onClick={() => handleApply(job)}
                                                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl md:rounded-2xl uppercase tracking-widest text-[9px] md:text-[11px] shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all group-hover:shadow-blue-500/40 flex items-center justify-center gap-2 md:gap-3"
                                            >
                                                Apply Now <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-white/10">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Briefcase className="text-white/20" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No Matching Positions</h3>
                            <p className="text-white/40 max-w-md mx-auto">We couldn't find any open roles matching your search. Keep an eye on this page for future opportunities!</p>
                        </div>
                    )}
                </div>

                <div className="mt-20 max-w-4xl mx-auto text-center">
                    <p className="text-gray-500 text-sm italic">
                        Can't find a role that fits? Shoot us an email at <span className="text-blue-400 font-bold border-b border-blue-400/30">hr@primeimpact.in</span>
                    </p>
                </div>
            </div>

            <ITJobApplicationModal 
                isOpen={isApplyModalOpen} 
                onClose={() => setIsApplyModalOpen(false)} 
                jobTitle={selectedJob?.title}
            />

            <ITJobDetailModal 
                isOpen={isDetailModalOpen} 
                onClose={() => setIsDetailModalOpen(false)} 
                job={selectedJob}
                onApply={handleApply}
            />
        </div>
    );
};

export default ITCareers;
