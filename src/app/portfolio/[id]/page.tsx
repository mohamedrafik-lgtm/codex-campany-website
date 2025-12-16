import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects";
import { useLocale } from "@/shared/providers/locale-context";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);
  const { locale } = useLocale();

  if (!project) return notFound();

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

          <div className="mt-6">
            <h4 className="text-lg font-semibold">Overview</h4>
            <p className="mt-2 text-sm text-zinc-600">{project.desc}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <Link href="/portfolio" className="rounded-full border px-4 py-2">{locale === 'ar' ? 'العودة' : 'Back to portfolio'}</Link>
          </div>
        </div>

        <div className="w-full">
          {project.image ? (
            <div className="w-full h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden bg-zinc-100">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
