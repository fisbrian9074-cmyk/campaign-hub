import ReactMarkdown from "react-markdown";

export default function LocationCard({ data, content }) {
  return (
    <div className="w-full max-w-sm rounded-xl border-2 border-brass-600/40 bg-astral-900 shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-arcane-600/20">
      {/* Header */}
      <div className="bg-astral-950 p-4 border-b border-brass-600/50 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold font-serif text-brass-500">
            {data.name}
          </h2>
          <p className="text-sm text-scholar-50 italic">{data.region}</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-astral-900/70 px-4 py-2 flex justify-between items-center border-b border-brass-600/30 text-xs font-medium uppercase tracking-wider text-scholar-50">
        <span className="text-arcane-400">{data.type}</span>

        {/* Danger Level Badge */}
        <span
          className={`px-2 py-1 rounded-sm text-[10px]
          ${data.danger_level === "Safe" ? "bg-arcane-500/15 text-arcane-200 border border-arcane-300/40" : ""}
          ${data.danger_level === "Moderate" ? "bg-brass-500/15 text-brass-400 border border-brass-500/30" : ""}
          ${data.danger_level === "Dangerous" ? "bg-orange-900/50 text-orange-400 border border-orange-800/50" : ""}
          ${data.danger_level === "Deadly" ? "bg-red-900/50 text-red-400 border border-red-800/50" : ""}
          ${data.danger_level === "Unknown" ? "bg-astral-900 text-scholar-50 border border-astral-700" : ""}
        `}
        >
          {data.danger_level}
        </span>
      </div>

      {/* Lore Body */}
      <div className="p-4 text-sm text-scholar-50 prose prose-invert prose-p:leading-relaxed">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
