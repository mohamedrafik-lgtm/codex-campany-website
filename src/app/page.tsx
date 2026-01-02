"use client";

import Link from "next/link";
import { useLocale } from "@/shared/providers/locale-context";
import type { JSX } from "react";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";

type IconType = (props: { className?: string }) => JSX.Element;

const ReactIcon: IconType = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <ellipse cx="12" cy="12" rx="10" ry="4.6" />
    <ellipse cx="12" cy="12" rx="10" ry="4.6" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.6" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

const NextIcon: IconType = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 7h20v18H6z" />
    <path d="M10 11h6" />
    <path d="M16 11l6 10" />
    <path d="M10 21h6" />
  </svg>
);

const AngularIcon: IconType = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 3l12 5-2.4 13.5L16 29l-9.6-7.5L4 8z" />
    <path d="M12 20l4-10 4 10m-7-3h6" />
  </svg>
);

const DotNetIcon: IconType = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 10h4v12H4zM10 22V10h3l5 12h3V10h4" />
  </svg>
);

const LaravelIcon: IconType = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 8l7-3 7 3-7 3-7-3z" />
    <path d="M6 8v8l7 3m0-8v14l7-3V11" />
  </svg>
);

const NestIcon: IconType = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 20c0-7 5-12 10-12 3.5 0 6 2.3 6 5.5 0 2.7-1.7 4.5-4.2 4.5-2 0-3.8-1.6-3.8-3.5 0-1.6 1.1-3 2.6-3.3" />
    <path d="M10 24c2.2 2 5 3 8 3 2.8 0 4-1 4-3" />
  </svg>
);

const FlutterIcon: IconType = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L8 16l4 4 14-14z" />
    <path d="M14 20l4 4 4-4-4-4z" />
  </svg>
);

const ReactNativeIcon = ReactIcon;

export default function Home() {
  const { content, locale } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  
  // Framer Motion Scroll Hooks
  const { scrollY } = useScroll();

  const techStack = [
    {
      title: locale === "ar" ? "الواجهات الأمامية" : "Frontend",
      note: locale === "ar" ? "تجارب سلسة وسريعة" : "Fluid, high-polish UIs",
      items: [
        { name: "React", icon: ReactIcon, color: "bg-gradient-to-br from-cyan-400 to-blue-500" },
        { name: "Next.js", icon: NextIcon, color: "bg-gradient-to-br from-zinc-200 to-zinc-500" },
        { name: "Angular", icon: AngularIcon, color: "bg-gradient-to-br from-red-500 to-rose-600" },
      ],
    },
    {
      title: locale === "ar" ? "الواجهات الخلفية" : "Back-end",
      note: locale === "ar" ? "خدمات موثوقة وآمنة" : "Reliable, secure services",
      items: [
        { name: ".NET", icon: DotNetIcon, color: "bg-gradient-to-br from-indigo-500 to-blue-700" },
        { name: "Laravel", icon: LaravelIcon, color: "bg-gradient-to-br from-orange-500 to-red-500" },
        { name: "Nest.js", icon: NestIcon, color: "bg-gradient-to-br from-pink-500 to-rose-500" },
      ],
    },
    {
      title: locale === "ar" ? "تطبيقات الهاتف" : "Mobile Apps",
      note: locale === "ar" ? "تجارب متعددة المنصات" : "Cross-platform excellence",
      items: [
        { name: "Flutter", icon: FlutterIcon, color: "bg-gradient-to-br from-sky-400 to-blue-600" },
        { name: "React Native", icon: ReactNativeIcon, color: "bg-gradient-to-br from-emerald-400 to-teal-600" },
      ],
    },
  ];

  // Improved timeline height calculation with better precision
  const timelineHeightValue = useTransform(scrollY, (latest) => {
    if (typeof window === "undefined" || !journeyRef.current) return 0;
    
    const element = journeyRef.current;
    const elementTop = element.offsetTop; // Absolute position from document top
    const elementHeight = element.offsetHeight;
    const elementBottom = elementTop + elementHeight;
    
    // Current scroll position
    const scrollPos = latest;
    
    // Point when element enters viewport (top of element at bottom of viewport)
    const startTrigger = elementTop - window.innerHeight;
    // Point when element completely exits viewport (element fully at top of viewport)
    const endTrigger = elementBottom;
    
    // Calculate progress from element entering to element completely exits
    const totalDistance = endTrigger - startTrigger;
    const currentDistance = scrollPos - startTrigger;
    
    const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
    return `${(progress * 100).toFixed(2)}%`;
  });

  // Optimize rendering with GPU acceleration
  useEffect(() => {
    // Trigger a reflow to ensure browser recalculates dimensions
    if (journeyRef.current) {
      journeyRef.current.offsetHeight;
    }
  }, []);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div ref={containerRef} className="text-zinc-900 dark:text-zinc-50">
      <motion.section
        id="home"
        className="relative isolate overflow-hidden border-b border-zinc-200/40 bg-transparent px-4 py-12 sm:px-6 sm:py-16 dark:border-zinc-800/40 dark:bg-transparent flex items-center justify-center min-h-[70vh] sm:min-h-[80vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:gap-10 items-center justify-center text-center lg:flex-col lg:items-center lg:justify-center">
          <div className="flex-1 space-y-5 sm:space-y-6 max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-3 sm:space-y-4"
            >
              <h1 className="text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
                {content.hero.title}
              </h1>
              <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-300 mx-auto px-2">
                {content.hero.subtitle}
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3"
            >
              <button
                onClick={scrollToNextSection}
                className="w-full sm:w-auto rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/30 transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:shadow-zinc-100/20 dark:hover:bg-zinc-200"
              >
                {content.hero.ctaPrimary}
              </button>
              <Link
                href="#works"
                className="w-full sm:w-auto rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
              >
                {content.hero.ctaSecondary}
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="about" 
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 bg-transparent dark:bg-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-1"
          >
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {locale === "ar" ? "من نحن" : "Who We Are"}
            </h2>
            <h3 className="mt-4 text-xl font-bold text-zinc-800 dark:text-zinc-100">
              {locale === "ar"
                ? "حيث يلتقي الإتقان الهندسي.. بالشغف الإبداعي."
                : "Where engineering excellence meets creative passion."}
            </h3>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300">
              {locale === "ar"
                ? "نحن لسنا مجرد شركة تطوير تقليدية. نحن تحالف استراتيجي لعقول لا تؤمن بالمستحيل. ندمج قوة المؤسسات الكبرى بمرونة فرق الابتكار، لنسد الفجوة بين أعقد تحديات الأعمال، وبين الحلول الرقمية السلسة."
                : "We're not just another development company. We're a strategic alliance of minds that refuse to accept impossible. We blend enterprise power with startup agility to bridge the gap between complex business challenges and seamless digital solutions."}
            </p>
          </motion.div>
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {[{
              title: locale === "ar" ? "نهج مبني على النتائج" : "Outcome-first",
              desc: locale === "ar"
                ? "نربط كل ميزة بمؤشر أداء واضح ونقيسه بعد الإطلاق."
                : "Every feature is tied to a measurable KPI we track post-launch.",
            }, {
              title: locale === "ar" ? "تقنيات حديثة" : "Modern stack",
              desc: locale === "ar"
                ? "نستخدم Next.js، TypeScript، وCloud-native لضمان السرعة والقابلية للتوسع."
                : "Next.js, TypeScript, and cloud-native practices to ensure speed and scale.",
            }, {
              title: locale === "ar" ? "تعاون شفاف" : "Transparent collaboration",
              desc: locale === "ar"
                ? "لوحات متابعة، قنوات مباشرة، وتحديثات واضحة دون مفاجآت."
                : "Live boards, direct channels, and predictable updates with no surprises.",
            }, {
              title: locale === "ar" ? "خبرة متعددة المجالات" : "Cross-industry experience",
              desc: locale === "ar"
                ? "عملنا مع التجارة الإلكترونية، التقنية المالية، التنقل، والتعليم."
                : "Work across e-commerce, fintech, mobility, and education."
            }].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white/50 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/15 dark:border-zinc-700/60 dark:bg-zinc-900/30 dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/10"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-transparent" />
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-500" />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-300">{item.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="services" 
        className="bg-transparent dark:bg-transparent py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                {content.services.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">{content.services.intro}</p>
            </div>
            <Link
              href="#contact"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200 whitespace-nowrap"
            >
              {locale === "ar" ? "احصل على خطة تنفيذ" : "Get a delivery plan"}
            </Link>
          </motion.div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group relative overflow-hidden flex h-full flex-col justify-between rounded-2xl border border-zinc-200/60 bg-white/40 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20 dark:border-zinc-700/60 dark:bg-zinc-900/40 dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/15"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
                
                {/* Glow circle */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-500" />
                
                {/* Number badge */}
                <div className="absolute -left-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white shadow-lg shadow-blue-500/30 z-20">
                  {index + 1}
                </div>

                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-blue-400">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-zinc-300 group-hover:text-zinc-200">
                    {item.desc}
                  </p>
                </div>
                
                <div className="relative z-10 mt-6 flex items-center gap-2 text-sm font-semibold text-blue-400 transition-all group-hover:text-blue-300">
                  <span>{locale === "ar" ? "تسليم كل أسبوع" : "Weekly drops"}</span>
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="projects"
        className="bg-transparent dark:bg-transparent py-12 sm:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-8 sm:mb-12 text-center"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {locale === "ar" ? "نماذج الأعمال" : "Business Models"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto px-4">
              {locale === "ar" 
                ? "نساعد فريقك على بناء وتطوير الحلول الموثوقة والقابلة للتوسع"
                : "We help your team build and develop reliable, scalable solutions"}
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {content.projects?.items?.map((project, index) => (
              <motion.div
                key={project}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white/50 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/15 dark:border-zinc-700/60 dark:bg-zinc-900/30 dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/10"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-transparent" />
                
                {/* Icon/Number circle */}
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Title and Icon */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-300 leading-tight flex-1">
                      {project}
                    </h3>
                    <svg className="h-5 w-5 text-zinc-400 transition-all duration-300 group-hover:text-blue-500 flex-shrink-0 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>

                  {/* Progress line */}
                  <div className="relative mt-auto pt-3 h-0.5 w-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-500 group-hover:w-full rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="works" 
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 bg-transparent dark:bg-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}

        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-1"
          >
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {locale === 'ar' ? 'أعمالنا المختارة' : 'Selected Works'}
            </h2>
            <h3 className="mt-4 text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
              {locale === 'ar' ? 'أثر لا يُمحى.' : 'An Indelible Impact.'}
            </h3>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
              {locale === 'ar'
                ? 'الفلسفة: النتائج تتحدث بصوت أعلى.'
                : 'Philosophy: Let results speak louder.'}
            </p>
            <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
              {locale === 'ar'
                ? 'نعرض مشاريع منتقاة تُظهر تأثيرنا الحقيقي على الأعمال، بدءاً من تحسين العمليات إلى تعزيز العائد.'
                : 'Handpicked projects that demonstrate measurable business impact — from operational uplift to revenue growth.'}
            </p>
          </motion.div>

          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/50 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20 dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/15"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
              
              {/* Glow circle */}
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-500" />
              
              <div className="relative z-10 absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white shadow-lg shadow-blue-500/30">
                01
              </div>

              <div className="relative z-10 grid gap-4 sm:grid-cols-3 sm:items-start">
                <div className="sm:col-span-2">
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{locale === 'ar' ? 'المنصة اللوجستية الوطنية' : 'National Logistics Platform'}</h4>
                  <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <strong className="text-zinc-800 dark:text-zinc-100">{locale === 'ar' ? 'العميل: وزارة النقل' : 'Client: Ministry of Transport'}</strong>
                    <p className="mt-3">{locale === 'ar' ? 'نظرة عامة سريعة: تصميم وتنفيذ نظام لوجستي متكامل لربط الموانئ، المخازن، وشبكات النقل الوطني.' : 'Brief: Designed and delivered an integrated logistics system connecting ports, warehouses, and national transport networks.'}</p>
                  </div>
                </div>

                <div className="sm:col-span-1 flex flex-col items-start gap-3">
                  <div className="rounded-lg bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200">{locale === 'ar' ? 'نقطة النجاح' : 'The Metric'}</div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {locale === 'ar'
                      ? 'خفضنا التكاليف التشغيلية بنسبة 40%، وعالجنا صفقات يومية بأكثر من 10 ملايين دولار.'
                      : 'Reduced operational costs by 40% and processed daily transactions exceeding $10M.'}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-300">{locale === 'ar' ? 'حل قابل للتوسع، مع مستوى توافر مرتفع وشفافية بيانات كاملة.' : 'A scalable solution with high availability and end-to-end data transparency.'}</p>
                <div className="flex items-center gap-3">
                  <a
                    href="#contact"
                    className="rounded-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm border border-white/10 shadow-lg hover:from-white/20 hover:to-white/20"
                  >
                    {locale === 'ar' ? 'اطلب دراسة حالة' : 'Request case study'}
                  </a>

                  <Link
                    href="/portfolio"
                    className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-900 bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 dark:text-white"
                  >
                    {locale === 'ar' ? 'عرض المحفظة' : 'Portfolio'}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="stack" 
        className="bg-transparent dark:bg-transparent py-12 sm:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                {locale === "ar" ? "التقنيات المستخدمة" : "Tech Stack"}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
                {locale === "ar"
                  ? "نختار أدوات حديثة لضمان سرعة، أمان، وقابلية تطوير بدون تنازلات."
                  : "A modern stack chosen for speed, safety, and room to scale without trade-offs."}
              </p>
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              {locale === "ar" ? "جاهزة للتوسع الفوري" : "Ready to scale on day one"}
            </div>
          </motion.div>

          <div className="relative mt-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="pointer-events-none absolute inset-6 rounded-3xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 blur-3xl"
            />

            <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {techStack.map((group, idx) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative overflow-hidden flex h-full flex-col gap-4 rounded-2xl border border-zinc-200/60 bg-white/50 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20 dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/15"
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
                  
                  {/* Glow circle */}
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-500" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-300">{group.title}</div>
                    <motion.div
                      className="h-2 w-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400"
                      layoutId="stack-glow"
                      transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    />
                  </div>

                  <div className="relative z-10 space-y-3">
                    {group.items.map((item, itemIdx) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.name}
                          className="flex items-center gap-3 rounded-lg bg-white/60 px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm ring-1 ring-zinc-200/60 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-md dark:bg-zinc-800/60 dark:text-zinc-100 dark:ring-zinc-700/60 dark:hover:bg-zinc-800/80"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 + itemIdx * 0.05 }}
                          viewport={{ once: true, margin: "-100px" }}
                          whileHover={{ x: 4, scale: 1.02 }}
                        >
                          <div className={`${item.color} flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md shadow-black/10 transition-transform duration-300`}> 
                            <Icon className="h-5 w-5" />
                          </div>
                          <span>{item.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="relative z-10 mt-auto text-xs text-zinc-500 dark:text-zinc-400">{group.note}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        ref={journeyRef}
        id="journey" 
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 bg-transparent dark:bg-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50">
            {locale === 'ar' ? 'رحلة العمل' : 'Our Process'}
          </h2>
          <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
            {locale === 'ar'
              ? 'من الفكرة إلى الواقع - خمس خطوات نحو النجاح'
              : 'From idea to reality - five steps to success'}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline connector - vertical line with progress */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -ml-0.5 overflow-hidden">
            {/* Background line */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-300 via-zinc-300 to-zinc-300 opacity-30 dark:from-zinc-600 dark:via-zinc-600 dark:to-zinc-600"></div>
            {/* Animated progress line with smooth continuous animation */}
            <motion.div 
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-white via-white to-zinc-100 dark:from-white dark:via-blue-200 dark:to-white shadow-2xl will-change-[height]"
              style={{ 
                height: timelineHeightValue,
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.4)',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            ></motion.div>
            {/* Moving glow tip to emphasize progression */}
            <motion.div
              className="absolute left-1/2 -ml-[6px] h-3 w-3 rounded-full bg-white dark:bg-blue-100 shadow-[0_0_12px_6px_rgba(255,255,255,0.6)]"
              style={{
                transform: useMotionTemplate`translate(-50%, ${timelineHeightValue})`,
                willChange: 'transform',
              }}
            />
          </div>

          {/* Journey Steps */}
          <div className="space-y-12 md:space-y-24">
            {/* Step 1 - Discovery */}
            <motion.div 
              className="journey-step-new"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              data-step="1"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right md:pr-12 order-2 md:order-1">
                  <div className="inline-block px-4 py-2 rounded-full bg-black/80 dark:bg-white/80 text-white dark:text-black font-semibold text-sm mb-4">
                    {locale === 'ar' ? 'الخطوة الأولى' : 'Step One'}
                  </div>
                  <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                    {locale === 'ar' ? 'الاكتشاف' : 'Discovery'}
                  </h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-6">
                    {locale === 'ar' 
                      ? 'نبدأ بفهم رؤيتك وأهدافك بعمق، ونحلل احتياجات السوق والمنافسين لرسم خريطة طريق واضحة.'
                      : 'We start by deeply understanding your vision and goals, analyzing market needs and competitors to create a clear roadmap.'}
                  </p>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <span className="px-3 py-1 rounded-full bg-black/60 dark:bg-white/60 text-white dark:text-black text-sm font-medium">
                      {locale === 'ar' ? 'تحليل الأعمال' : 'Business Analysis'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 dark:bg-white/60 text-white dark:text-black text-sm font-medium">
                      {locale === 'ar' ? 'دراسة السوق' : 'Market Research'}
                    </span>
                  </div>
                </div>
                <div className="order-1 md:order-2 md:pl-12">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                    <div className="relative bg-white/50 rounded-3xl p-8 shadow-md backdrop-blur-sm transform group-hover:scale-110 transition-all duration-500 border border-zinc-200/60 dark:bg-zinc-900/40 dark:border-zinc-800/60">
                      <div className="text-zinc-900 dark:text-zinc-100">
                        <div className="text-2xl font-bold mb-2">
                          {locale === 'ar' ? 'استراتيجية واضحة' : 'Clear Strategy'}
                        </div>
                        <div className="text-zinc-600 dark:text-zinc-300">
                          {locale === 'ar' ? 'خطة عمل محكمة ومقاييس نجاح واضحة' : 'Solid action plan with clear success metrics'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Center indicator */}
              <motion.div 
                className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-full bg-black shadow-lg shadow-white/20 flex items-center justify-center text-white font-bold border-4 border-white transition-all duration-500"
                  initial={{ opacity: 0.3, boxShadow: "0 0 0px 0px rgba(255,255,255,0)" }}
                  whileInView={{ 
                    opacity: 1, 
                    boxShadow: "0 0 20px 4px rgba(255,255,255,0.4)"
                  }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false, margin: "-200px" }}
                >
                  01
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Step 2 - Design */}
            <motion.div 
              className="journey-step-new"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              data-step="2"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:pr-12">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                    <div className="relative bg-white/50 rounded-3xl p-8 shadow-md backdrop-blur-sm transform group-hover:scale-110 transition-all duration-500 border border-zinc-200/60 dark:bg-zinc-900/40 dark:border-zinc-800/60">
                      <div className="text-zinc-900 dark:text-zinc-100">
                        <div className="text-2xl font-bold mb-2">
                          {locale === 'ar' ? 'تصميم متميز' : 'Outstanding Design'}
                        </div>
                        <div className="text-zinc-600 dark:text-zinc-300">
                          {locale === 'ar' ? 'واجهات جذابة وتجربة مستخدم سلسة' : 'Attractive interfaces with seamless UX'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:pl-12">
                  <div className="inline-block px-4 py-2 rounded-full bg-black/80 dark:bg-white/80 text-white dark:text-black font-semibold text-sm mb-4">
                    {locale === 'ar' ? 'الخطوة الثانية' : 'Step Two'}
                  </div>
                  <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                    {locale === 'ar' ? 'التصميم' : 'Design'}
                  </h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-6">
                    {locale === 'ar'
                      ? 'نحول الأفكار إلى تصاميم بصرية جذابة، مع التركيز على تجربة المستخدم والتفاعل السلس.'
                      : 'We transform ideas into attractive visual designs, focusing on user experience and seamless interaction.'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 dark:bg-white/60 text-white dark:text-black text-sm font-medium">
                      {locale === 'ar' ? 'UI/UX' : 'UI/UX'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 dark:bg-white/60 text-white dark:text-black text-sm font-medium">
                      {locale === 'ar' ? 'نماذج تفاعلية' : 'Prototyping'}
                    </span>
                  </div>
                </div>
              </div>
              <motion.div 
                className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-full bg-black shadow-lg shadow-white/20 flex items-center justify-center text-white font-bold border-4 border-white transition-all duration-500"
                  initial={{ opacity: 0.3, boxShadow: "0 0 0px 0px rgba(255,255,255,0)" }}
                  whileInView={{ 
                    opacity: 1, 
                    boxShadow: "0 0 20px 4px rgba(255,255,255,0.4)"
                  }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false, margin: "-200px" }}
                >
                  02
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Step 3 - Development */}
            <motion.div 
              className="journey-step-new relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              data-step="3"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right md:pr-12 order-2 md:order-1">
                  <div className="inline-block px-4 py-2 rounded-full bg-black/80 dark:bg-white/80 text-white dark:text-black font-semibold text-sm mb-4">
                    {locale === 'ar' ? 'الخطوة الثالثة' : 'Step Three'}
                  </div>
                  <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                    {locale === 'ar' ? 'التطوير' : 'Development'}
                  </h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-6">
                    {locale === 'ar'
                      ? 'نكتب كود نظيف وقابل للتطوير، مع اختبارات شاملة لضمان الجودة والأداء الأمثل.'
                      : 'We write clean, scalable code with comprehensive testing to ensure quality and optimal performance.'}
                  </p>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <span className="px-3 py-1 rounded-full bg-black/60 dark:bg-white/60 text-white dark:text-black text-sm font-medium">
                      {locale === 'ar' ? 'برمجة متقدمة' : 'Advanced Coding'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 dark:bg-white/60 text-white dark:text-black text-sm font-medium">
                      {locale === 'ar' ? 'اختبارات شاملة' : 'Testing'}
                    </span>
                  </div>
                </div>
                <div className="order-1 md:order-2 md:pl-12">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                    <div className="relative bg-white/50 rounded-3xl p-8 shadow-md backdrop-blur-sm transform group-hover:scale-110 transition-all duration-500 border border-zinc-200/60 dark:bg-zinc-900/40 dark:border-zinc-800/60">
                      <div className="text-zinc-900 dark:text-zinc-100">
                        <div className="text-2xl font-bold mb-2">
                          {locale === 'ar' ? 'كود احترافي' : 'Professional Code'}
                        </div>
                        <div className="text-zinc-600 dark:text-zinc-300">
                          {locale === 'ar' ? 'بنية تحتية قوية وقابلة للتوسع' : 'Robust and scalable infrastructure'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div 
                className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-full bg-black shadow-lg shadow-white/20 flex items-center justify-center text-white font-bold border-4 border-white transition-all duration-500"
                  initial={{ opacity: 0.3, boxShadow: "0 0 0px 0px rgba(255,255,255,0)" }}
                  whileInView={{ 
                    opacity: 1, 
                    boxShadow: "0 0 20px 4px rgba(255,255,255,0.4)"
                  }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false, margin: "-200px" }}
                >
                  03
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Step 4 - Launch */}
            <motion.div 
              className="journey-step-new relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              data-step="4"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:pr-12">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                    <div className="relative bg-white/50 rounded-3xl p-8 shadow-md backdrop-blur-sm transform group-hover:scale-110 transition-all duration-500 border border-zinc-200/60 dark:bg-zinc-900/40 dark:border-zinc-800/60">
                      <div className="text-zinc-900 dark:text-zinc-100">
                        <div className="text-2xl font-bold mb-2">
                          {locale === 'ar' ? 'إطلاق ناجح' : 'Successful Launch'}
                        </div>
                        <div className="text-zinc-600 dark:text-zinc-300">
                          {locale === 'ar' ? 'نشر آمن ومراقبة مستمرة للأداء' : 'Safe deployment with continuous monitoring'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:pl-12">
                  <div className="inline-block px-4 py-2 rounded-full bg-black/80 dark:bg-white/80 text-white dark:text-black font-semibold text-sm mb-4">
                    {locale === 'ar' ? 'الخطوة الرابعة' : 'Step Four'}
                  </div>
                  <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                    {locale === 'ar' ? 'الإطلاق' : 'Launch'}
                  </h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-6">
                    {locale === 'ar'
                      ? 'نطلق منتجك بثقة مع مراقبة دقيقة للأداء وجاهزية للتعامل مع أي تحديات.'
                      : 'We launch your product with confidence, precise performance monitoring, and readiness for any challenges.'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 dark:bg-white/60 text-white dark:text-black text-sm font-medium">
                      {locale === 'ar' ? 'نشر آمن' : 'Deployment'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 dark:bg-white/60 text-white dark:text-black text-sm font-medium">
                      {locale === 'ar' ? 'مراقبة مباشرة' : 'Live Monitoring'}
                    </span>
                  </div>
                </div>
              </div>
              <motion.div 
                className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-full bg-black shadow-lg shadow-white/20 flex items-center justify-center text-white font-bold border-4 border-white transition-all duration-500"
                  initial={{ opacity: 0.3, boxShadow: "0 0 0px 0px rgba(255,255,255,0)" }}
                  whileInView={{ 
                    opacity: 1, 
                    boxShadow: "0 0 20px 4px rgba(255,255,255,0.4)"
                  }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false, margin: "-200px" }}
                >
                  04
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Step 5 - Growth */}
            <motion.div 
              className="journey-step-new relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              data-step="5"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right md:pr-12 order-2 md:order-1">
                  <div className="inline-block px-4 py-2 rounded-full bg-black/80 dark:bg-white/80 text-white dark:text-black font-semibold text-sm mb-4">
                    {locale === 'ar' ? 'الخطوة الخامسة' : 'Step Five'}
                  </div>
                  <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                    {locale === 'ar' ? 'النمو والتطوير' : 'Growth & Evolution'}
                  </h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-6">
                    {locale === 'ar'
                      ? 'نستمر في تحسين المنتج بناءً على البيانات وملاحظات المستخدمين، مع إضافة ميزات جديدة باستمرار.'
                      : 'We continue improving the product based on data and user feedback, constantly adding new features.'}
                  </p>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <span className="px-3 py-1 rounded-full bg-black/60 dark:bg-white/60 text-white dark:text-black text-sm font-medium">
                      {locale === 'ar' ? 'تحليل البيانات' : 'Analytics'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 dark:bg-white/60 text-white dark:text-black text-sm font-medium">
                      {locale === 'ar' ? 'تطوير مستمر' : 'Continuous Improvement'}
                    </span>
                  </div>
                </div>
                <div className="order-1 md:order-2 md:pl-12">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                    <div className="relative bg-white/50 rounded-3xl p-8 shadow-md backdrop-blur-sm transform group-hover:scale-110 transition-all duration-500 border border-zinc-200/60 dark:bg-zinc-900/40 dark:border-zinc-800/60">
                      <div className="text-zinc-900 dark:text-zinc-100">
                        <div className="text-2xl font-bold mb-2">
                          {locale === 'ar' ? 'نمو متواصل' : 'Continuous Growth'}
                        </div>
                        <div className="text-zinc-600 dark:text-zinc-300">
                          {locale === 'ar' ? 'تطوير مستمر وتحديثات دورية' : 'Ongoing development and regular updates'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div 
                className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-full bg-black shadow-lg shadow-white/20 flex items-center justify-center text-white font-bold border-4 border-white transition-all duration-500"
                  initial={{ opacity: 0.3, boxShadow: "0 0 0px 0px rgba(255,255,255,0)" }}
                  whileInView={{ 
                    opacity: 1, 
                    boxShadow: "0 0 20px 4px rgba(255,255,255,0.4)"
                  }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false, margin: "-200px" }}
                >
                  05
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="border-t border-zinc-200/40 bg-transparent dark:bg-transparent px-4 py-12 sm:px-6 sm:py-16 dark:border-zinc-800/40"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-8 sm:mb-12 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">{content.contact.title}</h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-300">{content.contact.subtitle}</p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/50 p-8 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20 dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/15">
                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
                
                {/* Glow circle */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-500" />
                
                <h3 className="relative z-10 mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {locale === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
                </h3>
                
                {/* Email Addresses */}
                <div className="relative z-10 space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group flex items-start gap-4 rounded-xl p-4 transition hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {locale === 'ar' ? 'الاستفسارات العامة' : 'General Inquiries'}
                      </p>
                      <a 
                        href="mailto:info@nova-codex.tech" 
                        className="mt-1 text-base font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        info@nova-codex.tech
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group flex items-start gap-4 rounded-xl p-4 transition hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {locale === 'ar' ? 'الوظائف والتوظيف' : 'Careers & Hiring'}
                      </p>
                      <a 
                        href="mailto:careers@nova-codex.tech" 
                        className="mt-1 text-base font-semibold text-green-600 transition hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                      >
                        careers@nova-codex.tech
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group flex items-start gap-4 rounded-xl p-4 transition hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {locale === 'ar' ? 'الدعم الفني' : 'Technical Support'}
                      </p>
                      <a 
                        href="mailto:support@nova-codex.tech" 
                        className="mt-1 text-base font-semibold text-purple-600 transition hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                      >
                        support@nova-codex.tech
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/50 p-8 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20 dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/15"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
              
              {/* Glow circle */}
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-500" />
              
              <h3 className="relative z-10 mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {locale === 'ar' ? 'أرسل رسالة' : 'Send a Message'}
              </h3>
              <form className="relative z-10 space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {locale === 'ar' ? 'الاسم' : 'Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
                    placeholder={locale === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
                    placeholder={locale === 'ar' ? 'بريدك الإلكتروني' : 'your@email.com'}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {locale === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
                    placeholder={locale === 'ar' ? '+20 123 456 7890' : '+1 (555) 000-0000'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {locale === 'ar' ? 'الرسالة' : 'Message'}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
                    placeholder={locale === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {locale === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
