"use client";
import { useState } from "react";
import BirthdayForm from "@/components/BirthdayForm";
import BirthdayPreview, { BirthdayTemplate } from "@/components/BirthdayPreview";
import DownloadButton from "@/components/DownloadButton";
import { BirthdayFormData } from "@/types";

const defaultForm: BirthdayFormData = { name: "", role: "", profilePhoto: null };

const TEMPLATE_BG: Record<BirthdayTemplate, string> = {
  1: "#C4D8FF",
  2: "#1a1a1a",
  3: "#2C1654",
  4: "#FFFEF8",
  5: "#FCE4EC",
  6: "#050520",
};

export default function BirthdayPage() {
  const [formData, setFormData] = useState<BirthdayFormData>(defaultForm);
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState<BirthdayTemplate>(1);

  const downloadFileName = formData.name
    ? `${formData.name.toLowerCase().replace(/\s+/g, "-")}-birthday-card.png`
    : "birthday-card.png";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="flex gap-6 p-6 items-start max-w-screen-2xl mx-auto">

        {/* LEFT: Form panel */}
        <div className="w-80 flex-shrink-0 rounded-2xl shadow-sm border border-gray-100 overflow-hidden bg-white">
          <div className="bg-gradient-to-br from-yellow-400 to-amber-500 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎂</span>
              <div>
                <h2 className="text-white font-bold text-base leading-tight">Birthday Card</h2>
                <p className="text-yellow-100 text-xs mt-0.5">AI-generated birthday messages</p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <BirthdayForm
              onChange={setFormData}
              onMessageGenerated={setMessage}
              template={template}
              onTemplateChange={setTemplate}
            />
          </div>
        </div>

        {/* RIGHT: Preview + actions */}
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <span className="text-sm font-semibold text-gray-700">Live Preview</span>
              </div>
              <DownloadButton
                targetId="birthday-preview"
                fileName={downloadFileName}
                backgroundColor={TEMPLATE_BG[template]}
              />
            </div>
            <div className="p-4 overflow-x-auto">
              <BirthdayPreview formData={formData} message={message} template={template} />
            </div>
          </div>

          {message && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h3 className="text-sm font-semibold text-gray-700">Edit Message</h3>
              </div>
              <textarea
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none bg-gray-50"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
