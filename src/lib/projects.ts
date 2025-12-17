export type Project = {
  id: string;
  title: string;
  client: string;
  metric: string;
  desc: string;
  image?: string;
  tags?: string[];
  highlight?: string;
  successTitle?: string;
  successDesc?: string;
  // Optional localized (Arabic) fields
  title_ar?: string;
  client_ar?: string;
  desc_ar?: string;
  highlight_ar?: string;
  successTitle_ar?: string;
  successDesc_ar?: string;
};

export const projects: Project[] = [
  {
    id: 'national-logistics',
    title: 'National Logistics Platform',
    client: 'Ministry of Transport',
    title_ar: 'المنصة اللوجستية الوطنية',
    client_ar: 'وزارة النقل',
    metric: 'Reduced operational costs by 40% and processed daily transactions exceeding $10M.',
    desc: 'Integrated logistics system connecting ports, warehouses and transport networks.',
    desc_ar: 'نظام لوجستي متكامل يربط الموانئ والمخازن وشبكات النقل الوطنية.',
    image: 'https://source.unsplash.com/collection/190727/1200x900',
    tags: ['Logistics', 'Cloud', 'Operations'],
    highlight: 'Seamless user experience for both members and trainers',
    highlight_ar: 'تجربة مستخدم سلسة لكل من الأعضاء والمدربين',
    successTitle: 'Key Success Point:',
    successTitle_ar: 'نقطة النجاح الرئيسية:',
    successDesc: 'The onboarding experience for new customers was significantly improved, with a user-friendly interface and seamless integration of systems. This created a streamlined journey for both new members and trainers, enhancing overall satisfaction.',
    successDesc_ar: 'تحسنت تجربة انضمام العملاء الجدد بشكل ملحوظ، مع واجهة سهلة الاستخدام وتكامل سلس للأنظمة. خلق ذلك رحلة مبسطة للأعضاء والمدربين، مما عزز رضا المستخدمين.'
  },
  {
    id: 'mobile-commerce',
    title: 'Advanced Mobile Commerce',
    client: 'E‑commerce Co.',
    title_ar: 'تجارة محمولة متقدمة',
    client_ar: 'شركة تجارة إلكترونية',
    metric: '28% uplift in conversions within 3 months.',
    desc: 'End-to-end mobile shopping experience.',
    desc_ar: 'حل شامل للتسوق عبر المحمول.',
    image: 'https://source.unsplash.com/collection/1127163/1200x900',
    tags: ['UX', 'Mobile', 'Conversion'],
    highlight: 'Improved conversion funnel and retention',
    highlight_ar: 'تحسين قمع التحويل والاحتفاظ',
    successTitle: 'Key Success Point:',
    successTitle_ar: 'نقطة النجاح الرئيسية:',
    successDesc: 'A redesigned checkout and personalized flows reduced drop-offs and improved repeat purchases.',
    successDesc_ar: 'إعادة تصميم عملية الدفع وتجارب مخصصة قللت من معدل الانسحاب وزادت من عمليات الشراء المتكررة.'
  },
  {
    id: 'erp-implementation',
    title: 'ERP Implementation',
    client: 'Industrial Group',
    title_ar: 'نظام ERP متكامل',
    client_ar: 'مجموعة صناعية',
    metric: '22% cost reduction in 12 months.',
    desc: 'Modernized operations into a unified platform.',
    desc_ar: 'تحويل العمليات إلى منصة موحدة وحديثة.',
    image: 'https://source.unsplash.com/collection/142103/1200x900',
    tags: ['ERP', 'Digitalization'],
    highlight: 'Clear operational visibility and automated reporting',
    highlight_ar: 'رؤى تشغيلية واضحة وتقارير مؤتمتة',
    successTitle: 'Key Success Point:',
    successTitle_ar: 'نقطة النجاح الرئيسية:',
    successDesc: 'We consolidated legacy systems into a modern ERP that automated core workflows and surfaced actionable insights.',
    successDesc_ar: 'قمنا بدمج الأنظمة القديمة في ERP حديث أدّى إلى تأتمتة سير العمل وتوفير رؤى قابلة للتنفيذ.'
  }
];

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id) || null;
}
