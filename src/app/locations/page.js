import fs from "fs";
import path from "path";
import matter from "gray-matter";
import LocationCard from "../../components/LocationCard";

function getLocations() {
  const directory = path.join(process.cwd(), "src/content/locations");
  if (!fs.existsSync(directory)) return [];

  const filenames = fs.readdirSync(directory);
  return filenames.map((filename) => {
    const filePath = path.join(directory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    return { data, content, slug: filename.replace(".md", "") };
  });
}

export default function LocationsPage() {
  const locations = getLocations();

  return (
    <main className="min-h-screen max-w-6xl mx-auto p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-serif text-sky-700 mb-2">
          Atlas of the Realm
        </h1>
        <p className="text-slate-600 text-lg">
          Cities, dungeons, and landmarks we have uncovered.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map((loc) => (
          <LocationCard key={loc.slug} data={loc.data} content={loc.content} />
        ))}
      </div>
    </main>
  );
}
