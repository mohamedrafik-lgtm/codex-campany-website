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
    id: 'crm-system',
    title: 'Customer Relationship Management System',
    client: 'Enterprise Solutions Inc.',
    title_ar: 'نظام إدارة علاقات العملاء',
    client_ar: 'شركة الحلول المؤسسية',
    metric: 'Increased customer retention by 35% and sales productivity by 28%.',
    desc: 'Comprehensive CRM platform for managing customer interactions, sales pipeline, and marketing campaigns.',
    desc_ar: 'منصة CRM شاملة لإدارة تفاعلات العملاء، مسار المبيعات، والحملات التسويقية.',
    image: 'https://source.unsplash.com/collection/3330445/1200x900',
    tags: ['CRM', 'Sales', 'Analytics'],
    highlight: 'Unified customer view with automated workflows',
    highlight_ar: 'رؤية موحدة للعملاء مع سير عمل مؤتمت',
    successTitle: 'Key Success Point:',
    successTitle_ar: 'نقطة النجاح الرئيسية:',
    successDesc: 'Integrated all customer touchpoints into one platform, enabling sales teams to track leads, automate follow-ups, and close deals faster with real-time insights.',
    successDesc_ar: 'دمج جميع نقاط اتصال العملاء في منصة واحدة، مما مكّن فرق المبيعات من تتبع العملاء المحتملين، وأتمتة المتابعات، وإغلاق الصفقات بشكل أسرع من خلال رؤى فورية.'
  },
  {
    id: 'erp-platform',
    title: 'Enterprise Resource Planning Platform',
    client: 'Manufacturing Corporation',
    title_ar: 'نظام تخطيط موارد المؤسسة',
    client_ar: 'شركة التصنيع',
    metric: 'Reduced operational costs by 40% and improved supply chain efficiency by 50%.',
    desc: 'End-to-end ERP solution integrating finance, inventory, production, and human resources.',
    desc_ar: 'حل ERP شامل يدمج المالية، المخزون، الإنتاج، والموارد البشرية.',
    image: 'https://source.unsplash.com/collection/1319040/1200x900',
    tags: ['ERP', 'Integration', 'Automation'],
    highlight: 'Real-time data synchronization across all departments',
    highlight_ar: 'مزامنة البيانات الفورية عبر جميع الأقسام',
    successTitle: 'Key Success Point:',
    successTitle_ar: 'نقطة النجاح الرئيسية:',
    successDesc: 'Transformed legacy systems into a unified platform that streamlined operations, automated reporting, and provided actionable insights for strategic decision-making.',
    successDesc_ar: 'حول الأنظمة القديمة إلى منصة موحدة تبسّط العمليات، تؤتمت التقارير، وتوفر رؤى قابلة للتنفيذ لاتخاذ القرارات الاستراتيجية.'
  },
  {
    id: 'hr-management',
    title: 'Human Resources Management System',
    client: 'Global HR Services',
    title_ar: 'نظام إدارة الموارد البشرية',
    client_ar: 'خدمات الموارد البشرية العالمية',
    metric: 'Decreased HR processing time by 60% and improved employee satisfaction by 45%.',
    desc: 'Complete HR solution covering recruitment, payroll, performance, attendance, and employee development.',
    desc_ar: 'حل HR كامل يغطي التوظيف، الرواتب، الأداء، الحضور، وتطوير الموظفين.',
    image: 'https://source.unsplash.com/collection/1065396/1200x900',
    tags: ['HR', 'Payroll', 'Performance'],
    highlight: 'Automated payroll and performance tracking',
    highlight_ar: 'رواتب مؤتمتة وتتبع الأداء',
    successTitle: 'Key Success Point:',
    successTitle_ar: 'نقطة النجاح الرئيسية:',
    successDesc: 'Digitized entire HR processes from recruitment to retirement, with self-service portals that empowered employees and reduced administrative overhead.',
    successDesc_ar: 'رقمنة جميع عمليات الموارد البشرية من التوظيف إلى التقاعد، مع بوابات خدمة ذاتية تمكّن الموظفين وتقلل من العبء الإداري.'
  },
  {
    id: 'warehouse-management',
    title: 'Warehouse & Purchase Management',
    client: 'Logistics & Supply Co.',
    title_ar: 'إدارة المخازن والمشتريات',
    client_ar: 'شركة اللوجستيات والإمداد',
    metric: 'Optimized inventory levels reducing waste by 30% and improving order fulfillment speed by 45%.',
    desc: 'Integrated warehouse and procurement system with real-time inventory tracking and automated reordering.',
    desc_ar: 'نظام متكامل للمخازن والمشتريات مع تتبع فوري للمخزون وإعادة طلب مؤتمتة.',
    image: 'https://source.unsplash.com/collection/2180569/1200x900',
    tags: ['Inventory', 'Supply Chain', 'Automation'],
    highlight: 'Smart inventory optimization with predictive analytics',
    highlight_ar: 'تحسين ذكي للمخزون مع تحليلات تنبؤية',
    successTitle: 'Key Success Point:',
    successTitle_ar: 'نقطة النجاح الرئيسية:',
    successDesc: 'Implemented barcode scanning, automated stock alerts, and vendor management tools that reduced stockouts and overstocking while improving supplier relationships.',
    successDesc_ar: 'تطبيق مسح الباركود، تنبيهات المخزون المؤتمتة، وأدوات إدارة الموردين التي قللت من نفاذ المخزون والإفراط في التخزين مع تحسين العلاقات مع الموردين.'
  },
  {
    id: 'equipment-machinery',
    title: 'Equipment & Machinery Management',
    client: 'Industrial Operations Ltd.',
    title_ar: 'نظام إدارة المعدات والآلات',
    client_ar: 'شركة العمليات الصناعية',
    metric: 'Reduced equipment downtime by 55% and maintenance costs by 35%.',
    desc: 'Asset management platform for tracking equipment lifecycle, maintenance schedules, and performance metrics.',
    desc_ar: 'منصة إدارة الأصول لتتبع دورة حياة المعدات، جداول الصيانة، ومقاييس الأداء.',
    image: 'https://source.unsplash.com/collection/3330448/1200x900',
    tags: ['Asset Management', 'Maintenance', 'IoT'],
    highlight: 'Predictive maintenance with IoT sensors',
    highlight_ar: 'صيانة تنبؤية مع مستشعرات IoT',
    successTitle: 'Key Success Point:',
    successTitle_ar: 'نقطة النجاح الرئيسية:',
    successDesc: 'Deployed IoT sensors and predictive analytics to monitor equipment health in real-time, scheduling maintenance before failures occur and maximizing uptime.',
    successDesc_ar: 'نشر مستشعرات IoT وتحليلات تنبؤية لمراقبة صحة المعدات في الوقت الفعلي، وجدولة الصيانة قبل حدوث الأعطال وتعظيم وقت التشغيل.'
  },
  {
    id: 'invoicing-system',
    title: 'Invoices & Statements System',
    client: 'Financial Services Group',
    title_ar: 'نظام المستخلصات والفواتير',
    client_ar: 'مجموعة الخدمات المالية',
    metric: 'Accelerated billing cycles by 70% and reduced payment delays by 50%.',
    desc: 'Automated invoicing and statement generation system with multi-currency support and payment tracking.',
    desc_ar: 'نظام إصدار فواتير ومستخلصات مؤتمت مع دعم متعدد العملات وتتبع المدفوعات.',
    image: 'https://source.unsplash.com/collection/3330449/1200x900',
    tags: ['Finance', 'Billing', 'Automation'],
    highlight: 'Automated recurring billing and payment reminders',
    highlight_ar: 'فواتير متكررة مؤتمتة وتذكيرات بالدفع',
    successTitle: 'Key Success Point:',
    successTitle_ar: 'نقطة النجاح الرئيسية:',
    successDesc: 'Created templates for instant invoice generation, automated payment reminders, and integrated with accounting systems for seamless financial reconciliation.',
    successDesc_ar: 'إنشاء قوالب لإصدار الفواتير الفوري، تذكيرات دفع مؤتمتة، والتكامل مع الأنظمة المحاسبية لتسوية مالية سلسة.'
  },
  {
    id: 'labor-contractors',
    title: 'Labor & Contractors Management',
    client: 'Construction Enterprises',
    title_ar: 'إدارة العمالة والمقاولون',
    client_ar: 'شركات الإنشاءات',
    metric: 'Improved workforce allocation efficiency by 65% and reduced compliance issues by 80%.',
    desc: 'Comprehensive system for managing workforce, contractor agreements, timesheets, and compliance documentation.',
    desc_ar: 'نظام شامل لإدارة القوى العاملة، اتفاقيات المقاولين، سجلات الوقت، والوثائق التنظيمية.',
    image: 'https://source.unsplash.com/collection/3330450/1200x900',
    tags: ['Workforce', 'Compliance', 'Scheduling'],
    highlight: 'Digital timesheets and automated compliance checks',
    highlight_ar: 'سجلات وقت رقمية وفحوصات امتثال مؤتمتة',
    successTitle: 'Key Success Point:',
    successTitle_ar: 'نقطة النجاح الرئيسية:',
    successDesc: 'Digitized workforce management with mobile clock-in/out, automated compliance tracking, and real-time visibility into labor costs and project allocation.',
    successDesc_ar: 'رقمنة إدارة القوى العاملة مع تسجيل دخول/خروج عبر المحمول، تتبع امتثال مؤتمت، ورؤية فورية لتكاليف العمالة وتخصيص المشاريع.'
  },
  {
    id: 'cost-budget',
    title: 'Cost & Budget Management',
    client: 'Project Management Office',
    title_ar: 'إدارة التكاليف والميزانية',
    client_ar: 'مكتب إدارة المشاريع',
    metric: 'Achieved 95% budget accuracy and reduced cost overruns by 42%.',
    desc: 'Financial planning and control system for budget allocation, cost tracking, and variance analysis.',
    desc_ar: 'نظام تخطيط مالي ورقابي لتخصيص الميزانيات، تتبع التكاليف، وتحليل الانحرافات.',
    image: 'https://source.unsplash.com/collection/3330451/1200x900',
    tags: ['Finance', 'Budgeting', 'Forecasting'],
    highlight: 'Real-time budget tracking and variance alerts',
    highlight_ar: 'تتبع فوري للميزانية وتنبيهات الانحرافات',
    successTitle: 'Key Success Point:',
    successTitle_ar: 'نقطة النجاح الرئيسية:',
    successDesc: 'Built dynamic budget models with scenario planning, automated expense approvals, and real-time dashboards that enabled proactive financial management.',
    successDesc_ar: 'بناء نماذج ميزانية ديناميكية مع تخطيط السيناريوهات، الموافقات المؤتمتة على النفقات، ولوحات معلومات فورية تمكّن من الإدارة المالية الاستباقية.'
  },
  {
    id: 'project-management',
    title: 'Project Management System',
    client: 'Engineering Consultancy',
    title_ar: 'نظام إدارة المشاريع',
    client_ar: 'استشارات هندسية',
    metric: 'Increased project delivery success rate by 48% and team collaboration by 60%.',
    desc: 'Complete project lifecycle management with task tracking, resource allocation, and collaboration tools.',
    desc_ar: 'إدارة كاملة لدورة حياة المشاريع مع تتبع المهام، تخصيص الموارد، وأدوات التعاون.',
    image: 'https://source.unsplash.com/collection/3330452/1200x900',
    tags: ['PM', 'Collaboration', 'Agile'],
    highlight: 'Agile workflows with Gantt charts and team collaboration',
    highlight_ar: 'سير عمل Agile مع مخططات Gantt وتعاون الفريق',
    successTitle: 'Key Success Point:',
    successTitle_ar: 'نقطة النجاح الرئيسية:',
    successDesc: 'Implemented agile methodologies with customizable workflows, integrated communication tools, and visual project timelines that improved transparency and accountability.',
    successDesc_ar: 'تطبيق منهجيات Agile مع سير عمل قابل للتخصيص، أدوات اتصال متكاملة، وجداول زمنية مرئية للمشاريع حسنت الشفافية والمساءلة.'
  },
  {
    id: 'whatsapp-messaging',
    title: 'WhatsApp Messaging System',
    client: 'Customer Support Solutions',
    title_ar: 'نظام المراسلة عبر الواتساب',
    client_ar: 'حلول دعم العملاء',
    metric: 'Handled 10x more customer inquiries with 85% automated resolution rate.',
    desc: 'Automated customer communication platform integrating WhatsApp Business API with CRM and support systems.',
    desc_ar: 'منصة تواصل آلية مع العملاء تدمج WhatsApp Business API مع أنظمة CRM والدعم.',
    image: 'https://source.unsplash.com/collection/3330453/1200x900',
    tags: ['Messaging', 'Automation', 'CRM'],
    highlight: 'AI-powered chatbots with human handoff',
    highlight_ar: 'روبوتات دردشة ذكية مع تحويل بشري',
    successTitle: 'Key Success Point:',
    successTitle_ar: 'نقطة النجاح الرئيسية:',
    successDesc: 'Deployed intelligent chatbots that handle routine queries 24/7, seamlessly escalating complex issues to human agents while maintaining conversation context.',
    successDesc_ar: 'نشر روبوتات دردشة ذكية تتعامل مع الاستفسارات الروتينية على مدار الساعة، مع تصعيد سلس للقضايا المعقدة إلى وكلاء بشريين مع الحفاظ على سياق المحادثة.'
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
