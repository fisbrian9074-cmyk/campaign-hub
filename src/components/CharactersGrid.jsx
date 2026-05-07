"use client";

import { useState } from "react";
import CharacterCard from "./CharacterCard";
import DetailModal from "./DetailModal";

export default function CharactersGrid({ characters }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Sort characters: Player Characters first (alive, then dead, then others), then NPCs
  const sortedCharacters = characters.sort((a, b) => {
    const typeA = a.data.type?.toLowerCase() || '';
    const typeB = b.data.type?.toLowerCase() || '';
    const statusA = a.data.status?.toLowerCase() || '';
    const statusB = b.data.status?.toLowerCase() || '';

    // Player Characters before NPCs
    if (typeA.includes('player') && !typeB.includes('player')) return -1;
    if (!typeA.includes('player') && typeB.includes('player')) return 1;

    // Within same type, sort by status: alive first, then dead, then others
    if (typeA.includes('player') && typeB.includes('player')) {
      if (statusA === 'alive' && statusB !== 'alive') return -1;
      if (statusA !== 'alive' && statusB === 'alive') return 1;
      if (statusA === 'dead' && statusB !== 'dead') return -1;
      if (statusA !== 'dead' && statusB === 'dead') return 1;
    }

    return 0; // Keep original order for same status
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedCharacters.map((char) => (
          <CharacterCard
            key={char.slug}
            data={char.data}
            content={char.content}
            onReadMore={() => setSelectedCharacter(char)}
          />
        ))}
      </div>

      <DetailModal
        open={Boolean(selectedCharacter)}
        onClose={() => setSelectedCharacter(null)}
        title={selectedCharacter?.data.name}
        subtitle={selectedCharacter?.data.subtitle}
        metadata={{
          type: selectedCharacter?.data.type,
          status: selectedCharacter?.data.status,
          faction: selectedCharacter?.data.faction,
        }}
        content={selectedCharacter?.content || ""}
      />
    </>
  );
}
