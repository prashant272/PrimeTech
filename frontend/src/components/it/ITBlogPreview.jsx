import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const ITBlogPreview = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await api.get('/content/blogs');
                if (res.data && res.data.data) {
                    setPosts(res.data.data.slice(0, 3));
                }
            } catch (err) {
                console.error('Failed to fetch blogs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="py-24 text-center">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            </div>
        );
    }

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl text-left">
                        <span className="text-blue-400 font-bold tracking-widest uppercase text-[10px]">Insights</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mt-4" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            Latest from <span className="text-blue-500">Prime Impact Blog</span>
                        </h2>
                    </div>
                    <button className="flex items-center gap-2 px-8 py-3.5 border border-white/10 rounded-xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">
                        View All Articles <BookOpen size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group rounded-[2.5rem] overflow-hidden bg-[#0d1117] border border-white/5 hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-6 left-6 py-1.5 px-4 bg-blue-600 text-white text-[9px] font-black uppercase tracking-wider rounded-lg shadow-lg">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-10 flex flex-col flex-grow text-left">
                                <div className="flex items-center gap-4 text-white/30 text-[9px] mb-6 uppercase tracking-[0.2em] font-black">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={12} className="text-blue-500" /> {new Date(post.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={12} className="text-blue-500" /> {post.readTime}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight line-clamp-2" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                    {post.title}
                                </h3>
                                <p className="text-white/40 text-sm mb-8 leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <button
                                    onClick={() => navigate(`/blog/${post.slug}`)}
                                    className="mt-auto flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-widest group/btn hover:text-white transition-colors"
                                >
                                    Read Full Post <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ITBlogPreview;
