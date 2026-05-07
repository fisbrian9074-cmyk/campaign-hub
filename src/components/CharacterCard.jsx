import ReactMarkdown from "react-markdown";

export default function CharacterCard({ data, content }) {
  return (
    <div className="w-full max-w-sm rounded-xl border-2 border-brass-600 bg-astral-900 shadow-xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-arcane-600/20">
      {/* Card Header */}
      <div className="bg-astral-950 p-4 border-b border-brass-600/50 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold font-serif text-brass-500">
            {data.name}
          </h2>
          <p className="text-sm text-scholar-50 italic">{data.subtitle}</p>
        </div>
        {/* Status Badge */}
        <span
          className={`px-2 py-1 text-xs font-bold rounded-sm uppercase tracking-wider
          ${data.status === "Alive" ? "bg-arcane-500/15 text-arcane-200 border border-arcane-300/40" : ""}
          ${data.status === "Dead" ? "bg-red-900/50 text-red-400 border border-red-800/60" : ""}
          ${data.status === "Missing" ? "bg-brass-500/15 text-brass-400 border border-brass-500/30" : ""}
        `}
        >
          {data.status}
        </span>
      </div>

      {/* Card Type / Faction Bar */}
      <div className="bg-astral-900/60 px-4 py-2 flex justify-between text-xs text-scholar-50 font-medium">
        <span>{data.type}</span>
        {data.faction && (
          <span className="text-arcane-400">{data.faction}</span>
        )}
      </div>

      {/* Lore Body */}
      <div className="p-4 text-sm text-scholar-50 prose prose-invert prose-p:leading-relaxed">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
