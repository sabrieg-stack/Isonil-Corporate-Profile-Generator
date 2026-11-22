import React from 'react';
import { ISONIL_CONTACT, ISONIL_IMAGES } from '../data/isonilProfileData';

interface A4PageLayoutProps {
  id: string;
  pageNumber: number;
  totalPages?: number;
  sectionLabel: string;
  children: React.ReactNode;
  variant?: 'cover' | 'standard' | 'contact';
}

export const IsonilLogoMark: React.FC<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}> = ({ size = 'md' }) => {
  const boxSizeMap = {
    xs: 'w-5 h-5',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-9 h-9 sm:w-10 sm:h-10',
    xl: 'w-11 h-11 sm:w-16 sm:h-16',
  };

  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden bg-white shrink-0 select-none ${boxSizeMap[size]}`}
    >
      <img
        src={ISONIL_IMAGES.logo}
        alt="Logo ISONIL"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain scale-[1.24]"
      />
    </span>
  );
};

export const IsonilWordmark: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
}> = ({ size = 'md', theme = 'dark' }) => {
  const textColor = theme === 'light' ? 'text-[#E2E6EC]' : 'text-[#131822]';
  const ruleColor = 'bg-[#C81E24]';

  const sizeMap = {
    sm: {
      gap: 'gap-2',
      logo: 'sm' as const,
      text: 'text-base tracking-[0.2em]',
      rule: 'h-[2px] w-6 mt-0.5',
    },
    md: {
      gap: 'gap-2.5 sm:gap-3',
      logo: 'md' as const,
      text: 'text-lg sm:text-xl tracking-[0.22em]',
      rule: 'h-[2px] w-8 mt-1',
    },
    lg: {
      gap: 'gap-3 sm:gap-3.5',
      logo: 'lg' as const,
      text: 'text-2xl sm:text-3xl tracking-[0.22em] sm:tracking-[0.26em]',
      rule: 'h-[2.5px] w-10 sm:w-12 mt-1.5',
    },
    xl: {
      gap: 'gap-3 sm:gap-4',
      logo: 'xl' as const,
      text: 'text-3xl sm:text-[50px] tracking-[0.2em] sm:tracking-[0.24em]',
      rule: 'h-[2.5px] sm:h-[3px] w-12 sm:w-16 mt-1.5 sm:mt-2',
    },
  };

  return (
    <div className={`inline-flex items-center ${sizeMap[size].gap} select-none`}>
      <IsonilLogoMark size={sizeMap[size].logo} />
      <div className="inline-flex flex-col">
        <span
          className={`font-display font-bold uppercase leading-none ${textColor} ${sizeMap[size].text}`}
        >
          {ISONIL_CONTACT.companyName}
        </span>
        <span className={`${ruleColor} ${sizeMap[size].rule}`} aria-hidden="true" />
      </div>
    </div>
  );
};

export const A4PageLayout: React.FC<A4PageLayoutProps> = ({
  id,
  pageNumber,
  totalPages = 7,
  sectionLabel,
  children,
  variant = 'standard',
}) => {
  const formattedPage = String(pageNumber).padStart(2, '0');
  const formattedTotal = String(totalPages).padStart(2, '0');

  if (variant === 'cover') {
    return (
      <section
        id={id}
        data-page-number={pageNumber}
        aria-label={`Page ${pageNumber} — ${sectionLabel}`}
        className="a4-sheet bg-[#131822] text-[#F6F7F9]"
      >
        {children}
      </section>
    );
  }

  return (
    <section
      id={id}
      data-page-number={pageNumber}
      aria-label={`Page ${pageNumber} — ${sectionLabel}`}
      className="a4-sheet bg-[#F6F7F9] text-[#131822] px-5 py-6 sm:px-[16mm] sm:py-[14mm]"
    >
      {/* Top Running Header */}
      <header className="flex items-center justify-between gap-2 pb-3 border-b border-[#D1D6DF] shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <IsonilLogoMark size="xs" />
          <span className="font-display font-bold text-[12.5px] sm:text-[13px] tracking-[0.2em] sm:tracking-[0.22em] text-[#131822]">
            ISONIL
          </span>
          <span className="hidden sm:inline text-[#C81E24] font-semibold" aria-hidden="true">
            /
          </span>
          <span className="hidden sm:inline text-[10.5px] font-medium tracking-[0.12em] uppercase text-[#5B6472]">
            Profil d’entreprise
          </span>
        </div>
        <div className="text-[10px] sm:text-[10.5px] font-mono-tabular tracking-[0.08em] sm:tracking-[0.1em] uppercase text-[#5B6472] truncate">
          {sectionLabel}
        </div>
      </header>

      {/* Main Page Body */}
      <div className="flex-1 flex flex-col justify-between py-5 sm:py-6 sm:overflow-hidden">
        {children}
      </div>

      {/* Bottom Running Footer */}
      <footer className="pt-3 border-t border-[#D1D6DF] flex items-center justify-between gap-2 text-[10px] text-[#5B6472] shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="font-semibold text-[#131822]">ISONIL</span>
          <span aria-hidden="true">·</span>
          <span className="sm:hidden truncate">El Jadida, Maroc</span>
          <span className="hidden sm:inline">Isolation thermique industrielle au Maroc</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline">El Jadida</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 font-mono-tabular shrink-0">
          <span className="hidden sm:inline">isonil.com</span>
          <span className="hidden sm:inline text-[#C81E24] font-semibold" aria-hidden="true">
            /
          </span>
          <span className="font-semibold text-[#131822]">
            {formattedPage} — {formattedTotal}
          </span>
        </div>
      </footer>
    </section>
  );
};
