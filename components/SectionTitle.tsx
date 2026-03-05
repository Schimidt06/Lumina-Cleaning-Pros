
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, light }) => {
  return (
    <div className="text-center mb-12 sm:mb-16 px-4 animate-on-scroll">
      <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 tracking-tighter ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-medium ${light ? 'text-slate-300' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
      <div className={`w-24 h-2 mx-auto mt-8 sm:mt-10 rounded-full bg-accent animate-bar-grow transition-colors duration-500`}></div>
    </div>
  );
};
