"use client";
import { useState } from "react";
import AnniversaryForm from "@/components/AnniversaryForm";
import AnniversaryPreview from "@/components/AnniversaryPreview";
import DownloadButton from "@/components/DownloadButton";
import { AnniversaryFormData, AnniversaryTemplate } from "@/types";

const defaultForm: AnniversaryFormData = { name: "", years: 1, role: "", profilePhoto: null };

const DARK_TEMPLATES: AnniversaryTemplate[] = [1, 2, 4, 5, 6];

export default function AnniversaryPage() {
  const [formData, setFormData] = useState<AnniversaryFormData>(defaultForm);
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState<AnniversaryTemplate>(1);

  const downloadFileName = formData.name
    ? `${formData.name.toLowerCase().replace(/\s+/g, "-")}-anniversary-card.png`
    : "anniversary-card.png";

  const bgColor = DARK_TEMPLATES.includes(template) ? "#1a1a1a" : "#f8f0f4";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="flex gap-6 p-6 items-start max-w-screen-2xl mx-auto">

        {/* LEFT: Form panel */}
        <div className="w-80 flex-shrink-0 rounded-2xl shadow-sm border border-gray-100 overflow-hidden bg-white">
          <div className="bg-gradient-to-br from-amber-500 to-yellow-500 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <h2 className="text-white font-bold text-base leading-tight">Anniversary Card</h2>
                <p className="text-yellow-100 text-xs mt-0.5">Celebrate work milestones</p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <AnniversaryForm
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
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <span className="text-sm font-semibold text-gray-700">Live Preview</span>
              </div>
              <DownloadButton
                targetId="anniversary-preview"
                fileName={downloadFileName}
                backgroundColor={bgColor}
              />
            </div>
            <div className="p-4 overflow-x-auto">
              <AnniversaryPreview formData={formData} message={message} template={template} />
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
