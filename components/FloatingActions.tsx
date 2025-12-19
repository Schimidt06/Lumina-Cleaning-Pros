
import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-[9999]">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/10000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center"
      >
        <div className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-xl font-black text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-100 hidden sm:block">
          WhatsApp
        </div>
        <div className="bg-green-500 hover:bg-green-600 text-white p-4 sm:p-5 rounded-[1.5rem] shadow-2xl shadow-green-500/30 transition-all hover:scale-110 active:scale-95 flex items-center justify-center">
          <MessageCircle className="w-7 h-7" fill="currentColor" />
        </div>
      </a>

      {/* Phone Button */}
      <a
        href="tel:+10000000000"
        className="group relative flex items-center justify-center"
      >
        <div className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-xl font-black text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-100 hidden sm:block">
          Call Now
        </div>
        <div className="bg-blue-600 hover:bg-blue-700 text-white p-4 sm:p-5 rounded-[1.5rem] shadow-2xl shadow-blue-600/30 transition-all hover:scale-110 active:scale-95 flex items-center justify-center">
          <Phone className="w-7 h-7" />
        </div>
      </a>
    </div>
  );
};
