import ReactMarkdown from "react-markdown";
import { X } from "lucide-react";

export default function DetailModal({
  open,
  onClose,
  title,
  subtitle,
  metadata,
  content,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4">
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-slate-600">
                {subtitle}
              </p>
            )}
            {metadata?.status && (
              <span
                className={`mt-2 inline-block px-2 py-1 text-xs font-bold rounded-sm uppercase tracking-wider
                ${metadata.status === "Alive" ? "bg-sky-100 text-sky-700 border border-sky-200" : ""}
                ${metadata.status === "Dead" ? "bg-red-100 text-red-700 border border-red-200" : ""}
                ${metadata.status === "Missing" ? "bg-amber-100 text-amber-700 border border-amber-200" : ""}
              `}
              >
                {metadata.status}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100"
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        {metadata && Object.keys(metadata).length > 0 && (
          <div className="grid gap-3 border-b border-slate-200 px-6 py-5 text-sm sm:grid-cols-2">
            {Object.entries(metadata).map(([key, value]) => (
              <div
                key={key}
                className="rounded-2xl bg-slate-50 p-3"
              >
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500 mb-1">
                  {key.replace(/_/g, " ")}
                </p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="max-h-[60vh] overflow-y-auto px-6 py-5 text-sm leading-7 text-slate-700 prose prose-slate">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
