import ReactMarkdown from "react-markdown";

export default function SessionCard({ data, content, onReadMore }) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-sky-200 flex flex-col h-full">
      <div className="bg-slate-50 p-4 border-b border-slate-200">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sky-600 font-bold uppercase tracking-[0.25em] text-xs">
            Session {data.session_number}
          </span>
          <span className="text-slate-500 text-xs">
            {new Date(data.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <h2 className="text-xl font-bold font-serif text-slate-900">
          {data.title}
        </h2>
      </div>

      <div
        className="flex-1 overflow-hidden p-4 text-sm text-slate-800 prose prose-slate prose-p:leading-relaxed"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        <ReactMarkdown>{data.summary || content}</ReactMarkdown>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4 text-right">
        <button
          onClick={() => onReadMore()}
          className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
        >
          Read More
        </button>
      </div>
    </div>
  );
}
