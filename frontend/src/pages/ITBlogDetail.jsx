import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { 
    Calendar, 
    Clock, 
    User, 
    ArrowLeft, 
    Share2, 
    Facebook, 
    Twitter, 
    Linkedin,
    Bookmark,
    MessageSquare,
    Eye,
    ChevronRight,
    Play
} from 'lucide-react';
import ITNavbar from '../components/it/ITNavbar';
import ITFooter from '../components/it/ITFooter';
import ITBackground3D from '../components/it/ITBackground3D';

const ITBlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/content/blogs/${slug}`);
                if (res.data && res.data.data) {
                    setBlog(res.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch blog:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#070b14] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center text-white p-6 text-center">
                <h1 className="text-4xl font-black mb-4">Insight Not Found</h1>
                <Link to="/" className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-2">
                    <ArrowLeft size={20} /> Back to Insights
                </Link>
            </div>
        );
    }

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    return (
        <div className="min-h-screen bg-[#070b14] text-white selection:bg-blue-500/30 relative">
            <ITBackground3D />
            <ITNavbar />

            {/* Hero Section: Centered Spotlight */}
            <header className="relative pt-44 pb-20 overflow-hidden text-center">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-4 mb-10 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl"
                        >
                            <Link to="/" className="text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em] text-[9px] font-black flex items-center gap-2 group">
                                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Insights
                            </Link>
                            <div className="h-3 w-px bg-white/20"></div>
                            <span className="text-blue-400 uppercase tracking-[0.2em] text-[9px] font-black">{blog.category || "Technology"}</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black mb-10 leading-[1.1] tracking-tighter text-white"
                            style={{ fontFamily: '"Outfit", sans-serif' }}
                        >
                            {blog.title}
                        </motion.h1>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 py-10 border-y border-white/5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400">
                                    <User size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[9px] uppercase tracking-widest font-black text-white/30">Author</p>
                                    <p className="text-white font-bold">{blog.author || 'Prime Solutions'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400">
                                    <Calendar size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[9px] uppercase tracking-widest font-black text-white/30">Published</p>
                                    <p className="text-white font-bold">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-400">
                                    <Clock size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[9px] uppercase tracking-widest font-black text-white/30">Read Time</p>
                                    <p className="text-white font-bold">{blog.readTime || '5 min read'}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative pb-32">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        {/* Featured Image */}
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="relative rounded-[2.5rem] overflow-hidden mb-20 shadow-2xl border border-white/10 group"
                        >
                            <img 
                                src={blog.image} 
                                alt={blog.title} 
                                className="w-full h-auto object-cover max-h-[500px] transition-transform duration-1000 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/60 via-transparent to-transparent opacity-40"></div>
                        </motion.div>

                        {/* Article Content */}
                        <div className="max-w-3xl mx-auto">
                            <article className="prose prose-invert max-w-none prose-lg">
                                <div className="text-white leading-[1.8] space-y-8 blog-premium-content" 
                                    dangerouslySetInnerHTML={{ __html: blog.content }} 
                                />
                            </article>

                            {/* Share Section */}
                            <motion.div 
                                {...fadeInUp}
                                className="mt-24 p-12 bg-white/[0.03] border border-white/10 rounded-[3rem] backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] rounded-full"></div>
                                
                                <div>
                                    <h4 className="text-2xl font-black text-white mb-2">Share this Insight</h4>
                                    <p className="text-white/40 text-sm">Empower your network with enterprise knowledge.</p>
                                </div>

                                <div className="flex gap-4">
                                    <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-blue-600 hover:text-white transition-all shadow-lg active:scale-95">
                                        <Facebook size={22} />
                                    </button>
                                    <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-blue-400 hover:text-white transition-all shadow-lg active:scale-95">
                                        <Twitter size={22} />
                                    </button>
                                    <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-blue-700 hover:text-white transition-all shadow-lg active:scale-95">
                                        <Linkedin size={22} />
                                    </button>
                                    <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center gap-3">
                                        <Share2 size={16} className="text-blue-500" /> Copy Link
                                    </button>
                                </div>
                            </motion.div>

                            {/* CTA Focus */}
                            <motion.div 
                                {...fadeInUp}
                                className="mt-12 p-12 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] text-center shadow-2xl relative group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                <h4 className="text-3xl font-black text-white mb-4 relative z-10">Want deeper Tech Solutions?</h4>
                                <p className="text-white/80 mb-10 font-medium relative z-10">Let's build your enterprise future together.</p>
                                <Link 
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-600 font-extrabold uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl relative z-10"
                                >
                                    Get Expert Consultation <ChevronRight size={16} />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <ITFooter />

            <style>{`
                .blog-premium-content p { 
                    margin-bottom: 2rem; 
                    line-height: 1.8; 
                    font-size: 1.25rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.9);
                }
                .blog-premium-content h2, .blog-premium-content h3, .blog-premium-content h4 { 
                    color: white; 
                    font-weight: 900; 
                    margin-top: 3.5rem; 
                    margin-bottom: 1.5rem; 
                    font-family: 'Outfit', sans-serif; 
                    text-transform: uppercase; 
                    letter-spacing: -0.02em; 
                    line-height: 1.2;
                }
                .blog-premium-content h2 { font-size: 2.25rem; }
                .blog-premium-content h3 { font-size: 1.75rem; }
                .blog-premium-content ul { margin-bottom: 2rem; padding-left: 1.5rem; }
                .blog-premium-content li { margin-bottom: 0.75rem; color: rgba(255,255,255,0.8); list-style-type: square; font-size: 1.125rem; }
                .blog-premium-content blockquote { border-left: 6px solid #3b82f6; padding: 1.5rem 2rem; font-style: italic; color: white; background: rgba(255,255,255,0.03); border-radius: 0 1.5rem 1.5rem 0; margin: 3rem 0; font-size: 1.4rem; }
            `}</style>
        </div>
    );
};

export default ITBlogDetail;
