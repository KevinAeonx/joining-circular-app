"use client";
import { FormData } from "@/types";

interface Props {
  formData: FormData;
  paragraph: string;
}

type HighlightStyle = "email" | "manager" | "location" | "date" | "language" | "hobby" | "name";

const HIGHLIGHT_STYLES: Record<HighlightStyle, React.CSSProperties> = {
  email:    { color: "#C94000", textDecoration: "underline", fontWeight: 700 },
  manager:  { fontWeight: 700 },
  location: { color: "#C94000", fontWeight: 700 },
  date:     { color: "#C94000", fontWeight: 700 },
  language: { fontWeight: 700 },
  hobby:    { fontWeight: 700 },
  name:     { color: "#C94000", fontWeight: 700 },
};

function buildHighlightTokens(
  formData: FormData
): Array<{ text: string; style: HighlightStyle }> {
  const tokens: Array<{ text: string; style: HighlightStyle }> = [];

  // Name — match "Mr. X" / "Ms. X" or bare name
  if (formData.name) {
    const prefix = formData.gender === "he" ? "Mr. " : "Ms. ";
    tokens.push({ text: prefix + formData.name, style: "name" });
    tokens.push({ text: formData.name, style: "name" });
  }

  // Reporting manager — may be comma-separated
  if (formData.reportingManager) {
    formData.reportingManager.split(",").map(s => s.trim()).filter(Boolean).forEach(m =>
      tokens.push({ text: m, style: "manager" })
    );
  }

  // Office locations
  if (formData.officeLocation) {
    formData.officeLocation.split(",").map(s => s.trim()).filter(Boolean).forEach(loc =>
      tokens.push({ text: loc, style: "location" })
    );
  }

  // Joining date — format as it may appear in the paragraph (e.g. "25 April 2026")
  if (formData.joiningDate) {
    const d = new Date(formData.joiningDate);
    if (!isNaN(d.getTime())) {
      const formatted = d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      tokens.push({ text: formatted, style: "date" });
    }
  }

  // Languages
  if (formData.languages) {
    formData.languages.split(",").map(s => s.trim()).filter(Boolean).forEach(lang =>
      tokens.push({ text: lang, style: "language" })
    );
  }

  // Hobbies
  if (formData.hobbies) {
    formData.hobbies.split(",").map(s => s.trim()).filter(Boolean).forEach(h =>
      tokens.push({ text: h, style: "hobby" })
    );
  }

  // Email
  if (formData.email) {
    tokens.push({ text: formData.email, style: "email" });
  }

  // Sort longest first so longer matches take priority over substrings
  return tokens.sort((a, b) => b.text.length - a.text.length);
}

function HighlightedParagraph({ text, formData }: { text: string; formData: FormData }) {
  const tokens = buildHighlightTokens(formData);

  // Split the text into segments: { value, style? }
  type Seg = { value: string; style?: HighlightStyle };
  let segments: Seg[] = [{ value: text }];

  for (const token of tokens) {
    const next: Seg[] = [];
    for (const seg of segments) {
      if (seg.style) { next.push(seg); continue; }
      const idx = seg.value.indexOf(token.text);
      if (idx === -1) { next.push(seg); continue; }
      if (idx > 0) next.push({ value: seg.value.slice(0, idx) });
      next.push({ value: token.text, style: token.style });
      const tail = seg.value.slice(idx + token.text.length);
      if (tail) next.push({ value: tail });
    }
    segments = next;
  }

  return (
    <>
      {segments.map((seg, i) =>
        seg.style
          ? <span key={i} style={HIGHLIGHT_STYLES[seg.style]}>{seg.value}</span>
          : <span key={i}>{seg.value}</span>
      )}
    </>
  );
}

export default function CircularPreview({ formData, paragraph }: Props) {
  return (
    <div
      id="circular-preview"
      style={{
        width: "960px",
        display: "flex",
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 32px rgba(0,0,0,0.13)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── LEFT: Sidebar ── */}
      <div
        style={{
          width: "210px",
          minWidth: "210px",
          background: "linear-gradient(160deg, #BF3B00 0%, #E05C08 35%, #F07B18 65%, #F8A828 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "56px 18px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles — top */}
        <div style={{
          position: "absolute", top: "-40px", left: "-40px",
          width: "130px", height: "130px", borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.18)",
        }} />
        <div style={{
          position: "absolute", top: "-20px", left: "-20px",
          width: "80px", height: "80px", borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.08)",
        }} />

        {/* Decorative circles — bottom */}
        <div style={{
          position: "absolute", bottom: "-50px", right: "-40px",
          width: "150px", height: "150px", borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.15)",
        }} />
        <div style={{
          position: "absolute", bottom: "-20px", right: "-20px",
          width: "90px", height: "90px", borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.07)",
        }} />

        {/* Dot grid pattern */}
        {[...Array(4)].map((_, row) =>
          [...Array(3)].map((_, col) => (
            <div
              key={`${row}-${col}`}
              style={{
                position: "absolute",
                width: "4px", height: "4px", borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.22)",
                top: `${60 + row * 28}px`,
                left: `${12 + col * 22}px`,
              }}
            />
          ))
        )}

        {/* Photo frame — double ring */}
        <div
          style={{
            width: "168px", height: "168px", borderRadius: "50%",
            border: "3px solid rgba(255,255,255,0.5)",
            padding: "4px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "100%", height: "100%", borderRadius: "50%",
              backgroundColor: "#ffffff",
              padding: "4px",
            }}
          >
            <div
              style={{
                width: "100%", height: "100%", borderRadius: "50%",
                overflow: "hidden",
                backgroundImage: formData.profilePhoto ? `url(${formData.profilePhoto})` : "none",
                backgroundColor: "#d8d8d8",
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
            />
          </div>
        </div>

        {/* Name tag under photo */}
        {formData.name && (
          <div
            style={{
              marginTop: "14px",
              backgroundColor: "rgba(255,255,255,0.18)",
              borderRadius: "20px",
              padding: "5px 14px",
              textAlign: "center",
              zIndex: 1,
            }}
          >
            <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "12px", lineHeight: 1.3 }}>
              {formData.name}
            </div>
            {formData.jobTitle && (
              <div style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500, fontSize: "10px", marginTop: "2px" }}>
                {formData.jobTitle.split(", ")[0]}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── RIGHT: Content area ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "28px 44px 36px 40px",
          minWidth: 0,
          position: "relative",
        }}
      >
        {/* Subtle decorative arc — top-right corner */}
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "180px", height: "180px", borderRadius: "50%",
          border: "18px solid rgba(240,120,24,0.07)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "-30px", right: "-30px",
          width: "110px", height: "110px", borderRadius: "50%",
          border: "10px solid rgba(240,120,24,0.05)",
          pointerEvents: "none",
        }} />

        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aeonx-logo-dark.png"
            alt="AeonX Digital"
            style={{ height: "90px", objectFit: "contain" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* Welcome heading */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{
            color: "#C94000",
            fontWeight: 800,
            fontSize: "34px",
            lineHeight: 1.18,
            letterSpacing: "-0.3px",
            marginBottom: "12px",
            textAlign: "center",
          }}>
            Welcome to the team
          </div>

          {/* Fancy divider: thick dot + line */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "12px", height: "12px", borderRadius: "50%",
              backgroundColor: "#C94000", flexShrink: 0,
            }} />
            <div style={{
              flex: 1, height: "2.5px",
              background: "linear-gradient(90deg, #C94000 0%, #F8A828 70%, rgba(248,168,40,0) 100%)",
              borderRadius: "1px",
            }} />
          </div>
        </div>

        {/* Name + Job Title block */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{
            color: "#C94000",
            fontWeight: 700,
            fontSize: "23px",
            lineHeight: 1.25,
            marginBottom: "5px",
          }}>
            {formData.name || "Employee Name"}
          </div>

          {/* Job title with left accent bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "4px", height: "20px", borderRadius: "2px",
              backgroundColor: "#E06010", flexShrink: 0,
            }} />
            <div style={{
              color: "#1a1a1a",
              fontWeight: 700,
              fontSize: "17px",
              lineHeight: 1.3,
            }}>
              {formData.jobTitle || "Job Title"}
            </div>
          </div>
        </div>

        {/* Paragraph */}
        <div style={{
          fontSize: "14px",
          color: "#1a1a1a",
          lineHeight: "1.78",
          fontWeight: 600,
          textAlign: "justify",
          wordBreak: "break-word",
          flex: 1,
        }}>
          {paragraph ? (
            <HighlightedParagraph text={paragraph} formData={formData} />
          ) : (
            <span style={{ color: "#bbb", fontWeight: 400, fontStyle: "italic" }}>
              Fill in the details and click &ldquo;Generate Welcome Paragraph&rdquo; to preview the circular...
            </span>
          )}
        </div>

        {/* Regards sign-off */}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: 600, lineHeight: 1.6 }}>
            Regards,
          </div>
          <div style={{ fontSize: "17px", color: "#C94000", fontWeight: 700, lineHeight: 1.6 }}>
            Aeonx Digital
          </div>
        </div>

        {/* Bottom accent bar */}
        <div style={{
          marginTop: "12px",
          height: "3px",
          borderRadius: "2px",
          background: "linear-gradient(90deg, rgba(201,64,0,0) 0%, #C94000 30%, #F8A828 70%, rgba(248,168,40,0) 100%)",
        }} />
      </div>
    </div>
  );
}
