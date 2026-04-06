import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import ITBackground3D from '../components/it/ITBackground3D';

const ITBlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await api.get('/content/blogs');
                if (response.data && response.data.data) {
                    setBlogs(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const categories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#070b14] pt-32 pb-20 relative overflow-hidden">
            <ITBackground3D />
            
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] -mr-64 -mt-64"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] -ml-64 -mb-64"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
                    >
                        Our Insights
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                        Tech <span className="text-blue-gradient">Perspectives</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg"
                    >
                        Exploring the future of technology, software engineering, and digital transformation.
                    </motion.p>
                </div>

                {/* Filters */}
                <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                                    activeCategory === cat 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-[450px] rounded-3xl bg-white/5 animate-pulse border border-white/10"></div>
                        ))}
                    </div>
                ) : filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode='popLayout'>
                            {filteredBlogs.map((blog, idx) => (
                                <motion.article
                                    layout
                                    key={blog._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full shadow-2xl hover:shadow-blue-500/10"
                                >
                                    <Link to={`/blog/${blog.slug}`} className="relative h-64 overflow-hidden block">
                                        <img 
                                            src={blog.image} 
                                            alt={blog.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-60"></div>
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-1.5 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                                                {blog.category || 'Technology'}
                                            </span>
                                        </div>
                                    </Link>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-6 text-[10px] uppercase font-black tracking-widest text-white/40 mb-6 border-b border-white/5 pb-6">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-blue-500" />
                                                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-purple-500" />
                                                {blog.readTime || '5 min'}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                                            <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                                        </h3>
                                        
                                        <p className="text-gray-400 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">
                                            {blog.excerpt}
                                        </p>

                                        <div className="mt-auto pt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-[1px]">
                                                    <div className="w-full h-full rounded-full bg-[#070b14] flex items-center justify-center">
                                                        <User size={14} className="text-white" />
                                                    </div>
                                                </div>
                                                <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider">{blog.author || 'Admin'}</span>
                                            </div>
                                            <Link to={`/blog/${blog.slug}`} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                                                <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <div className="text-white/20 mb-4 flex justify-center">
                            <Search size={64} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                        <p className="text-white/50">Try adjusting your search or category filter.</p>
                        <button 
                            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                            className="mt-6 text-blue-400 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ITBlogList;
