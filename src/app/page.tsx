"use client";

import Link from "next/link";
import { useLocale } from "@/shared/providers/locale-context";
import { useScrollAnimation } from "@/shared/hooks/useScrollAnimation";
import { useEffect } from "react";

export default function Home() {
  const { content, locale } = useLocale();
  useScrollAnimation();

  // Journey animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const journeySection = document.getElementById('journey');
      if (!journeySection) return;

      const journeySteps = journeySection.querySelectorAll('.journey-step');
      const journeyIndicators = journeySection.querySelectorAll('.journey-indicator');
      const progressPath = journeySection.querySelector('#journey-progress-path') as SVGPathElement;

      let activeStep = 0;
      let totalProgress = 0;

      journeySteps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.7;

        if (rect.top < triggerPoint && rect.bottom > 0) {
          step.classList.add('in-view');
          activeStep = Math.max(activeStep, index + 1);
          
          // Calculate progress based on scroll position
          if (rect.top < triggerPoint) {
            const stepProgress = Math.min(1, Math.max(0, (triggerPoint - rect.top) / rect.height));
            totalProgress = index + stepProgress;
          }
        }
      });

      // Update indicators
      journeyIndicators.forEach((indicator, index) => {
        if (index < activeStep) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });

      // Animate SVG path
      if (progressPath) {
        const pathLength = 1000;
        const progress = Math.min(1, totalProgress / journeySteps.length);
        const offset = pathLength - (pathLength * progress);
        progressPath.style.strokeDashoffset = offset.toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNextSection = () => {
    const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    if (sections.length > 1) {
      const homeSection = sections[0];
      const aboutSection = sections[1];
      
      // Animate home out
      homeSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      homeSection.style.transform = 'translateY(-100px)';
      homeSection.style.opacity = '0';
      
      // Animate about in
      setTimeout(() => {
        aboutSection.scrollIntoView({ behavior: 'instant' });
        aboutSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        aboutSection.style.transform = 'translateY(0)';
        aboutSection.style.opacity = '1';
        
        // Animate content
        const items = aboutSection.querySelectorAll('[data-animate]') as NodeListOf<HTMLElement>;
        items.forEach((item, i) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          item.style.transition = 'none';
          
          setTimeout(() => {
            item.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`;
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 100);
        });
      }, 50);
    }
  };

  return (
    <div className="text-zinc-900 dark:text-zinc-50">
      <section
        id="home"
        className="relative isolate overflow-hidden border-b border-zinc-200/40 bg-transparent px-6 py-16 dark:border-zinc-800/40 dark:bg-transparent flex items-center justify-center"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10 items-center justify-center text-center lg:flex-col lg:items-center lg:justify-center">
          <div className="flex-1 space-y-6 max-w-3xl">
            <div data-animate className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                {content.hero.title}
              </h1>
              <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-300 mx-auto">
                {content.hero.subtitle}
              </p>
            </div>
            <div data-animate className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={scrollToNextSection}
                className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/30 transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:shadow-zinc-100/20 dark:hover:bg-zinc-200"
              >
                {content.hero.ctaPrimary}
              </button>
              <Link
                href="#works"
                className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
              >
                {content.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-16 bg-transparent dark:bg-transparent">
        <div className="grid gap-8 lg:grid-cols-3">
          <div data-animate className="lg:col-span-1">
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
          </div>
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
            }].map((item) => (
              <div
                data-animate
                key={item.title}
                className="rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-transparent dark:bg-transparent py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div data-animate className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                {content.services.title}
              </h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">{content.services.intro}</p>
            </div>
            <Link
              href="#contact"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
            >
              {locale === "ar" ? "احصل على خطة تنفيذ" : "Get a delivery plan"}
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.items.map((item, index) => (
              <div
                data-animate
                key={item.title}
                className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 dark:from-zinc-900/60 dark:to-zinc-800/40"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-500/5 group-hover:to-purple-500/5 group-hover:opacity-100" />
                
                {/* Number badge */}
                <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white shadow-lg shadow-blue-500/30">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="mx-auto max-w-6xl px-6 py-16 bg-transparent dark:bg-transparent">
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          <div data-animate className="lg:col-span-1">
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
          </div>

          <div className="lg:col-span-2">
            <div data-animate className="relative rounded-3xl overflow-hidden border border-zinc-200 bg-gradient-to-br from-white/60 to-zinc-50 p-6 shadow-lg dark:border-zinc-800 dark:from-zinc-900/60 dark:to-zinc-800/40">
              <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white shadow-lg shadow-blue-500/30">
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
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-transparent dark:bg-transparent py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div data-animate className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                {content.testimonials.title}
              </h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">{content.testimonials.intro}</p>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[1, 2].map((id) => (
              <div
                data-animate
                key={id}
                className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-50/60 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-800/40"
              >
                <p className="text-zinc-700 dark:text-zinc-200">
                  {locale === "ar"
                    ? "تعاون واضح، سرعة في التسليم، ونتائج ملموسة منذ الإصدار الأول."
                    : "Clear collaboration, fast delivery, and measurable wins from the first release."}
                </p>
                <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                  {locale === "ar" ? "مدير منتج – شركة تقنية" : "Product Lead – Tech company"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className="mx-auto max-w-6xl px-6 py-16 bg-transparent dark:bg-transparent">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 lg:sticky lg:top-24" data-animate>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {locale === 'ar' ? 'رحلة العمل' : 'Our Process'}
            </h2>
            <h3 className="mt-4 text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
              {locale === 'ar' ? 'من الفكرة.. إلى القمة.' : 'From Idea... To Summit.'}
            </h3>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
              {locale === 'ar'
                ? 'الفلسفة: البساطة في التسمية، العمق في التنفيذ.'
                : 'Philosophy: Simple names, deep execution.'}
            </p>
            <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
              {locale === 'ar'
                ? 'نقود مشاريع كرحلة حقيقية — واضحون في الخطوات، حاسمون في النتائج.'
                : 'We treat projects as real journeys — clear steps, decisive outcomes.'}
            </p>
            
            {/* Journey Progress Indicator */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 journey-indicator" data-step="1">
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-600 shadow-lg transition-all duration-500"></div>
                <span className="text-sm font-medium text-zinc-400 transition-colors duration-500">{locale === 'ar' ? 'الاكتشاف' : 'Discovery'}</span>
              </div>
              <div className="flex items-center gap-3 journey-indicator opacity-40" data-step="2">
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-purple-600 shadow-lg transition-all duration-500"></div>
                <span className="text-sm font-medium text-zinc-400 transition-colors duration-500">{locale === 'ar' ? 'التصميم' : 'Design'}</span>
              </div>
              <div className="flex items-center gap-3 journey-indicator opacity-40" data-step="3">
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-600 shadow-lg transition-all duration-500"></div>
                <span className="text-sm font-medium text-zinc-400 transition-colors duration-500">{locale === 'ar' ? 'الهندسة' : 'Engineering'}</span>
              </div>
              <div className="flex items-center gap-3 journey-indicator opacity-40" data-step="4">
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-orange-600 shadow-lg transition-all duration-500"></div>
                <span className="text-sm font-medium text-zinc-400 transition-colors duration-500">{locale === 'ar' ? 'الإطلاق' : 'Launch'}</span>
              </div>
              <div className="flex items-center gap-3 journey-indicator opacity-40" data-step="5">
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-pink-600 shadow-lg transition-all duration-500"></div>
                <span className="text-sm font-medium text-zinc-400 transition-colors duration-500">{locale === 'ar' ? 'النمو' : 'Growth'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 relative">
            {/* Animated Path */}
            <svg className="absolute left-0 top-0 h-full w-20 overflow-visible pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="20%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="40%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="60%" stopColor="#f97316" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="pathGradientActive" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="25%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="75%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <path
                d="M 40 30 Q 25 80, 40 130 T 40 230 Q 55 280, 40 330 T 40 430 Q 25 480, 40 530"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                strokeDasharray="8,8"
                className="animate-dash"
              />
              <path
                id="journey-progress-path"
                d="M 40 30 Q 25 80, 40 130 T 40 230 Q 55 280, 40 330 T 40 430 Q 25 480, 40 530"
                fill="none"
                stroke="url(#pathGradientActive)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            <div className="space-y-16 pl-24 relative" style={{ zIndex: 1 }}>
              {/* Step 1 - Discovery */}
              <div data-animate className="relative flex items-start gap-6 journey-step group" data-step="1">
                <div className="absolute -left-16 mt-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold shadow-xl shadow-blue-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <div className="text-center">
                    <div className="text-2xl">🔍</div>
                    <div className="text-xs font-semibold">01</div>
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:-translate-y-1 dark:border-blue-900/50 dark:from-blue-950/30 dark:to-zinc-900/60 dark:shadow-blue-500/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{locale === 'ar' ? 'الاكتشاف' : 'Discovery'}</h4>
                      <p className="mt-3 text-base text-zinc-700 dark:text-zinc-300">{locale === 'ar' ? 'نفهم الرؤية، ونرسم المخطط الاستراتيجي.' : 'We understand the vision and map the strategic plan.'}</p>
                      <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <li className="flex items-center gap-2">
                          <span className="text-blue-500">✦</span>
                          {locale === 'ar' ? 'تحليل احتياجات العمل' : 'Business needs analysis'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-500">✦</span>
                          {locale === 'ar' ? 'دراسة السوق والمنافسين' : 'Market & competitor research'}
                        </li>
                      </ul>
                    </div>
                    <div className="text-5xl opacity-10 dark:opacity-5">🚀</div>
                  </div>
                </div>
              </div>

              {/* Step 2 - Design */}
              <div data-animate className="relative flex items-start gap-6 journey-step group" data-step="2">
                <div className="absolute -left-16 mt-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold shadow-xl shadow-purple-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <div className="text-center">
                    <div className="text-2xl">🎨</div>
                    <div className="text-xs font-semibold">02</div>
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-8 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:-translate-y-1 dark:border-purple-900/50 dark:from-purple-950/30 dark:to-zinc-900/60 dark:shadow-purple-500/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-purple-900 dark:text-purple-100">{locale === 'ar' ? 'التصميم' : 'Design'}</h4>
                      <p className="mt-3 text-base text-zinc-700 dark:text-zinc-300">{locale === 'ar' ? 'نصيغ المنطق، ونبدع التجربة البصرية.' : 'We craft the logic and create visual experience.'}</p>
                      <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <li className="flex items-center gap-2">
                          <span className="text-purple-500">✦</span>
                          {locale === 'ar' ? 'تصميم واجهة المستخدم' : 'UI/UX design'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-purple-500">✦</span>
                          {locale === 'ar' ? 'النماذج التفاعلية' : 'Interactive prototypes'}
                        </li>
                      </ul>
                    </div>
                    <div className="text-5xl opacity-10 dark:opacity-5">✨</div>
                  </div>
                </div>
              </div>

              {/* Step 3 - Engineering */}
              <div data-animate className="relative flex items-start gap-6 journey-step group" data-step="3">
                <div className="absolute -left-16 mt-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-bold shadow-xl shadow-green-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <div className="text-center">
                    <div className="text-2xl">⚙️</div>
                    <div className="text-xs font-semibold">03</div>
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-8 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:-translate-y-1 dark:border-green-900/50 dark:from-green-950/30 dark:to-zinc-900/60 dark:shadow-green-500/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-green-900 dark:text-green-100">{locale === 'ar' ? 'الهندسة' : 'Engineering'}</h4>
                      <p className="mt-3 text-base text-zinc-700 dark:text-zinc-300">{locale === 'ar' ? 'نبني الكود، ونؤسس النظام القوي.' : 'We build the code and establish robust system.'}</p>
                      <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✦</span>
                          {locale === 'ar' ? 'تطوير البنية التحتية' : 'Infrastructure development'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✦</span>
                          {locale === 'ar' ? 'الاختبارات الشاملة' : 'Comprehensive testing'}
                        </li>
                      </ul>
                    </div>
                    <div className="text-5xl opacity-10 dark:opacity-5">💻</div>
                  </div>
                </div>
              </div>

              {/* Step 4 - Launch */}
              <div data-animate className="relative flex items-start gap-6 journey-step group" data-step="4">
                <div className="absolute -left-16 mt-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold shadow-xl shadow-orange-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <div className="text-center">
                    <div className="text-2xl">🚀</div>
                    <div className="text-xs font-semibold">04</div>
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-8 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:-translate-y-1 dark:border-orange-900/50 dark:from-orange-950/30 dark:to-zinc-900/60 dark:shadow-orange-500/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-orange-900 dark:text-orange-100">{locale === 'ar' ? 'الإطلاق' : 'Launch'}</h4>
                      <p className="mt-3 text-base text-zinc-700 dark:text-zinc-300">{locale === 'ar' ? 'نطلق المنتج للعالم بثقة واحترافية.' : 'We launch the product to the world with confidence.'}</p>
                      <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <li className="flex items-center gap-2">
                          <span className="text-orange-500">✦</span>
                          {locale === 'ar' ? 'النشر والتوزيع' : 'Deployment & distribution'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-orange-500">✦</span>
                          {locale === 'ar' ? 'المراقبة المستمرة' : 'Continuous monitoring'}
                        </li>
                      </ul>
                    </div>
                    <div className="text-5xl opacity-10 dark:opacity-5">🎯</div>
                  </div>
                </div>
              </div>

              {/* Step 5 - Growth */}
              <div data-animate className="relative flex items-start gap-6 journey-step group" data-step="5">
                <div className="absolute -left-16 mt-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 text-white font-bold shadow-xl shadow-pink-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <div className="text-center">
                    <div className="text-2xl">📈</div>
                    <div className="text-xs font-semibold">05</div>
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-50 to-white p-8 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:-translate-y-1 dark:border-pink-900/50 dark:from-pink-950/30 dark:to-zinc-900/60 dark:shadow-pink-500/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-pink-900 dark:text-pink-100">{locale === 'ar' ? 'النمو' : 'Growth'}</h4>
                      <p className="mt-3 text-base text-zinc-700 dark:text-zinc-300">{locale === 'ar' ? 'نواصل التطوير والتحسين المستمر.' : 'We continue development and continuous improvement.'}</p>
                      <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <li className="flex items-center gap-2">
                          <span className="text-pink-500">✦</span>
                          {locale === 'ar' ? 'تحليل الأداء' : 'Performance analysis'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-pink-500">✦</span>
                          {locale === 'ar' ? 'التحديثات والتطوير' : 'Updates & evolution'}
                        </li>
                      </ul>
                    </div>
                    <div className="text-5xl opacity-10 dark:opacity-5">🌟</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-zinc-200/40 bg-transparent dark:bg-transparent px-6 py-16 dark:border-zinc-800/40"
      >
        <div className="mx-auto max-w-6xl">
          <div data-animate className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{content.contact.title}</h2>
            <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-300">{content.contact.subtitle}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div data-animate className="space-y-6">
              <div className="rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60">
                <h3 className="mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {locale === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
                </h3>
                
                {/* Email Addresses */}
                <div className="space-y-4">
                  <div className="group flex items-start gap-4 rounded-xl p-4 transition hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
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
                  </div>

                  <div className="group flex items-start gap-4 rounded-xl p-4 transition hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
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
                  </div>

                  <div className="group flex items-start gap-4 rounded-xl p-4 transition hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
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
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div data-animate className="rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60">
              <h3 className="mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {locale === 'ar' ? 'أرسل رسالة' : 'Send a Message'}
              </h3>
              <form className="space-y-5">
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

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {locale === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
