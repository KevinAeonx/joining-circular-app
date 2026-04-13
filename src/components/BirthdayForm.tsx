"use client";
import { useState, useEffect } from "react";
import { BirthdayFormData } from "@/types";
import { BirthdayTemplate } from "./BirthdayPreview";
import MultiSelect from "./MultiSelect";
import ImageCropModal from "./ImageCropModal";

interface Props {
  onChange: (data: BirthdayFormData) => void;
  onMessageGenerated: (message: string) => void;
  template: BirthdayTemplate;
  onTemplateChange: (t: BirthdayTemplate) => void;
}

const TEMPLATES = [
  { id: 1 as BirthdayTemplate, name: "Festive",    bg: "linear-gradient(135deg, #3DD6C5, #8BB8F0)",          icon: "🎈" },
  { id: 2 as BirthdayTemplate, name: "Elegant",    bg: "linear-gradient(135deg, #181818, #333)",             icon: "✨" },
  { id: 3 as BirthdayTemplate, name: "Warm Glow",  bg: "linear-gradient(135deg, #2C1654, #C44F00, #E8820A)", icon: "🌅" },
  { id: 4 as BirthdayTemplate, name: "Confetti",   bg: "linear-gradient(135deg, #FFF8F8, #F8F8FF)",          icon: "🎊" },
  { id: 5 as BirthdayTemplate, name: "Floral",     bg: "linear-gradient(135deg, #FCE4EC, #EDE7F6)",          icon: "🌸" },
  { id: 6 as BirthdayTemplate, name: "Ocean",      bg: "linear-gradient(135deg, #0D47A1, #2196F3)",          icon: "🌊" },
];

const defaultForm: BirthdayFormData = { name: "", role: "", profilePhoto: null };

export default function BirthdayForm({ onChange, onMessageGenerated, template, onTemplateChange }: Props) {
  const [form, setForm] = useState<BirthdayFormData>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [jobTitleOptions, setJobTitleOptions] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/options?category=job_title")
      .then(r => r.json())
      .then(d => setJobTitleOptions(d.options ?? []));
  }, []);

  const update = (field: keyof BirthdayFormData, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    onChange(updated);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { setCropSrc(reader.result as string); };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCropDone = (croppedDataUrl: string) => {
    const updated = { ...form, profilePhoto: croppedDataUrl };
    setForm(updated);
    onChange(updated);
    setCropSrc(null);
  };

  const handleCropCancel = () => { setCropSrc(null); };

  const handleGenerate = async () => {
    if (!form.name) { setError("Please enter the employee name."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/generate-birthday-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, role: form.role }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else onMessageGenerated(data.message);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <div className="space-y-4">
      {cropSrc && (
        <ImageCropModal
          imageSrc={cropSrc}
          onCrop={handleCropDone}
          onCancel={handleCropCancel}
          shape="rect"
        />
      )}
      {/* Template selector */}
      <div>
        <label className={labelClass}>Card Template</label>
        <div className="grid grid-cols-3 gap-2 mt-1" style={{ gridTemplateRows: "auto auto" }}>
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onTemplateChange(t.id)}
              className={`rounded-xl overflow-hidden border-2 transition-all ${
                template === t.id
                  ? "border-yellow-500 shadow-md scale-105"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <div
                style={{ background: t.bg, height: "52px" }}
                className="flex items-center justify-center text-2xl"
              >
                {t.icon}
              </div>
              <div
                className="text-xs font-semibold text-center py-1 bg-gray-50 text-gray-700"
              >
                {t.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className={labelClass}>Employee Name *</label>
          <input type="text" className={inputClass} placeholder="e.g. Aditri Mukherjee"
            value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>

        <div>
          <label className={labelClass}>Job Title / Designation</label>
          <MultiSelect
            options={jobTitleOptions}
            selected={form.role ? form.role.split(", ").filter(Boolean) : []}
            onChange={(vals) => update("role", vals.join(", "))}
            onAdd={async (val) => {
              await fetch("/api/options", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category: "job_title", value: val }) });
              setJobTitleOptions(prev => [...prev, val].sort());
            }}
            placeholder="Select job title..."
          />
        </div>

        <div>
          <label className={labelClass}>Profile Photo</label>
          <input type="file" accept="image/*"
            className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 cursor-pointer"
            onChange={handlePhotoUpload} />
          {form.profilePhoto && (
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-green-600">Photo uploaded</p>
              <button type="button" onClick={() => setCropSrc(form.profilePhoto!)}
                className="text-xs text-yellow-600 underline hover:text-yellow-800">Re-crop</button>
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>}

      <button onClick={handleGenerate} disabled={loading}
        className="w-full py-2.5 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-300 text-white font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Generating...
          </>
        ) : "Generate Message"}
      </button>
    </div>
  );
}
