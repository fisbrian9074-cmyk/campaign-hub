import ReactMarkdown from "react-markdown";

export default function CharacterCard({ data, content }) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-sky-200">
      {/* Card Header */}
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold font-serif text-amber-600">
            {data.name}
          </h2>
          <p className="text-sm text-slate-500 italic">{data.subtitle}</p>
        </div>
        {/* Status Badge */}
        <span
          className={`px-2 py-1 text-xs font-bold rounded-sm uppercase tracking-wider
          ${data.status === "Alive" ? "bg-sky-100 text-sky-700 border border-sky-200" : ""}
          ${data.status === "Dead" ? "bg-red-100 text-red-700 border border-red-200" : ""}
          ${data.status === "Missing" ? "bg-amber-100 text-amber-700 border border-amber-200" : ""}
        `}
        >
          {data.status}
        </span>
      </div>

      {/* Card Type / Faction Bar */}
      <div className="bg-slate-50/80 px-4 py-2 flex justify-between text-xs text-slate-600 font-medium">
        <span>{data.type}</span>
        {data.faction && <span className="text-sky-600">{data.faction}</span>}
      </div>

      {/* Lore Body */}
      <div className="p-4 text-sm text-slate-700 prose prose-slate prose-p:leading-relaxed">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
