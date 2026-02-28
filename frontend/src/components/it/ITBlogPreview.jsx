import React, { useState } from 'react';
import { Calendar, ArrowRight, BookOpen, X, Clock, User, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ITBlogPreview = () => {
    const [selectedPost, setSelectedPost] = useState(null);

    const posts = [
        {
            title: "The Future of AI in SaaS Development",
            date: "Feb 24, 2026",
            author: "Dr. Arpit Goel",
            readTime: "8 min read",
            category: "Artificial Intelligence",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
            excerpt: "How generative AI and RAG are changing the way we build modern software products.",
            content: `
                <p className="mb-6">Artificial Intelligence is no longer just a buzzword; it's the core engine driving the next generation of SaaS applications. As we move into 2026, the integration of Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG) is transforming user experiences from static dashboards to proactive assistants.</p>
                <h4 className="text-xl font-bold text-white mb-4">The Shift to Agentic Workflows</h4>
                <p className="mb-6">Traditional SaaS tools required users to learn complex interfaces. Today, the interface is disappearing. Agents can now understand intent, navigate complex data structures, and execute tasks on behalf of the user. This shift is reducing churn and increasing the perceived value of software exponentially.</p>
                <h4 className="text-xl font-bold text-white mb-4">RAG: The Key to Context</h4>
                <p className="mb-6">Raw LLMs are limited by their training data. By implementing RAG, developers can connect these models to real-time company data, ensuring that every AI interaction is grounded, accurate, and highly relevant to the specific business context.</p>
                <p>At Prime Impact, we are pioneering these integrations to help startups stay ahead of the curve.</p>
            `
        },
        {
            title: "Scaling Cloud Infrastructure for 1M+ Users",
            date: "Feb 20, 2026",
            author: "Saurabh Tyagi",
            readTime: "12 min read",
            category: "Cloud & DevOps",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
            excerpt: "Mastering Kubernetes and serverless architecture for global-scale applications.",
            content: `
                <p className="mb-6">Scaling a platform from a few thousand users to over a million requires more than just adding bigger servers. It requires a fundamental shift in architecture toward distributed systems and automated elasticity.</p>
                <h4 className="text-xl font-bold text-white mb-4">Kubernetes at Scale</h4>
                <p className="mb-6">Container orchestration is the backbone of modern scaling. However, misconfigured clusters can lead to massive costs and outages. We'll explore how to implement auto-scaling groups, horizontal pod autoscalers, and global load balancing to handle traffic spikes effortlessly.</p>
                <h4 className="text-xl font-bold text-white mb-4">Serverless for the Edge</h4>
                <p className="mb-6">By moving heavy computations to edge functions, we reduce latency and offload the main infrastructure. This hybrid approach—using Kubernetes for core logic and Serverless for the edge—is the current gold standard for global performance.</p>
                <p>Infrastructure is the foundation of growth. Ensure yours is built to last with Prime Impact's DevOps expertise.</p>
            `
        },
        {
            title: "Modern Web Performance in 2026",
            date: "Feb 15, 2026",
            author: "Anjali Sharma",
            readTime: "6 min read",
            category: "Web Development",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
            excerpt: "Why Next.js 15 and Partial Prerendering are game changers for core web vitals.",
            content: `
                <p className="mb-6">Web performance is no longer an afterthought—it's a conversion metric. With Google's latest updates to Core Web Vitals, speed is the most critical factor for SEO and user retention.</p>
                <h4 className="text-xl font-bold text-white mb-4">Partial Prerendering (PPR)</h4>
                <p className="mb-6">PPR allows us to combine the speed of static pages with the power of dynamic content. Imagine a page that loads a static shell instantly while streaming in user-specific data in the background. This is the future of the web.</p>
                <h4 className="text-xl font-bold text-white mb-4">Optimizing for the LCP</h4>
                <p className="mb-6">Largest Contentful Paint remains the biggest challenge. We'll look at advanced image optimization, font preloading, and reducing main-thread blocking to ensure your site feels instantaneous on any device.</p>
                <p>Speed is power. Let Prime Impact optimize your digital presence for maximum impact.</p>
            `
        }
    ];

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">Insights</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-4" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            Latest from <span className="text-blue-500">Prime Impact Blog</span>:
                        </h2>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-lg text-white font-bold hover:bg-white/5 transition-all">
                        View All Articles <BookOpen size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <div key={i} className="group rounded-2xl overflow-hidden bg-[#0d1117] border border-white/5 hover:border-blue-500/30 transition-all duration-500">
                            <div className="h-56 overflow-hidden relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 py-1 px-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-4 text-gray-500 text-[10px] mb-4 uppercase tracking-[0.2em] font-bold">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={12} className="text-blue-500" /> {post.date}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={12} className="text-blue-500" /> {post.readTime}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <button
                                    onClick={() => setSelectedPost(post)}
                                    className="flex items-center gap-2 text-blue-500 font-bold text-sm uppercase tracking-wider group/btn hover:text-white transition-colors"
                                >
                                    Read Full Post <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Blog Post Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPost(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] bg-[#0d1117] border border-white/10 shadow-2xl flex flex-col"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Sticky Header with Image */}
                            <div className="relative h-64 md:h-80 shrink-0">
                                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent"></div>

                                <div className="absolute bottom-8 left-8 right-8">
                                    <span className="px-4 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg inline-block mb-4">
                                        {selectedPost.category}
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight shadow-text">{selectedPost.title}</h2>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
                                <div className="max-w-3xl mx-auto">
                                    {/* Meta Info */}
                                    <div className="flex flex-wrap items-center gap-6 mb-10 pb-8 border-b border-white/5 text-gray-400 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Written by</p>
                                                <p className="text-white font-bold">{selectedPost.author}</p>
                                            </div>
                                        </div>
                                        <div className="h-8 w-[1px] bg-white/5 hidden md:block"></div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={18} className="text-blue-500" />
                                            <span>{selectedPost.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={18} className="text-blue-500" />
                                            <span>{selectedPost.readTime}</span>
                                        </div>
                                    </div>

                                    {/* Article Content */}
                                    <div
                                        className="prose prose-invert max-w-none text-gray-300 text-lg leading-relaxed mb-12"
                                        dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                                    />

                                    {/* Share/Actions */}
                                    <div className="flex items-center justify-between pt-10 border-t border-white/5">
                                        <div className="flex gap-4">
                                            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
                                                <Share2 size={18} /> Share Insight
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => setSelectedPost(null)}
                                            className="text-blue-400 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                                        >
                                            Back to Blog
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ITBlogPreview;
