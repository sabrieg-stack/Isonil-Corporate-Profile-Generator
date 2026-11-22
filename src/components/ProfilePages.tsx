import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { A4PageLayout, IsonilWordmark } from './A4PageLayout';
import { ResilientImage } from './ResilientImage';
import {
  APPROACH_STEPS,
  CLIENT_BENEFITS,
  COMMITMENTS_LIST,
  CONTACT_INTAKE_CUES,
  EXECUTIVE_OVERVIEW,
  ISONIL_CONTACT,
  ISONIL_IMAGES,
  PROCUREMENT_WORKFLOW,
  SERVICES_LIST,
  TECHNICAL_SYSTEMS_MATRIX,
} from '../data/isonilProfileData';

/* ==========================================================================
   PAGE 1 — COUVERTURE ARCHITECTURALE (IDENTITÉ OFFICIELLE ISONIL.COM)
   ========================================================================== */
export const Page1Cover: React.FC = () => {
  return (
    <A4PageLayout id="page-1" pageNumber={1} totalPages={7} sectionLabel="Couverture" variant="cover">
      <div className="h-full flex flex-col justify-between bg-[#131822] text-[#F6F7F9] relative">
        {/* Asymmetric vertical ISONIL red editorial accent along left edge */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-gradient-to-b from-[#C81E24] via-[#C81E24]/70 to-transparent"
          aria-hidden="true"
        />

        {/* Top Institutional Band */}
        <div className="px-5 pt-7 pb-6 sm:px-[18mm] sm:pt-[16mm] sm:pb-7">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-[#2B3447] pb-5 sm:pb-6">
            <div>
              <IsonilWordmark size="xl" theme="light" />
            </div>
            <div className="sm:text-right font-mono-tabular text-xs text-[#C7CDD8] flex sm:block items-center justify-between sm:space-y-1 pt-1">
              <div className="uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#EFEBD2] font-medium">
                {ISONIL_CONTACT.documentTitle}
              </div>
              <div className="text-[11px] text-[#98A2B3]">El Jadida · Maroc</div>
            </div>
          </div>

          {/* Primary Document Title & Specialty */}
          <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
            <div className="text-[10.5px] sm:text-[11px] font-mono-tabular uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#E03137]">
              Dossier de présentation industrielle
            </div>
            <h1
              className="font-display font-bold text-[26px] sm:text-[38px] leading-[1.15] sm:leading-[1.12] tracking-tight text-[#EFEBD2] max-w-2xl"
              style={{ textWrap: 'balance' }}
            >
              {ISONIL_CONTACT.specialty}
            </h1>
            <p className="text-[14.5px] sm:text-[16px] leading-[1.55] text-[#DCE1EA] max-w-xl font-normal">
              {ISONIL_CONTACT.tagline}
            </p>
          </div>
        </div>

        {/* Dominant Framed Industrial Plate */}
        <div className="h-[235px] sm:h-auto sm:flex-1 sm:min-h-[112mm] sm:max-h-[144mm] px-5 sm:px-[18mm] mb-6 sm:mb-0 flex flex-col">
          <div className="flex-1 relative border border-[#2B3447] overflow-hidden">
            <ResilientImage
              src={ISONIL_IMAGES.coverIndustrialPiping}
              alt="Vue d’une installation industrielle moderne avec réseaux de tuyauteries calorifugées"
              className="w-full h-full"
              imgClassName="w-full h-full object-cover object-center"
              caption="Réseaux de tuyauteries industrielles calorifugées"
              captionPosition="overlay-bottom-right"
            />
          </div>
        </div>

        {/* Cover Colophon Metadata Strip */}
        <div className="px-5 py-5 sm:px-[18mm] sm:py-[11mm] bg-[#0B0F17] border-t border-[#232B3A]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-xs">
            <div>
              <div className="text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-[#98A2B3] mb-1">
                Domaines clés
              </div>
              <div className="font-medium text-[#F6F7F9]">
                Calorifugeage · Matelas · Froid
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-[#98A2B3] mb-1">
                Équipe technique
              </div>
              <div className="font-medium text-[#EFEBD2]">
                +15 ans d’expérience terrain cumulée
              </div>
            </div>
            <div className="sm:text-right">
              <div className="text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-[#98A2B3] mb-1">
                Contact direct
              </div>
              <div className="font-mono-tabular text-[#F6F7F9]">
                <a href={ISONIL_CONTACT.phoneHref} className="hover:text-[#EFEBD2]">
                  {ISONIL_CONTACT.phoneDisplay}
                </a>{' '}
                · isonil.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </A4PageLayout>
  );
};

/* ==========================================================================
   PAGE 2 — POSITIONNEMENT INDUSTRIEL (GRILLE ASYMÉTRIQUE 4 / 8)
   ========================================================================== */
export const Page2Positioning: React.FC = () => {
  return (
    <A4PageLayout id="page-2" pageNumber={2} totalPages={7} sectionLabel="01 · Positionnement">
      <div className="flex flex-col justify-between h-full gap-6 sm:gap-0">
        {/* Heading */}
        <div>
          <div className="text-[10.5px] font-mono-tabular uppercase tracking-[0.18em] text-[#C81E24] font-semibold mb-1.5">
            {EXECUTIVE_OVERVIEW.kicker}
          </div>
          <h2
            className="font-display font-bold text-[22px] sm:text-[28px] leading-[1.18] sm:leading-[1.16] text-[#131822] tracking-tight max-w-2xl"
            style={{ textWrap: 'balance' }}
          >
            {EXECUTIVE_OVERVIEW.title}
          </h2>
          <div className="h-[2px] w-14 bg-[#C81E24] mt-3" />
        </div>

        {/* Asymmetric 12-Column Reading Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-7 items-stretch sm:my-5">
          {/* Left 4-Col Anchor Column (Cool Architectural Steel Surface) */}
          <aside className="sm:col-span-4 bg-[#EAECEF] border-t-2 border-[#131822] p-5 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono-tabular uppercase tracking-[0.15em] text-[#5B6472] mb-2">
                Repères techniques
              </div>
              <div className="font-mono-tabular text-[30px] sm:text-[32px] leading-none font-bold text-[#131822] tracking-tight">
                +15 ans
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#C81E24] mt-1.5 mb-3">
                Expérience terrain cumulée
              </div>
              <p className="text-[12.5px] sm:text-[11.5px] leading-[1.55] text-[#374151] border-b border-[#D1D6DF] pb-4">
                {EXECUTIVE_OVERVIEW.experienceCaption}
              </p>
            </div>

            <dl className="grid grid-cols-1 gap-3.5 pt-4">
              {EXECUTIVE_OVERVIEW.keyFacts.slice(1).map((fact) => (
                <div
                  key={fact.label}
                  className="border-b border-[#D1D6DF] pb-2.5 last:border-b-0 last:pb-0"
                >
                  <dt className="text-[9.5px] font-mono-tabular uppercase tracking-[0.14em] text-[#5B6472]">
                    {fact.label}
                  </dt>
                  <dd className="font-display font-semibold text-[13.5px] text-[#131822] mt-0.5">
                    {fact.value}
                  </dd>
                  <dd className="text-[11.5px] sm:text-[10.8px] text-[#4B5563]">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </aside>

          {/* Right 8-Col Open Editorial Narrative & Stakeholder Matrix */}
          <div className="sm:col-span-8 flex flex-col justify-between">
            <p className="text-[14px] sm:text-[13.8px] leading-[1.65] text-[#1F2937] font-normal mb-5">
              {EXECUTIVE_OVERVIEW.summary}
            </p>

            <div>
              <div className="text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-[#5B6472] pb-2 border-b border-[#131822]">
                Réponse aux enjeux de chaque direction
              </div>
              <div className="divide-y divide-[#D1D6DF] border-b border-[#D1D6DF]">
                {EXECUTIVE_OVERVIEW.decisionMakerMatrix.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-3 py-3.5 items-baseline"
                  >
                    <div className="sm:col-span-5 sm:pr-2">
                      <div className="font-display font-semibold text-[13.5px] sm:text-[13px] text-[#131822]">
                        {row.stakeholder}
                      </div>
                      <div className="text-[10.5px] sm:text-[10px] font-mono-tabular text-[#C81E24] font-medium mt-0.5">
                        {row.priority}
                      </div>
                    </div>
                    <div className="sm:col-span-7 text-[13px] sm:text-[12px] leading-[1.52] text-[#374151]">
                      {row.response}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4-Column Hairline Frameworks Strip */}
        <div className="border-t border-[#131822] pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
            <span className="text-[10.5px] font-mono-tabular uppercase tracking-[0.15em] text-[#131822] font-semibold">
              Modalités d’intervention sur site
            </span>
            <span className="text-[10px] font-mono-tabular text-[#5B6472]">
              Usines · Utilités · Lignes de production
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D1D6DF]">
            {EXECUTIVE_OVERVIEW.contractualFrameworks.map((item, idx) => (
              <div
                key={idx}
                className={`py-3 first:pt-0 last:pb-0 sm:py-0 ${
                  idx === 0 ? 'sm:pr-4' : idx === 3 ? 'sm:pl-4' : 'sm:px-4'
                }`}
              >
                <div className="font-mono-tabular text-[10px] font-semibold text-[#C81E24] mb-1">
                  0{idx + 1}
                </div>
                <div className="font-display font-semibold text-[13px] sm:text-[12.5px] text-[#131822] mb-1">
                  {item.type}
                </div>
                <p className="text-[12px] sm:text-[11px] leading-[1.48] sm:leading-[1.45] text-[#4B5563]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </A4PageLayout>
  );
};

/* ==========================================================================
   PAGE 3 — INGÉNIERIE & MÉTHODE
   ========================================================================== */
export const Page3Engineering: React.FC = () => {
  return (
    <A4PageLayout id="page-3" pageNumber={3} totalPages={7} sectionLabel="02 · Ingénierie & Méthode">
      <div className="flex flex-col justify-between h-full gap-6 sm:gap-0">
        {/* Heading */}
        <div>
          <div className="text-[10.5px] font-mono-tabular uppercase tracking-[0.18em] text-[#C81E24] font-semibold mb-1.5">
            02 · INGÉNIERIE DES SYSTÈMES & MÉTHODOLOGIE
          </div>
          <h2
            className="font-display font-bold text-[22px] sm:text-[27px] leading-[1.18] text-[#131822] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Une méthode adaptée à chaque installation
          </h2>
          <div className="h-[2px] w-14 bg-[#C81E24] mt-2.5" />
        </div>

        {/* Technical Systems Matrix — Responsive Architectural Table */}
        <div className="sm:my-3">
          <div className="text-[10px] font-mono-tabular uppercase tracking-[0.15em] text-[#5B6472] mb-2">
            Typologie des systèmes mis en œuvre
          </div>
          <div className="border-t-2 sm:border-t-0 border-b border-[#131822]">
            {/* Desktop 4-Column Table Header */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-3 bg-[#131822] text-[#EFEBD2] px-4 py-2.5 text-[10px] font-mono-tabular uppercase tracking-wider">
              <div className="col-span-3">Système</div>
              <div className="col-span-3">Équipements</div>
              <div className="col-span-3">Fonction</div>
              <div className="col-span-3">Protection</div>
            </div>

            <div className="divide-y divide-[#D1D6DF]">
              {TECHNICAL_SYSTEMS_MATRIX.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3 px-0 sm:px-4 py-4 sm:py-3.5 text-[12.5px] sm:text-[11.5px] leading-[1.48] sm:leading-[1.45] items-baseline"
                >
                  <div className="sm:col-span-3 font-display font-semibold text-[#131822] text-[14px] sm:text-[12.2px]">
                    {row.system}
                  </div>
                  <div className="sm:col-span-3 text-[#374151]">
                    <span className="sm:hidden block text-[9.5px] font-mono-tabular uppercase tracking-wider text-[#5B6472] mb-0.5">
                      Équipements
                    </span>
                    {row.targetEquipment}
                  </div>
                  <div className="sm:col-span-3 text-[#374151]">
                    <span className="sm:hidden block text-[9.5px] font-mono-tabular uppercase tracking-wider text-[#5B6472] mb-0.5">
                      Fonction
                    </span>
                    {row.primaryRole}
                  </div>
                  <div className="sm:col-span-3 text-[#1C2331] font-medium">
                    <span className="sm:hidden block text-[9.5px] font-mono-tabular uppercase tracking-wider text-[#C81E24] mb-0.5">
                      Protection
                    </span>
                    {row.protectionFinish}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Connected 6-Milestone Engineering Progression Rail */}
        <div className="bg-[#EAECEF] px-4 sm:px-5 py-4 border-y border-[#D1D6DF]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3.5 sm:mb-3">
            <span className="text-[10px] font-mono-tabular uppercase tracking-[0.15em] text-[#131822] font-semibold">
              Séquence d’exécution sur site
            </span>
            <span className="text-[10px] font-mono-tabular text-[#5B6472]">
              01 → 06 · De la visite à la réception
            </span>
          </div>
          <div className="relative grid grid-cols-3 sm:grid-cols-6 gap-y-4 gap-x-2">
            <div
              className="hidden sm:block absolute top-[11px] left-[8%] right-[8%] h-[1px] bg-[#BCC3D0]"
              aria-hidden="true"
            />
            {APPROACH_STEPS.map((step) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                <div className="w-7 h-7 sm:w-6 sm:h-6 bg-[#131822] text-[#EFEBD2] font-mono-tabular text-[10.5px] sm:text-[10px] font-semibold flex items-center justify-center z-10 border border-[#F6F7F9]">
                  {step.number}
                </div>
                <div className="mt-1.5 font-display font-semibold text-[11.5px] sm:text-[11px] text-[#131822]">
                  {step.phase}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clean 6-Row Typographic Deliverable Ledger */}
        <div>
          <div className="divide-y divide-[#D1D6DF] border-t border-b border-[#D1D6DF]">
            {APPROACH_STEPS.map((step) => (
              <div
                key={step.number}
                className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-3.5 sm:py-3 items-baseline text-[12.5px] sm:text-[12px]"
              >
                <div className="sm:col-span-2 font-mono-tabular font-semibold text-[#C81E24] text-[10.5px] tracking-wider">
                  ÉTAPE {step.number}
                </div>
                <div className="sm:col-span-6 font-display font-semibold text-[#131822] leading-[1.35]">
                  {step.title}
                </div>
                <div className="sm:col-span-4 text-[#4B5563] leading-[1.45] sm:leading-[1.4] text-[12px] sm:text-[11.4px]">
                  {step.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </A4PageLayout>
  );
};

/* ==========================================================================
   PAGE 4 — PRESTATIONS INDUSTRIELLES
   ========================================================================== */
export const Page4Solutions: React.FC = () => {
  return (
    <A4PageLayout id="page-4" pageNumber={4} totalPages={7} sectionLabel="03 · Prestations">
      <div className="flex flex-col justify-between h-full gap-6 sm:gap-0">
        {/* Heading */}
        <div>
          <div className="text-[10.5px] font-mono-tabular uppercase tracking-[0.18em] text-[#C81E24] font-semibold mb-1.5">
            03 · PRESTATIONS INDUSTRIELLES
          </div>
          <h2
            className="font-display font-bold text-[22px] sm:text-[26px] leading-[1.18] text-[#131822] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Solutions d’isolation thermique et prestations associées
          </h2>
          <div className="h-[2px] w-14 bg-[#C81E24] mt-2.5" />
        </div>

        {/* Documentary Photography Diptych */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:my-4">
          <div className="sm:col-span-6">
            <ResilientImage
              src={ISONIL_IMAGES.technicianCladding}
              alt="Technicien ISONIL en tenue de sécurité ajustant le revêtement métallique d’une conduite calorifugée"
              className="h-[210px] sm:h-[52mm] w-full"
              imgClassName="w-full h-full object-cover object-center"
              caption="Pose et ajustement de calorifugeage industriel"
              figureNumber="Fig. 01"
              captionPosition="bottom-bar"
            />
          </div>
          <div className="sm:col-span-6">
            <ResilientImage
              src={ISONIL_IMAGES.technicianPrecision}
              alt="Technicien ISONIL réalisant une finition de précision sur tuyauterie industrielle isolée"
              className="h-[210px] sm:h-[52mm] w-full"
              imgClassName="w-full h-full object-cover object-[30%_70%] scale-[1.24] origin-bottom-left"
              caption="Exécution soignée et précision des finitions"
              figureNumber="Fig. 02"
              captionPosition="bottom-bar"
            />
          </div>
        </div>

        {/* 6 Services in Architectural 2-Column Hairline Specification Ledger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 sm:gap-y-5 flex-1 content-start pt-1">
          {SERVICES_LIST.map((service) => (
            <article
              key={service.index}
              className="border-t-2 border-[#131822] pt-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono-tabular text-[11px] font-semibold text-[#C81E24]">
                    {service.index}
                  </span>
                  <span className="text-[9.5px] font-mono-tabular uppercase tracking-[0.14em] text-[#5B6472]">
                    {service.code}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-[14.5px] sm:text-[13.8px] text-[#131822] leading-[1.3] mb-1.5">
                  {service.title}
                </h3>
                <div className="text-[12px] sm:text-[11.2px] font-medium text-[#1C2331] mb-1.5 leading-[1.45]">
                  {service.scope}
                </div>
                <p className="text-[12.5px] sm:text-[11.4px] leading-[1.52] sm:leading-[1.5] text-[#374151]">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </A4PageLayout>
  );
};

/* ==========================================================================
   PAGE 5 — IMPACT OPÉRATIONNEL
   ========================================================================== */
export const Page5Performance: React.FC = () => {
  return (
    <A4PageLayout id="page-5" pageNumber={5} totalPages={7} sectionLabel="04 · Impact Opérationnel">
      <div className="flex flex-col justify-between h-full gap-6 sm:gap-0">
        {/* Heading */}
        <div>
          <div className="text-[10.5px] font-mono-tabular uppercase tracking-[0.18em] text-[#C81E24] font-semibold mb-1.5">
            04 · IMPACT OPÉRATIONNEL
          </div>
          <h2
            className="font-display font-bold text-[22px] sm:text-[27px] leading-[1.18] text-[#131822] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Une intervention pensée pour vos opérations
          </h2>
          <div className="h-[2px] w-14 bg-[#C81E24] mt-2.5" />
        </div>

        {/* Generous Uncrowded Industrial Manifold Plate */}
        <div className="sm:my-4">
          <ResilientImage
            src={ISONIL_IMAGES.insulatedManifold}
            alt="Réseaux industriels calorifugés, cuves isolées et matelas amovibles sur collecteurs"
            className="h-[215px] sm:h-[68mm] w-full"
            imgClassName="w-full h-full object-cover object-center"
            caption="Réseaux calorifugés, cuves isolées et matelas amovibles sur points singuliers"
            figureNumber="Fig. 03"
            captionPosition="bottom-bar"
          />
        </div>

        {/* 6 Operational Benefits in 2x3 Hairline Index */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 sm:my-2">
          {CLIENT_BENEFITS.map((benefit) => (
            <div key={benefit.index} className="border-t border-[#D1D6DF] pt-3">
              <div className="font-mono-tabular text-[10px] font-semibold text-[#C81E24] tracking-wider mb-1">
                {benefit.index} · {benefit.domain.toUpperCase()}
              </div>
              <h3 className="font-display font-semibold text-[14px] sm:text-[13.2px] text-[#131822] leading-[1.32] mb-1">
                {benefit.title}
              </h3>
              <p className="text-[12.5px] sm:text-[11.5px] leading-[1.52] sm:leading-[1.5] text-[#374151]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Recessed Technical Prudence Disclaimer */}
        <div className="bg-[#EAECEF] border-l-2 border-[#C81E24] px-4 py-3 sm:mt-2">
          <p className="text-[12px] sm:text-[11.3px] leading-[1.52] text-[#27303F]">
            <span className="font-semibold text-[#131822]">Note technique : </span>
            Les résultats dépendent de l’état initial des installations et des conditions réelles
            d’exploitation du site.
          </p>
        </div>
      </div>
    </A4PageLayout>
  );
};

/* ==========================================================================
   PAGE 6 — ENGAGEMENTS & CIRCUIT D'INTERVENTION
   ========================================================================== */
export const Page6CommitmentsWorkflow: React.FC = () => {
  return (
    <A4PageLayout id="page-6" pageNumber={6} totalPages={7} sectionLabel="05 · Engagements & HSE">
      <div className="flex flex-col justify-between h-full gap-6 sm:gap-0">
        {/* Heading */}
        <div>
          <div className="text-[10.5px] font-mono-tabular uppercase tracking-[0.18em] text-[#C81E24] font-semibold mb-1.5">
            05 · ENGAGEMENTS D’EXÉCUTION & GOUVERNANCE
          </div>
          <h2
            className="font-display font-bold text-[22px] sm:text-[27px] leading-[1.18] text-[#131822] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Qualité d’ouvrage, tenue des délais et rigueur HSE
          </h2>
          <div className="h-[2px] w-14 bg-[#C81E24] mt-2.5" />
        </div>

        {/* 3 Tall Architectural Pillars inside Midnight Navy Anchor Band */}
        <div className="bg-[#131822] text-[#F6F7F9] p-5 sm:p-6 sm:my-4 border-t-2 border-[#C81E24]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 mb-5 border-b border-[#2B3447]">
            <span className="text-[10.5px] font-mono-tabular uppercase tracking-[0.16em] text-[#EFEBD2] font-medium">
              Piliers d’engagement sur site
            </span>
            <span className="text-[10.5px] font-mono-tabular text-[#98A2B3]">
              Qualité · Engagement · Sécurité
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#2B3447]">
            {COMMITMENTS_LIST.map((item, idx) => (
              <div
                key={item.index}
                className={`py-5 first:pt-0 last:pb-0 sm:py-0 ${
                  idx === 0 ? 'sm:pr-5' : idx === 2 ? 'sm:pl-5' : 'sm:px-5'
                }`}
              >
                <div className="font-mono-tabular text-[11px] font-semibold text-[#E03137] mb-1">
                  {item.index}
                </div>
                <h3 className="font-display font-bold text-[18px] text-[#EFEBD2] mb-1">
                  {item.pillar}
                </h3>
                <div className="text-[11.5px] sm:text-[11px] font-medium text-[#A7B0BE] mb-3">
                  {item.focus}
                </div>
                <p className="text-[12.5px] sm:text-[11.5px] leading-[1.55] text-[#DCE1EA] mb-4">
                  {item.description}
                </p>
                <ul className="space-y-2 border-t border-[#2B3447] pt-3">
                  {item.checkpoints.map((cp, cpIdx) => (
                    <li
                      key={cpIdx}
                      className="text-[11.8px] sm:text-[10.8px] leading-[1.45] text-[#C7CDD8] flex gap-2"
                    >
                      <span className="text-[#E03137] shrink-0">—</span>
                      <span>{cp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Step Procurement & Engineering Consultation Circuit */}
        <div className="border-t-2 border-[#131822] pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
            <span className="font-display font-semibold text-[13px] uppercase tracking-[0.08em] text-[#131822]">
              Circuit de consultation et de prise en charge
            </span>
            <span className="font-mono-tabular text-[10px] text-[#5B6472]">
              De l’expression du besoin à la réception
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {PROCUREMENT_WORKFLOW.map((wf, idx) => (
              <div key={idx} className="border-t border-[#D1D6DF] pt-3">
                <div className="font-mono-tabular text-[10.5px] font-semibold text-[#C81E24] mb-1.5">
                  {wf.step}
                </div>
                <p className="text-[12.5px] sm:text-[11.5px] leading-[1.5] text-[#374151]">
                  {wf.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </A4PageLayout>
  );
};

/* ==========================================================================
   PAGE 7 — CONSULTATION & COORDONNÉES
   ========================================================================== */
export const Page7Contact: React.FC = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(ISONIL_CONTACT.websiteUrl, {
      width: 240,
      margin: 1,
      color: {
        dark: '#131822',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => setQrDataUrl(''));
  }, []);

  return (
    <A4PageLayout id="page-7" pageNumber={7} totalPages={7} sectionLabel="06 · Contact">
      <div className="flex flex-col justify-between h-full gap-6 sm:gap-0">
        {/* Heading */}
        <div>
          <div className="text-[10.5px] font-mono-tabular uppercase tracking-[0.18em] text-[#C81E24] font-semibold mb-1.5">
            06 · CONSULTATION & COORDONNÉES
          </div>
          <h2
            className="font-display font-bold text-[24px] sm:text-[30px] leading-[1.16] text-[#131822] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Parlons de votre installation
          </h2>
          <div className="h-[2px] w-14 bg-[#C81E24] mt-3 mb-4" />
          <p className="text-[14px] leading-[1.62] text-[#27303F] max-w-2xl">
            Notre équipe technique se tient à votre disposition pour étudier vos besoins,
            planifier une visite sur site au Maroc et formuler une proposition adaptée.
          </p>
        </div>

        {/* Authoritative Contact Card (Midnight Navy Website Surface) */}
        <div className="bg-[#131822] text-[#F6F7F9] p-5 sm:p-7 sm:my-4 border-t-2 border-[#C81E24]">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-5 mb-5 sm:mb-6 border-b border-[#2B3447]">
            <div>
              <IsonilWordmark size="lg" theme="light" />
              <div className="text-xs text-[#C7CDD8] mt-2">{ISONIL_CONTACT.specialty}</div>
            </div>
            <div className="sm:text-right font-mono-tabular text-[11px] text-[#EFEBD2] uppercase tracking-[0.14em]">
              Coordonnées officielles
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-8 space-y-4">
              <div className="border-b border-[#232B3A] pb-3.5">
                <div className="text-[10px] font-mono-tabular uppercase tracking-[0.15em] text-[#98A2B3] mb-1">
                  Adresse
                </div>
                <div className="text-[14px] font-medium text-white leading-snug">
                  {ISONIL_CONTACT.fullAddress}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-[#232B3A] pb-3.5">
                <div>
                  <div className="text-[10px] font-mono-tabular uppercase tracking-[0.15em] text-[#98A2B3] mb-1">
                    Téléphone
                  </div>
                  <a
                    href={ISONIL_CONTACT.phoneHref}
                    className="inline-flex items-center min-h-[44px] sm:min-h-0 font-mono-tabular text-[16px] sm:text-[15px] font-semibold text-white hover:text-[#EFEBD2] transition-colors"
                  >
                    {ISONIL_CONTACT.phoneDisplay}
                  </a>
                </div>
                <div>
                  <div className="text-[10px] font-mono-tabular uppercase tracking-[0.15em] text-[#98A2B3] mb-1">
                    E-mail
                  </div>
                  <a
                    href={ISONIL_CONTACT.emailHref}
                    className="inline-flex items-center min-h-[44px] sm:min-h-0 font-mono-tabular text-[14.5px] sm:text-[14px] font-semibold text-white hover:text-[#EFEBD2] transition-colors break-all"
                  >
                    {ISONIL_CONTACT.email}
                  </a>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono-tabular uppercase tracking-[0.15em] text-[#98A2B3] mb-1">
                  Site web
                </div>
                <a
                  href={ISONIL_CONTACT.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] sm:min-h-0 font-mono-tabular text-[14.5px] sm:text-[14px] font-semibold text-[#EFEBD2] hover:underline"
                >
                  {ISONIL_CONTACT.websiteDisplay}
                </a>
              </div>
            </div>

            {/* Verified QR Code pointing strictly to https://isonil.com/ */}
            <div className="sm:col-span-4 flex flex-row sm:flex-col items-center justify-center gap-4 sm:gap-0 bg-[#F6F7F9] text-[#131822] p-4">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Code QR pointant vers https://isonil.com/"
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain shrink-0"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center font-mono-tabular text-xs text-[#131822]">
                  isonil.com
                </div>
              )}
              <div className="sm:mt-2 text-left sm:text-center">
                <div className="font-mono-tabular text-[10px] sm:text-[9.5px] font-semibold uppercase tracking-wider text-[#131822]">
                  Site officiel
                </div>
                <div className="font-mono-tabular text-[10px] sm:text-[9px] text-[#5B6472]">
                  https://isonil.com/
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Intake Cues for Industrial Buyers */}
        <div className="border-t border-[#D1D6DF] pt-4">
          <div className="text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-[#5B6472] mb-3">
            Éléments utiles pour préparer votre demande de chiffrage
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {CONTACT_INTAKE_CUES.map((cue) => (
              <div key={cue.label} className="border-t-2 border-[#C81E24] pt-2.5">
                <div className="font-display font-semibold text-[13px] sm:text-[12.5px] text-[#131822] mb-1">
                  {cue.label}
                </div>
                <p className="text-[12px] sm:text-[11.2px] leading-[1.48] text-[#4B5563]">
                  {cue.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sober Editorial Call to Action Strip */}
        <div className="bg-[#EAECEF] border-l-2 border-[#131822] px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div>
            <div className="font-display font-bold text-[15px] text-[#131822]">
              {ISONIL_CONTACT.ctaText}
            </div>
            <div className="text-[12px] sm:text-[11.5px] text-[#4B5563] mt-0.5">
              Réponse directe par l’équipe technique basée à El Jadida.
            </div>
          </div>
          <a
            href={ISONIL_CONTACT.emailHref}
            className="inline-flex items-center min-h-[44px] sm:min-h-0 sm:text-right font-mono-tabular text-xs font-semibold text-[#C81E24] shrink-0 sm:pl-4 hover:underline"
          >
            {ISONIL_CONTACT.email}
          </a>
        </div>
      </div>
    </A4PageLayout>
  );
};
