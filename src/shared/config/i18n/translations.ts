export type Locale = "ar" | "en";

export type TranslationResource = {
  nav: {
    home: string;
    about: string;
    services: string;
    works: string;
    portfolio: string;
    stack: string;
    journey: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    title: string;
    intro: string;
    items: { title: string; desc: string }[];
  };
  projects: {
    title: string;
    intro: string;
    items: string[];
  };
  works: { title: string; intro: string };
  testimonials: { title: string; intro: string };
  journey: {
    title: string;
    steps: { title: string; desc: string }[];
  };
  contact: { title: string; subtitle: string; cta: string };
  controls: { theme: string; language: string };
};

export const translations: Record<Locale, TranslationResource> = {
  ar: {
    nav: {
      home: "الواجهة الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      works: "أعمالنا المختارة",
      portfolio: "المحفظة",
      stack: "التقنيات المستخدمة",
      journey: "رحلة العمل",
      contact: "تواصل معنا",
    },
    hero: {
      title: "لا نبني مجرد برمجيات. نحن نصنع المستقبل.",
      subtitle:
        "حول رؤيتك إلى واقع يسبق عصره. نقدم حلولاً رقمية لا تعمل فحسب، بل تبهر. دعنا نأخذ طموحك إلى أبعد مما تخيلت.",
      ctaPrimary: "ابدأ الرحلة",
      ctaSecondary: "اكتشف قدراتنا",
    },
    services: {
      title: "خدماتنا",
      intro: "كل ما تحتاجه للريادة. في مكان واحد.",
      items: [
        {
          title: "أنظمة ERP",
          desc: "قلب مؤسستك النابض. حلول إدارة متكاملة توحد عملياتك، وتحول البيانات المعقدة إلى قرارات ذكية.",
        },
        {
          title: "الهوية التجارية",
          desc: "بصمتك الفريدة. نصيغ لك هوية بصرية تخطف الأنظار وترسخ في الأذهان من اللحظة الأولى.",
        },
        {
          title: "المتاجر الإلكترونية",
          desc: "سوقك.. بلا حدود. تجربة تسوق سلسة تفتح لمنتجاتك أبواب العالم، وتضاعف مبيعاتك بذكاء.",
        },
        {
          title: "تصميم المواقع",
          desc: "واجهة تسرق الأضواء. تصاميم مفصلة خصيصاً لتعكس جوهر فكرتك، بدقة بكسل لا تقبل المساومة.",
        },
        {
          title: "تطبيقات الجوال",
          desc: "قوة الانتشار في جيب المستخدم. تطبيقات أصلية تعمل بسلاسة على iOS و Android.",
        },
      ],
    },
    projects: {
      title: "نماذج الأعمال",
      intro: "نساعد فريقك على بناء وتطوير الحلول الموثوقة والقابلة للتوسع",
      items: [
        "نظام إدارة علاقات العملاء",
        "نظام تخطيط الموارد",
        "نظام إدارة الموارد البشرية",
        "إدارة مخازن ومشتريات",
        "نظام إدارة المعدات والآلات",
        "نظام المستخلصات والفواتير",
        "إدارة عمالة ومقاولون",
        "إدارة التكاليف والميزانية",
        "نظام إدارة المشاريع",
        "نظام المراسلة عبر الواتساب",
      ],
    },
    works: {
      title: "أعمالنا المختارة",
      intro: "نماذج من حلول بنيناها لشركاء في مجالات التجارة، الخدمات، والتكنولوجيا المالية.",
    },
    testimonials: {
      title: "آراء العملاء",
      intro: "شركاؤنا يقدّرون السرعة، الشفافية، والنتائج القابلة للقياس.",
    },
    journey: {
      title: "رحلة العمل",
      steps: [
        { title: "اكتشاف", desc: "نحلل أهداف العمل ونحدد أولويات الإصدار الأول." },
        { title: "تصميم", desc: "نحوّل الأفكار إلى واجهات واضحة وتدفقات استخدام مبسطة." },
        { title: "تطوير", desc: "نبني بجدولة متدرجة مع اختبارات تلقائية ومراجعات دورية." },
        { title: "إطلاق وتحسين", desc: "نراقب الأداء ونحسّن بناءً على بيانات الاستخدام الحقيقية." },
      ],
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "أخبرنا عن فكرتك أو احتياجاتك لنعود إليك بخطة تنفيذ واضحة.",
      cta: "احجز مكالمة استشارية",
    },
    controls: {
      theme: "الوضع اللوني",
      language: "اللغة",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      works: "Selected Work",
      portfolio: "Portfolio",
      stack: "Tech Stack",
      journey: "Process",
      contact: "Contact",
    },
    hero: {
      title: "We don’t just build software. We craft the future.",
      subtitle:
        "Turn vision into tomorrow, today. We deliver digital products that don’t just work — they wow. Let’s take your ambition further than you imagined.",
      ctaPrimary: "Start the journey",
      ctaSecondary: "Explore our capabilities",
    },
    services: {
      title: "Services",
      intro: "Everything you need to lead. In one place.",
      items: [
        {
          title: "ERP Systems",
          desc: "Your organization's beating heart. Integrated management solutions that unify operations and turn complex data into smart decisions.",
        },
        {
          title: "Brand Identity",
          desc: "Your unique fingerprint. We craft visual identities that capture attention and embed in minds from the first moment.",
        },
        {
          title: "E-Commerce Stores",
          desc: "Your market.. without borders. Seamless shopping experiences that open global doors for your products and smartly multiply your sales.",
        },
        {
          title: "Website Design",
          desc: "Interfaces that steal the spotlight. Custom-tailored designs that reflect your idea's essence, with pixel-perfect precision.",
        },
        {
          title: "Mobile Apps",
          desc: "The power of reach in the user's pocket. Native apps that run smoothly on iOS and Android.",
        },
      ],
    },
    projects: {
      title: "Business Models",
      intro: "We help your team build and develop reliable, scalable solutions",
      items: [
        "Customer Relationship Management",
        "Enterprise Resource Planning",
        "Human Resources Management",
        "Warehouse & Purchase Management",
        "Equipment & Machinery Management",
        "Invoices & Statements System",
        "Labor & Contractors Management",
        "Cost & Budget Management",
        "Project Management System",
        "WhatsApp Messaging System",
      ],
    },
    works: {
      title: "Selected Work",
      intro: "Examples of solutions delivered for partners in commerce, services, and fintech.",
    },
    testimonials: {
      title: "Testimonials",
      intro: "Partners value our speed, transparency, and measurable outcomes.",
    },
    journey: {
      title: "Process",
      steps: [
        { title: "Discover", desc: "We unpack goals and prioritize the first release." },
        { title: "Design", desc: "Ideas become clear interfaces and streamlined flows." },
        { title: "Build", desc: "We ship iteratively with automated tests and regular reviews." },
        { title: "Launch & Improve", desc: "We monitor performance and optimize from real usage data." },
      ],
    },
    contact: {
      title: "Contact us",
      subtitle: "Tell us about your idea or needs and we will return with a clear execution plan.",
      cta: "Book a discovery call",
    },
    controls: {
      theme: "Theme",
      language: "Language",
    },
  },
};
