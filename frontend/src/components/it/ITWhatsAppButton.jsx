import React from 'react';
import { MessageCircle } from 'lucide-react';

const ITWhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/919801017333"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[9999] group flex items-center"
        >
            {/* Tooltip/Label */}
            <div className="mr-3 py-2 px-4 bg-white text-dark-900 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 shadow-xl border border-white/20 whitespace-nowrap">
                Chat with our experts
            </div>

            {/* The Button */}
            <div className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:scale-110 transition-all duration-300 ring-4 ring-green-900/10">
                <MessageCircle size={32} className="text-white" fill="white" />
            </div>
        </a>
    );
};

export default ITWhatsAppButton;
