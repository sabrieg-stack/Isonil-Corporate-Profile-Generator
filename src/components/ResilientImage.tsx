import React, { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  caption?: string;
  figureNumber?: string;
  captionPosition?: 'bottom-bar' | 'overlay-bottom-right';
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  caption,
  figureNumber,
  captionPosition = 'bottom-bar',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`flex flex-col ${className}`}>
      <div className="relative flex-1 overflow-hidden bg-[#131822]">
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={imgClassName}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#131822] via-[#1C2331] to-[#0B0F17] text-[#F6F7F9]">
            <svg
              className="w-10 h-10 text-[#C81E24] mb-3 opacity-80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 10h16M4 14h16M9 4v16M15 4v16" strokeLinecap="round" />
            </svg>
            <span className="text-xs tracking-wider uppercase font-mono-tabular text-[#D1D6DF] text-center">
              {alt}
            </span>
          </div>
        )}

        {caption && captionPosition === 'overlay-bottom-right' && (
          <figcaption className="absolute bottom-3 right-3 bg-[#0B0F17]/88 backdrop-blur-xs px-3 py-1 text-[10px] text-[#EFEBD2] tracking-wide font-sans border border-[#2B3447]">
            {caption}
          </figcaption>
        )}
      </div>

      {caption && captionPosition === 'bottom-bar' && (
        <figcaption className="pt-2 pb-1 border-b border-[#D1D6DF] text-[10px] text-[#4B5563] flex items-baseline justify-between gap-3 shrink-0">
          <span className="truncate">{caption}</span>
          {figureNumber && (
            <span className="font-mono-tabular text-[9.5px] uppercase tracking-wider text-[#C81E24] font-semibold shrink-0">
              {figureNumber}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
};
