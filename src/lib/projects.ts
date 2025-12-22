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
  },
  {
    id: 'erp-system',
    title: 'Enterprise Resource Planning (ERP) System',
    client: 'Leading Manufacturing Conglomerate',
    title_ar: 'نظام تخطيط موارد المؤسسات (ERP)',
    client_ar: 'مجمع صناعي رائد',
    metric: '30% faster operations, 99.9% data accuracy, 100+ users onboarded',
    desc: `This ERP System is a comprehensive digital backbone for training organizations, designed to seamlessly manage every aspect of business and education. It brings together financial accounting, HR, administration, student and instructor management, and advanced analytics in a single, intuitive platform. The system supports electronic grading, real-time dashboards, and a modern content delivery experience for students. Built with a modular, scalable architecture and the latest software engineering standards, it ensures security, reliability, and effortless integration with both legacy and modern tools. The ERP has empowered more than 20,000 users across 5+ major training centers and 15 branches, automating workflows, enabling instant reporting, and driving measurable growth in efficiency, transparency, and business results. Its adoption has transformed how organizations operate, making complex processes simple and enabling every department to focus on what matters most: delivering value and results.`,
    desc_ar: `نظام ERP المتكامل للمنظمات التدريبية هو منصة رقمية متطورة تدير كل تفاصيل العمل التعليمي والإداري والمالي بدقة واحترافية.\n\nيحتوي النظام على إدارة مالية متكاملة تشمل المحاسبة، الميزانيات، التقارير المالية، إدارة المصروفات والإيرادات، وربط العمليات المالية مع جميع الإدارات الأخرى بشكل تلقائي.\n\nيدير النظام شؤون الطلاب من لحظة التسجيل حتى التخرج، مع نظام نتائج دراسية متكامل، إدارة الدرجات، الامتحانات الإلكترونية، وإشعارات فورية للطلاب وأولياء الأمور.\n\nيوفر النظام وحدات متقدمة لإدارة الموظفين، الرواتب، الإجازات، الأداء، الحضور والانصراف الذكي للموظفين والطلاب، مع تقارير تفصيلية وتحليلات لحظية.\n\nيضم النظام وحدات خاصة للمحاضرين، وجدولة المحاضرات، وإدارة المحتوى التدريبي التفاعلي، مع دعم كامل لعرض المواد عبر الويب وتطبيق موبايل حديث يتيح للطلاب والمحاضرين متابعة كل شيء بسهولة.\n\nيتميز النظام بذكاء اصطناعي مدمج لتحليل البيانات، التنبؤ بنتائج الطلاب، وتقديم توصيات تعليمية وإدارية ذكية. كما يدعم أتمتة التسويق، إدارة الحملات، والتواصل مع الطلاب والعملاء بشكل احترافي.\n\nالنظام المحاسبي المدمج قوي ومرن، يغطي جميع متطلبات التقارير الضريبية والمحاسبية للمنظمات الكبيرة والصغيرة.\n\nتم بناء النظام وفق أحدث معايير الهندسة البرمجية العالمية، بهيكلية قابلة للتوسع والتحديث المستمر، مع ضمان سرعة الأداء، الأمان العالي، وسهولة التكامل مع الأنظمة الأخرى.\n\nالنظام يخدم أكثر من 20 ألف مستخدم في أكثر من 5 مراكز تدريب و15 فرعاً، وحقق نقلة نوعية في كفاءة العمل، دقة البيانات، ورفع مستوى الخدمة المقدمة للطلاب والإدارات.\n\nإذا كنت تبحث عن الريادة الرقمية في قطاع التدريب والتعليم، فهذا النظام هو خيارك الأمثل لتحقيق التميز والابتكار.`,
    details: '',
    details_ar: '',
    image: '/img/erp-system.jpg',
    images: [
      '/img/erp-system.jpg'
      // Add more image paths here as you provide them
    ],
    tags: ['ERP', 'Manufacturing', 'Automation', 'Integration'],
    highlight: 'Unified all business operations, automated 80% of manual processes, and enabled real-time executive dashboards.',
    highlight_ar: 'توحيد جميع العمليات التجارية، وأتمتة 80% من العمليات اليدوية، وتوفير لوحات معلومات تنفيذية فورية.',
    successTitle: 'Business & Technical Impact:',
    successTitle_ar: 'الأثر التجاري والتقني:',
    successDesc: 'Delivered a scalable ERP solution that replaced fragmented tools, improved decision-making, and supported rapid business growth. Integrated with IoT devices for production monitoring and enabled secure, role-based access for all departments.',
    successDesc_ar: 'تقديم حل ERP قابل للتوسع استبدل الأدوات المتفرقة، وحسّن اتخاذ القرار، ودعم نمو الأعمال السريع. تم التكامل مع أجهزة إنترنت الأشياء لمراقبة الإنتاج وتوفير وصول آمن قائم على الأدوار لجميع الأقسام.'
  }
];

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id) || null;
}
