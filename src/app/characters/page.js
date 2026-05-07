import fs from "fs";
import path from "path";
import matter from "gray-matter";
import CharacterCard from "../../components/CharacterCard";

// This function reads the markdown files from your computer
function getCharacters() {
  const directory = path.join(process.cwd(), "src/content/characters");

  // If the folder doesn't exist yet, return an empty array
  if (!fs.existsSync(directory)) return [];

  const filenames = fs.readdirSync(directory);

  return filenames.map((filename) => {
    const filePath = path.join(directory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");

    // gray-matter separates the top data from the bottom markdown text
    const { data, content } = matter(fileContent);
    return { data, content, slug: filename.replace(".md", "") };
  });
}

export default function CharactersPage() {
  const characters = getCharacters();

  return (
    <main className="min-h-screen max-w-6xl mx-auto p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-serif text-arcane-400 mb-2">
          Dramatis Personae
        </h1>
        <p className="text-astral-900 dark:text-scholar-50 text-lg">
          The allies, enemies, and bystanders of our campaign.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {characters.map((char) => (
          <CharacterCard
            key={char.slug}
            data={char.data}
            content={char.content}
          />
        ))}
      </div>
    </main>
  );
}
