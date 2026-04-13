"use client";
import { BirthdayFormData } from "@/types";

interface Props { formData: BirthdayFormData; message: string; id?: string; }

const GOLD  = "#D4AF37";
const GOLD2 = "#FFD700";

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

export default function BirthdayTemplateElegant({ formData, message, id }: Props) {
  return (
    <div id={id} style={{
      width: "600px", height: "780px", position: "relative", overflow: "hidden",
      background: "linear-gradient(155deg, #0D1117 0%, #161B22 55%, #21262D 100%)",
      fontFamily: "Georgia, 'Times New Roman', serif",
    }}>
      <svg style={{ position:"absolute", inset:0, width:"600px", height:"780px", pointerEvents:"none", zIndex:2 }}
        viewBox="0 0 600 780">
        <defs>
          <radialGradient id="el-bal" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#FFE082" />
            <stop offset="55%"  stopColor="#FFB300" />
            <stop offset="100%" stopColor="#CC8800" />
          </radialGradient>
        </defs>

        {/* ── Gold confetti ── */}
        {RECTS.map((p, i) => (
          <rect key={i} x={p.x-p.w/2} y={p.y-p.h/2} width={p.w} height={p.h}
            fill={i % 2 === 0 ? GOLD : GOLD2} opacity={0.72}
            transform={`rotate(${p.a} ${p.x} ${p.y})`} rx={1.5} />
        ))}
        {DOTS.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r}
            fill={i % 2 === 0 ? GOLD : GOLD2} opacity={0.68} />
        ))}

        {/* ── Subtle side glow arcs ── */}
        <ellipse cx={-20} cy={390} rx={50} ry={320} fill="none" stroke={GOLD} strokeWidth={8} opacity={0.18} />
        <ellipse cx={620} cy={390} rx={50} ry={320} fill="none" stroke={GOLD} strokeWidth={8} opacity={0.18} />

        {/* ── Left balloon ── */}
        <ellipse cx={46}  cy={600} rx={30} ry={40} fill="url(#el-bal)" opacity={0.90} />
        <ellipse cx={34}  cy={584} rx={9}  ry={8}  fill="rgba(255,255,255,0.28)" />
        <path d="M46 640 Q40 662 46 684"  stroke="#7A5800" strokeWidth={1.5} fill="none" />
        <ellipse cx={46}  cy={642} rx={4}  ry={3}  fill={GOLD} />

        {/* ── Right balloon ── */}
        <ellipse cx={554} cy={600} rx={30} ry={40} fill="url(#el-bal)" opacity={0.90} />
        <ellipse cx={542} cy={584} rx={9}  ry={8}  fill="rgba(255,255,255,0.28)" />
        <path d="M554 640 Q560 662 554 684" stroke="#7A5800" strokeWidth={1.5} fill="none" />
        <ellipse cx={554} cy={642} rx={4}  ry={3}  fill={GOLD} />

        {/* ── Left gift box ── */}
        <rect x={38}  y={724} width={76} height={50} rx={4} fill="#1C2128" stroke={GOLD} strokeWidth={1.5} />
        <rect x={34}  y={708} width={84} height={18} rx={4} fill="#161B22" stroke={GOLD} strokeWidth={1.5} />
        <rect x={71}  y={708} width={10} height={66} fill={GOLD} opacity={0.88} />
        <rect x={38}  y={734} width={76} height={7}  fill={GOLD} opacity={0.88} />
        <ellipse cx={62}  cy={704} rx={12} ry={7} fill={GOLD} transform="rotate(-28 62 704)"  opacity={0.88} />
        <ellipse cx={90}  cy={704} rx={12} ry={7} fill={GOLD} transform="rotate(28 90 704)"   opacity={0.88} />
        <circle  cx={76}  cy={706} r={5} fill="#FFE082" />

        {/* ── Right gift box ── */}
        <rect x={486} y={724} width={76} height={50} rx={4} fill="#1C2128" stroke={GOLD} strokeWidth={1.5} />
        <rect x={482} y={708} width={84} height={18} rx={4} fill="#161B22" stroke={GOLD} strokeWidth={1.5} />
        <rect x={519} y={708} width={10} height={66} fill={GOLD} opacity={0.88} />
        <rect x={486} y={734} width={76} height={7}  fill={GOLD} opacity={0.88} />
        <ellipse cx={510} cy={704} rx={12} ry={7} fill={GOLD} transform="rotate(-28 510 704)" opacity={0.88} />
        <ellipse cx={538} cy={704} rx={12} ry={7} fill={GOLD} transform="rotate(28 538 704)"  opacity={0.88} />
        <circle  cx={524} cy={706} r={5} fill="#FFE082" />

        {/* ── Outer border ── */}
        <rect x={6} y={6} width={588} height={768} rx={8}
          fill="none" stroke={GOLD} strokeWidth={1} opacity={0.30} />
      </svg>

      {/* ── Logo ── */}
      <div style={{ position:"absolute", top:"18px", left:0, right:0, display:"flex", justifyContent:"center", zIndex:4 }}>
        <div style={{ backgroundColor:"rgba(20,15,5,0.60)", borderRadius:"14px", padding:"6px 22px", border:`1px solid rgba(212,175,55,0.40)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aeonx-logo-light.png" alt="AeonX Digital"
            style={{ height:"44px", objectFit:"contain", display:"block", filter:"drop-shadow(0 0 6px rgba(212,175,55,0.50))" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
      </div>

      {/* ── Photo frame (rectangular) ── */}
      <div style={{
        position:"absolute", top:"88px", left:"50%", transform:"translateX(-50%)",
        width:"210px", height:"255px", zIndex:4,
        border:`3px solid ${GOLD}`,
        borderRadius:"10px",
        boxShadow:`0 4px 24px rgba(0,0,0,0.40), 0 0 20px rgba(212,175,55,0.20)`,
        overflow:"hidden",
        backgroundImage: formData.profilePhoto ? `url(${formData.profilePhoto})` : "none",
        backgroundColor:"#2A2A3E",
        backgroundSize:"cover",
        backgroundPosition:"center top",
      }} />

      {/* ── Name ── */}
      <div style={{
        position:"absolute", top:"360px", left:"20px", right:"20px",
        textAlign:"center", zIndex:4,
        color:GOLD, fontSize:"26px", fontWeight:700,
        fontStyle:"italic", letterSpacing:"1px",
        textShadow:`0 0 18px rgba(212,175,55,0.35)`,
      }}>
        {formData.name || "Employee Name"}
      </div>

      {formData.role && (
        <div style={{
          position:"absolute", top:"398px", left:"20px", right:"20px",
          textAlign:"center", zIndex:4,
          color:"rgba(255,255,255,0.85)", fontSize:"13px", fontWeight:600,
          letterSpacing:"2px", textTransform:"uppercase",
          fontFamily:"Arial, sans-serif",
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
        fontSize:"56px", color:GOLD,
        textShadow:`0 0 24px rgba(212,175,55,0.40)`,
        lineHeight:1.1,
      }}>
        Happy Birthday
      </div>

      {/* ── Message ── */}
      <div style={{
        position:"absolute",
        top: formData.role ? "502px" : "480px",
        left:"56px", right:"56px",
        textAlign:"center", zIndex:4,
        color:"rgba(235,235,235,1)", fontSize:"15px", lineHeight:"1.75", fontWeight:400, fontStyle:"italic",
      }}>
        {message || <span style={{ color:"rgba(160,140,80,0.55)", fontStyle:"italic" }}>Fill in details and generate a message...</span>}
      </div>

      {/* ── Footer ── */}
      <div style={{ position:"absolute", bottom:"24px", left:0, right:0, textAlign:"center", zIndex:4, fontFamily:"Arial, sans-serif" }}>
        <div style={{ color:"rgba(255,255,255,0.60)", fontSize:"14px" }}>Best Regards,</div>
        <div style={{ color:"rgba(255,255,255,0.88)", fontSize:"16px", fontWeight:600, marginTop:"3px" }}>The AeonX Team</div>
      </div>
    </div>
  );
}
