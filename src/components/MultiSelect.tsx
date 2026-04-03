"use client";
import { useState, useRef, useEffect } from "react";

interface Props {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  onAdd?: (value: string) => void; // called when a new custom option is added
  placeholder?: string;
  single?: boolean;
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  onAdd,
  placeholder = "Select...",
  single = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const filtered = search.trim()
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  // Show "Add" prompt if search text doesn't match any existing option exactly
  const trimmed = search.trim();
  const canAdd =
    trimmed.length > 0 &&
    !options.some((o) => o.toLowerCase() === trimmed.toLowerCase());

  const toggle = (option: string) => {
    if (single) {
      onChange([option]);
      setOpen(false);
      setSearch("");
      return;
    }
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const addCustom = () => {
    if (!trimmed) return;
    const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    toggle(formatted);   // select it immediately
    onAdd?.(formatted);  // persist to DB via parent
    setSearch("");
  };

  const removeTag = (e: React.MouseEvent, option: string) => {
    e.stopPropagation();
    onChange(selected.filter((s) => s !== option));
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <div
        onClick={() => setOpen((o) => !o)}
        className="w-full min-h-[38px] border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white cursor-pointer hover:border-orange-300 transition-colors flex flex-wrap gap-1 items-center"
      >
        {selected.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : (
          selected.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-medium px-2 py-0.5 rounded-full"
            >
              {s}
              {!single && (
                <button
                  type="button"
                  onClick={(e) => removeTag(e, s)}
                  className="hover:text-orange-900 leading-none"
                >
                  ×
                </button>
              )}
            </span>
          ))
        )}
        <span className="ml-auto text-gray-400 text-xs flex-shrink-0">{open ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* Search / type-to-add input */}
          <div className="p-2 border-b border-gray-100">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canAdd) addCustom();
                if (e.key === "Escape") { setOpen(false); setSearch(""); }
              }}
              placeholder="Search or type to add..."
              className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Options list */}
          <div className="max-h-44 overflow-y-auto">
            {filtered.length === 0 && !canAdd && (
              <p className="text-xs text-gray-400 px-3 py-2">No results found.</p>
            )}

            {filtered.map((option) => {
              const checked = selected.includes(option);
              return (
                <label
                  key={option}
                  className="flex items-center gap-2.5 px-3 py-2 hover:bg-orange-50 cursor-pointer text-sm"
                >
                  <input
                    type={single ? "radio" : "checkbox"}
                    checked={checked}
                    onChange={() => toggle(option)}
                    className="accent-orange-500"
                  />
                  <span className={checked ? "font-medium text-orange-700" : "text-gray-700"}>
                    {option}
                  </span>
                </label>
              );
            })}

            {/* Add new option row */}
            {canAdd && (
              <button
                type="button"
                onClick={addCustom}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-orange-50 text-sm text-orange-600 font-semibold border-t border-gray-100"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-xs font-bold flex-shrink-0">
                  +
                </span>
                Add &ldquo;{trimmed}&rdquo;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
