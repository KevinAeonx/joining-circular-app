"use client";
import { BirthdayFormData } from "@/types";

interface Props { formData: BirthdayFormData; message: string; id?: string; }

const RECTS = [
  { x:52,  y:52,  w:13, h:5, a:28  }, { x:138, y:40,  w:10, h:4, a:-18 },
  { x:222, y:34,  w:8,  h:4, a:55  }, { x:308, y:46,  w:12, h:5, a:-35 },
  { x:402, y:36,  w:10, h:4, a:65  }, { x:490, y:50,  w:8,  h:4, a:-48 },
  { x:558, y:42,  w:10, h:4, a:38  }, { x:28,  y:152, w:8,  h:4, a:42  },
  { x:572, y:148, w:8,  h:4, a:-38 }, { x:24,  y:250, w:10, h:4, a:55  },
  { x:576, y:246, w:10, h:4, a:-45 }, { x:80,  y:656, w:12, h:5, a:28  },
  { x:520, y:650, w:10, h:4, a:-35 }, { x:155, y:668, w:8,  h:4, a:55  },
  { x:445, y:662, w:10, h:4, a:-22 },
];
const DOTS = [
  { x:165, y:22, r:3.5 }, { x:362, y:18, r:3   }, { x:530, y:25, r:3.5 },
  { x:72,  y:20, r:3   }, { x:248, y:16, r:4   }, { x:450, y:640, r:3  },
  { x:200, y:650, r:3.5 }, { x:350, y:636, r:4 },
];

// Decorative floral petal ornaments along sides
const PETALS = [
  { x:22,  y:88,  rx:6, ry:11, a:20  }, { x:30,  y:110, rx:5, ry:10, a:-30 },
  { x:18,  y:132, rx:6, ry:11, a:15  }, { x:578, y:88,  rx:6, ry:11, a:-20 },
  { x:570, y:110, rx:5, ry:10, a:30  }, { x:582, y:132, rx:6, ry:11, a:-15 },
  { x:22,  y:580, rx:6, ry:11, a:20  }, { x:30,  y:602, rx:5, ry:10, a:-30 },
  { x:578, y:580, rx:6, ry:11, a:-20 }, { x:570, y:602, rx:5, ry:10, a:30  },
];

export default function BirthdayTemplateFloral({ formData, message, id }: Props) {
  return (
    <div id={id} style={{
      width: "600px", height: "780px", position: "relative", overflow: "hidden",
      background: "linear-gradient(150deg, #FCE4EC 0%, #F8BBD9 40%, #EDE7F6 100%)",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    }}>
      <svg style={{ position:"absolute", inset:0, width:"600px", height:"780px", pointerEvents:"none", zIndex:2 }}
        viewBox="0 0 600 780">
        <defs>
          <radialGradient id="fl-bal" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#FFE082" />
            <stop offset="55%"  stopColor="#FFB300" />
            <stop offset="100%" stopColor="#CC8800" />
          </radialGradient>
        </defs>

        {/* ── Confetti ── */}
        {RECTS.map((p, i) => (
          <rect key={i} x={p.x-p.w/2} y={p.y-p.h/2} width={p.w} height={p.h}
            fill={i % 2 === 0 ? "#D4AF37" : "#F48FB1"} opacity={0.78}
            transform={`rotate(${p.a} ${p.x} ${p.y})`} rx={1.5} />
        ))}
        {DOTS.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r}
            fill={i % 2 === 0 ? "#FFD700" : "#CE93D8"} opacity={0.75} />
        ))}

        {/* ── Decorative side petals ── */}
        {PETALS.map((p, i) => (
          <ellipse key={i} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry}
            fill={i % 2 === 0 ? "#F48FB1" : "#CE93D8"} opacity={0.55}
            transform={`rotate(${p.a} ${p.x} ${p.y})`} />
        ))}

        {/* ── Left balloon ── */}
        <ellipse cx={46}  cy={600} rx={30} ry={40} fill="url(#fl-bal)" opacity={0.88} />
        <ellipse cx={34}  cy={584} rx={9}  ry={8}  fill="rgba(255,255,255,0.30)" />
        <path d="M46 640 Q40 662 46 684"  stroke="#A0720A" strokeWidth={1.5} fill="none" />
        <ellipse cx={46}  cy={642} rx={4}  ry={3}  fill="#D4AF37" />

        {/* ── Right balloon ── */}
        <ellipse cx={554} cy={600} rx={30} ry={40} fill="#CE93D8" opacity={0.88} />
        <ellipse cx={542} cy={584} rx={9}  ry={8}  fill="rgba(255,255,255,0.30)" />
        <path d="M554 640 Q560 662 554 684" stroke="#7B1FA2" strokeWidth={1.5} fill="none" />
        <ellipse cx={554} cy={642} rx={4}  ry={3}  fill="#CE93D8" />

        {/* ── Left gift box (pink) ── */}
        <rect x={38}  y={724} width={76} height={50} rx={4} fill="#FFFFFF" stroke="#F48FB1" strokeWidth={1.5} />
        <rect x={34}  y={708} width={84} height={18} rx={4} fill="#FFF0F4" stroke="#F48FB1" strokeWidth={1.5} />
        <rect x={71}  y={708} width={10} height={66} fill="#F48FB1" opacity={0.88} />
        <rect x={38}  y={734} width={76} height={7}  fill="#F48FB1" opacity={0.88} />
        <ellipse cx={62}  cy={704} rx={12} ry={7} fill="#F48FB1" transform="rotate(-28 62 704)"  opacity={0.88} />
        <ellipse cx={90}  cy={704} rx={12} ry={7} fill="#F48FB1" transform="rotate(28 90 704)"   opacity={0.88} />
        <circle  cx={76}  cy={706} r={5} fill="#FCE4EC" />

        {/* ── Right gift box (lavender) ── */}
        <rect x={486} y={724} width={76} height={50} rx={4} fill="#FFFFFF" stroke="#CE93D8" strokeWidth={1.5} />
        <rect x={482} y={708} width={84} height={18} rx={4} fill="#F8F0FC" stroke="#CE93D8" strokeWidth={1.5} />
        <rect x={519} y={708} width={10} height={66} fill="#CE93D8" opacity={0.88} />
        <rect x={486} y={734} width={76} height={7}  fill="#CE93D8" opacity={0.88} />
        <ellipse cx={510} cy={704} rx={12} ry={7} fill="#CE93D8" transform="rotate(-28 510 704)" opacity={0.88} />
        <ellipse cx={538} cy={704} rx={12} ry={7} fill="#CE93D8" transform="rotate(28 538 704)"  opacity={0.88} />
        <circle  cx={524} cy={706} r={5} fill="#EDE7F6" />

        {/* ── Dashed petal frame ── */}
        <rect x={8} y={8} width={584} height={764} rx={8}
          fill="none" stroke="rgba(240,98,146,0.22)" strokeWidth={1.5} strokeDasharray="8 5" />
      </svg>

      {/* ── Logo ── */}
      <div style={{ position:"absolute", top:"18px", left:0, right:0, display:"flex", justifyContent:"center", zIndex:4 }}>
        <div style={{ backgroundColor:"rgba(255,255,255,0.75)", borderRadius:"14px", padding:"6px 22px", border:"1px solid rgba(240,98,146,0.25)", boxShadow:"0 2px 12px rgba(240,98,146,0.10)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aeonx-logo-dark.png" alt="AeonX Digital"
            style={{ height:"44px", objectFit:"contain", display:"block" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
      </div>

      {/* ── Photo frame (rectangular) ── */}
      <div style={{
        position:"absolute", top:"88px", left:"50%", transform:"translateX(-50%)",
        width:"210px", height:"255px", zIndex:4,
        border:"3px solid #D4AF37",
        borderRadius:"10px",
        boxShadow:"0 4px 22px rgba(240,98,146,0.20), 0 2px 10px rgba(0,0,0,0.10)",
        overflow:"hidden",
        backgroundImage: formData.profilePhoto ? `url(${formData.profilePhoto})` : "none",
        backgroundColor:"#F8BBD9",
        backgroundSize:"cover",
        backgroundPosition:"center top",
      }} />

      {/* ── Name ── */}
      <div style={{
        position:"absolute", top:"360px", left:"20px", right:"20px",
        textAlign:"center", zIndex:4,
        color:"#880E4F", fontSize:"26px", fontWeight:800,
        letterSpacing:"1.5px", textTransform:"uppercase",
        textShadow:"0 1px 6px rgba(248,187,217,0.60)",
      }}>
        {formData.name || "Employee Name"}
      </div>

      {formData.role && (
        <div style={{
          position:"absolute", top:"398px", left:"20px", right:"20px",
          textAlign:"center", zIndex:4,
          color:"#AD1457", fontSize:"13px", fontWeight:600,
          letterSpacing:"1.5px", textTransform:"uppercase",
        }}>
          {formData.role}
        </div>
      )}

      {/* ── Happy Birthday ── */}
      <div style={{
        position:"absolute",
        top: formData.role ? "422px" : "400px",
        left:"16px", right:"16px",
        textAlign:"center", zIndex:4,
        fontFamily:'"Brush Script MT","Segoe Script",cursive',
        fontSize:"56px", color:"#880E4F",
        textShadow:"0 0 28px rgba(255,255,255,0.75), 1px 2px 6px rgba(136,14,79,0.20)",
        lineHeight:1.1,
      }}>
        Happy Birthday
      </div>

      {/* ── Message ── */}
      <div style={{
        position:"absolute",
        top: formData.role ? "502px" : "480px",
        left:"76px", right:"76px",
        textAlign:"center", zIndex:4,
        color:"#4A148C", fontSize:"15px", lineHeight:"1.75", fontWeight:600, fontStyle:"italic",
      }}>
        {message || <span style={{ color:"#CE93D8", fontStyle:"italic" }}>Fill in details and generate a message...</span>}
      </div>

      {/* ── Footer ── */}
      <div style={{ position:"absolute", bottom:"24px", left:0, right:0, textAlign:"center", zIndex:4 }}>
        <div style={{ color:"#AD1457", fontSize:"14px" }}>Best Regards,</div>
        <div style={{ color:"#880E4F", fontSize:"16px", fontWeight:700, marginTop:"3px" }}>The AeonX Team</div>
      </div>
    </div>
  );
}
