import coverIndustrialPipingImg from '../assets/images/isonil_cover_industrial_piping_1794613415284.jpg';
import insulatedManifoldImg from '../assets/images/isonil_insulated_vessels_manifold_1794625908824.jpg';

export interface ApproachStep {
  number: string;
  phase: string;
  title: string;
  deliverable: string;
}

export interface SystemMatrixRow {
  system: string;
  targetEquipment: string;
  primaryRole: string;
  protectionFinish: string;
}

export interface ServiceItem {
  index: string;
  code: string;
  title: string;
  scope: string;
  description: string;
}

export interface ClientBenefit {
  index: string;
  domain: string;
  title: string;
  description: string;
}

export interface CoreCommitment {
  index: string;
  pillar: string;
  focus: string;
  description: string;
  checkpoints: string[];
}

export const ISONIL_IMAGES = {
  logo: '/assets/aistudio/1000129415_f419bc17.png',
  coverIndustrialPiping: coverIndustrialPipingImg,
  technicianCladding: '/assets/aistudio/1000127391_10ae27f3.jpg',
  technicianPrecision: '/assets/aistudio/Gddd_bdc31203.jpg',
  insulatedManifold: insulatedManifoldImg,
} as const;

export const ISONIL_CONTACT = {
  companyName: 'ISONIL',
  specialty: 'Isolation thermique industrielle au Maroc',
  documentTitle: 'Profil d’entreprise',
  tagline: 'Des solutions d’isolation conçues pour la performance de vos installations.',
  addressLine1: '3ème étage, Bureau n° 24, Centre Andalousie',
  addressLine2: 'près d’Akdital, El Jadida 24000, Maroc',
  fullAddress: '3ème étage, Bureau n° 24, Centre Andalousie, près d’Akdital, El Jadida 24000, Maroc',
  phoneDisplay: '+212 710 738 409',
  phoneHref: 'tel:+212710738409',
  email: 'contact@isonil.com',
  emailHref: 'mailto:contact@isonil.com',
  websiteDisplay: 'https://isonil.com/',
  websiteUrl: 'https://isonil.com/',
  ctaText: 'Contactez-nous pour discuter des besoins de votre installation.',
} as const;

export const PAGE_MANIFEST = [
  { pageNumber: 1, id: 'page-1', label: 'Couverture', shortTitle: '01 · Couverture' },
  { pageNumber: 2, id: 'page-2', label: 'Positionnement', shortTitle: '02 · Positionnement' },
  { pageNumber: 3, id: 'page-3', label: 'Ingénierie & Méthode', shortTitle: '03 · Ingénierie' },
  { pageNumber: 4, id: 'page-4', label: 'Prestations Industrielles', shortTitle: '04 · Prestations' },
  { pageNumber: 5, id: 'page-5', label: 'Impact Opérationnel', shortTitle: '05 · Impact' },
  { pageNumber: 6, id: 'page-6', label: 'Engagements & HSE', shortTitle: '06 · Engagements' },
  { pageNumber: 7, id: 'page-7', label: 'Consultation & Contact', shortTitle: '07 · Contact' },
] as const;

export const EXECUTIVE_OVERVIEW = {
  kicker: '01 · POSITIONNEMENT INDUSTRIEL',
  title: 'Votre partenaire en isolation thermique industrielle',
  summary:
    'Basée à El Jadida, ISONIL accompagne les sites industriels au Maroc dans l’étude, la confection et la pose d’ouvrages d’isolation thermique pour usines, utilités et lignes de production.',
  experienceCaption:
    'Une équipe technique réunissant plus de 15 ans d’expérience terrain cumulée sur réseaux chauds, circuits froids et équipements sur mesure.',
  keyFacts: [
    { label: 'Équipe technique', value: '+15 ans cumulés', detail: 'Expérience terrain sur sites industriels' },
    { label: 'Siège opérationnel', value: 'El Jadida', detail: 'Centre Andalousie · Maroc' },
    { label: 'Périmètre couvert', value: 'Chaud · Froid', detail: 'Réseaux, cuves & points singuliers' },
    { label: 'Zone d’intervention', value: 'Maroc', detail: 'Unités neuves & sites en exploitation' },
  ],
  decisionMakerMatrix: [
    {
      stakeholder: 'Direction d’usine',
      priority: 'Continuité d’exploitation',
      response: 'Interventions organisées selon vos fenêtres techniques sans perturber la production.',
    },
    {
      stakeholder: 'Maintenance',
      priority: 'Accessibilité des organes',
      response: 'Ouvrages durables et matelas démontables repérés facilitant les contrôles réguliers.',
    },
    {
      stakeholder: 'Ingénierie & Énergie',
      priority: 'Maîtrise thermique',
      response: 'Matériaux sélectionnés selon les températures de service et l’environnement du procédé.',
    },
    {
      stakeholder: 'Achats industriels',
      priority: 'Fiabilité contractuelle',
      response: 'Chiffrage structuré après relevé sur site et suivi rigoureux des délais convenus.',
    },
  ],
  contractualFrameworks: [
    {
      type: 'Travaux neufs',
      detail: 'Équipement complet de nouvelles unités et extensions.',
    },
    {
      type: 'Arrêts programmés',
      detail: 'Mobilisation synchronisée avec vos fenêtres d’arrêt.',
    },
    {
      type: 'Remise à niveau',
      detail: 'Traitement ciblé des tronçons altérés ou laissés à nu.',
    },
    {
      type: 'Assistance sur site',
      detail: 'Renfort ponctuel de monteurs qualifiés selon vos besoins.',
    },
  ],
};

export const TECHNICAL_SYSTEMS_MATRIX: SystemMatrixRow[] = [
  {
    system: 'Calorifugeage chaud',
    targetEquipment: 'Tuyauteries vapeur, chaudières, cuves, échangeurs',
    primaryRole: 'Confinement thermique & protection contre les brûlures',
    protectionFinish: 'Tôlerie de protection étanchée (selon cahier des charges)',
  },
  {
    system: 'Matelas amovibles',
    targetEquipment: 'Vannes, brides, filtres, pompes, coudes et points singuliers',
    primaryRole: 'Isolation des géométries complexes sans pont thermique',
    protectionFinish: 'Housse sanglée réutilisable avec repérage',
  },
  {
    system: 'Isolation frigorifique',
    targetEquipment: 'Réseaux d’eau glacée, saumure, groupes froids',
    primaryRole: 'Maintien des basses températures & prévention de la condensation',
    protectionFinish: 'Barrière pare-vapeur continue étanchée',
  },
];

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: '01',
    phase: 'Relevé',
    title: 'Analyse des besoins et des conditions d’exploitation',
    deliverable: 'Relevé métré et contraintes d’accès',
  },
  {
    number: '02',
    phase: 'Étude',
    title: 'Étude des contraintes thermiques et techniques',
    deliverable: 'Analyse des températures et du milieu ambiant',
  },
  {
    number: '03',
    phase: 'Spécification',
    title: 'Sélection des matériaux adaptés à la température et à l’environnement',
    deliverable: 'Choix des isolants, pare-vapeur et revêtements',
  },
  {
    number: '04',
    phase: 'Exécution',
    title: 'Exécution soignée et précision des finitions',
    deliverable: 'Continuité d’enveloppe et étanchéité des jonctions',
  },
  {
    number: '05',
    phase: 'Sécurité',
    title: 'Respect des consignes de sécurité du site',
    deliverable: 'Permis de travail, EPI et balisage de zone',
  },
  {
    number: '06',
    phase: 'Durabilité',
    title: 'Attention portée à la durabilité et à la performance',
    deliverable: 'Contrôle final et tenue mécanique de l’ouvrage',
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    index: '01',
    code: 'CAL-HT',
    title: 'Isolation thermique industrielle',
    scope: 'Tuyauteries, chaudières, cuves, réseaux de vapeur et lignes de production',
    description:
      'Calorifugeage intégral des circuits chauds avec tôlerie protectrice façonnée sur mesure.',
  },
  {
    index: '02',
    code: 'MAT-AMV',
    title: 'Matelas isolants sur mesure et amovibles',
    scope: 'Vannes, brides et points singuliers nécessitant des interventions régulières',
    description:
      'Housses souples démontables, repérées et réutilisables pour un accès rapide et une repose fidèle.',
  },
  {
    index: '03',
    code: 'AUD-NRJ',
    title: 'Audit et évaluation de la performance énergétique',
    scope: 'Diagnostic terrain des déperditions thermiques et pistes d’amélioration',
    description:
      'Relevé visuel et métré recensant les zones à nu, points singuliers et priorités de correction.',
  },
  {
    index: '04',
    code: 'FRG-CND',
    title: 'Protection anti-condensation et isolation frigorifique',
    scope: 'Équipements de refroidissement et réseaux frigorifiques',
    description:
      'Traitement étanche des circuits froids prévenant le ruissellement et la corrosion sous calorifugeage (CUI).',
  },
  {
    index: '05',
    code: 'MNT-REN',
    title: 'Maintenance et rénovation de l’isolation existante',
    scope: 'Réparation, remplacement et rénovation',
    description:
      'Réfection des isolants tassés ou déposés et remise en état des habillages endommagés.',
  },
  {
    index: '06',
    code: 'ASS-TECH',
    title: 'Mise à disposition de personnel spécialisé',
    scope: 'Personnel qualifié en isolation thermique industrielle, selon les besoins du projet',
    description:
      'Délégation de monteurs calorifugeurs expérimentés pour vos pics d’activité et arrêts.',
  },
];

export const CLIENT_BENEFITS: ClientBenefit[] = [
  {
    index: '01',
    domain: 'Énergie',
    title: 'Réduction potentielle des pertes thermiques',
    description: 'Limitation des dissipations vers l’atelier sur conduites et points singuliers.',
  },
  {
    index: '02',
    domain: 'Utilités',
    title: 'Contribution à une meilleure efficacité énergétique',
    description: 'Régime de fonctionnement plus stable pour les générateurs chauds et froids.',
  },
  {
    index: '03',
    domain: 'Sécurité',
    title: 'Protection des personnes contre les surfaces chaudes',
    description: 'Abaissement de la température de contact le long des zones de circulation.',
  },
  {
    index: '04',
    domain: 'Procédé',
    title: 'Maintien des températures de procédé',
    description: 'Stabilité thermique des fluides entre la production d’utilités et les lignes.',
  },
  {
    index: '05',
    domain: 'Maintenance',
    title: 'Accès facilité aux équipements grâce aux matelas amovibles',
    description: 'Démontage rapide sans dégradation et repérage clair lors des opérations d’entretien.',
  },
  {
    index: '06',
    domain: 'Actifs',
    title: 'Entretien et rénovation des systèmes d’isolation existants',
    description: 'Préservation durable des réseaux contre l’humidité, la CUI et les chocs mécaniques.',
  },
];

export const COMMITMENTS_LIST: CoreCommitment[] = [
  {
    index: '01',
    pillar: 'Qualité',
    focus: 'Précision de pose & tenue mécanique',
    description:
      'Matériaux adaptés aux exigences du projet et attention rigoureuse portée aux finitions et jonctions.',
    checkpoints: [
      'Continuité d’isolant et traitement des points singuliers',
      'Étanchéité des recouvrements et prévention des infiltrations (CUI)',
      'Vérification de la tenue mécanique avant réception',
    ],
  },
  {
    index: '02',
    pillar: 'Engagement',
    focus: 'Suivi rigoureux & respect des délais',
    description:
      'Suivi personnalisé de l’étude à la réception, dans le respect du cahier des charges et des délais convenus.',
    checkpoints: [
      'Interlocuteur dédié de la visite technique à la livraison',
      'Périmètre d’intervention défini sur relevé métré',
      'Coordination avec vos équipes d’exploitation et de maintenance',
    ],
  },
  {
    index: '03',
    pillar: 'Sécurité',
    focus: 'Discipline HSE sur site client',
    description:
      'Application stricte des consignes HSE du site pour protéger les équipes et préserver les installations.',
    checkpoints: [
      'Conformité aux procédures et permis de travail du site',
      'Port systématique des EPI adaptés à l’environnement',
      'Balisage, propreté et maintien des zones d’intervention',
    ],
  },
];

export const PROCUREMENT_WORKFLOW = [
  {
    step: '01 · Cahier des charges',
    detail: 'Transmission de votre besoin, plans ou liste d’équipements à traiter.',
  },
  {
    step: '02 · Visite technique',
    detail: 'Relevé métré sur site et analyse des conditions d’exploitation et d’accès.',
  },
  {
    step: '03 · Proposition chiffrée',
    detail: 'Offre structurée précisant solutions retenues, périmètre et délais.',
  },
  {
    step: '04 · Réalisation',
    detail: 'Pose conforme aux règles HSE du site et réception contradictoire des travaux.',
  },
];

export const CONTACT_INTAKE_CUES = [
  {
    label: 'Équipements concernés',
    detail: 'Tuyauteries, vannes, brides, cuves, chaudières ou réseaux froids.',
  },
  {
    label: 'Conditions de service',
    detail: 'Plage de température du fluide et environnement d’installation.',
  },
  {
    label: 'Contraintes de planning',
    detail: 'Travaux neufs, arrêt programmé ou intervention en marche.',
  },
] as const;
