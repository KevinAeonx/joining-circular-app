"use client";
import { useState, useCallback, useEffect } from "react";
import { FormData } from "@/types";
import MultiSelect from "./MultiSelect";

interface Props {
  onChange: (data: FormData) => void;
  onParagraphGenerated: (paragraph: string) => void;
}

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

type OptionsMap = {
  job_title: string[];
  reporting_manager: string[];
  office_location: string[];
  language: string[];
  hobby: string[];
};

async function fetchOptions(category: string): Promise<string[]> {
  const res = await fetch(`/api/options?category=${category}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.options ?? [];
}

async function saveOption(category: string, value: string) {
  await fetch("/api/options", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category, value }),
  });
}

export default function JoiningForm({ onChange, onParagraphGenerated }: Props) {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState<OptionsMap>({
    job_title: [],
    reporting_manager: [],
    office_location: [],
    language: [],
    hobby: [],
  });

  // Fetch all dropdown options on mount
  useEffect(() => {
    Promise.all([
      fetchOptions("job_title"),
      fetchOptions("reporting_manager"),
      fetchOptions("office_location"),
      fetchOptions("language"),
      fetchOptions("hobby"),
    ]).then(([job_title, reporting_manager, office_location, language, hobby]) => {
      setOptions({ job_title, reporting_manager, office_location, language, hobby });
    });
  }, []);

  const update = useCallback(
    (field: keyof FormData, value: string) => {
      const updated = { ...form, [field]: value };
      setForm(updated);
      onChange(updated);
    },
    [form, onChange]
  );

  const updateMulti = useCallback(
    (field: keyof FormData, values: string[]) => {
      update(field, values.join(", "));
    },
    [update]
  );

  // Called when user adds a custom option in a dropdown
  const handleAddOption = useCallback(
    async (category: keyof OptionsMap, value: string) => {
      await saveOption(category, value);
      setOptions((prev) => ({
        ...prev,
        [category]: [...prev[category], value].sort(),
      }));
    },
    []
  );

  const toArray = (val: string) => (val ? val.split(", ").filter(Boolean) : []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updated = { ...form, profilePhoto: reader.result as string };
      setForm(updated);
      onChange(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!form.name || !form.jobTitle) {
      setError("Please fill in at least Name and Job Title.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/generate-paragraph", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: form }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        onParagraphGenerated(data.paragraph);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Employee Details</h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className={labelClass}>Full Name *</label>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Aditri Mukherjee"
            value={form.name}
            onChange={(e) => {
              const name = e.target.value;
              const emailPrefix = name.trim()
                ? name.trim().toLowerCase().split(/\s+/).slice(0, 2).join(".")
                : "";
              const updated = {
                ...form,
                name,
                email: emailPrefix ? `${emailPrefix}@aeonx.digital` : form.email,
              };
              setForm(updated);
              onChange(updated);
            }}
          />
        </div>

        <div>
          <label className={labelClass}>Gender / Pronoun *</label>
          <select
            className={inputClass}
            value={form.gender}
            onChange={(e) => update("gender", e.target.value as "he" | "she")}
          >
            <option value="she">She / Her (Ms.)</option>
            <option value="he">He / Him (Mr.)</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Joining Date *</label>
          <input
            type="date"
            className={inputClass}
            value={form.joiningDate}
            onChange={(e) => update("joiningDate", e.target.value)}
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Job Title / Designation *</label>
          <MultiSelect
            options={options.job_title}
            selected={toArray(form.jobTitle)}
            onChange={(vals) => updateMulti("jobTitle", vals)}
            onAdd={(val) => handleAddOption("job_title", val)}
            placeholder="Select job title..."
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Reporting Manager *</label>
          <MultiSelect
            options={options.reporting_manager}
            selected={toArray(form.reportingManager)}
            onChange={(vals) => updateMulti("reportingManager", vals)}
            onAdd={(val) => handleAddOption("reporting_manager", val)}
            placeholder="Select reporting manager..."
            single
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Office Location *</label>
          <MultiSelect
            options={options.office_location}
            selected={toArray(form.officeLocation)}
            onChange={(vals) => updateMulti("officeLocation", vals)}
            onAdd={(val) => handleAddOption("office_location", val)}
            placeholder="Select office location..."
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Languages Known</label>
          <MultiSelect
            options={options.language}
            selected={toArray(form.languages)}
            onChange={(vals) => updateMulti("languages", vals)}
            onAdd={(val) => handleAddOption("language", val)}
            placeholder="Select languages..."
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Hobbies & Interests</label>
          <MultiSelect
            options={options.hobby}
            selected={toArray(form.hobbies)}
            onChange={(vals) => updateMulti("hobbies", vals)}
            onAdd={(val) => handleAddOption("hobby", val)}
            placeholder="Select hobbies..."
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Email Address *</label>
          <div className="flex items-center rounded-lg overflow-hidden border border-gray-200 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all bg-white">
            <input
              type="text"
              className="flex-1 px-3 py-2 text-sm focus:outline-none bg-transparent min-w-0"
              placeholder="firstname.lastname"
              value={form.email.replace("@aeonx.digital", "")}
              onChange={(e) => {
                const prefix = e.target.value.replace(/@.*/, "");
                update("email", prefix ? `${prefix}@aeonx.digital` : "");
              }}
            />
            <span className="flex items-center px-3 py-2 text-sm font-semibold text-orange-600 bg-orange-50 border-l border-orange-100 select-none whitespace-nowrap gap-1">
              <span className="text-orange-300 font-normal">@</span>aeonx.digital
            </span>
          </div>
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
            onChange={handlePhotoUpload}
          />
          {form.profilePhoto && (
            <p className="text-xs text-green-600 mt-1">Photo uploaded</p>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Generating...
          </>
        ) : (
          "Generate Welcome Paragraph"
        )}
      </button>
    </div>
  );
}
