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

function getCharacters() {
  const directory = path.join(process.cwd(), "src/content/characters");
  if (!fs.existsSync(directory)) return [];

  const filenames = fs.readdirSync(directory);
  return filenames.map((filename) => {
    const filePath = path.join(directory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    return { data, slug: filename.replace(".md", "") };
  });
}

export default function HomePage() {
  const slides = getCarouselSlides();
  const recentSessions = getSessions().slice(0, 3);
  const playerCharacters = getCharacters().filter(
    (character) =>
      character.data.status?.toLowerCase() === "alive" &&
      character.data.type?.toLowerCase().includes("player"),
  );

  return (
    <main className="min-h-screen max-w-7xl mx-auto p-6 lg:p-8 space-y-12">
      <section className="space-y-6">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-400 font-semibold mb-3">
            Campaign Codex
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            This is our story | This is Faerûn
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl">
            Thank you zay for creating this wonderful fantasy word for us. It
            has been so much fun each week getting together and playing D&D.
            Also, thanks for letting me nerd out making this site.
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
              Below you will find the latest copy of my notes from the session.
              Feel free to send me yours and I will add them to the page for all
              to reference
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
                <div className="mt-4">
                  <Link
                    href="/sessions"
                    className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white text-slate-900 p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-600 font-semibold mb-2">
                Player Roster
              </p>
              <h2 className="text-2xl font-bold font-serif">
                Player Characters
              </h2>
            </div>
            <Link
              href="/characters"
              className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition"
            >
              See all
            </Link>
          </div>
          <div className="space-y-4">
            {playerCharacters.length > 0 ? (
              playerCharacters.map((character) => (
                <div
                  key={character.slug}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      {character.data.status}
                    </p>
                    <span className="rounded-full bg-sky-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                      {character.data.type}
                    </span>
                  </div>
                  <p className="text-base font-semibold text-slate-900 mb-1">
                    {character.data.name}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {character.data.subtitle}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-500">
                No active player characters available yet.
              </div>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
