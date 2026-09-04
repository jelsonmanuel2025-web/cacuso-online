import React from 'react';

interface AngolaHomeArtBackgroundProps {
  themeVariant?: 'angola-vibrant' | 'sunset-home' | 'noite-cacuso';
}

export const AngolaHomeArtBackground: React.FC<AngolaHomeArtBackgroundProps> = ({
  themeVariant = 'angola-vibrant',
}) => {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* Base Canvas with Deep Rich Black and Angola Crimson Gradient */}
      <div className="absolute inset-0 bg-[#0f0e13]" />

      {/* Top Half: Warm Angolan Crimson/Rubro Sunset Glow */}
      <div 
        className="absolute -top-40 -left-40 right-0 h-[650px] opacity-90 blur-3xl transform-gpu"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(200, 16, 46, 0.45), rgba(168, 28, 28, 0.25) 40%, rgba(15, 14, 19, 0) 80%)'
        }}
      />

      {/* Golden Sun & Hearth Light (Amarelo Dourado da Bandeira - Ouro & Calor do Lar) */}
      <div 
        className="absolute top-10 right-10 md:right-1/4 w-[500px] h-[500px] rounded-full opacity-60 blur-3xl transform-gpu"
        style={{
          background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.35), rgba(245, 158, 11, 0.18) 50%, rgba(15, 14, 19, 0) 75%)'
        }}
      />

      {/* Deep Red Hearth Glow Center (Calor do Lar Angolano) */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-40 blur-3xl transform-gpu"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(185, 28, 28, 0.3), rgba(15, 14, 19, 0) 70%)'
        }}
      />

      {/* Lower Half: Grounding Terra Preta Angolana */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[450px] opacity-80"
        style={{
          background: 'linear-gradient(to top, #0b0b0e 0%, rgba(18, 18, 24, 0.95) 50%, rgba(15, 14, 19, 0) 100%)'
        }}
      />

      {/* Traditional Angolan Geometric Motif Overlay (Muxima / Samakaka Subtle Vectors) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.035] text-amber-400"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="angola-samakaka-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Geometric African Diamond & Chevron Motif */}
            <path 
              d="M40 0 L80 40 L40 80 L0 40 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.2" 
            />
            <path 
              d="M40 15 L65 40 L40 65 L15 40 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.8" 
            />
            {/* Traditional Star / Emblema Dourado Accent */}
            <circle cx="40" cy="40" r="3" fill="currentColor" />
            <path 
              d="M0 0 L40 40 M80 0 L40 40 M80 80 L40 40 M0 80 L40 40" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              strokeDasharray="2,2" 
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#angola-samakaka-pattern)" />
      </svg>

      {/* Warm Ambient Vignette for cozy "Transmitir um Lar" Feeling */}
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 140px rgba(11, 11, 14, 0.85)'
        }}
      />
    </div>
  );
};
