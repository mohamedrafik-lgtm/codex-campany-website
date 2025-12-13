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
                className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
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
              {content.nav.about}
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300">
              {locale === "ar"
                ? "فريق هندسي وتصميمي يعمل بجلسات تواصل قصيرة، تسليمات أسبوعية، وشفافية كاملة في التكاليف والخطط."
                : "An engineering and design team working in short touchpoints, weekly increments, and full transparency on scope and cost."}
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
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.items.map((item) => (
              <div
                data-animate
                key={item.title}
                className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/40"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">{item.desc}</p>
                </div>
                <span className="mt-4 text-xs font-semibold text-blue-600 dark:text-blue-300">
                  {locale === "ar" ? "تسليم كل أسبوع" : "Weekly drops"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="mx-auto max-w-6xl px-6 py-16 bg-transparent dark:bg-transparent">
        <div data-animate className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {content.works.title}
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">{content.works.intro}</p>
          </div>
          <Link
            href="#contact"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
          >
            {locale === "ar" ? "اطلب عرضاً مفصلاً" : "Request a case deck"}
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {["B2B dashboard", "Mobile commerce", "Fintech onboarding"].map((item) => (
            <div
              data-animate
              key={item}
              className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-6 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-300"
            >
              {item}
            </div>
          ))}
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
        <div data-animate className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {content.journey.title}
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              {locale === "ar"
                ? "خريطة طريق واضحة منذ الاكتشاف وحتى التحسين بعد الإطلاق."
                : "A clear roadmap from discovery through post-launch improvements."}
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.journey.steps.map((step, idx) => (
            <div
              data-animate
              key={step.title}
              className="rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
                <span>{locale === "ar" ? "خطوة" : "Step"}</span>
                <span className="font-semibold">{idx + 1}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{step.desc}</p>
            </div>
          ))}
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
