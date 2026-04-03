import { createClient } from "@/lib/supabase";
import { CircularRecord } from "@/types";
import Link from "next/link";

export const revalidate = 0;

async function getCirculars(): Promise<CircularRecord[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("circulars")
    .select("id, name, gender, job_title, joining_date, reporting_manager, office_location, email, languages, hobbies, paragraph, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Failed to fetch circulars:", error);
    return [];
  }
  return data as CircularRecord[];
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default async function HistoryPage() {
  const circulars = await getCirculars();

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="bg-white border-b shadow-sm px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">AeonX Digital — Circular History</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {circulars.length} circular{circulars.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors"
        >
          <span className="text-base leading-none">+</span> New Circular
        </Link>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        {circulars.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-400 text-sm">No circulars saved yet.</p>
            <Link href="/" className="mt-3 inline-block text-sm font-semibold text-orange-500 hover:underline">
              Generate your first circular →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {circulars.map((c) => (
              <div key={c.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-300 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{c.name}</p>
                      <p className="text-sm text-gray-500">{c.job_title}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400">{formatDateTime(c.created_at)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Joined {formatDate(c.joining_date)} · {c.office_location}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 bg-gray-50 flex flex-wrap gap-4 text-xs text-gray-600">
                  <span>
                    <span className="font-semibold text-gray-400 uppercase tracking-wide mr-1">Reports to</span>
                    {c.reporting_manager}
                  </span>
                  {c.languages && (
                    <span>
                      <span className="font-semibold text-gray-400 uppercase tracking-wide mr-1">Languages</span>
                      {c.languages}
                    </span>
                  )}
                  {c.hobbies && (
                    <span>
                      <span className="font-semibold text-gray-400 uppercase tracking-wide mr-1">Hobbies</span>
                      {c.hobbies}
                    </span>
                  )}
                  <span>
                    <span className="font-semibold text-gray-400 uppercase tracking-wide mr-1">Email</span>
                    <span className="text-orange-600">{c.email}</span>
                  </span>
                </div>

                <div className="px-5 py-3">
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{c.paragraph}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
