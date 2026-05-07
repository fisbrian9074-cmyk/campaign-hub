import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

function getSessions() {
  const directory = path.join(process.cwd(), "src/content/sessions");
  if (!fs.existsSync(directory)) return [];

  const filenames = fs.readdirSync(directory);
  const sessions = filenames.map((filename) => {
    const filePath = path.join(directory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    return { data, content, slug: filename.replace(".md", "") };
  });

  // Sort sessions by session_number descending (newest first)
  return sessions.sort((a, b) => b.data.session_number - a.data.session_number);
}

export default function SessionsPage() {
  const sessions = getSessions();

  return (
    <main className="min-h-screen max-w-4xl mx-auto p-8">
      <div className="mb-12 border-b border-slate-800 pb-6">
        <h1 className="text-4xl font-bold font-serif text-arcane-400 mb-2">
          Campaign Journal
        </h1>
        <p className="text-slate-400 text-lg">
          The official record of our party's triumphs and blunders.
        </p>
      </div>

      <div className="space-y-12">
        {sessions.map((session) => (
          <article
            key={session.slug}
            className="bg-astral-900 rounded-xl border-2 border-brass-600/30 overflow-hidden shadow-xl"
          >
            {/* Session Header */}
            <div className="bg-astral-950 p-6 border-b border-brass-600/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-arcane-400 font-bold uppercase tracking-wider text-sm mb-1 block">
                  Session {session.data.session_number}
                </span>
                <h2 className="text-2xl font-bold font-serif text-scholar-50">
                  {session.data.title}
                </h2>
              </div>
              <div className="text-scholar-300 text-sm font-medium">
                {new Date(session.data.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            {/* Session Body */}
            <div className="p-6">
              <p className="text-brass-500 font-medium italic mb-6 border-l-2 border-brass-600 pl-4">
                {session.data.summary}
              </p>
              <div className="text-scholar-50 prose prose-invert prose-p:leading-relaxed max-w-none">
                <ReactMarkdown>{session.content}</ReactMarkdown>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
