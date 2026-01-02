"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useLocale } from "@/shared/providers/locale-context";
import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { getProjectById } = require("@/lib/projects");
  const { id } = React.use(params);
  const project = getProjectById(id);
  const { locale } = useLocale();

  if (!project) return notFound();

  // Only show Arabic for ERP System if locale is ar
  const isERP = project.id === 'erp-system';
  const isArabic = locale === 'ar';



  if (isERP && isArabic) {
    const steps = [
      { title: "الاكتشاف", desc: "نفهم الرؤية، ونرسم المخطط." },
      { title: "التصميم", desc: "نصيغ المنطق، ونبدع الشكل." },
      { title: "الهندسة", desc: "نبني الكود، ونؤسس النظام." },
      { title: "الضمان", desc: "نختبر الأمان، ونتأكد من الجودة." },
      { title: "الانطلاق", desc: "نطلق المشروع، ونبدأ النمو." },
    ];
    const stepsRefs = useRef([]);
    const [activeStep, setActiveStep] = useState(-1);

    useLayoutEffect(() => {
      const items = gsap.utils.toArray('.journey-step');
      items.forEach((el, idx) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 80 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay: idx * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              onEnter: () => { setActiveStep(idx); console.log('Active step:', idx); },
              onEnterBack: () => { setActiveStep(idx); console.log('Active step:', idx); },
              onLeave: () => setActiveStep(-1),
              onLeaveBack: () => setActiveStep(-1),
              toggleActions: "play none none none",
            },
          }
        );
      });
      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }, []);

    useLayoutEffect(() => {
      stepsRefs.current.forEach((el, idx) => {
        if (el) {
          if (activeStep === idx) {
            gsap.to(el, { scale: 1.15, boxShadow: '0 0 0 8px #34d399cc, 0 12px 48px #34d39955', opacity: 1, duration: 0.5, zIndex: 20 });
          } else {
            gsap.to(el, { scale: 0.92, boxShadow: 'none', opacity: 0.3, duration: 0.5, zIndex: 1 });
          }
        }
      });
    }, [activeStep]);

    return (
      <div className="min-h-screen bg-black">
        {/* Header Section with Image and Info side by side */}
        <div className="w-full flex flex-col md:flex-row items-stretch justify-between gap-0 md:gap-8 pt-8 pb-12 px-2 md:px-12" style={{minHeight: 420}}>
          {/* Image on the left */}
          <div className="flex-1 flex items-center justify-center">
            <div className="rounded-3xl shadow-2xl border-2 border-white p-2 flex items-center justify-center w-full max-w-[420px] h-[340px] md:h-[420px] bg-transparent">
              <img
                src={project.image}
                alt={project.title_ar}
                className="object-contain w-full h-full rounded-2xl"
                style={{background:'#fff'}}
              />
            </div>
          </div>
          {/* Info on the right */}
          <div className="flex-1 flex flex-col justify-center items-end pr-0 md:pr-8 mt-8 md:mt-0">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 text-right">{project.title_ar}</h1>
            <div className="text-lg text-white mb-2 text-right font-bold">{project.client_ar}</div>
            <div className="flex flex-wrap gap-2 mb-4 justify-end">
              {project.tags?.map((tag) => (
                <span key={tag} className="bg-white/10 text-white rounded-full px-4 py-1 text-xs font-bold border border-white/30">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Project Info Icons */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-4">
          <div className="flex flex-col items-end">
            <span className="text-white text-lg font-bold">العميل</span>
            <span className="text-white text-xl font-bold">{project.client_ar}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-white text-lg font-bold">عدد المستخدمين</span>
            <span className="text-white text-xl font-bold">20,000+</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-white text-lg font-bold">عدد الفروع</span>
            <span className="text-white text-xl font-bold">15</span>
          </div>
        </div>

        {/* Key Notes Section */}
        <div className="max-w-5xl mx-auto py-6 px-4">
          <h2 className="text-2xl font-bold text-white text-right mb-6">أهم الملاحظات</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-right">
              <span className="block text-white text-lg font-bold mb-2">تجربة مستخدم متكاملة</span>
              <span className="text-white text-base">واجهة سهلة، إشعارات فورية، وتكامل كامل بين جميع الوحدات.</span>
            </div>
            <div className="text-right">
              <span className="block text-white text-lg font-bold mb-2">أنظمة قابلة للتوسع وآمنة</span>
              <span className="text-white text-base">بنية سحابية، ذكاء اصطناعي، وتكامل مع أجهزة إنترنت الأشياء.</span>
            </div>
            <div className="text-right">
              <span className="block text-white text-lg font-bold mb-2">إدارة مالية ومحاسبية متقدمة</span>
              <span className="text-white text-base">تقارير مالية، محاسبة، ميزانيات، وربط تلقائي مع الإدارات.</span>
            </div>
            <div className="text-right">
              <span className="block text-white text-lg font-bold mb-2">إدارة شاملة للطلاب والموظفين</span>
              <span className="text-white text-base">نتائج، درجات، حضور وغياب ذكي، وجدولة محاضرات.</span>
            </div>
          </div>
        </div>

        {/* Challenge Section */}
        <div className="max-w-5xl mx-auto py-6 px-4">
          <h2 className="text-2xl font-bold text-white text-right mb-4">التحدي</h2>
          <div className="text-right text-white text-lg">
            الحاجة إلى منصة رقمية متكاملة تدير جميع العمليات التعليمية والإدارية والمالية، وتدعم النمو والتوسع، وتوفر تجربة سلسة وآمنة لجميع المستخدمين.
          </div>
        </div>

        {/* Key Success Point Section */}
        <div className="max-w-5xl mx-auto py-6 px-4">
          <h2 className="text-2xl font-bold text-white text-right mb-4">نقطة النجاح الرئيسية</h2>
          <div className="text-right text-white text-lg">
            {project.successDesc_ar}
          </div>
        </div>

        {/* Solutions Section */}
        <div className="max-w-5xl mx-auto py-6 px-4">
          <h2 className="text-2xl font-bold text-white text-right mb-4">الحلول</h2>
          <div className="text-right text-white text-lg leading-loose">
            <ul className="list-disc pr-6 space-y-2">
              <li>تطبيقات موبايل حديثة للطلاب والمحاضرين لإدارة كل العمليات بسهولة.</li>
              <li>بوابة ويب متكاملة للإدارة، التقارير، وجدولة المحاضرات.</li>
              <li>تكامل مع الأنظمة المالية والمحاسبية، وأتمتة العمليات الإدارية.</li>
              <li>ذكاء اصطناعي لتحليل البيانات وتقديم توصيات ذكية.</li>
              <li>دعم كامل للتكامل مع أجهزة إنترنت الأشياء.</li>
              <li>أمان عالي ومرونة في إدارة الصلاحيات.</li>
              <li>بنية سحابية قابلة للتوسع والتحديث المستمر.</li>
            </ul>
          </div>
        </div>

        {/* مراحل العمل (رحلة العمل) */}
        <div className="max-w-5xl mx-auto py-10 px-4 relative">
          {/* Vertical Timeline */}
          <div className="hidden md:block absolute right-1/2 top-16 bottom-8 w-1 bg-gradient-to-b from-emerald-400/80 via-emerald-400/30 to-transparent z-0" style={{transform: 'translateX(50%)'}} />
          <h2 className="text-2xl font-bold text-white text-right mb-2">رحلة العمل</h2>
          <div className="text-right text-zinc-300 mb-4">الفلسفة: البساطة في التسمية، العمق في التنفيذ.</div>
          <h3 className="text-xl font-semibold text-emerald-400 text-right mb-8">من الفكرة.. إلى القمة.</h3>
          <div className="flex flex-col gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                ref={el => stepsRefs.current[idx] = el}
                className={
                  `journey-step bg-white/5 rounded-2xl p-6 text-right border border-white/10 shadow-lg backdrop-blur-sm transition-all duration-500 relative`
                }
                style={{}}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-0 top-8 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-emerald-400 bg-black z-20 shadow-lg" style={{boxShadow: activeStep === idx ? '0 0 0 10px #34d39988' : 'none'}} />
                <div className="flex items-center justify-end gap-4 mb-2">
                  <span className="text-2xl font-bold text-emerald-400">{idx + 1}</span>
                  <span className="text-xl font-bold text-white">{step.title}</span>
                </div>
                <div className="text-zinc-200 text-lg">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="max-w-5xl mx-auto py-6 px-4">
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2 justify-end">
              <span className="text-yellow-400 text-xl">★★★★★</span>
              <span className="text-white font-bold">شهادة عميل</span>
            </div>
            <div className="text-white text-lg">
              "النظام ساعدنا في التحول الرقمي الكامل، وسهّل إدارة جميع العمليات، ورفع كفاءة العمل بشكل ملحوظ. التكامل مع الأنظمة الأخرى كان سلساً، والدعم الفني ممتاز."
            </div>
            <div className="text-white text-sm mt-2">مدير تقنية المعلومات - أحد العملاء</div>
          </div>
        </div>

        {/* Images Section */}
        <div className="max-w-5xl mx-auto py-6 px-4">
          {project.images && project.images.length > 0 ? (
            <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
              {project.images.map((img, idx) => (
                <div key={idx} className="w-full flex items-center justify-center aspect-[4/3] max-h-[420px] rounded-3xl overflow-hidden bg-white/80 shadow-lg">
                  <img 
                    src={img} 
                    alt={project.title_ar + ' ' + (idx + 1)} 
                    className="max-w-full max-h-full object-contain mx-auto my-auto block" 
                    style={{ background: '#fff' }}
                  />
                </div>
              ))}
            </div>
          ) : project.image ? (
            <div className="w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden bg-white/80 shadow-lg flex items-center justify-center">
              <img src={project.image} alt={project.title_ar} className="w-full h-full object-contain" />
            </div>
          ) : null}
        </div>

        {/* Back Button */}
        <div className="max-w-5xl mx-auto py-10 flex justify-end test-white ">
          <Link
            href="/portfolio"
            className="rounded-full border-2 border-emerald-500 px-8 py-3 text-white font-bold text-lg bg-transparent hover:bg-emerald-500/10 transition-all duration-200 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400/60 active:scale-95"
            style={{letterSpacing: '.5px'}}
          >
            العودة إلى المشاريع
          </Link>
        </div>
      </div>
    );
  }

  // Default fallback for other projects/locales
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h1 className="text-4xl font-extrabold">{locale === 'ar' ? project.title : project.title}</h1>
          <div className="mt-2 text-sm text-zinc-600">{locale === 'ar' ? project.client : project.client}</div>

          <div className="mt-6 rounded-2xl bg-zinc-900/80 p-6 text-white">
            <h3 className="text-xl font-semibold">{project.successTitle || 'Key Success Point:'}</h3>
            <p className="mt-3 text-sm text-zinc-200">{project.successDesc || project.metric}</p>
          </div>

          {locale === 'ar' ? (
            <div className="mt-10 flex justify-center">
              <div className="w-full md:w-4/5 lg:w-3/5 text-right text-xl leading-loose text-white bg-zinc-900/90 rounded-3xl p-10 shadow-2xl border-0" style={{fontWeight: 500, letterSpacing: '0.01em'}}>
                {project.desc_ar}
              </div>
            </div>
          ) : (
            <div className="mt-10 flex justify-center">
              <div className="w-full md:w-4/5 lg:w-3/5 text-left text-base leading-relaxed text-zinc-800 bg-white/80 rounded-3xl p-10 shadow-2xl border-0">
                {project.desc}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Link href="/portfolio" className="rounded-full border px-4 py-2">{locale === 'ar' ? 'العودة' : 'Back to portfolio'}</Link>
          </div>
        </div>

        <div className="w-full flex flex-col items-center">
          {project.images && project.images.length > 0 ? (
            <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
              {project.images.map((img, idx) => (
                <div key={idx} className="w-full flex items-center justify-center aspect-[4/3] max-h-[420px] rounded-3xl overflow-hidden bg-white/80 shadow-lg">
                  <img 
                    src={img} 
                    alt={project.title + ' ' + (idx + 1)} 
                    className="max-w-full max-h-full object-contain mx-auto my-auto block" 
                    style={{ background: '#fff' }}
                  />
                </div>
              ))}
            </div>
          ) : project.image ? (
            <div className="w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden bg-white/80 shadow-lg flex items-center justify-center">
              <img src={project.image} alt={project.title} className="w-full h-full object-contain" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
