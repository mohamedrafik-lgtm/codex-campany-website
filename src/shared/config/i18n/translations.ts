export type Locale = "ar" | "en";

export type TranslationResource = {
  nav: {
    home: string;
    about: string;
    services: string;
    works: string;
    testimonials: string;
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
      testimonials: "آراء العملاء",
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
      intro: "نقدّم فريقاً متعدد التخصصات يغطي دورة حياة المنتج كاملة.",
      items: [
        {
          title: "تطوير الويب",
          desc: "تجارب ويب سريعة وعالية الأداء مبنية على أحدث أطر العمل.",
        },
        {
          title: "تصميم واجهات وتجربة المستخدم",
          desc: "تصاميم مدروسة تركّز على أهداف العمل وتوقعات المستخدم النهائي.",
        },
        {
          title: "الهندسة السحابية",
          desc: "بنية تحتية آمنة وقابلة للتوسع على السحابة مع مراقبة مستمرة.",
        },
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
      testimonials: "Testimonials",
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
      intro: "A cross-functional team covering the full product lifecycle.",
      items: [
        {
          title: "Web Engineering",
          desc: "Fast, high-performance web experiences built on modern frameworks.",
        },
        {
          title: "UI/UX Design",
          desc: "Thoughtful interfaces aligned to business goals and user needs.",
        },
        {
          title: "Cloud Engineering",
          desc: "Secure, scalable cloud foundations with monitoring baked in.",
        },
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
