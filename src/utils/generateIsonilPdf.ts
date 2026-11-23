import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
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

interface CropOptions {
  sxRatio?: number;
  syRatio?: number;
  swRatio?: number;
  shRatio?: number;
  targetAspectRatio?: number;
  anchorX?: number;
  anchorY?: number;
  format?: 'image/jpeg' | 'image/png';
}

/* Official ISONIL Website Palette RGB Constants */
const RGB = {
  navy950: [11, 15, 23] as const,
  navy900: [19, 24, 34] as const,
  navy800: [28, 35, 49] as const,
  navy700: [43, 52, 71] as const,
  crimson600: [200, 30, 36] as const,
  crimson500: [224, 49, 55] as const,
  champagne: [239, 235, 210] as const,
  silverLight: [226, 230, 236] as const,
  silverMuted: [152, 162, 179] as const,
  paper: [246, 247, 249] as const,
  paperAlt: [234, 236, 239] as const,
  hairline: [209, 214, 223] as const,
  inkBody: [55, 65, 81] as const,
  inkMuted: [91, 100, 114] as const,
};

async function loadImageProcessedDataUrl(
  src: string,
  crop?: CropOptions
): Promise<string | null> {
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.crossOrigin = 'anonymous';
      element.onload = () => resolve(element);
      element.onerror = (err) => reject(err);
      element.src = src;
    });

    let sx = (crop?.sxRatio ?? 0) * img.naturalWidth;
    let sy = (crop?.syRatio ?? 0) * img.naturalHeight;
    let sw = (crop?.swRatio ?? 1) * img.naturalWidth;
    let sh = (crop?.shRatio ?? 1) * img.naturalHeight;

    // Apply exact object-fit: cover cropping so PDF frames never stretch or squash images
    if (crop?.targetAspectRatio && sw > 0 && sh > 0) {
      const sourceAspect = sw / sh;
      const anchorX = crop.anchorX ?? 0.5;
      const anchorY = crop.anchorY ?? 0.5;

      if (sourceAspect > crop.targetAspectRatio) {
        const nextSw = sh * crop.targetAspectRatio;
        sx += (sw - nextSw) * anchorX;
        sw = nextSw;
      } else if (sourceAspect < crop.targetAspectRatio) {
        const nextSh = sw / crop.targetAspectRatio;
        sy += (sh - nextSh) * anchorY;
        sh = nextSh;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(sw));
    canvas.height = Math.max(1, Math.round(sh));
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL(crop?.format ?? 'image/jpeg', 0.92);
  } catch {
    return null;
  }
}

function drawRunningHeaderAndFooter(
  doc: jsPDF,
  pageNumber: number,
  totalPages: number,
  sectionLabel: string,
  logoImg: string | null
) {
  // Architectural cool off-white paper #F6F7F9
  doc.setFillColor(...RGB.paper);
  doc.rect(0, 0, 210, 297, 'F');

  let textStartX = 16;
  if (logoImg) {
    doc.addImage(logoImg, 'PNG', 16, 10.5, 5.5, 5.5, undefined, 'FAST');
    textStartX = 23.5;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...RGB.navy900);
  doc.text('ISONIL', textStartX, 14.8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...RGB.crimson600);
  doc.text('/', textStartX + 14.5, 14.8);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...RGB.inkMuted);
  doc.text('PROFIL D’ENTREPRISE', textStartX + 18, 14.8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(sectionLabel.toUpperCase(), 194, 14.8, { align: 'right' });

  doc.setDrawColor(...RGB.hairline);
  doc.setLineWidth(0.3);
  doc.line(16, 18.5, 194, 18.5);

  doc.line(16, 281, 194, 281);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...RGB.navy900);
  doc.text('ISONIL', 16, 286.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...RGB.inkMuted);
  doc.text('·  Isolation thermique industrielle au Maroc  ·  El Jadida', 29, 286.5);

  const pStr = String(pageNumber).padStart(2, '0');
  const tStr = String(totalPages).padStart(2, '0');
  const pageStr = `isonil.com  /  ${pStr} — ${tStr}`;
  doc.setTextColor(...RGB.navy900);
  doc.text(pageStr, 194, 286.5, { align: 'right' });
}

function drawSectionHeading(doc: jsPDF, kicker: string, title: string, yStart = 28): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...RGB.crimson600);
  doc.text(kicker.toUpperCase(), 16, yStart);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18.5);
  doc.setTextColor(...RGB.navy900);
  const titleLines = doc.splitTextToSize(title, 178);
  doc.text(titleLines, 16, yStart + 7.5);

  const ruleY = yStart + 7.5 + (titleLines.length - 1) * 6.8 + 3.5;
  doc.setFillColor(...RGB.crimson600);
  doc.rect(16, ruleY, 14, 0.8, 'F');

  return ruleY + 8;
}

export async function generateIsonilPdf(): Promise<void> {
  const TOTAL_PAGES = 7;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const [logoImg, coverImg, techCladdingImg, techPrecisionImg, manifoldImg, qrImg] =
    await Promise.all([
      loadImageProcessedDataUrl(ISONIL_IMAGES.logo, {
        sxRatio: 0.1,
        syRatio: 0.1,
        swRatio: 0.8,
        shRatio: 0.8,
        format: 'image/png',
      }),
      loadImageProcessedDataUrl(ISONIL_IMAGES.coverIndustrialPiping, {
        targetAspectRatio: 174 / 144,
        format: 'image/jpeg',
      }),
      loadImageProcessedDataUrl(ISONIL_IMAGES.technicianCladding, {
        targetAspectRatio: 86 / 50,
        format: 'image/jpeg',
      }),
      loadImageProcessedDataUrl(ISONIL_IMAGES.technicianPrecision, {
        sxRatio: 0.0,
        syRatio: 0.14,
        swRatio: 0.85,
        shRatio: 0.86,
        targetAspectRatio: 86 / 50,
        anchorX: 0.35,
        anchorY: 0.65,
        format: 'image/jpeg',
      }),
      loadImageProcessedDataUrl(ISONIL_IMAGES.insulatedManifold, {
        targetAspectRatio: 178 / 66,
        format: 'image/jpeg',
      }),
      QRCode.toDataURL(ISONIL_CONTACT.websiteUrl, {
        width: 240,
        margin: 1,
        color: { dark: '#131822', light: '#FFFFFF' },
      }).catch(() => null),
    ]);

  /* ========================================================================
     PAGE 1 — COUVERTURE ARCHITECTURALE (IDENTITÉ ISONIL.COM)
     ======================================================================== */
  doc.setFillColor(...RGB.navy900);
  doc.rect(0, 0, 210, 297, 'F');

  // Vertical ISONIL red spine rule
  doc.setFillColor(...RGB.crimson600);
  doc.rect(0, 0, 1.3, 225, 'F');

  let coverTextX = 18;
  if (logoImg) {
    doc.addImage(logoImg, 'PNG', 18, 16.5, 16, 16, undefined, 'FAST');
    coverTextX = 38;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(...RGB.silverLight);
  doc.text('ISONIL', coverTextX, 28);

  doc.setFillColor(...RGB.crimson600);
  doc.rect(coverTextX, 31, 18, 1.1, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(...RGB.champagne);
  doc.text(ISONIL_CONTACT.documentTitle.toUpperCase(), 192, 23, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...RGB.silverMuted);
  doc.text('El Jadida · Maroc', 192, 28.5, { align: 'right' });

  doc.setDrawColor(...RGB.navy700);
  doc.setLineWidth(0.3);
  doc.line(18, 39, 192, 39);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...RGB.crimson500);
  doc.text('DOSSIER DE PRÉSENTATION INDUSTRIELLE', 18, 52);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(25);
  doc.setTextColor(...RGB.champagne);
  const coverTitle = doc.splitTextToSize(ISONIL_CONTACT.specialty, 170);
  doc.text(coverTitle, 18, 63);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11.5);
  doc.setTextColor(220, 225, 234);
  const coverTagline = doc.splitTextToSize(ISONIL_CONTACT.tagline, 166);
  doc.text(coverTagline, 18, 82);

  if (coverImg) {
    doc.setDrawColor(...RGB.navy700);
    doc.setLineWidth(0.4);
    doc.addImage(coverImg, 'JPEG', 18, 100, 174, 144, undefined, 'FAST');
    doc.rect(18, 100, 174, 144, 'S');

    doc.setFillColor(...RGB.navy950);
    doc.rect(118, 236, 72, 6.5, 'F');
    doc.setFontSize(7);
    doc.setTextColor(...RGB.champagne);
    doc.text('Réseaux de tuyauteries industrielles calorifugées', 188, 240.3, {
      align: 'right',
    });
  }

  doc.setFillColor(...RGB.navy950);
  doc.rect(0, 258, 210, 39, 'F');
  doc.setDrawColor(35, 43, 58);
  doc.line(0, 258, 210, 258);

  doc.setFontSize(7.5);
  doc.setTextColor(...RGB.silverMuted);
  doc.text('DOMAINES CLÉS', 18, 270);
  doc.text('ÉQUIPE TECHNIQUE', 84, 270);
  doc.text('CONTACT DIRECT', 192, 270, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...RGB.paper);
  doc.text('Calorifugeage · Matelas · Froid', 18, 276.5);
  doc.setTextColor(...RGB.champagne);
  doc.text('+15 ans d’expérience terrain cumulée', 84, 276.5);
  doc.setTextColor(...RGB.paper);
  doc.text(`${ISONIL_CONTACT.phoneDisplay} · isonil.com`, 192, 276.5, { align: 'right' });

  /* ========================================================================
     PAGE 2 — POSITIONNEMENT INDUSTRIEL (GRILLE ASYMÉTRIQUE)
     ======================================================================== */
  doc.addPage();
  drawRunningHeaderAndFooter(doc, 2, TOTAL_PAGES, '01 · Positionnement', logoImg);
  let y = drawSectionHeading(doc, EXECUTIVE_OVERVIEW.kicker, EXECUTIVE_OVERVIEW.title, 28);

  // Left 4/12 Cool Steel Anchor Rail
  const railX = 16;
  const railW = 58;
  const railY = y;
  const railH = 162;

  doc.setFillColor(...RGB.paperAlt);
  doc.rect(railX, railY, railW, railH, 'F');
  doc.setFillColor(...RGB.navy900);
  doc.rect(railX, railY, railW, 1.2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(...RGB.inkMuted);
  doc.text('REPÈRES TECHNIQUES', railX + 5, railY + 9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...RGB.navy900);
  doc.text('+15 ans', railX + 5, railY + 20);

  doc.setFontSize(7.5);
  doc.setTextColor(...RGB.crimson600);
  doc.text('EXPÉRIENCE TERRAIN CUMULÉE', railX + 5, railY + 25.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(...RGB.inkBody);
  const expCapLines = doc.splitTextToSize(EXECUTIVE_OVERVIEW.experienceCaption, railW - 10);
  doc.text(expCapLines, railX + 5, railY + 32.5);

  let ryFact = railY + 62;
  EXECUTIVE_OVERVIEW.keyFacts.slice(1).forEach((fact) => {
    doc.setDrawColor(...RGB.hairline);
    doc.line(railX + 5, ryFact - 5, railX + railW - 5, ryFact - 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...RGB.inkMuted);
    doc.text(fact.label.toUpperCase(), railX + 5, ryFact);

    doc.setFontSize(10);
    doc.setTextColor(...RGB.navy900);
    doc.text(fact.value, railX + 5, ryFact + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(75, 85, 99);
    doc.text(fact.detail, railX + 5, ryFact + 10.5);

    ryFact += 30;
  });

  // Right 8/12 Open Editorial Column
  const colX = 81;
  const colW = 113;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.2);
  doc.setTextColor(31, 41, 55);
  const p1 = doc.splitTextToSize(EXECUTIVE_OVERVIEW.summary, colW);
  doc.text(p1, colX, railY + 4);

  let tableY = railY + p1.length * 5 + 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...RGB.inkMuted);
  doc.text('RÉPONSE AUX ENJEUX DE CHAQUE DIRECTION', colX, tableY);

  tableY += 3;
  doc.setDrawColor(...RGB.navy900);
  doc.setLineWidth(0.4);
  doc.line(colX, tableY, 194, tableY);

  EXECUTIVE_OVERVIEW.decisionMakerMatrix.forEach((row, idx) => {
    const rowY = tableY + idx * 29;
    if (idx > 0) {
      doc.setDrawColor(...RGB.hairline);
      doc.setLineWidth(0.25);
      doc.line(colX, rowY, 194, rowY);
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...RGB.navy900);
    doc.text(row.stakeholder, colX, rowY + 8.5);

    doc.setFontSize(7.6);
    doc.setTextColor(...RGB.crimson600);
    doc.text(row.priority, colX, rowY + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.6);
    doc.setTextColor(...RGB.inkBody);
    const respLines = doc.splitTextToSize(row.response, 64);
    doc.text(respLines, colX + 47, rowY + 8.5);
  });

  doc.setDrawColor(...RGB.hairline);
  doc.line(colX, tableY + 4 * 29, 194, tableY + 4 * 29);

  // Bottom 4-Column Hairline Strip
  const modalY = 228;
  doc.setDrawColor(...RGB.navy900);
  doc.setLineWidth(0.4);
  doc.line(16, modalY, 194, modalY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...RGB.navy900);
  doc.text('MODALITÉS D’INTERVENTION SUR SITE', 16, modalY + 6.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(...RGB.inkMuted);
  doc.text('Usines · Utilités · Lignes de production', 194, modalY + 6.5, { align: 'right' });

  EXECUTIVE_OVERVIEW.contractualFrameworks.forEach((item, idx) => {
    const mx = 16 + idx * 45.5;
    if (idx > 0) {
      doc.setDrawColor(...RGB.hairline);
      doc.setLineWidth(0.25);
      doc.line(mx - 2.5, modalY + 11, mx - 2.5, modalY + 38);
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.6);
    doc.setTextColor(...RGB.crimson600);
    doc.text(`0${idx + 1}`, mx, modalY + 15);

    doc.setFontSize(9);
    doc.setTextColor(...RGB.navy900);
    doc.text(item.type, mx, modalY + 21);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(75, 85, 99);
    const dLines = doc.splitTextToSize(item.detail, 40);
    doc.text(dLines, mx, modalY + 27);
  });

  /* ========================================================================
     PAGE 3 — INGÉNIERIE & MÉTHODE
     ======================================================================== */
  doc.addPage();
  drawRunningHeaderAndFooter(doc, 3, TOTAL_PAGES, '02 · Ingénierie & Méthode', logoImg);
  y = drawSectionHeading(
    doc,
    '02 · INGÉNIERIE DES SYSTÈMES & MÉTHODOLOGIE',
    'Une méthode adaptée à chaque installation',
    28
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(...RGB.inkMuted);
  doc.text('TYPOLOGIE DES SYSTÈMES MIS EN ŒUVRE', 16, y);
  y += 3.5;

  doc.setFillColor(...RGB.navy900);
  doc.rect(16, y, 178, 8.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.4);
  doc.setTextColor(...RGB.champagne);
  doc.text('SYSTÈME', 20, y + 5.6);
  doc.text('ÉQUIPEMENTS', 62, y + 5.6);
  doc.text('FONCTION', 107, y + 5.6);
  doc.text('PROTECTION', 152, y + 5.6);
  y += 8.5;

  TECHNICAL_SYSTEMS_MATRIX.forEach((row, idx) => {
    if (idx > 0) {
      doc.setDrawColor(...RGB.hairline);
      doc.setLineWidth(0.25);
      doc.line(16, y, 194, y);
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(...RGB.navy900);
    doc.text(doc.splitTextToSize(row.system, 38), 20, y + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...RGB.inkBody);
    doc.text(doc.splitTextToSize(row.targetEquipment, 42), 62, y + 7.5);
    doc.text(doc.splitTextToSize(row.primaryRole, 41), 107, y + 7.5);

    doc.setTextColor(...RGB.navy800);
    doc.text(doc.splitTextToSize(row.protectionFinish, 40), 152, y + 7.5);
    y += 20.5;
  });
  doc.setDrawColor(...RGB.navy900);
  doc.setLineWidth(0.4);
  doc.line(16, y, 194, y);
  y += 9;

  // Connected 6-Milestone Engineering Progression Rail
  doc.setFillColor(...RGB.paperAlt);
  doc.rect(16, y, 178, 28, 'F');
  doc.setDrawColor(...RGB.hairline);
  doc.setLineWidth(0.25);
  doc.line(16, y, 194, y);
  doc.line(16, y + 28, 194, y + 28);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(...RGB.navy900);
  doc.text('SÉQUENCE D’EXÉCUTION SUR SITE', 21, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...RGB.inkMuted);
  doc.text('01 à 06 · De la visite à la réception', 189, y + 7, { align: 'right' });

  doc.setDrawColor(188, 195, 208);
  doc.setLineWidth(0.3);
  doc.line(33, y + 15, 177, y + 15);

  APPROACH_STEPS.forEach((st, idx) => {
    const cx = 33 + idx * 28.8;
    doc.setFillColor(...RGB.navy900);
    doc.rect(cx - 4, y + 11.5, 8, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...RGB.champagne);
    doc.text(st.number, cx, y + 16.2, { align: 'center' });

    doc.setFontSize(7.6);
    doc.setTextColor(...RGB.navy900);
    doc.text(st.phase, cx, y + 24, { align: 'center' });
  });
  y += 37;

  // 6-Row Typographic Deliverable Ledger
  doc.setDrawColor(...RGB.hairline);
  doc.setLineWidth(0.25);
  doc.line(16, y, 194, y);

  APPROACH_STEPS.forEach((step) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(...RGB.crimson600);
    doc.text(`ÉTAPE ${step.number}`, 16, y + 8.5);

    doc.setFontSize(8.8);
    doc.setTextColor(...RGB.navy900);
    doc.text(doc.splitTextToSize(step.title, 76), 42, y + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(75, 85, 99);
    doc.text(doc.splitTextToSize(step.deliverable, 66), 124, y + 7.5);

    y += 17;
    doc.setDrawColor(...RGB.hairline);
    doc.line(16, y, 194, y);
  });

  /* ========================================================================
     PAGE 4 — PRESTATIONS INDUSTRIELLES
     ======================================================================== */
  doc.addPage();
  drawRunningHeaderAndFooter(doc, 4, TOTAL_PAGES, '03 · Prestations', logoImg);
  y = drawSectionHeading(
    doc,
    '03 · PRESTATIONS INDUSTRIELLES',
    'Solutions d’isolation thermique et prestations associées',
    28
  );

  // Documentary Photography Diptych with Fig. 01 & Fig. 02
  if (techCladdingImg) {
    doc.addImage(techCladdingImg, 'JPEG', 16, y, 86, 50, undefined, 'FAST');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(75, 85, 99);
    doc.text('Pose et ajustement de calorifugeage industriel', 16, y + 54.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...RGB.crimson600);
    doc.text('FIG. 01', 102, y + 54.5, { align: 'right' });
    doc.setDrawColor(...RGB.hairline);
    doc.line(16, y + 56.5, 102, y + 56.5);
  }
  if (techPrecisionImg) {
    doc.addImage(techPrecisionImg, 'JPEG', 108, y, 86, 50, undefined, 'FAST');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(75, 85, 99);
    doc.text('Exécution soignée et précision des finitions', 108, y + 54.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...RGB.crimson600);
    doc.text('FIG. 02', 194, y + 54.5, { align: 'right' });
    doc.setDrawColor(...RGB.hairline);
    doc.line(108, y + 56.5, 194, y + 56.5);
  }
  y += 65;

  // 2-Column Architectural Hairline Specification Ledger (No Boxes)
  const colWidth = 85;
  SERVICES_LIST.forEach((srv, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const sx = 16 + col * 93;
    const sy = y + row * 48;

    doc.setFillColor(...RGB.navy900);
    doc.rect(sx, sy, colWidth, 0.7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(...RGB.crimson600);
    doc.text(srv.index, sx, sy + 6);

    doc.setFontSize(7.2);
    doc.setTextColor(...RGB.inkMuted);
    doc.text(srv.code, sx + colWidth, sy + 6, { align: 'right' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.2);
    doc.setTextColor(...RGB.navy900);
    const sTitle = doc.splitTextToSize(srv.title, colWidth);
    doc.text(sTitle, sx, sy + 12.5);

    const nextY = sy + 12.5 + sTitle.length * 4.4 + 1;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...RGB.navy800);
    const sScope = doc.splitTextToSize(srv.scope, colWidth);
    doc.text(sScope, sx, nextY);

    const descY = nextY + sScope.length * 3.8 + 1.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(...RGB.inkBody);
    const sDesc = doc.splitTextToSize(srv.description, colWidth);
    doc.text(sDesc, sx, descY);
  });

  /* ========================================================================
     PAGE 5 — IMPACT OPÉRATIONNEL
     ======================================================================== */
  doc.addPage();
  drawRunningHeaderAndFooter(doc, 5, TOTAL_PAGES, '04 · Impact Opérationnel', logoImg);
  y = drawSectionHeading(
    doc,
    '04 · IMPACT OPÉRATIONNEL',
    'Une intervention pensée pour vos opérations',
    28
  );

  if (manifoldImg) {
    doc.addImage(manifoldImg, 'JPEG', 16, y, 178, 66, undefined, 'FAST');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(75, 85, 99);
    doc.text(
      'Réseaux calorifugés, cuves isolées et matelas amovibles sur points singuliers',
      16,
      y + 71
    );
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...RGB.crimson600);
    doc.text('FIG. 03', 194, y + 71, { align: 'right' });
    doc.setDrawColor(...RGB.hairline);
    doc.line(16, y + 73, 194, y + 73);
  }
  y += 83;

  // 2x3 Hairline Operational Benefits Grid
  CLIENT_BENEFITS.forEach((ben, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const bx = 16 + col * 93;
    const by = y + row * 38;

    doc.setDrawColor(...RGB.hairline);
    doc.setLineWidth(0.3);
    doc.line(bx, by, bx + colWidth, by);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.6);
    doc.setTextColor(...RGB.crimson600);
    doc.text(`${ben.index} · ${ben.domain.toUpperCase()}`, bx, by + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(...RGB.navy900);
    const bTitle = doc.splitTextToSize(ben.title, colWidth);
    doc.text(bTitle, bx, by + 12);

    const bDescY = by + 12 + bTitle.length * 4.3 + 1;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(...RGB.inkBody);
    const bDesc = doc.splitTextToSize(ben.description, colWidth);
    doc.text(bDesc, bx, bDescY);
  });

  // Recessed Technical Disclaimer
  const noteY = 254;
  doc.setFillColor(...RGB.paperAlt);
  doc.rect(16, noteY, 178, 15, 'F');
  doc.setFillColor(...RGB.crimson600);
  doc.rect(16, noteY, 1.2, 15, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(...RGB.navy900);
  doc.text('Note technique : ', 21, noteY + 9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(39, 48, 63);
  doc.text(
    'Les résultats dépendent de l’état initial des installations et des conditions réelles d’exploitation du site.',
    47,
    noteY + 9
  );

  /* ========================================================================
     PAGE 6 — ENGAGEMENTS & CIRCUIT D'INTERVENTION
     ======================================================================== */
  doc.addPage();
  drawRunningHeaderAndFooter(doc, 6, TOTAL_PAGES, '05 · Engagements & HSE', logoImg);
  y = drawSectionHeading(
    doc,
    '05 · ENGAGEMENTS D’EXÉCUTION & GOUVERNANCE',
    'Qualité d’ouvrage, tenue des délais et rigueur HSE',
    28
  );

  // Midnight Navy Anchor Band with Crimson Top Edge & 3 Vertical Pillar Columns
  const bandH = 128;
  doc.setFillColor(...RGB.navy900);
  doc.rect(16, y, 178, bandH, 'F');
  doc.setFillColor(...RGB.crimson600);
  doc.rect(16, y, 178, 1.2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(...RGB.champagne);
  doc.text('PILIERS D’ENGAGEMENT SUR SITE', 23, y + 10.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...RGB.silverMuted);
  doc.text('QUALITÉ · ENGAGEMENT · SÉCURITÉ', 187, y + 10.5, { align: 'right' });

  doc.setDrawColor(...RGB.navy700);
  doc.setLineWidth(0.3);
  doc.line(23, y + 15, 187, y + 15);

  COMMITMENTS_LIST.forEach((comm, idx) => {
    const cx = 23 + idx * 56;
    if (idx > 0) {
      doc.setDrawColor(...RGB.navy700);
      doc.line(cx - 4, y + 18.5, cx - 4, y + bandH - 8);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(...RGB.crimson500);
    doc.text(comm.index, cx, y + 23.5);

    doc.setFontSize(13.5);
    doc.setTextColor(...RGB.champagne);
    doc.text(comm.pillar, cx, y + 31.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(167, 176, 190);
    doc.text(doc.splitTextToSize(comm.focus, 49), cx, y + 38);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(220, 225, 234);
    const descL = doc.splitTextToSize(comm.description, 49);
    doc.text(descL, cx, y + 48.5);

    const cpStart = y + 73.5;
    doc.setDrawColor(...RGB.navy700);
    doc.line(cx, cpStart - 4, cx + 49, cpStart - 4);

    let cpY = cpStart;
    comm.checkpoints.forEach((cp) => {
      doc.setTextColor(...RGB.crimson500);
      doc.text('—', cx, cpY);
      doc.setTextColor(199, 205, 216);
      doc.setFontSize(7.7);
      const cpLines = doc.splitTextToSize(cp, 44);
      doc.text(cpLines, cx + 4.5, cpY);
      cpY += cpLines.length * 4 + 4;
    });
  });

  y += bandH + 16;

  // 4-Step Procurement & Engineering Consultation Circuit
  doc.setDrawColor(...RGB.navy900);
  doc.setLineWidth(0.5);
  doc.line(16, y, 194, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...RGB.navy900);
  doc.text('CIRCUIT DE CONSULTATION ET DE PRISE EN CHARGE', 16, y + 7.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(...RGB.inkMuted);
  doc.text('De l’expression du besoin à la réception', 194, y + 7.5, { align: 'right' });

  y += 16;
  PROCUREMENT_WORKFLOW.forEach((wf, idx) => {
    const wx = 16 + idx * 45.5;
    doc.setDrawColor(...RGB.hairline);
    doc.setLineWidth(0.3);
    doc.line(wx, y, wx + 41, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(...RGB.crimson600);
    doc.text(doc.splitTextToSize(wf.step, 41), wx, y + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(...RGB.inkBody);
    doc.text(doc.splitTextToSize(wf.detail, 41), wx, y + 16);
  });

  /* ========================================================================
     PAGE 7 — CONSULTATION & COORDONNÉES
     ======================================================================== */
  doc.addPage();
  drawRunningHeaderAndFooter(doc, 7, TOTAL_PAGES, '06 · Contact', logoImg);
  y = drawSectionHeading(
    doc,
    '06 · CONSULTATION & COORDONNÉES',
    'Parlons de votre installation',
    28
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(39, 48, 63);
  const contactLead = doc.splitTextToSize(
    'Notre équipe technique se tient à votre disposition pour étudier vos besoins, planifier une visite sur site au Maroc et formuler une proposition adaptée.',
    172
  );
  doc.text(contactLead, 16, y);
  y += contactLead.length * 5.2 + 10;

  // Main Authoritative Contact Block (Midnight Navy + Crimson Edge)
  doc.setFillColor(...RGB.navy900);
  doc.rect(16, y, 178, 104, 'F');
  doc.setFillColor(...RGB.crimson600);
  doc.rect(16, y, 178, 1.2, 'F');

  let contactBrandX = 25;
  if (logoImg) {
    doc.addImage(logoImg, 'PNG', 25, y + 8.5, 12, 12, undefined, 'FAST');
    contactBrandX = 40;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...RGB.silverLight);
  doc.text('ISONIL', contactBrandX, y + 17);
  doc.setFillColor(...RGB.crimson600);
  doc.rect(contactBrandX, y + 19.5, 14, 0.9, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(199, 205, 216);
  doc.text(ISONIL_CONTACT.specialty, 25, y + 27.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...RGB.champagne);
  doc.text('COORDONNÉES OFFICIELLES', 185, y + 15.5, { align: 'right' });

  doc.setDrawColor(...RGB.navy700);
  doc.line(25, y + 32.5, 185, y + 32.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...RGB.silverMuted);
  doc.text('ADRESSE', 25, y + 41.5);
  doc.setFontSize(10.2);
  doc.setTextColor(255, 255, 255);
  const addrLines = doc.splitTextToSize(ISONIL_CONTACT.fullAddress, 106);
  doc.text(addrLines, 25, y + 48);

  doc.setDrawColor(35, 43, 58);
  doc.line(25, y + 58.5, 132, y + 58.5);

  doc.setFontSize(7.5);
  doc.setTextColor(...RGB.silverMuted);
  doc.text('TÉLÉPHONE', 25, y + 66.5);
  doc.text('E-MAIL', 78, y + 66.5);

  doc.setFontSize(10.8);
  doc.setTextColor(255, 255, 255);
  doc.text(ISONIL_CONTACT.phoneDisplay, 25, y + 73);
  doc.text(ISONIL_CONTACT.email, 78, y + 73);

  doc.setDrawColor(35, 43, 58);
  doc.line(25, y + 78.5, 132, y + 78.5);

  doc.setFontSize(7.5);
  doc.setTextColor(...RGB.silverMuted);
  doc.text('SITE WEB', 25, y + 86.5);
  doc.setFontSize(10.8);
  doc.setTextColor(...RGB.champagne);
  doc.text(ISONIL_CONTACT.websiteDisplay, 25, y + 93);

  if (qrImg) {
    doc.setFillColor(...RGB.paper);
    doc.rect(138, y + 38.5, 47, 56, 'F');
    doc.addImage(qrImg, 'PNG', 144.5, y + 42, 34, 34, undefined, 'FAST');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(...RGB.navy900);
    doc.text('SITE OFFICIEL', 161.5, y + 83, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...RGB.inkMuted);
    doc.text('https://isonil.com/', 161.5, y + 88.5, { align: 'center' });
  }
  y += 116;

  // Practical Intake Cues
  doc.setDrawColor(...RGB.hairline);
  doc.line(16, y, 194, y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(...RGB.inkMuted);
  doc.text('ÉLÉMENTS UTILES POUR PRÉPARER VOTRE DEMANDE DE CHIFFRAGE', 16, y + 7.5);

  y += 13;
  CONTACT_INTAKE_CUES.forEach((cue, idx) => {
    const qx = 16 + idx * 61;
    doc.setFillColor(...RGB.crimson600);
    doc.rect(qx, y, 56, 0.7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.2);
    doc.setTextColor(...RGB.navy900);
    doc.text(cue.label, qx, y + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(75, 85, 99);
    doc.text(doc.splitTextToSize(cue.detail, 56), qx, y + 12);
  });

  // Sober Call to Action Strip
  const ctaY = 247;
  doc.setFillColor(...RGB.paperAlt);
  doc.rect(16, ctaY, 178, 22, 'F');
  doc.setFillColor(...RGB.navy900);
  doc.rect(16, ctaY, 1.2, 22, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...RGB.navy900);
  doc.text(ISONIL_CONTACT.ctaText, 22, ctaY + 9.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(75, 85, 99);
  doc.text('Réponse directe par l’équipe technique basée à El Jadida.', 22, ctaY + 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...RGB.crimson600);
  doc.text(ISONIL_CONTACT.email, 189, ctaY + 13, { align: 'right' });

  doc.save('ISONIL_Profil_Entreprise_A4.pdf');
}
