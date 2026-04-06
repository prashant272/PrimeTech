import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import api from '../api/axios';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/admin/login', {
                email,
                password
            });

            if (response.data.token) {
                localStorage.setItem('adminToken', response.data.token);
                localStorage.setItem('adminUser', JSON.stringify(response.data));
                navigate('/prime-admin/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative group">
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20 relative">
                            <Lock className="text-white" size={32} />
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-40"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                            </span>
                        </div>
                        <h2 className="text-3xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            Prime Admin Gateway
                        </h2>
                        <p className="text-white/40 text-sm font-medium uppercase tracking-[0.2em]">Authorized Access Only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors">
                                <Mail size={18} />
                            </div>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Admin Email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-medium"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors">
                                <ShieldCheck size={18} />
                            </div>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-medium"
                            />
                        </div>

                        {error && (
                            <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-xs font-bold text-center px-4"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button 
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/40 active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-sm relative overflow-hidden group/btn"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Enter Dashboard <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-center gap-4 text-white/20">
                        <Sparkles size={14} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Prime Impact Security Core</span>
                        <Sparkles size={14} />
                    </div>
                </div>
                
                <p className="mt-8 text-center text-white/20 text-[10px] uppercase font-bold tracking-widest">
                    &copy; 2026 Prime Impact IT Solutions. All Rights Reserved.
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
