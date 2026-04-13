"use client";
import { useState } from "react";
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
    const formDataToSave = {
      name: formData.name,
      gender: formData.gender,
      jobTitle: formData.jobTitle,
      joiningDate: formData.joiningDate,
      reportingManager: formData.reportingManager,
      languages: formData.languages,
      hobbies: formData.hobbies,
      email: formData.email,
      officeLocation: formData.officeLocation,
    };

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
    <main className="min-h-screen bg-slate-50">
      <div className="flex gap-6 p-6 items-start max-w-screen-2xl mx-auto">

        {/* LEFT: Form panel */}
        <div className="w-80 flex-shrink-0 rounded-2xl shadow-sm border border-gray-100 overflow-hidden bg-white">
          {/* Panel hero header */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <div>
                <h2 className="text-white font-bold text-base leading-tight">Joining Circular</h2>
                <p className="text-orange-100 text-xs mt-0.5">AI-powered welcome paragraph</p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <JoiningForm onChange={setFormData} onParagraphGenerated={setParagraph} />
          </div>
        </div>

        {/* RIGHT: Preview + actions */}
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Preview action bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                <span className="text-sm font-semibold text-gray-700">Live Preview</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Save button */}
                <button
                  onClick={handleSave}
                  disabled={!canSave || saveState === "saving" || saveState === "saved"}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    saveState === "saved"
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
            <div className="p-4 overflow-x-auto">
              <CircularPreview formData={formData} paragraph={paragraph} />
            </div>
          </div>

          {paragraph && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h3 className="text-sm font-semibold text-gray-700">Edit Paragraph</h3>
              </div>
              <textarea
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none bg-gray-50"
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
