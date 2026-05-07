import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SessionsGrid from "../../components/SessionsGrid";

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
    <main className="min-h-screen max-w-6xl mx-auto p-8">
      <div className="mb-12 border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-bold font-serif text-sky-700 mb-2">
          Campaign Journal
        </h1>
        <p className="text-slate-600 text-lg">
          The official record of our party&apos;s triumphs and blunders.
        </p>
      </div>

      <SessionsGrid sessions={sessions} />
    </main>
  );
}
