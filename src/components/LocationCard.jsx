import ReactMarkdown from "react-markdown";

export default function LocationCard({ data, content, onReadMore }) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-sky-200 flex flex-col h-96">
      {/* Header */}
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold font-serif text-amber-600">
            {data.name}
          </h2>
          <p className="text-sm text-slate-500 italic">{data.region}</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-slate-100 px-4 py-2 flex justify-between items-center border-b border-slate-200 text-xs font-medium uppercase tracking-wider text-slate-800">
        <span className="text-sky-600">{data.type}</span>

        {/* Danger Level Badge */}
        <span
          className={`px-2 py-1 rounded-sm text-[10px]
          ${data.danger_level === "Safe" ? "bg-sky-100 text-sky-700 border border-sky-200" : ""}
          ${data.danger_level === "Moderate" ? "bg-amber-100 text-amber-700 border border-amber-200" : ""}
          ${data.danger_level === "Dangerous" ? "bg-orange-100 text-orange-700 border border-orange-200" : ""}
          ${data.danger_level === "Deadly" ? "bg-red-100 text-red-700 border border-red-200" : ""}
          ${data.danger_level === "Unknown" ? "bg-slate-100 text-slate-700 border border-slate-200" : ""}
        `}
        >
          {data.danger_level}
        </span>
      </div>

      {/* Lore Body */}
      <div className="flex-1 p-4 text-sm text-slate-700 leading-relaxed max-h-32 overflow-hidden prose prose-slate prose-p:leading-relaxed prose-p:mb-2">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4 text-right">
        <button
          onClick={onReadMore}
          className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
        >
          Read More
        </button>
      </div>
    </div>
  );
}
