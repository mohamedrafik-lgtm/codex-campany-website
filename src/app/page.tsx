"use client";

import Link from "next/link";
import { useLocale } from "@/shared/providers/locale-context";
import { useScrollAnimation } from "@/shared/hooks/useScrollAnimation";

export default function Home() {
  const { content, locale } = useLocale();
  useScrollAnimation();

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
          <div className="lg:col-span-1" data-animate>
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
          </div>

          <div className="lg:col-span-2 relative">
            <div className="absolute left-6 top-6 bottom-6 w-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            <div id="journey-progress" className="absolute left-6 top-6 w-1 bg-blue-500 rounded-full origin-top transition-all duration-300" style={{ height: '0%' }} />

            <div className="space-y-12 pl-16">
              {/* Step 1 */}
              <div data-animate className="relative flex items-start gap-6 journey-step">
                <div className="absolute -left-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-lg">1</div>
                <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{locale === 'ar' ? 'الاكتشاف' : 'Discovery'}</h4>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{locale === 'ar' ? 'نفهم الرؤية، ونرسم المخطط.' : 'We understand the vision and map the plan.'}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div data-animate className="relative flex items-start gap-6 journey-step">
                <div className="absolute -left-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold shadow-lg">2</div>
                <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{locale === 'ar' ? 'التصميم' : 'Design'}</h4>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{locale === 'ar' ? 'نصيغ المنطق، ونبدع الشكل.' : 'We craft the logic and design the experience.'}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div data-animate className="relative flex items-start gap-6 journey-step">
                <div className="absolute -left-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-bold shadow-lg">3</div>
                <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{locale === 'ar' ? 'الهندسة' : 'Engineering'}</h4>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{locale === 'ar' ? 'نبني الكود، ونؤسس النظام.' : 'We build the code and establish the system.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-zinc-200/40 bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-16 text-white dark:border-zinc-800/40"
      >
        <div className="mx-auto max-w-6xl">
          <div data-animate className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">{content.contact.title}</h2>
              <p className="text-sm text-blue-100">{content.contact.subtitle}</p>
            </div>
            <Link
              href="mailto:hello@codex.studio"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {content.contact.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
