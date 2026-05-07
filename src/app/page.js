import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import HeroCarousel from "../components/HeroCarousel";

function getCarouselSlides() {
  const directory = path.join(process.cwd(), "src/content/carousel");
  if (!fs.existsSync(directory)) return [];

  const filenames = fs.readdirSync(directory);
  const slides = filenames.map((filename) => {
    const filePath = path.join(directory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    return { ...data, slug: filename.replace(".md", "") };
  });

  return slides.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getSessions() {
  const directory = path.join(process.cwd(), "src/content/sessions");
  if (!fs.existsSync(directory)) return [];

  const filenames = fs.readdirSync(directory);
  const sessions = filenames.map((filename) => {
    const filePath = path.join(directory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    return { data, slug: filename.replace(".md", "") };
  });

  return sessions.sort((a, b) => b.data.session_number - a.data.session_number);
}

export default function HomePage() {
  const slides = getCarouselSlides();
  const recentSessions = getSessions().slice(0, 3);

  return (
    <main className="min-h-screen max-w-7xl mx-auto p-6 lg:p-8 space-y-12">
      <section className="space-y-6">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-400 font-semibold mb-3">
            Campaign Codex
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            The story of your party begins here.
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl">
            Explore your world, revisit the latest sessions, and watch the
            campaign unfold with a rotating story carousel and a quick overview
            of the newest journal entries.
          </p>
        </div>

        <HeroCarousel slides={slides} />
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr] items-start">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3">
              Recent Campaign Highlights
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Catch up with the latest sessions from the journal. Each tile
              shows the newest scenes, dates, and summaries so your campaign
              feels alive from the first page.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {recentSessions.map((session) => (
              <article
                key={session.slug}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="inline-flex rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                    Session {session.data.session_number}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {new Date(session.data.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {session.data.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed min-h-[4.5rem]">
                  {session.data.summary}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-slate-950 text-slate-100 p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300 font-semibold mb-2">
                Journal Feed
              </p>
              <h2 className="text-2xl font-bold font-serif">Latest Sessions</h2>
            </div>
            <Link
              href="/sessions"
              className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400 transition"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <div
                key={session.slug}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-4"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 mb-2">
                  Session {session.data.session_number}
                </p>
                <p className="text-base font-semibold text-white mb-2">
                  {session.data.title}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {session.data.summary}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
