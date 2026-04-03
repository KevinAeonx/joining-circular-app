"use client";
import { useState } from "react";
import Link from "next/link";
import JoiningForm from "@/components/JoiningForm";
import CircularPreview from "@/components/CircularPreview";
import DownloadButton from "@/components/DownloadButton";
import { FormData } from "@/types";

const defaultForm: FormData = {
  name: "",
  gender: "she",
  jobTitle: "",
  joiningDate: "",
  reportingManager: "",
  languages: "",
  hobbies: "",
  email: "",
  officeLocation: "",
  profilePhoto: null,
};

type SaveState = "idle" | "saving" | "saved" | "error";

export default function HomePage() {
  const [formData, setFormData] = useState<FormData>(defaultForm);
  const [paragraph, setParagraph] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const downloadFileName = formData.name
    ? `${formData.name.toLowerCase().replace(/\s+/g, "-")}-joining-circular.png`
    : "joining-circular.png";

  const canSave = !!paragraph && !!formData.name;

  const handleSave = async () => {
    if (!canSave) return;
    setSaveState("saving");

    // Strip profilePhoto — too large for DB
    const { profilePhoto: _photo, ...formDataToSave } = formData;

    try {
      const res = await fetch("/api/save-circular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: formDataToSave, paragraph }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 3000);
    } catch {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            AeonX Digital — Joining Circular Generator
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Fill in the employee details, generate the welcome paragraph with AI, then download.
          </p>
        </div>
        <Link
          href="/history"
          className="text-sm font-semibold text-orange-600 hover:text-orange-700 border border-orange-200 hover:border-orange-400 px-4 py-2 rounded-lg transition-colors"
        >
          View History
        </Link>
      </div>

      <div className="flex gap-6 p-6 items-start">
        {/* Left: Form panel */}
        <div className="w-80 flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <JoiningForm onChange={setFormData} onParagraphGenerated={setParagraph} />
        </div>

        {/* Right: Preview + Actions */}
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-600">Preview</h2>
              <div className="flex items-center gap-2">
                {/* Save button */}
                <button
                  onClick={handleSave}
                  disabled={!canSave || saveState === "saving" || saveState === "saved"}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors
                    ${saveState === "saved"
                      ? "bg-green-500 text-white"
                      : saveState === "error"
                      ? "bg-red-500 text-white"
                      : !canSave
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    }`}
                >
                  {saveState === "saving" && (
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  )}
                  {saveState === "saved" && (
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {saveState === "idle" && (
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  )}
                  {saveState === "saving" ? "Saving..." : saveState === "saved" ? "Saved!" : saveState === "error" ? "Failed" : "Save"}
                </button>

                <DownloadButton targetId="circular-preview" fileName={downloadFileName} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <CircularPreview formData={formData} paragraph={paragraph} />
            </div>
          </div>

          {/* Editable paragraph */}
          {paragraph && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">
                Edit Paragraph (changes update the preview)
              </h2>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                rows={5}
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
