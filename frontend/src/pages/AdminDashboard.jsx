import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    LogOut,
    Shield,
    ChevronRight,
    Search,
    RefreshCw,
    ExternalLink,
    Mail,
    Phone,
    Globe,
    Package,
    Plus,
    Edit3,
    Trash2,
    Save,
    X,
    Check,
    Sparkles,
    User,
    CheckCircle2,
    AlertTriangle,
    Info,
    Briefcase,
    MapPin,
    Clock,
    FileText,
    FileCheck,
    Download,
    Volume2,
    Zap,
    Settings,
    Brain
} from 'lucide-react';
import api from '../api/axios';

// --- Toast Notification ---
const Toast = ({ toasts }) => (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
            {toasts.map(t => (
                <motion.div key={t.id} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }}
                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border pointer-events-auto min-w-[280px] ${t.type === 'success' ? 'bg-emerald-950 border-emerald-500/40 text-emerald-300' :
                        t.type === 'error' ? 'bg-red-950 border-red-500/40 text-red-300' :
                            'bg-blue-950 border-blue-500/40 text-blue-300'
                        }`}>
                    {t.type === 'success' ? <CheckCircle2 size={18} /> : t.type === 'error' ? <AlertTriangle size={18} /> : <Info size={18} />}
                    <span className="text-sm font-semibold">{t.message}</span>
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
);

// --- Confirm Modal ---
const ConfirmModal = ({ data, onConfirm, onCancel }) => (
    <div className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0f1929] border border-red-500/30 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center"><AlertTriangle className="text-red-400" size={24} /></div>
                <div>
                    <h3 className="text-lg font-bold text-white">Delete Confirmation</h3>
                    <p className="text-white/40 text-sm">This action cannot be undone.</p>
                </div>
            </div>
            <p className="text-white/70 mb-6 bg-white/5 rounded-xl px-4 py-3 text-sm">
                Are you sure you want to delete <span className="font-bold text-white">"{data.title}"</span>?
            </p>
            <div className="flex gap-3">
                <button onClick={onCancel} className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all font-semibold text-sm">Cancel</button>
                <button onClick={onConfirm} className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"><Trash2 size={16} /> Delete</button>
            </div>
        </motion.div>
    </div>
);

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('leads');
    const [leads, setLeads] = useState([]);
    const [products, setProducts] = useState([]);
    const [visaPricings, setVisaPricings] = useState([]);
    const [cases, setCases] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [chatConfig, setChatConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [stats, setStats] = useState({ total: 0, products: 0, visa: 0, applications: 0 });
    const [editingItem, setEditingItem] = useState(null);
    const [toasts, setToasts] = useState([]);
    const [confirmModal, setConfirmModal] = useState(null); // { slug, title }
    const [expandedAppId, setExpandedAppId] = useState(null);
    const [expandedLeadId, setExpandedLeadId] = useState(null);
    const [chatLogs, setChatLogs] = useState([]);
    const [logFilter, setLogFilter] = useState('all');
    const navigate = useNavigate();

    const showToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/prime-admin');
            return;
        }
        fetchData();

        // Auto-refresh logic for the Chat tab to show real-time learning
        let interval;
        if (activeTab === 'chat') {
            interval = setInterval(() => {
                fetchData();
            }, 10000); // 10 seconds sync
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [navigate, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'leads') {
                const response = await api.get('/leads');
                if (response.data && response.data.data) {
                    setLeads(response.data.data);
                    const leadsData = response.data.data;
                    setStats({
                        total: leadsData.length,
                        products: leadsData.filter(l => l.interest?.includes('Product')).length,
                        visa: leadsData.filter(l => l.interest?.includes('Visa')).length
                    });
                }
            } else if (activeTab === 'products') {
                const response = await api.get('/content/products');
                if (response.data && response.data.data) {
                    setProducts(response.data.data);
                }
            } else if (activeTab === 'visa') {
                const response = await api.get('/content/visas');
                if (response.data && response.data.data) {
                    setVisaPricings(response.data.data);
                }
            } else if (activeTab === 'cases') {
                const response = await api.get('/content/case-studies');
                if (response.data && response.data.data) {
                    setCases(response.data.data);
                }
            } else if (activeTab === 'blogs') {
                const response = await api.get('/content/blogs');
                if (response.data && response.data.data) {
                    setBlogs(response.data.data);
                }
            } else if (activeTab === 'jobs') {
                const response = await api.get('/content/jobs');
                if (response.data && response.data.data) {
                    setJobs(response.data.data);
                }
            } else if (activeTab === 'applications') {
                const response = await api.get('/recruit');
                if (response.data && response.data.data) {
                    setApplications(response.data.data);
                    setStats(prev => ({ ...prev, applications: response.data.data.length }));
                }
            } else if (activeTab === 'chat') {
                const configRes = await api.get('/admin/chat-config');
                setChatConfig(configRes.data);
                
                const logsRes = await api.get('/ai/logs');
                if (logsRes.data && logsRes.data.data) {
                    console.log(`Fetched ${logsRes.data.data.length} logs`);
                    setChatLogs(logsRes.data.data);
                }
            }
        } catch (error) {
            console.error(`Failed to fetch ${activeTab}:`, error);
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken');
                navigate('/prime-admin');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTrainLog = async (log) => {
        try {
            const token = localStorage.getItem('adminToken');
            const newRule = { 
                keyword: log.query, 
                action: 'message', 
                value: log.response 
            };
            
            const updatedRules = [...chatConfig.rules, newRule];
            const newConfig = { ...chatConfig, rules: updatedRules };
            
            await api.post('/admin/chat-config', newConfig, {
                headers: { Authorization: `Bearer ${token}` }
            });

            await api.post(`/ai/train/${log._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setChatConfig(newConfig);
            setChatLogs(prev => prev.map(l => l._id === log._id ? { ...l, isTrained: true } : l));
            showToast('Knowledge added to Bot successfully!', 'success');
        } catch (error) {
            showToast('Failed to train bot', 'error');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/prime-admin');
    };

    // CMS Handlers
    const saveVisa = async (data) => {
        try {
            await api.post('/content/visas', data);
            setEditingItem(null);
            fetchData();
            showToast('Visa saved successfully!', 'success');
        } catch (err) {
            showToast('Failed to save visa: ' + (err.response?.data?.message || err.message), 'error');
        }
    };

    const saveCase = async (data) => {
        try {
            await api.post('/content/case-studies', data);
            showToast(`Case study "${data.title}" deployed successfully`, 'success');
            setEditingItem(null);
            fetchData();
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to save case study', 'error');
        }
    };

    const saveBlog = async (data) => {
        try {
            // Blogs support image uploads, so we might need FormData
            let payload = data;
            let config = {};

            if (data.imageFile) {
                payload = new FormData();
                Object.keys(data).forEach(key => {
                    if (key === 'imageFile') {
                        payload.append('image', data.imageFile);
                    } else {
                        payload.append(key, data[key]);
                    }
                });
                config = { headers: { 'Content-Type': 'multipart/form-data' } };
            }

            await api.post('/content/blogs', payload, config);
            showToast(`Blog article "${data.title}" published successfully`, 'success');
            setEditingItem(null);
            fetchData();
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to publish blog', 'error');
        }
    };

    const saveProduct = async (data) => {
        try {
            await api.post('/content/products', data);
            setEditingItem(null);
            fetchData();
            showToast('Product saved successfully!', 'success');
        } catch (err) {
            showToast('Failed to save product: ' + (err.response?.data?.message || err.message), 'error');
        }
    };

    const saveJob = async (data) => {
        try {
            await api.post('/content/jobs', data);
            showToast(`Job "${data.title}" saved successfully`, 'success');
            setEditingItem(null);
            fetchData();
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to save job', 'error');
        }
    };

    const handleDeleteProduct = (slug, title) => {
        setConfirmModal({ slug, title, type: 'product' });
    };

    const handleDeleteVisa = (slug, title) => {
        setConfirmModal({ slug, title, type: 'visa' });
    };

    const handleDeleteCase = (slug, title) => {
        setConfirmModal({ slug, title, type: 'case' });
    };

    const handleDeleteBlog = (slug, title) => {
        setConfirmModal({
            slug,
            title,
            type: 'blog',
            onConfirm: async () => {
                try {
                    await api.delete(`/content/blogs/${slug}`);
                    showToast(`Blog "${title}" deleted`, 'success');
                    fetchData();
                } catch (error) {
                    showToast('Failed to delete blog', 'error');
                }
            }
        });
    };

    const handleDeleteJob = (id, title) => {
        setConfirmModal({
            slug: id,
            title,
            type: 'job',
            onConfirm: async () => {
                try {
                    await api.delete(`/content/jobs/${id}`);
                    showToast(`Job "${title}" deleted`, 'success');
                    setJobs(prev => prev.filter(j => j._id !== id));
                } catch (error) {
                    showToast('Failed to delete job', 'error');
                }
            }
        });
    };

    const handleUpdateAppStatus = async (id, status) => {
        try {
            await api.patch(`/recruit/${id}/status`, { status });
            showToast(`Status updated to ${status}`, 'success');
            setApplications(prev => prev.map(a => a._id === id ? { ...a, status } : a));
        } catch (error) {
            showToast('Failed to update status', 'error');
        }
    };

    const handleDeleteApplication = (id, applicant) => {
        setConfirmModal({
            slug: id,
            title: `Application from ${applicant}`,
            type: 'application',
            onConfirm: async () => {
                try {
                    await api.delete(`/recruit/${id}`);
                    showToast(`Application deleted`, 'success');
                    setApplications(prev => prev.filter(a => a._id !== id));
                } catch (error) {
                    showToast('Failed to delete application', 'error');
                }
            }
        });
    };

    const confirmDelete = async () => {
        if (confirmModal.onConfirm) {
            await confirmModal.onConfirm();
            setConfirmModal(null);
            return;
        }
        const { slug, title, type } = confirmModal;
        setConfirmModal(null);
        try {
            const endpoint = type === 'product' ? 'products' : type === 'visa' ? 'visas' : 'case-studies';
            await api.delete(`/content/${endpoint}/${slug}`);
            if (type === 'product') {
                setProducts(prev => prev.filter(p => p.slug !== slug));
            } else if (type === 'visa') {
                setVisaPricings(prev => prev.filter(v => v.slug !== slug));
            } else {
                setCases(prev => prev.filter(c => c.slug !== slug));
            }
            showToast(`"${title}" deleted successfully.`, 'success');
        } catch (err) {
            const msg = err.response?.status === 404
                ? `${type === 'product' ? 'Product' : 'Visa'} "${title}" not found in database.`
                : 'Delete failed: ' + (err.response?.data?.message || err.message);
            showToast(msg, 'error');
        }
    };

    return (
        <div className="min-h-screen bg-[#070b14] flex">
            {/* Global Toast Notifications */}
            <Toast toasts={toasts} />

            {/* Delete Confirmation Modal */}
            {confirmModal && (
                <ConfirmModal
                    data={confirmModal}
                    onConfirm={confirmDelete}
                    onCancel={() => setConfirmModal(null)}
                />
            )}

            {/* Sidebar */}
            <div className="w-64 border-r border-white/5 bg-[#0a1120] flex flex-col fixed h-full z-10">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                            <Shield className="text-white" size={20} />
                        </div>
                        <span className="text-lg font-black tracking-tight">Prime Admin</span>
                    </div>

                    <nav className="space-y-2">
                        <button
                            onClick={() => setActiveTab('leads')}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'leads' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white'}`}
                        >
                            <LayoutDashboard size={18} /> Leads Intelligence
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'products' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white'}`}
                        >
                            <Package size={18} /> Manage Products
                        </button>
                        <button
                            onClick={() => setActiveTab('visa')}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'visa' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white'}`}
                        >
                            <Globe size={18} /> Manage Visas
                        </button>
                        <button onClick={() => setActiveTab('cases')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'cases' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-white/40 hover:bg-white/5'}`}>
                            <Sparkles size={20} />
                            <span className="font-bold text-sm tracking-widest uppercase">Success Stories</span>
                        </button>
                        <button onClick={() => setActiveTab('blogs')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'blogs' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-white/40 hover:bg-white/5'}`}>
                            <MessageSquare size={20} />
                            <span className="font-bold text-sm tracking-widest uppercase">Insights & Blog</span>
                        </button>
                        <button onClick={() => setActiveTab('jobs')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'jobs' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-white/40 hover:bg-white/5'}`}>
                            <Briefcase size={20} />
                            <span className="font-bold text-sm tracking-widest uppercase">Careers & Jobs</span>
                        </button>
                        <button onClick={() => setActiveTab('applications')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'applications' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-white/40 hover:bg-white/5'}`}>
                            <FileCheck size={20} />
                            <span className="font-bold text-sm tracking-widest uppercase">Job Applications</span>
                        </button>
                        <button onClick={() => setActiveTab('chat')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'chat' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-white/40 hover:bg-white/5'}`}>
                            <Sparkles size={20} />
                            <span className="font-bold text-sm tracking-widest uppercase">AI Chatbot</span>
                        </button>
                    </nav>
                </div>

                <div className="mt-auto p-8">
                    <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-bold text-sm">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow pl-64">
                <div className="p-10 max-w-7xl mx-auto min-h-screen">
                    <AnimatePresence mode="wait">
                        {activeTab === 'leads' && (
                            <motion.div key="leads" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h1 className="text-4xl font-black mb-2" style={{ fontFamily: '"Outfit", sans-serif' }}>Intelligence Center</h1>
                                        <p className="text-white/40 font-medium">Tracking all Prime Impact digital inquiries.</p>
                                    </div>
                                    <button onClick={fetchData} className="p-3 bg-white/5 border border-white/10 rounded-xl active:rotate-180 duration-500"><RefreshCw size={20} /></button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                    <StatCard label="Total Inquiries" value={stats.total} icon={<MessageSquare />} color="blue" />
                                    <StatCard label="Product Interest" value={stats.products} icon={<Package />} color="purple" />
                                    <StatCard label="Visa Interest" value={stats.visa} icon={<Globe />} color="emerald" />
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
                                    <LeadsTable
                                        leads={leads}
                                        loading={loading}
                                        expandedId={expandedLeadId}
                                        setExpandedId={setExpandedLeadId}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'products' && (
                            <motion.div key="products" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h1 className="text-4xl font-black mb-2" style={{ fontFamily: '"Outfit", sans-serif' }}>Product CMS</h1>
                                        <p className="text-white/40 font-medium">Update descriptions and metadata for enterprise solutions.</p>
                                    </div>
                                    <button onClick={() => setEditingItem({ type: 'product', data: {} })} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all">
                                        <Plus size={18} /> Add Product
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {products.map(product => (
                                        <div key={product._id} className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:border-blue-500/30 transition-all">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-400">
                                                    <Package size={24} />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setEditingItem({ type: 'product', data: product })} className="p-2 bg-white/5 rounded-lg hover:text-blue-400 transition-colors" title="Edit Product"><Edit3 size={16} /></button>
                                                    <button onClick={() => handleDeleteProduct(product.slug, product.title)} className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 hover:text-red-400 text-red-400/60 transition-colors" title="Delete Product"><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{product.title}</h3>
                                            <p className="text-white/40 text-sm line-clamp-2 mb-6">{product.heroDesc}</p>
                                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                                <span className="text-[10px] font-black uppercase text-blue-500">Slug: {product.slug}</span>
                                                <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest">Active</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'visa' && (
                            <motion.div key="visa" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h1 className="text-4xl font-black mb-2" style={{ fontFamily: '"Outfit", sans-serif' }}>Visa Management</h1>
                                        <p className="text-white/40 font-medium">Control all visa detail pages, pricing, and documentation rules.</p>
                                    </div>
                                    <button
                                        onClick={() => setEditingItem({
                                            type: 'visa', data: {
                                                slug: '', title: '', heroDesc: '', bgImage: '', fullDesc: '', detailedInfo: '',
                                                whyChooseUs: [], types: [], documents: [], process: [], features: []
                                            }
                                        })}
                                        className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20"
                                    >
                                        <Plus size={20} /> Add New Visa
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {visaPricings.map(visa => (
                                        <div key={visa._id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 group hover:bg-white/[0.08] transition-all relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 blur-[60px] rounded-full"></div>

                                            <div className="relative z-10">
                                                <div className="flex items-start justify-between mb-6">
                                                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                                                        <Globe size={32} />
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setEditingItem({ type: 'visa', data: visa })}
                                                            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/40 hover:text-white transition-all"
                                                        >
                                                            <Edit3 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteVisa(visa.slug, visa.title)}
                                                            className="p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-all"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <h3 className="text-2xl font-black mb-2 leading-tight">{visa.title}</h3>
                                                <p className="text-white/30 text-xs font-medium mb-6 uppercase tracking-widest">{visa.slug}</p>

                                                <div className="flex flex-wrap gap-2 mb-8">
                                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">{visa.types?.length || 0} Categories</span>
                                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">Active</span>
                                                </div>

                                                <p className="text-white/40 text-sm line-clamp-2 mb-8">{visa.heroDesc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'cases' && (
                            <motion.div key="cases" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h1 className="text-4xl font-black mb-2" style={{ fontFamily: '"Outfit", sans-serif' }}>IT Case Studies</h1>
                                        <p className="text-white/40 font-medium">Manage and showcase successful project deliveries.</p>
                                    </div>
                                    <button
                                        onClick={() => setEditingItem({
                                            type: 'case', data: {
                                                title: '', slug: '', industry: '', description: '', problem: '', solution: '',
                                                fullStory: '', challenge: '', approach: '', image: '', results: []
                                            }
                                        })}
                                        className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20"
                                    >
                                        <Plus size={20} /> New Case Study
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {cases.map(item => (
                                        <div key={item._id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 group hover:bg-white/[0.08] transition-all relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[60px] rounded-full"></div>

                                            <div className="relative z-10">
                                                <div className="flex items-start justify-between mb-6">
                                                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl overflow-hidden flex items-center justify-center">
                                                        <img src={item.image} alt="" className="w-full h-full object-cover opacity-50" />
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setEditingItem({ type: 'case', data: item })}
                                                            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/40 hover:text-white transition-all"
                                                        >
                                                            <Edit3 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteCase(item.slug, item.title)}
                                                            className="p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-all"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <h3 className="text-2xl font-black mb-2 leading-tight">{item.title}</h3>
                                                <p className="text-blue-400 text-[10px] font-black mb-4 uppercase tracking-[0.2em]">{item.industry}</p>
                                                <p className="text-white/40 text-sm line-clamp-2 mb-8">{item.description}</p>

                                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Slug: {item.slug}</span>
                                                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest">Active</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'blogs' && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h1 className="text-4xl font-black mb-2" style={{ fontFamily: '"Outfit", sans-serif' }}>Tech Insights & Blog</h1>
                                        <p className="text-white/40 font-medium">Publish articles, whitepapers, and thought leadership pieces.</p>
                                    </div>
                                    <button
                                        onClick={() => setEditingItem({
                                            type: 'blog', data: {
                                                title: '', slug: '', category: 'Technology', author: '', readTime: '',
                                                excerpt: '', content: '', image: '', active: true
                                            }
                                        })}
                                        className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20"
                                    >
                                        <Plus size={20} /> New Article
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {blogs.map(item => (
                                        <div key={item._id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 group hover:bg-white/[0.08] transition-all relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full"></div>

                                            <div className="relative z-10 text-left">
                                                <div className="flex items-start justify-between mb-6">
                                                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl overflow-hidden flex items-center justify-center">
                                                        <img src={item.image} alt="" className="w-full h-full object-cover opacity-50" />
                                                    </div>
                                                    <div className="flex gap-2 text-left">
                                                        <button
                                                            onClick={() => setEditingItem({ type: 'blog', data: item })}
                                                            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/40 hover:text-white transition-all"
                                                        >
                                                            <Edit3 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteBlog(item.slug, item.title)}
                                                            className="p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-all"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <h3 className="text-2xl font-black mb-2 leading-tight">{item.title}</h3>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">{item.category}</p>
                                                    <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                                                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">{item.author}</p>
                                                </div>
                                                <p className="text-white/40 text-sm line-clamp-2 mb-8">{item.excerpt}</p>

                                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{item.readTime}</span>
                                                    <span className={`px-3 py-1 ${item.active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'} rounded-full text-[10px] font-black uppercase tracking-widest`}>
                                                        {item.active ? 'Published' : 'Draft'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'jobs' && (
                            <motion.div key="jobs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h1 className="text-4xl font-black mb-2" style={{ fontFamily: '"Outfit", sans-serif' }}>Careers & Jobs</h1>
                                        <p className="text-white/40 font-medium">Post and manage job openings visible on the Careers page.</p>
                                    </div>
                                    <button
                                        onClick={() => setEditingItem({
                                            type: 'job', data: {
                                                title: '', department: '', location: '', type: 'Full-time',
                                                description: '', requirements: [], responsibilities: [], active: true
                                            }
                                        })}
                                        className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20"
                                    >
                                        <Plus size={20} /> Post New Job
                                    </button>
                                </div>

                                {jobs.length === 0 ? (
                                    <div className="text-center py-24 bg-white/5 rounded-[2.5rem] border border-white/10">
                                        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Briefcase className="text-blue-400" size={32} />
                                        </div>
                                        <h3 className="text-xl font-black text-white mb-2">No Jobs Posted Yet</h3>
                                        <p className="text-white/30 text-sm">Click "Post New Job" to add your first opening.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-6">
                                        {jobs.map(job => (
                                            <div key={job._id} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 group hover:bg-white/[0.08] hover:border-blue-500/30 transition-all relative overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-8">
                                                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/5 blur-[80px] rounded-full"></div>

                                                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 shrink-0">
                                                    <Briefcase size={26} />
                                                </div>

                                                <div className="flex-grow relative z-10">
                                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                                        <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[.2em] rounded-lg">{job.department}</span>
                                                        <span className="px-4 py-1.5 bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[.2em] rounded-lg">{job.type}</span>
                                                        <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[.2em] rounded-lg ${job.active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{job.active ? 'Active' : 'Inactive'}</span>
                                                    </div>
                                                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors" style={{ fontFamily: '"Outfit", sans-serif' }}>{job.title}</h3>
                                                    <div className="flex flex-wrap gap-6">
                                                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                                                            <MapPin size={14} className="text-blue-500" /> {job.location}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                                                            <Clock size={14} className="text-purple-500" /> {new Date(job.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-3 relative z-10 shrink-0">
                                                    <button
                                                        onClick={() => setEditingItem({ type: 'job', data: job })}
                                                        className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/40 hover:text-white transition-all"
                                                        title="Edit Job"
                                                    >
                                                        <Edit3 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteJob(job._id, job.title)}
                                                        className="p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-all"
                                                        title="Delete Job"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'applications' && (
                            <motion.div key="apps" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h1 className="text-4xl font-black mb-2" style={{ fontFamily: '"Outfit", sans-serif' }}>Candidate Tracking</h1>
                                        <p className="text-white/40 font-medium">Manage job applications, view resumes, and update hiring status.</p>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Applicants</p>
                                            <p className="text-xl font-black text-blue-400">{stats.applications}</p>
                                        </div>
                                        <FileText size={24} className="text-blue-500" />
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Candidate</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Position</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Resume</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Status</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {applications.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="px-8 py-20 text-center">
                                                        <p className="text-white/20 font-bold uppercase tracking-widest text-sm">No applications received yet</p>
                                                    </td>
                                                </tr>
                                            ) : (
                                                applications.map(app => (
                                                    <React.Fragment key={app._id}>
                                                        <tr
                                                            className={`hover:bg-white/[0.02] cursor-pointer transition-colors group ${expandedAppId === app._id ? 'bg-blue-500/5' : ''}`}
                                                            onClick={() => setExpandedAppId(expandedAppId === app._id ? null : app._id)}
                                                        >
                                                            <td className="px-8 py-6">
                                                                <div className="font-bold text-white mb-0.5 flex items-center gap-2">
                                                                    {app.candidateName}
                                                                    {app.workFromOffice && (
                                                                        <span className="bg-emerald-500/10 text-emerald-400 text-[8px] px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-tighter">Office Ready</span>
                                                                    )}
                                                                </div>
                                                                <div className="text-[11px] text-white/30 flex items-center gap-2">
                                                                    <Mail size={10} /> {app.email}
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
                                                                    {app.jobTitle}
                                                                </span>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <a
                                                                    href={app.resumeUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="flex items-center gap-2 text-blue-400 hover:text-white text-xs font-black uppercase tracking-widest transition-colors group/link"
                                                                >
                                                                    <Download size={14} className="group-hover/link:-translate-y-0.5 transition-transform" /> Resume.pdf
                                                                </a>
                                                            </td>
                                                            <td className="px-8 py-6" onClick={(e) => e.stopPropagation()}>
                                                                <select
                                                                    value={app.status || 'Pending'}
                                                                    onChange={(e) => handleUpdateAppStatus(app._id, e.target.value)}
                                                                    className={`bg-[#070b14] border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-blue-500/50 cursor-pointer ${app.status === 'Hired' ? 'text-emerald-400 border-emerald-500/30' :
                                                                            app.status === 'Interviewed' ? 'text-blue-400 border-blue-500/30' :
                                                                                app.status === 'Rejected' ? 'text-red-400 border-red-500/30' : 'text-gray-400'
                                                                        }`}
                                                                >
                                                                    <option value="Pending">Pending</option>
                                                                    <option value="Interviewed">Interviewed</option>
                                                                    <option value="Hired">Hired</option>
                                                                    <option value="Rejected">Rejected</option>
                                                                </select>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); handleDeleteApplication(app._id, app.candidateName); }}
                                                                    className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        <AnimatePresence>
                                                            {expandedAppId === app._id && (
                                                                <tr>
                                                                    <td colSpan="5" className="px-8 py-0">
                                                                        <motion.div
                                                                            initial={{ height: 0, opacity: 0 }}
                                                                            animate={{ height: 'auto', opacity: 1 }}
                                                                            exit={{ height: 0, opacity: 0 }}
                                                                            className="overflow-hidden"
                                                                        >
                                                                            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/5 bg-white/[0.01] rounded-b-3xl px-6">
                                                                                <div className="space-y-6">
                                                                                    <div>
                                                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-3 ml-1">Education & Qualifications</h4>
                                                                                        <div className="space-y-3">
                                                                                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                                                                                <div className="flex justify-between items-center mb-1">
                                                                                                    <span className="text-white font-bold text-sm">{app.highestQualification?.degree}</span>
                                                                                                    <span className="text-blue-400 text-[10px] font-black">{app.highestQualification?.percentage}%</span>
                                                                                                </div>
                                                                                                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{app.highestQualification?.branch} • Highest</p>
                                                                                            </div>
                                                                                            {app.otherQualifications?.map((q, qidx) => (
                                                                                                <div key={qidx} className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                                                                                                    <div className="flex justify-between items-center mb-1">
                                                                                                        <span className="text-white/80 font-bold text-xs">{q.degree}</span>
                                                                                                        <span className="text-white/40 text-[10px] font-black">{q.percentage}%</span>
                                                                                                    </div>
                                                                                                    <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">{q.branch}</p>
                                                                                                </div>
                                                                                            ))}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div>
                                                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-3 ml-1">Certifications</h4>
                                                                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-white/50 text-xs leading-relaxed italic">
                                                                                            {app.certifications || "No certifications listed."}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="space-y-6">
                                                                                    <div>
                                                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-3 ml-1">Candidate Details</h4>
                                                                                        <div className="space-y-4">
                                                                                            <div className="flex items-start gap-3">
                                                                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                                                                                    <MapPin size={14} />
                                                                                                </div>
                                                                                                <div>
                                                                                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Location / Address</p>
                                                                                                    <p className="text-white/60 text-xs leading-relaxed">{app.address || "Address not provided."}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="flex items-start gap-3">
                                                                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${app.workFromOffice ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-500'}`}>
                                                                                                    <Briefcase size={14} />
                                                                                                </div>
                                                                                                <div>
                                                                                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Office Comfort (Dwarka)</p>
                                                                                                    <p className={`text-xs font-bold ${app.workFromOffice ? 'text-blue-400' : 'text-red-400'}`}>
                                                                                                        {app.workFromOffice ? "YES - Comfortable for Office" : "NO - Remote Preferred"}
                                                                                                    </p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div>
                                                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3 ml-1">Contact Info</h4>
                                                                                        <div className="flex items-center gap-4">
                                                                                            <a href={`tel:${app.mobile}`} className="flex-1 py-3 bg-white/5 hover:bg-blue-500/10 rounded-xl text-center border border-white/5 transition-all group/call">
                                                                                                <Phone size={14} className="mx-auto mb-1 text-white/20 group-hover/call:text-blue-500 transition-colors" />
                                                                                                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest group-hover/call:text-blue-400">Call Now</span>
                                                                                            </a>
                                                                                            <a href={`mailto:${app.email}`} className="flex-1 py-3 bg-white/5 hover:bg-purple-500/10 rounded-xl text-center border border-white/5 transition-all group/mail">
                                                                                                <Mail size={14} className="mx-auto mb-1 text-white/20 group-hover/mail:text-purple-500 transition-colors" />
                                                                                                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest group-hover/mail:text-purple-400">Email Now</span>
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </motion.div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </AnimatePresence>
                                                    </React.Fragment>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'chat' && (
                            <motion.div key="chat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                                <div className="p-8 bg-blue-600/5 border border-blue-500/10 rounded-[2.5rem]">
                                    <ChatManager
                                        config={chatConfig}
                                        onSave={async (newConfig) => {
                                            try {
                                                const token = localStorage.getItem('adminToken');
                                                const response = await api.post('/admin/chat-config', newConfig, {
                                                    headers: { Authorization: `Bearer ${token}` }
                                                });
                                                setChatConfig(response.data);
                                                showToast('Settings Saved!', 'success');
                                            } catch (error) {
                                                showToast('Save Failed', 'error');
                                            }
                                        }}
                                    />
                                </div>
                                
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between px-4">
                                        <div>
                                            <h2 className="text-2xl font-black uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>Training Intelligence</h2>
                                            <p className="text-white/30 text-[10px] mt-1 font-bold uppercase tracking-[0.2em]">Convert past interactions into permanent rules</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <select 
                                                value={logFilter} 
                                                onChange={(e) => setLogFilter(e.target.value)}
                                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-white outline-none focus:border-blue-500/50"
                                            >
                                                <option value="all" className="bg-[#0a1120]">All Sources</option>
                                                <option value="gemini" className="bg-[#0a1120]">Gemini AI</option>
                                                <option value="rule" className="bg-[#0a1120]">Static Rules</option>
                                            </select>
                                            <button onClick={fetchData} className="p-2 bg-white/5 border border-white/10 rounded-lg active:rotate-180 duration-500 text-white/40 hover:text-white"><RefreshCw size={16} /></button>
                                        </div>
                                    </div>
                                    <TrainingLogsTable 
                                        logs={chatLogs.filter(l => logFilter === 'all' || l.source === logFilter)} 
                                        loading={loading} 
                                        onTrain={handleTrainLog}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {editingItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingItem(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-[#0a1120] border border-white/10 rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-12 shadow-2xl">
                            <button onClick={() => setEditingItem(null)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"><X size={24} /></button>

                            {editingItem.type === 'product' ? (
                                <ProductForm
                                    data={editingItem.data}
                                    onSave={saveProduct}
                                    onCancel={() => setEditingItem(null)}
                                />
                            ) : editingItem.type === 'visa' ? (
                                <VisaForm
                                    data={editingItem.data}
                                    onSave={saveVisa}
                                    onCancel={() => setEditingItem(null)}
                                />
                            ) : editingItem.type === 'case' ? (
                                <CaseStudyForm
                                    data={editingItem.data}
                                    onSave={saveCase}
                                    onCancel={() => setEditingItem(null)}
                                />
                            ) : editingItem.type === 'job' ? (
                                <JobForm
                                    data={editingItem.data}
                                    onSave={saveJob}
                                    onCancel={() => setEditingItem(null)}
                                />
                            ) : (
                                <BlogForm
                                    data={editingItem.data}
                                    onSave={saveBlog}
                                    onCancel={() => setEditingItem(null)}
                                />
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const StatCard = ({ label, value, icon, color }) => (
    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-600/10 blur-[60px] rounded-full`}></div>
        <div className="relative z-10 flex items-center justify-between">
            <div>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">{label}</p>
                <h3 className="text-4xl font-black">{value}</h3>
            </div>
            <div className={`p-4 bg-${color}-600/20 text-${color}-400 rounded-2xl`}>{icon}</div>
        </div>
    </div>
);

const LeadsTable = ({ leads, loading, expandedId, setExpandedId }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead>
                <tr className="bg-white/[0.02]">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/30">User Details</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/30">Category</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/30">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/30 text-right">Date</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {loading ? <tr><td colSpan="4" className="px-8 py-20 text-center text-white/20">Loading...</td></tr> :
                    leads.length === 0 ? <tr><td colSpan="4" className="px-8 py-20 text-center text-white/20">No leads.</td></tr> :
                        leads.map(lead => (
                            <React.Fragment key={lead._id}>
                                <tr
                                    onClick={() => setExpandedId(expandedId === lead._id ? null : lead._id)}
                                    className={`hover:bg-white/[0.02] transition-colors group cursor-pointer ${expandedId === lead._id ? 'bg-blue-500/5' : ''}`}
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-bold text-white">{lead.name}</span>
                                            <div className="flex gap-4 text-[10px] text-white/40">
                                                <span className="flex items-center gap-1"><Mail size={10} /> {lead.email}</span>
                                                <span className="flex items-center gap-1"><Phone size={10} /> {lead.mobile}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col items-start gap-2">
                                            <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded text-[9px] font-black uppercase tracking-widest drop-shadow-sm">{lead.source}</span>
                                            <span className="inline-block px-4 py-2 bg-[#0a1120] border border-blue-500/20 rounded-xl text-xs font-medium tracking-wide text-blue-100 max-w-xs leading-relaxed shadow-inner">{lead.interest}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-500">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span> New
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right text-[10px] font-bold text-white/20">
                                        <div className="flex flex-col items-end gap-1">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                            <span className="text-[8px] text-white/10 uppercase font-black">Click to view journey</span>
                                        </div>
                                    </td>
                                </tr>
                                <AnimatePresence>
                                    {expandedId === lead._id && (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-0">
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="py-8 border-t border-white/5 bg-white/[0.01]">
                                                        <div className="flex items-center gap-3 mb-6 px-4">
                                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                                <Clock size={16} />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">User Journey Log</h4>
                                                                <p className="text-[8px] text-white/20 uppercase font-bold tracking-tighter">Timeline of activity before submission</p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4 max-w-2xl">
                                                            {lead.activityLogs && lead.activityLogs.length > 0 ? (
                                                                lead.activityLogs.map((log, lidx) => (
                                                                    <div key={lidx} className="flex gap-4 group/log px-4">
                                                                        <div className="flex flex-col items-center">
                                                                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 ring-4 ring-blue-500/10"></div>
                                                                            {lidx !== lead.activityLogs.length - 1 && <div className="w-px h-full bg-white/5 my-1"></div>}
                                                                        </div>
                                                                        <div className="pb-4">
                                                                            <p className="text-xs font-bold text-white/80 group-hover/log:text-blue-400 transition-colors">{log.action}</p>
                                                                            <div className="flex items-center gap-3 mt-1">
                                                                                <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                                                                <span className="w-1 h-1 rounded-full bg-white/5"></span>
                                                                                <span className="text-[10px] text-blue-500/40 font-medium">{log.path}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="px-4 py-10 text-center bg-white/5 rounded-3xl border border-white/5">
                                                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">No activity logs captured for this lead.</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </React.Fragment>
                        ))}
            </tbody>
        </table>
    </div>
);

const VisaForm = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        slug: data.slug || '',
        title: data.title || '',
        heroDesc: data.heroDesc || '',
        bgImage: data.bgImage || '',
        fullDesc: data.fullDesc || '',
        detailedInfo: data.detailedInfo || '',
        whyChooseUs: data.whyChooseUs || [],
        types: data.types || [],
        documents: data.documents || [],
        process: data.process || [],
        features: data.features || []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (field, index, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };

    const handleObjectArrayChange = (field, index, subfield, value) => {
        const newArray = [...formData[field]];
        newArray[index] = { ...newArray[index], [subfield]: value };
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };

    const addArrayItem = (field, defaultValue) => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], defaultValue] }));
    };

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
    };

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black mb-2 uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        {data.slug ? `Edit ${data.title}` : 'Add New Visa'}
                    </h2>
                    <p className="text-white/40 font-medium text-sm">Fill in all details carefully. Everything is displayed publicly.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Internal Slug (URL)</label>
                        <input name="slug" value={formData.slug} onChange={handleChange} placeholder="uk-visa" disabled={!!data.slug} className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Visa Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} placeholder="United Kingdom Visa" className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Hero Description (One Liner)</label>
                        <input name="heroDesc" value={formData.heroDesc} onChange={handleChange} placeholder="Your gateway to the UK..." className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Background Image URL</label>
                        <input name="bgImage" value={formData.bgImage} onChange={handleChange} placeholder="https://unsplash..." className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Full Description</label>
                        <textarea name="fullDesc" value={formData.fullDesc} onChange={handleChange} rows="4" className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none resize-none" />
                    </div>
                </div>
            </div>

            {/* Dynamic Sections */}
            <div className="space-y-12">
                {/* Why Choose Us */}
                <ArrayManager label="Why Choose Us?" field="whyChooseUs" items={formData.whyChooseUs} onAdd={() => addArrayItem('whyChooseUs', '')} onRemove={(idx) => removeArrayItem('whyChooseUs', idx)} onChange={(idx, val) => handleArrayChange('whyChooseUs', idx, val)} />

                {/* Visa Types */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <label className="text-xl font-black uppercase tracking-tight text-white/80">Visa Types & Fees</label>
                        <button onClick={() => addArrayItem('types', { type: '', duration: '', fee: '', processing: '' })} className="text-blue-400 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:text-blue-300 transition-colors"><Plus size={14} /> Add Type</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.types.map((type, idx) => (
                            <div key={idx} className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-4 relative group">
                                <button onClick={() => removeArrayItem('types', idx)} className="absolute top-4 right-4 text-red-400/20 group-hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                                <div className="grid grid-cols-2 gap-4">
                                    <input placeholder="Type (Standard)" value={type.type} onChange={(e) => handleObjectArrayChange('types', idx, 'type', e.target.value)} className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2 text-xs text-white" />
                                    <input placeholder="Duration (6 Months)" value={type.duration} onChange={(e) => handleObjectArrayChange('types', idx, 'duration', e.target.value)} className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2 text-xs text-white" />
                                    <input placeholder="Fee (₹12,500)" value={type.fee} onChange={(e) => handleObjectArrayChange('types', idx, 'fee', e.target.value)} className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2 text-xs text-white" />
                                    <input placeholder="Processing (15 Days)" value={type.processing} onChange={(e) => handleObjectArrayChange('types', idx, 'processing', e.target.value)} className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2 text-xs text-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <label className="text-xl font-black uppercase tracking-tight text-white/80">Process Steps</label>
                        <button onClick={() => addArrayItem('process', { title: '', desc: '' })} className="text-blue-400 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:text-blue-300 transition-colors"><Plus size={14} /> Add Step</button>
                    </div>
                    <div className="space-y-4">
                        {formData.process.map((step, idx) => (
                            <div key={idx} className="flex gap-4 items-center group">
                                <span className="w-8 h-8 flex-shrink-0 bg-white/5 rounded-full flex items-center justify-center text-[10px] font-black text-white/20">{idx + 1}</span>
                                <input placeholder="Step Title" value={step.title} onChange={(e) => handleObjectArrayChange('process', idx, 'title', e.target.value)} className="w-1/3 bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white" />
                                <input placeholder="Step Description" value={step.desc} onChange={(e) => handleObjectArrayChange('process', idx, 'desc', e.target.value)} className="flex-grow bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white" />
                                <button onClick={() => removeArrayItem('process', idx)} className="p-3 text-red-500/20 group-hover:text-red-500"><X size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex justify-end gap-6">
                <button onClick={onCancel} className="px-10 py-4 font-black text-white/20 hover:text-white transition-colors uppercase tracking-widest text-[10px]">Discard Changes</button>
                <button onClick={() => onSave(formData)} className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-12 py-5 rounded-[1.5rem] flex items-center gap-3 transition-all shadow-xl shadow-emerald-900/40">
                    <Save size={20} /> Save Visa Content
                </button>
            </div>
        </div>
    );
};

const ArrayManager = ({ label, items, onAdd, onRemove, onChange }) => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <label className="text-xl font-black uppercase tracking-tight text-white/80">{label}</label>
            <button onClick={onAdd} className="text-blue-400 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:text-blue-300 transition-colors"><Plus size={14} /> Add Line</button>
        </div>
        <div className="space-y-3">
            {items.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center group">
                    <input value={item} onChange={(e) => onChange(idx, e.target.value)} className="flex-grow bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/20 outline-none" placeholder="..." />
                    <button onClick={() => onRemove(idx)} className="p-3 text-red-500/20 group-hover:text-red-500 transition-colors"><X size={16} /></button>
                </div>
            ))}
        </div>
    </div>
);

const ProductForm = ({ data, onSave, onCancel }) => {
    const [formTab, setFormTab] = useState('basic'); // basic, content, features
    const [formData, setFormData] = useState({
        title: data.title || '',
        slug: data.slug || '',
        category: data.category || 'Application',
        heroDesc: data.heroDesc || '',
        fullDesc: data.fullDesc || '',
        detailedInfo: data.detailedInfo || '',
        features: data.features || [],
        whyChooseUs: data.whyChooseUs || [],
        process: data.process || [],
        active: true
    });

    const categories = ['Mobility Services', 'Cloud Telephony Services', 'WhatsApp Services', 'Application'];

    const applyTemplate = () => {
        setFormData({
            ...formData,
            features: [
                { title: 'Secure Infrastructure', desc: 'Enterprise-grade security and reliability for your business.', icon: 'Shield' },
                { title: 'Real-time Analytics', desc: 'Track performance and engagement with live data dashboards.', icon: 'Activity' },
                { title: 'Global Connectivity', desc: 'Connect with customers anywhere in the world seamlessly.', icon: 'Globe' }
            ],
            process: [
                { title: 'Consultation', desc: 'We analyze your business needs and requirements.' },
                { title: 'Configuration', desc: 'Setting up the infrastructure and custom workflows.' },
                { title: 'Testing', desc: 'Rigorous quality assurance and security checks.' },
                { title: 'Deployment', desc: 'Full-scale launch and ongoing support.' }
            ],
            whyChooseUs: [
                'Faster response times for critical operations',
                'Cost-effective solutions for small and large enterprises',
                '24/7 dedicated technical support team',
                'Seamless integration with existing business tools'
            ]
        });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, { title: '', desc: '', icon: 'CheckCircle2' }] });
    };

    const addProcess = () => {
        setFormData({ ...formData, process: [...formData.process, { title: '', desc: '' }] });
    };

    const addWhy = () => {
        setFormData({ ...formData, whyChooseUs: [...formData.whyChooseUs, ''] });
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                    <h2 className="text-3xl font-black uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>{data._id ? 'Refine' : 'Engineer'} Solution</h2>
                    <p className="text-white/30 text-xs mt-1 font-bold uppercase tracking-[0.2em]">Guided Product Architecture</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end mr-4">
                        <span className="text-[9px] text-white/20 uppercase font-black tracking-widest leading-none mb-1">Employee Mode</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            <span className="text-[10px] text-blue-400 font-bold uppercase">Guided Assistance Active</span>
                        </div>
                    </div>
                    {!data._id && (
                        <button onClick={applyTemplate} className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400 hover:bg-blue-500/20 transition-all flex items-center gap-2">
                            <Sparkles size={12} /> Use Standard Template
                        </button>
                    )}
                </div>
            </div>

            {/* Layout Map for Employee */}
            <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl relative overflow-hidden group">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Shield size={16} />
                    </div>
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-blue-400">Field Location Guide</h4>
                        <p className="text-[10px] text-white/30 font-medium">Hover over labels (e.g. "Top Banner Snippet") to see where they appear on the live site.</p>
                    </div>
                </div>
            </div>

            {/* Form Tabs */}
            <div className="flex gap-4 p-1 bg-white/5 rounded-2xl w-fit">
                {['basic', 'content', 'features'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFormTab(tab)}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        {tab === 'basic' ? '1. Essentials' : tab === 'content' ? '2. Descriptions' : '3. Logic & Flow'}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {formTab === 'basic' && (
                    <motion.div key="basic" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Solution Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. WhatsApp API"
                                    value={formData.title}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const slug = val.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]/g, '');
                                        setFormData({ ...formData, title: val, slug: slug });
                                    }}
                                    className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">URL Slug (Auto)</label>
                                <input type="text" placeholder="whatsapp-api" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none text-white/50" />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Service Category</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFormData({ ...formData, category: cat })}
                                        className={`px-4 py-6 rounded-2xl border transition-all text-[10px] font-black uppercase text-center ${formData.category === cat ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-white/5 border-white/5 hover:border-white/20 text-white/40'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {formTab === 'content' && (
                    <motion.div key="content" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block">Top Banner Snippet</label>
                                <span className="text-[9px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest">Appears in Hero</span>
                            </div>
                            <textarea placeholder="e.g. Powering enterprise communication with official WhatsApp API." value={formData.heroDesc} onChange={(e) => setFormData({ ...formData, heroDesc: e.target.value })} rows="2" className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block">Primary Details</label>
                                <span className="text-[9px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest">Main Body Text</span>
                            </div>
                            <textarea placeholder="Provide 2-3 sentences explaining the core value of this solution." value={formData.fullDesc} onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })} rows="3" className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block">Extended Explanation</label>
                                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest">Section: "What is [Product]?"</span>
                            </div>
                            <p className="text-[9px] text-white/20 mb-3 uppercase font-black tracking-widest">Tip: Use double enter for new paragraphs.</p>
                            <textarea placeholder="A very detailed guide about the product, its history, and technical depth." value={formData.detailedInfo} onChange={(e) => setFormData({ ...formData, detailedInfo: e.target.value })} rows="5" className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                        </div>
                    </motion.div>
                )}

                {formTab === 'features' && (
                    <motion.div key="features" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12 h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                        {/* Features */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Section: Service Features</h4>
                                <button onClick={addFeature} className="p-2 bg-blue-500/10 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-all"><Plus size={14} /></button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {formData.features.map((feat, i) => (
                                    <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex gap-6 items-start">
                                        <div className="mt-2 text-white/20">0{i + 1}</div>
                                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" placeholder="Title" value={feat.title} onChange={(e) => {
                                                const newF = [...formData.features];
                                                newF[i].title = e.target.value;
                                                setFormData({ ...formData, features: newF });
                                            }} className="bg-transparent border-b border-white/10 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                                            <input type="text" placeholder="Short Desc" value={feat.desc} onChange={(e) => {
                                                const newF = [...formData.features];
                                                newF[i].desc = e.target.value;
                                                setFormData({ ...formData, features: newF });
                                            }} className="bg-transparent border-b border-white/10 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                                        </div>
                                        <button onClick={() => setFormData({ ...formData, features: formData.features.filter((_, idx) => idx !== i) })} className="mt-2 text-white/10 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Process */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">Section: Implementation Process</h4>
                                <button onClick={addProcess} className="p-2 bg-purple-500/10 rounded-lg text-purple-400 hover:bg-purple-500/20 transition-all"><Plus size={14} /></button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {formData.process.map((p, i) => (
                                    <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex gap-6 items-start">
                                        <div className="mt-2 text-white/20">Step {i + 1}</div>
                                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" placeholder="Step Title" value={p.title} onChange={(e) => {
                                                const newP = [...formData.process];
                                                newP[i].title = e.target.value;
                                                setFormData({ ...formData, process: newP });
                                            }} className="bg-transparent border-b border-white/10 py-2 text-sm text-white focus:border-purple-500 focus:outline-none" />
                                            <input type="text" placeholder="Short Action" value={p.desc} onChange={(e) => {
                                                const newP = [...formData.process];
                                                newP[i].desc = e.target.value;
                                                setFormData({ ...formData, process: newP });
                                            }} className="bg-transparent border-b border-white/10 py-2 text-sm text-white focus:border-purple-500 focus:outline-none" />
                                        </div>
                                        <button onClick={() => setFormData({ ...formData, process: formData.process.filter((_, idx) => idx !== i) })} className="mt-2 text-white/10 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Section: Why Choose Us</h4>
                                <button onClick={addWhy} className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition-all"><Plus size={14} /></button>
                            </div>
                            <div className="space-y-3">
                                {formData.whyChooseUs.map((w, i) => (
                                    <div key={i} className="flex gap-4 items-center bg-white/5 border border-white/5 px-6 py-4 rounded-xl group/why">
                                        <Check className="text-emerald-500" size={14} />
                                        <input type="text" value={w} onChange={(e) => {
                                            const newW = [...formData.whyChooseUs];
                                            newW[i] = e.target.value;
                                            setFormData({ ...formData, whyChooseUs: newW });
                                        }} className="flex-grow bg-transparent border-none text-sm text-white focus:outline-none" />
                                        <button onClick={() => setFormData({ ...formData, whyChooseUs: formData.whyChooseUs.filter((_, idx) => idx !== i) })} className="opacity-0 group-hover/why:opacity-100 text-white/10 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                <div className="flex gap-2">
                    {formTab === 'basic' ? (
                        <button onClick={onCancel} className="px-6 py-3 font-bold text-white/40 hover:text-white transition-colors text-[10px] uppercase">Abort</button>
                    ) : (
                        <button onClick={() => setFormTab(formTab === 'features' ? 'content' : 'basic')} className="px-6 py-3 font-bold text-blue-400 hover:text-blue-300 transition-colors text-[10px] uppercase flex items-center gap-2 underline underline-offset-4">Previous Stage</button>
                    )}
                </div>

                <div className="flex gap-4">
                    {formTab === 'features' ? (
                        <button onClick={() => onSave(formData)} className="bg-blue-600 hover:bg-blue-500 text-white font-black px-12 py-5 rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest text-[11px]">
                            <Save size={18} /> Finalize Solution
                        </button>
                    ) : (
                        <button onClick={() => setFormTab(formTab === 'basic' ? 'content' : 'features')} className="bg-white/10 hover:bg-white/20 text-white font-black px-12 py-5 rounded-2xl flex items-center gap-3 transition-all uppercase tracking-widest text-[11px]">
                            Proceed Next <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const CaseStudyForm = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: data.title || '',
        slug: data.slug || '',
        industry: data.industry || '',
        description: data.description || '',
        problem: data.problem || '',
        solution: data.solution || '',
        fullStory: data.fullStory || '',
        challenge: data.challenge || '',
        approach: data.approach || '',
        image: data.image || '',
        results: data.results || []
    });

    const icons = ['CheckCircle2', 'Zap', 'TrendingUp', 'BarChart3', 'Globe2', 'Target', 'Activity', 'ShieldCheck'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title' && !data.slug) {
            const slug = value.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]/g, '');
            setFormData(prev => ({ ...prev, title: value, slug }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleResultChange = (index, field, value) => {
        const newResults = [...formData.results];
        newResults[index] = { ...newResults[index], [field]: value };
        setFormData(prev => ({ ...prev, results: newResults }));
    };

    const addResult = () => {
        setFormData(prev => ({ ...prev, results: [...prev.results, { icon: 'CheckCircle2', text: '', color: '#3b82f6', bold: true }] }));
    };

    const removeResult = (index) => {
        setFormData(prev => ({ ...prev, results: prev.results.filter((_, i) => i !== index) }));
    };

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black mb-2 uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        {data.slug ? `Edit ${data.title}` : 'Engineer Case Study'}
                    </h2>
                    <p className="text-white/40 font-medium text-sm">Design a narrative of success and technical excellence.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Project Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. SaaS Platform Launch" className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">URL Slug</label>
                        <input name="slug" value={formData.slug} onChange={handleChange} placeholder="saas-platform-launch" className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/50 focus:border-blue-500/50 transition-all focus:outline-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Industry</label>
                        <input name="industry" value={formData.industry} onChange={handleChange} placeholder="Software & Technology" className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Cover Image URL</label>
                        <input name="image" value={formData.image} onChange={handleChange} placeholder="https://images.unsplash.com..." className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Short Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="A brief summary for the preview card..." className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none resize-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">The Problem Statement</label>
                        <textarea name="problem" value={formData.problem} onChange={handleChange} rows="2" placeholder="What challenge did the client face?" className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none resize-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">The Solution Snippet</label>
                        <textarea name="solution" value={formData.solution} onChange={handleChange} rows="2" placeholder="Our core strategic response..." className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none resize-none" />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">The Full Story</label>
                    <textarea name="fullStory" value={formData.fullStory} onChange={handleChange} rows="8" placeholder="Detailed narrative of the project lifecycle..." className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none resize-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Specific Technical Challenge</label>
                        <textarea name="challenge" value={formData.challenge} onChange={handleChange} rows="4" className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none resize-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Engineer's Approach</label>
                        <textarea name="approach" value={formData.approach} onChange={handleChange} rows="4" className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none resize-none" />
                    </div>
                </div>
            </div>

            {/* Results Management */}
            <div className="space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <label className="text-xl font-black uppercase tracking-tight text-white/80">Key Results & Metrics</label>
                    <button onClick={addResult} className="text-blue-400 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:text-blue-300 transition-colors"><Plus size={14} /> Add Metric</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formData.results.map((res, idx) => (
                        <div key={idx} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] relative group space-y-6">
                            <button onClick={() => removeResult(idx)} className="absolute top-6 right-6 text-red-500/20 group-hover:text-red-500 transition-all"><Trash2 size={16} /></button>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[9px] font-black uppercase text-white/20 block mb-2">Metric Text</label>
                                    <input placeholder="e.g. 50% Productivity" value={res.text} onChange={(e) => handleResultChange(idx, 'text', e.target.value)} className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2 text-xs text-white" />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase text-white/20 block mb-2">Icon</label>
                                    <select value={res.icon} onChange={(e) => handleResultChange(idx, 'icon', e.target.value)} className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2 text-xs text-white">
                                        {icons.map(icon => <option key={icon} value={icon} className="bg-[#070b14]">{icon}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase text-white/20 block mb-2">Color Hex</label>
                                    <input value={res.color} onChange={(e) => handleResultChange(idx, 'color', e.target.value)} className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2 text-xs text-white" />
                                </div>
                                <div className="flex items-center gap-4 pt-6">
                                    <input type="checkbox" checked={res.bold} onChange={(e) => handleResultChange(idx, 'bold', e.target.checked)} className="w-4 h-4 rounded border-white/10 bg-black/20 text-blue-600" />
                                    <span className="text-[10px] font-black uppercase text-white/40">Bold Metric</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex justify-end gap-6">
                <button onClick={onCancel} className="px-10 py-4 font-black text-white/40 hover:text-white transition-colors uppercase tracking-widest text-[10px]">Discard Changes</button>
                <button onClick={() => onSave(formData)} className="bg-blue-600 hover:bg-blue-500 text-white font-black px-12 py-5 rounded-[1.5rem] flex items-center gap-3 transition-all shadow-xl shadow-blue-900/40">
                    <Save size={20} /> Deploy Case Study
                </button>
            </div>
        </div>
    );
};

const BlogForm = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: data.title || '',
        slug: data.slug || '',
        category: data.category || 'Technology',
        author: data.author || '',
        readTime: data.readTime || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        image: data.image || '',
        active: data.active !== undefined ? data.active : true,
        imageFile: null
    });

    const fileInputRef = React.useRef(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'title' && !data.slug) {
            const slug = value.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]/g, '');
            setFormData(prev => ({ ...prev, title: value, slug }));
        } else {
            setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, imageFile: e.target.files[0], image: e.target.files[0].name }));
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black mb-2 uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        {data.slug ? `Edit Article` : 'Write New Insight'}
                    </h2>
                    <p className="text-white/40 font-medium text-sm">Craft a compelling story for the Prime Impact community.</p>
                </div>
                <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Visible to Public</span>
                    <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="w-5 h-5 rounded border-white/10 bg-black/20 text-blue-600 focus:ring-blue-500/50" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Headline</label>
                        <input name="title" value={formData.title} onChange={handleChange} placeholder="The Future of AI in SaaS..." className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Category</label>
                            <input name="category" value={formData.category} onChange={handleChange} placeholder="Industry/Tech" className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Read Time</label>
                            <input name="readTime" value={formData.readTime} onChange={handleChange} placeholder="8 min read" className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Author Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                            <input name="author" value={formData.author} onChange={handleChange} placeholder="Dr. Arpit Goel" className="w-full bg-[#070b14] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Cover Image (URL or Upload)</label>
                        <div className="flex gap-3">
                            <input name="image" value={formData.image} onChange={handleChange} placeholder="https://images.unsplash.com..." className="flex-grow bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none" />
                            <button onClick={() => fileInputRef.current?.click()} className="px-6 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white transition-all"><Plus size={18} /></button>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                        </div>
                        {formData.imageFile && <p className="mt-2 text-[10px] text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2"><Check size={12} /> Ready to upload: {formData.imageFile.name}</p>}
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Short Excerpt</label>
                        <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows="3" placeholder="A brief summary for the blog listing..." className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none resize-none" />
                    </div>
                </div>
            </div>

            <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-4">Main Article Content (HTML Supported)</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="15"
                    placeholder="Enter your article content here. Use <p>, <h4>, <ul> tags for formatting."
                    className="w-full bg-[#070b14] border border-white/10 rounded-[2rem] px-8 py-8 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none resize-none custom-scrollbar"
                />
            </div>

            <div className="pt-12 border-t border-white/5 flex justify-end gap-6">
                <button onClick={onCancel} className="px-10 py-4 font-black text-white/20 hover:text-white transition-colors uppercase tracking-widest text-[10px]">Discard Draft</button>
                <button onClick={() => onSave(formData)} className="bg-blue-600 hover:bg-blue-500 text-white font-black px-12 py-5 rounded-[1.5rem] flex items-center gap-3 transition-all shadow-xl shadow-blue-900/40">
                    <Save size={20} /> Publish Article
                </button>
            </div>
        </div>
    );
};

const JobForm = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        _id: data._id || undefined,
        title: data.title || '',
        department: data.department || '',
        location: data.location || '',
        type: data.type || 'Full-time',
        description: data.description || '',
        requirements: data.requirements || [],
        responsibilities: data.responsibilities || [],
        active: data.active !== undefined ? data.active : true
    });

    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const addListItem = (field) => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const updateListItem = (field, index, value) => {
        const updated = [...formData[field]];
        updated[index] = value;
        setFormData(prev => ({ ...prev, [field]: updated }));
    };

    const removeListItem = (field, index) => {
        setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-8">
                <div>
                    <h2 className="text-3xl font-black uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        {data._id ? `Edit: ${data.title}` : 'Post New Opening'}
                    </h2>
                    <p className="text-white/30 text-xs mt-1 font-bold uppercase tracking-[0.2em]">This will appear live on the Careers page</p>
                </div>
                <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Publicly Active</span>
                    <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="w-5 h-5 rounded border-white/10 bg-black/20 text-blue-600 focus:ring-blue-500/50" />
                </div>
            </div>

            {/* Basic Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Job Title</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Senior React Developer"
                            className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Department</label>
                        <input
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="e.g. Engineering, Sales, Design"
                            className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Location</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Mumbai / Remote"
                            className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Job Type</label>
                        <div className="grid grid-cols-2 gap-3">
                            {jobTypes.map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, type: t }))}
                                    className={`px-4 py-3 rounded-xl border transition-all text-[11px] font-black uppercase text-center ${formData.type === t
                                            ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                                            : 'bg-white/5 border-white/5 hover:border-white/20 text-white/40'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2">Job Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Describe the role, what the candidate will do, team culture..."
                            className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 transition-all focus:outline-none resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Requirements */}
            <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <label className="text-xl font-black uppercase tracking-tight text-white/80">Requirements</label>
                    <button type="button" onClick={() => addListItem('requirements')} className="text-blue-400 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:text-blue-300 transition-colors">
                        <Plus size={14} /> Add Requirement
                    </button>
                </div>
                <div className="space-y-3">
                    {formData.requirements.map((req, idx) => (
                        <div key={idx} className="flex gap-4 items-center group">
                            <div className="w-7 h-7 flex-shrink-0 bg-blue-500/10 rounded-full flex items-center justify-center">
                                <Check size={12} className="text-blue-400" />
                            </div>
                            <input
                                value={req}
                                onChange={(e) => updateListItem('requirements', idx, e.target.value)}
                                placeholder="e.g. 3+ years React experience"
                                className="flex-grow bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/20 outline-none"
                            />
                            <button type="button" onClick={() => removeListItem('requirements', idx)} className="p-3 text-red-500/20 group-hover:text-red-500 transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                    {formData.requirements.length === 0 && (
                        <p className="text-white/20 text-xs font-medium text-center py-4">No requirements added yet. Click "Add Requirement" above.</p>
                    )}
                </div>
            </div>

            {/* Responsibilities */}
            <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <label className="text-xl font-black uppercase tracking-tight text-white/80">Responsibilities</label>
                    <button type="button" onClick={() => addListItem('responsibilities')} className="text-purple-400 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:text-purple-300 transition-colors">
                        <Plus size={14} /> Add Responsibility
                    </button>
                </div>
                <div className="space-y-3">
                    {formData.responsibilities.map((res, idx) => (
                        <div key={idx} className="flex gap-4 items-center group">
                            <div className="w-7 h-7 flex-shrink-0 bg-purple-500/10 rounded-full flex items-center justify-center">
                                <ChevronRight size={12} className="text-purple-400" />
                            </div>
                            <input
                                value={res}
                                onChange={(e) => updateListItem('responsibilities', idx, e.target.value)}
                                placeholder="e.g. Lead technical architecture decisions"
                                className="flex-grow bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/20 outline-none"
                            />
                            <button type="button" onClick={() => removeListItem('responsibilities', idx)} className="p-3 text-red-500/20 group-hover:text-red-500 transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                    {formData.responsibilities.length === 0 && (
                        <p className="text-white/20 text-xs font-medium text-center py-4">No responsibilities added yet. Click "Add Responsibility" above.</p>
                    )}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-8 border-t border-white/5 flex justify-end gap-6">
                <button type="button" onClick={onCancel} className="px-10 py-4 font-black text-white/20 hover:text-white transition-colors uppercase tracking-widest text-[10px]">Discard</button>
                <button
                    type="button"
                    onClick={() => onSave(formData)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-black px-12 py-5 rounded-[1.5rem] flex items-center gap-3 transition-all shadow-xl shadow-blue-900/40 uppercase tracking-widest text-[11px]"
                >
                    <Save size={20} /> {data._id ? 'Update Job' : 'Publish Job'}
                </button>
            </div>
        </div>
    );
};

const TrainingLogsTable = ({ logs, loading, onTrain }) => (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
            <thead>
                <tr className="bg-white/[0.02]">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/30">User Query</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/30">AI Response</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/30">Source</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/30 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {loading ? <tr><td colSpan="4" className="px-8 py-20 text-center text-white/20 uppercase tracking-widest text-xs font-bold">Synchronizing Logs...</td></tr> :
                    logs.length === 0 ? <tr><td colSpan="4" className="px-8 py-20 text-center text-white/20 uppercase tracking-widest text-xs font-bold">No training data yet.</td></tr> :
                        logs.map(log => (
                            <tr key={log._id} className={`hover:bg-white/[0.02] transition-all group ${log.isTrained ? 'opacity-40' : ''}`}>
                                <td className="px-8 py-6 max-w-xs">
                                    <p className="text-sm font-bold text-white leading-relaxed">{log.query}</p>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="bg-[#0a1120] border border-white/10 p-4 rounded-2xl group-hover:border-blue-500/20 transition-all">
                                        <p className="text-xs text-white/60 leading-relaxed italic line-clamp-3">"{log.response}"</p>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                        log.source === 'gemini' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                                        log.source === 'rule' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                                        'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                    }`}>
                                        {log.source}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    {log.isTrained ? (
                                        <div className="flex items-center justify-end gap-2 text-emerald-400 font-black uppercase text-[10px]">
                                            <Check size={14} /> Trained
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => onTrain(log)}
                                            className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ml-auto"
                                        >
                                            <Brain size={12} /> Add to Rules
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
            </tbody>
        </table>
    </div>
);

export default AdminDashboard;

// --- Chatbot Manager ---
const ChatManager = ({ config, onSave }) => {
    const [formData, setFormData] = useState({
        greetingMessage: config?.greetingMessage || '',
        voiceMessage: config?.voiceMessage || '',
        enabled: config?.enabled !== undefined ? config.enabled : true,
        rules: config?.rules || []
    });

    // Sync local state when backend config updates (Automatic Learning)
    useEffect(() => {
        if (config) {
            setFormData({
                greetingMessage: config.greetingMessage || '',
                voiceMessage: config.voiceMessage || '',
                enabled: config.enabled !== undefined ? config.enabled : true,
                rules: config.rules || []
            });
        }
    }, [config]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const addRule = () => {
        setFormData(prev => ({ ...prev, rules: [...prev.rules, { keyword: '', action: 'message', value: '' }] }));
    };

    const updateRule = (index, field, value) => {
        const updated = [...formData.rules];
        updated[index] = { ...updated[index], [field]: value };
        setFormData(prev => ({ ...prev, rules: updated }));
    };

    const removeRule = (index) => {
        setFormData(prev => ({ ...prev, rules: prev.rules.filter((_, i) => i !== index) }));
    };

    // Reverse rules to show newest training first
    const sortedRules = [...formData.rules].reverse();

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-white/5 pb-8">
                <div>
                    <h2 className="text-3xl font-black uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        AI Chatbot Control
                    </h2>
                    <p className="text-white/30 text-xs mt-1 font-bold uppercase tracking-[0.2em]">Manage workflow, keywords, and voice greetings</p>
                </div>
                <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Bot Status</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="enabled" checked={formData.enabled} onChange={handleChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                            <MessageSquare size={18} />
                        </div>
                        <h3 className="text-lg font-bold">Text Greeting</h3>
                    </div>
                    <textarea
                        name="greetingMessage"
                        value={formData.greetingMessage}
                        onChange={handleChange}
                        rows={3}
                        placeholder="The first text message user sees..."
                        className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 outline-none resize-none"
                    />
                </div>

                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400">
                            <Volume2 size={18} />
                        </div>
                        <h3 className="text-lg font-bold">Voice Greeting</h3>
                    </div>
                    <textarea
                        name="voiceMessage"
                        value={formData.voiceMessage}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Text to be spoken by AI when user arrives..."
                        className="w-full bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/50 outline-none resize-none"
                    />
                </div>
            </div>

            <div className="space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                            <Zap size={22} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-black uppercase tracking-tight text-white/80">Active Workflow Rules</h3>
                                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-black rounded-full border border-blue-500/20">
                                    {formData.rules.length} Total
                                </span>
                            </div>
                            <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Automatic rules learned from AI or set by you</p>
                        </div>
                    </div>
                    <button type="button" onClick={addRule} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                        <Plus size={14} /> New Manual Rule
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {sortedRules.map((rule, idx) => {
                        const originalIdx = formData.rules.length - 1 - idx;
                        return (
                            <div key={originalIdx} className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-white/[0.03] border border-white/10 rounded-3xl items-center group hover:border-blue-500/30 transition-all">
                                <div className="md:col-span-3">
                                    <label className="text-[9px] font-black uppercase text-white/20 mb-2 block">If user says</label>
                                    <input
                                        value={rule.keyword}
                                        onChange={(e) => updateRule(originalIdx, 'keyword', e.target.value)}
                                        placeholder="Keyword..."
                                        className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/30"
                                    />
                                </div>
                                <div className="md:col-span-3">
                                    <label className="text-[9px] font-black uppercase text-white/20 mb-2 block">Perform Action</label>
                                    <select
                                        value={rule.action}
                                        onChange={(e) => updateRule(originalIdx, 'action', e.target.value)}
                                        className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/30"
                                    >
                                        <option value="message">Show Message</option>
                                        <option value="navigate">Navigate to Page</option>
                                        <option value="popup">Open Popup</option>
                                    </select>
                                </div>
                                <div className="md:col-span-5">
                                    <label className="text-[9px] font-black uppercase text-white/20 mb-2 block">Response Value</label>
                                    <input
                                        value={rule.value}
                                        onChange={(e) => updateRule(originalIdx, 'value', e.target.value)}
                                        placeholder="Enter response or URL..."
                                        className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/30"
                                    />
                                </div>
                                <div className="md:col-span-1 flex justify-end pt-5">
                                    <button onClick={() => removeRule(originalIdx)} className="p-3 text-red-500/20 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {formData.rules.length === 0 && (
                        <div className="py-12 border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/10 mb-4">
                                <Zap size={24} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">No active rules. AI is currently handling all chats.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex justify-end">
                <button
                    onClick={() => onSave(formData)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-black px-12 py-5 rounded-[1.5rem] flex items-center gap-3 transition-all shadow-xl shadow-blue-900/40 uppercase tracking-widest text-[11px]"
                >
                    <Save size={20} /> Save Chatbot Settings
                </button>
            </div>
        </div>
    );
};
