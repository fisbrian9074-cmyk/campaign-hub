"use client";

import { useState } from "react";
import SessionCard from "./SessionCard";
import DetailModal from "./DetailModal";

export default function SessionsGrid({ sessions }) {
  const [selectedSession, setSelectedSession] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sessions.map((session) => (
          <SessionCard
            key={session.slug}
            data={session.data}
            content={session.content}
            onReadMore={() => setSelectedSession(session)}
          />
        ))}
      </div>

      <DetailModal
        open={Boolean(selectedSession)}
        onClose={() => setSelectedSession(null)}
        title={selectedSession?.data.title}
        subtitle={`Session ${selectedSession?.data.session_number}`}
        metadata={{
          date: selectedSession
            ? new Date(selectedSession.data.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "",
          summary: selectedSession?.data.summary,
        }}
        content={selectedSession?.content || ""}
      />
    </>
  );
}
