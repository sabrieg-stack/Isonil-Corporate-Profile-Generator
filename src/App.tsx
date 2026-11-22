/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  FileText,
  Check,
  Phone,
  Menu,
  X,
  Layers,
} from 'lucide-react';
import {
  Page1Cover,
  Page2Positioning,
  Page3Engineering,
  Page4Solutions,
  Page5Performance,
  Page6CommitmentsWorkflow,
  Page7Contact,
} from './components/ProfilePages';
import { IsonilLogoMark } from './components/A4PageLayout';
import { ISONIL_CONTACT, PAGE_MANIFEST } from './data/isonilProfileData';
import { generateIsonilPdf } from './utils/generateIsonilPdf';

const TOTAL_PAGES = PAGE_MANIFEST.length;

export default function App() {
  const [viewMode, setViewMode] = useState<'continuous' | 'single'>('continuous');
  const [activePage, setActivePage] = useState<number>(1);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [exportStatusMessage, setExportStatusMessage] = useState<string | null>(null);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState<boolean>(false);

  // Track visible page accurately while scrolling in continuous mode
  useEffect(() => {
    if (viewMode !== 'continuous') return;

    const sections = PAGE_MANIFEST.map((p) => document.getElementById(p.id)).filter(
      Boolean
    ) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const num = Number(visible[0].target.getAttribute('data-page-number'));
          if (num >= 1 && num <= TOTAL_PAGES) {
            setActivePage(num);
          }
        }
      },
      {
        rootMargin: '-20% 0px -45% 0px',
        threshold: [0.15, 0.35, 0.6],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [viewMode]);

  const navigateToPage = (pageNumber: number) => {
    setActivePage(pageNumber);
    setIsMobileSheetOpen(false);
    if (viewMode === 'continuous') {
      const target = document.getElementById(`page-${pageNumber}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    setIsMobileSheetOpen(false);
    setExportStatusMessage(
      `Génération du document PDF A4 (${TOTAL_PAGES} pages) en cours...`
    );
    try {
      await generateIsonilPdf();
      setExportStatusMessage(
        'Le fichier ISONIL_Profil_Entreprise_A4.pdf a été téléchargé avec succès.'
      );
      setTimeout(() => {
        setExportStatusMessage(null);
      }, 6000);
    } catch {
      window.print();
      setExportStatusMessage(null);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleNativePrint = () => {
    setIsMobileSheetOpen(false);
    if (viewMode === 'single') {
      setViewMode('continuous');
      setTimeout(() => {
        window.print();
      }, 150);
    } else {
      window.print();
    }
  };

  const renderSinglePage = (pageNumber: number) => {
    switch (pageNumber) {
      case 1:
        return <Page1Cover />;
      case 2:
        return <Page2Positioning />;
      case 3:
        return <Page3Engineering />;
      case 4:
        return <Page4Solutions />;
      case 5:
        return <Page5Performance />;
      case 6:
        return <Page6CommitmentsWorkflow />;
      case 7:
        return <Page7Contact />;
      default:
        return <Page1Cover />;
    }
  };

  const activePageMeta = PAGE_MANIFEST[activePage - 1] ?? PAGE_MANIFEST[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#DCE0E6] text-[#131822]">
      {/* Compact Sticky Top Navigation Bar (Matches Official ISONIL Website Header) */}
      <header className="no-print sticky top-0 z-30 bg-[#131822]/95 backdrop-blur-md text-[#F6F7F9] border-b border-[#232B3A] px-4 sm:px-6 h-14 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Title */}
        <a
          href="#page-1"
          onClick={(e) => {
            e.preventDefault();
            navigateToPage(1);
          }}
          className="inline-flex items-center gap-2.5 font-display text-base sm:text-lg font-bold tracking-[0.22em] sm:tracking-[0.24em] text-[#E2E6EC] whitespace-nowrap shrink-0 min-h-[44px]"
        >
          <IsonilLogoMark size="sm" />
          <span>ISONIL</span>
        </a>

        {/* Zone 2: Desktop Single-Line Navigation Links */}
        <nav
          aria-label="Sections du profil d’entreprise"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#C7CDD8]"
        >
          {PAGE_MANIFEST.slice(1).map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                navigateToPage(item.pageNumber);
              }}
              className={`hover:text-[#EFEBD2] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                activePage === item.pageNumber ? 'text-[#EFEBD2]' : ''
              }`}
            >
              {item.pageNumber === 4
                ? 'Prestations'
                : item.pageNumber === 5
                  ? 'Impact'
                  : item.pageNumber === 6
                    ? 'Engagements'
                    : item.pageNumber === 7
                      ? 'Contact'
                      : item.pageNumber === 3
                        ? 'Ingénierie'
                        : 'Positionnement'}
            </a>
          ))}
        </nav>

        {/* Zone 3: Responsive Header Actions (Call + Menu on mobile like isonil.com, Primary PDF on desktop) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Direct Call Icon (Echoes official website mobile header) */}
          <a
            href={ISONIL_CONTACT.phoneHref}
            aria-label={`Appeler ISONIL au ${ISONIL_CONTACT.phoneDisplay}`}
            className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-[#F6F7F9] hover:text-[#EFEBD2] active:scale-95 transition-transform"
          >
            <Phone className="w-5 h-5" />
          </a>

          {/* Mobile Sommaire Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileSheetOpen(true)}
            aria-label="Ouvrir le sommaire du profil"
            className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-[#F6F7F9] hover:text-[#EFEBD2] active:scale-95 transition-transform cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Primary PDF Action */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="hidden md:inline-flex px-4 py-2 text-xs font-semibold text-[#F6F7F9] bg-[#C81E24] hover:bg-[#DC262C] rounded-sm transition-colors whitespace-nowrap shrink-0 items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              {isGeneratingPdf ? 'Export PDF en cours...' : 'Télécharger en PDF / Imprimer'}
            </span>
          </button>
        </div>
      </header>

      {/* Desktop Secondary Document Workspace Toolbar (Hidden on Mobile & Print) */}
      <div className="no-print hidden md:block bg-[#EAECEF] border-b border-[#D1D6DF] px-6 py-2.5">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Page Jump Segmented Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {PAGE_MANIFEST.map((page) => {
              const isSelected = activePage === page.pageNumber;
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => navigateToPage(page.pageNumber)}
                  className={`px-2.5 py-1 text-xs font-mono-tabular rounded-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#131822] text-[#EFEBD2] font-medium'
                      : 'text-[#374151] hover:bg-[#DCE0E6] hover:text-[#131822]'
                  }`}
                >
                  {page.shortTitle}
                </button>
              );
            })}
          </div>

          {/* View Mode & Print Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#DCE0E6] p-0.5 rounded-xs">
              <button
                type="button"
                onClick={() => setViewMode('continuous')}
                className={`px-2.5 py-1 text-xs font-medium rounded-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'continuous'
                    ? 'bg-white text-[#131822] shadow-2xs'
                    : 'text-[#4B5563] hover:text-[#131822]'
                }`}
              >
                {TOTAL_PAGES} pages A4
              </button>
              <button
                type="button"
                onClick={() => setViewMode('single')}
                className={`px-2.5 py-1 text-xs font-medium rounded-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'single'
                    ? 'bg-white text-[#131822] shadow-2xs'
                    : 'text-[#4B5563] hover:text-[#131822]'
                }`}
              >
                Page par page
              </button>
            </div>

            <button
              type="button"
              onClick={handleNativePrint}
              className="px-3 py-1.5 text-xs font-medium text-[#131822] bg-[#F6F7F9] border border-[#C6CCD6] hover:bg-white rounded-xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#C81E24]" />
              <span>Imprimer A4</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Banner on PDF Generation (Hidden in Print) */}
      {exportStatusMessage && (
        <div className="no-print bg-[#0B0F17] text-[#F6F7F9] px-4 sm:px-6 py-2.5 border-b border-[#2B3447]">
          <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#EFEBD2] shrink-0" />
              <span>{exportStatusMessage}</span>
            </div>
            <button
              type="button"
              onClick={handleNativePrint}
              className="self-start sm:self-auto underline text-[#EFEBD2] hover:text-white cursor-pointer whitespace-nowrap"
            >
              Imprimer via le navigateur
            </button>
          </div>
        </div>
      )}

      {/* Main A4 Document Presentation Area */}
      <main className="flex-1 py-4 sm:py-8 px-3 sm:px-6 pb-24 md:pb-8 print-container flex flex-col items-center gap-5 sm:gap-8">
        {viewMode === 'continuous' ? (
          <>
            <Page1Cover />
            <Page2Positioning />
            <Page3Engineering />
            <Page4Solutions />
            <Page5Performance />
            <Page6CommitmentsWorkflow />
            <Page7Contact />
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 sm:gap-5 w-full">
            {renderSinglePage(activePage)}

            {/* Single-page Stepper Controls (Touch-Friendly 44px Hitboxes, Hidden in Print) */}
            <div className="no-print w-full max-w-[210mm] sm:w-auto flex items-center justify-between gap-3 sm:gap-6 bg-[#F6F7F9] border border-[#D1D6DF] px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xs shadow-xs">
              <button
                type="button"
                onClick={() => navigateToPage(Math.max(1, activePage - 1))}
                disabled={activePage === 1}
                className="inline-flex items-center gap-1 min-h-[44px] sm:min-h-0 px-2 text-xs font-medium text-[#131822] disabled:opacity-35 cursor-pointer whitespace-nowrap"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Précédent</span>
              </button>
              <span className="font-mono-tabular text-[11px] sm:text-xs text-[#4B5563] text-center truncate">
                0{activePage} / 0{TOTAL_PAGES} · {activePageMeta.label}
              </span>
              <button
                type="button"
                onClick={() => navigateToPage(Math.min(TOTAL_PAGES, activePage + 1))}
                disabled={activePage === TOTAL_PAGES}
                className="inline-flex items-center gap-1 min-h-[44px] sm:min-h-0 px-2 text-xs font-medium text-[#131822] disabled:opacity-35 cursor-pointer whitespace-nowrap"
              >
                <span>Suivant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Quiet Institutional Footer (Hidden in Print, extra bottom clearance on mobile for thumb bar) */}
      <footer className="no-print bg-[#0B0F17] text-[#C7CDD8] border-t border-[#232B3A] px-5 sm:px-6 pt-6 pb-24 md:pb-6 text-xs">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-display font-bold tracking-[0.2em] text-[#E2E6EC]">
              {ISONIL_CONTACT.companyName}
            </div>
            <div className="text-[#98A2B3] leading-relaxed">
              {ISONIL_CONTACT.fullAddress} · Tél. :{' '}
              <a href={ISONIL_CONTACT.phoneHref} className="text-[#EFEBD2] hover:underline">
                {ISONIL_CONTACT.phoneDisplay}
              </a>{' '}
              · {ISONIL_CONTACT.email}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="px-3.5 py-2 bg-[#C81E24] hover:bg-[#DC262C] text-white font-medium rounded-xs transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Télécharger le PDF (A4)</span>
            </button>
            <button
              type="button"
              onClick={handleNativePrint}
              className="px-3.5 py-2 bg-[#1C2331] hover:bg-[#2B3447] text-[#F6F7F9] font-medium rounded-xs transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Thumb-Zone Bottom Action Bar (<= 60px, Hidden on Desktop & Print) */}
      <nav
        aria-label="Actions rapides mobiles"
        className="no-print md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#131822]/96 backdrop-blur-md border-t border-[#2B3447] px-3 py-2 flex items-center justify-between gap-2 shadow-[0_-6px_24px_rgba(11,15,23,0.28)]"
      >
        <button
          type="button"
          onClick={() => setIsMobileSheetOpen(true)}
          className="flex-1 min-h-[44px] px-3 bg-[#1C2331] active:scale-[0.98] transition-transform rounded-xs border border-[#2B3447] flex items-center justify-between gap-2 text-left cursor-pointer"
        >
          <span className="inline-flex items-center gap-2 min-w-0">
            <Layers className="w-4 h-4 text-[#EFEBD2] shrink-0" />
            <span className="text-[11.5px] font-medium text-[#F6F7F9] truncate">
              {activePageMeta.label}
            </span>
          </span>
          <span className="font-mono-tabular text-[10.5px] text-[#98A2B3] shrink-0">
            0{activePage}/0{TOTAL_PAGES}
          </span>
        </button>

        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="min-h-[44px] px-4 bg-[#C81E24] hover:bg-[#DC262C] active:scale-[0.98] transition-all text-white text-xs font-semibold rounded-xs flex items-center justify-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-60"
        >
          <Download className="w-4 h-4" />
          <span>{isGeneratingPdf ? 'PDF...' : 'PDF A4'}</span>
        </button>
      </nav>

      {/* Mobile Slide-Up Bottom Sheet: Full Sommaire, View Switcher & Print */}
      {isMobileSheetOpen && (
        <div
          className="no-print md:hidden fixed inset-0 z-50 flex items-end bg-black/60 backdrop-blur-xs"
          onClick={() => setIsMobileSheetOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Sommaire du profil ISONIL"
            className="w-full max-h-[84vh] overflow-y-auto bg-[#131822] text-[#F6F7F9] rounded-t-2xl border-t border-[#2B3447] px-5 pt-3 pb-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab Handle */}
            <div className="w-10 h-1 bg-[#4B5563] rounded-full mx-auto mb-3" />

            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2B3447]">
              <div>
                <div className="font-mono-tabular text-[10px] uppercase tracking-[0.16em] text-[#E03137]">
                  Sommaire · {TOTAL_PAGES} pages A4
                </div>
                <div className="font-display font-bold text-base text-[#EFEBD2]">
                  Profil d’entreprise ISONIL
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileSheetOpen(false)}
                aria-label="Fermer le sommaire"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-[#C7CDD8] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 7-Page Navigation Rows (44px+ Touch Hitboxes) */}
            <div className="divide-y divide-[#232B3A]">
              {PAGE_MANIFEST.map((page) => {
                const isSelected = activePage === page.pageNumber;
                return (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => navigateToPage(page.pageNumber)}
                    className={`w-full min-h-[48px] px-2 flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isSelected ? 'text-[#EFEBD2] bg-[#1C2331]' : 'text-[#DCE1EA]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono-tabular text-xs font-semibold text-[#E03137]">
                        0{page.pageNumber}
                      </span>
                      <span className="font-display text-sm font-medium">{page.label}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#98A2B3]" />
                  </button>
                );
              })}
            </div>

            {/* Reading Mode Switcher & Direct Actions */}
            <div className="mt-5 pt-4 border-t border-[#2B3447] space-y-3">
              <div className="grid grid-cols-2 gap-2 bg-[#0B0F17] p-1 rounded-xs">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('continuous');
                    setIsMobileSheetOpen(false);
                  }}
                  className={`min-h-[40px] text-xs font-medium rounded-xs cursor-pointer ${
                    viewMode === 'continuous'
                      ? 'bg-[#1C2331] text-[#EFEBD2]'
                      : 'text-[#98A2B3]'
                  }`}
                >
                  Lecture continue
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('single');
                    setIsMobileSheetOpen(false);
                  }}
                  className={`min-h-[40px] text-xs font-medium rounded-xs cursor-pointer ${
                    viewMode === 'single' ? 'bg-[#1C2331] text-[#EFEBD2]' : 'text-[#98A2B3]'
                  }`}
                >
                  Page par page
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="min-h-[46px] px-3 bg-[#C81E24] hover:bg-[#DC262C] text-white text-xs font-semibold rounded-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger PDF</span>
                </button>
                <button
                  type="button"
                  onClick={handleNativePrint}
                  className="min-h-[46px] px-3 bg-[#1C2331] hover:bg-[#2B3447] text-[#F6F7F9] border border-[#2B3447] text-xs font-medium rounded-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#EFEBD2]" />
                  <span>Imprimer A4</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
