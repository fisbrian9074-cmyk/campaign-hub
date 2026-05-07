"use client";

import { useState } from "react";
import LocationCard from "./LocationCard";
import DetailModal from "./DetailModal";

export default function LocationsGrid({ locations }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map((loc) => (
          <LocationCard
            key={loc.slug}
            data={loc.data}
            content={loc.content}
            onReadMore={() => setSelectedLocation(loc)}
          />
        ))}
      </div>

      <DetailModal
        open={Boolean(selectedLocation)}
        onClose={() => setSelectedLocation(null)}
        title={selectedLocation?.data.name}
        subtitle={selectedLocation?.data.region}
        metadata={{
          type: selectedLocation?.data.type,
          danger_level: selectedLocation?.data.danger_level,
        }}
        content={selectedLocation?.content || ""}
      />
    </>
  );
}
