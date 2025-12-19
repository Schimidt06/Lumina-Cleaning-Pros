
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, light }) => {
  return (
    <div className="text-center mb-16 px-4">
      <h2 className={`text-4xl md:text-6xl font-black mb-6 tracking-tighter ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-3xl mx-auto text-xl leading-relaxed font-medium ${light ? 'text-slate-300' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
      <div className={`w-24 h-2 mx-auto mt-10 rounded-full bg-accent transition-colors duration-500`}></div>
    </div>
  );
};
