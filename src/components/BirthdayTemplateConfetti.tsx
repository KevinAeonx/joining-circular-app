"use client";
import { BirthdayFormData } from "@/types";

interface Props { formData: BirthdayFormData; message: string; id?: string; }

const CC = ["#FF6B6B","#FFD93D","#6BCB77","#4ECDC4","#A29BFE","#FF9FF3"];

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

export default function BirthdayTemplateConfetti({ formData, message, id }: Props) {
  return (
    <div id={id} style={{
      width: "600px", height: "780px", position: "relative", overflow: "hidden",
      background: "linear-gradient(160deg, #FFFEF8 0%, #FFF5E6 55%, #F8F5FF 100%)",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    }}>
      <svg style={{ position:"absolute", inset:0, width:"600px", height:"780px", pointerEvents:"none", zIndex:2 }}
        viewBox="0 0 600 780">
        <defs>
          <radialGradient id="cc-b1" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#FF8A80" /><stop offset="55%" stopColor="#FF1744" /><stop offset="100%" stopColor="#B71C1C" />
          </radialGradient>
          <radialGradient id="cc-b2" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#FFE57A" /><stop offset="55%" stopColor="#FFD600" /><stop offset="100%" stopColor="#F57F17" />
          </radialGradient>
          <radialGradient id="cc-b3" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#B2EBF2" /><stop offset="55%" stopColor="#00ACC1" /><stop offset="100%" stopColor="#006064" />
          </radialGradient>
          <radialGradient id="cc-b4" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#CE93D8" /><stop offset="55%" stopColor="#8E24AA" /><stop offset="100%" stopColor="#4A148C" />
          </radialGradient>
          <linearGradient id="cc-hb" x1="0" y1="0" x2="1" y2="0">
            {CC.map((c,i) => <stop key={i} offset={`${i*20}%`} stopColor={c} />)}
          </linearGradient>
        </defs>

        {/* ── Rainbow stripe borders ── */}
        <rect x={0} y={0}   width={600} height={7}  fill="url(#cc-hb)" opacity={0.85} />
        <rect x={0} y={773} width={600} height={7}  fill="url(#cc-hb)" opacity={0.85} />

        {/* ── Multi-color confetti ── */}
        {RECTS.map((p, i) => (
          <rect key={i} x={p.x-p.w/2} y={p.y-p.h/2} width={p.w} height={p.h}
            fill={CC[i % CC.length]} opacity={0.80}
            transform={`rotate(${p.a} ${p.x} ${p.y})`} rx={1.5} />
        ))}
        {DOTS.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r}
            fill={CC[(i+2) % CC.length]} opacity={0.78} />
        ))}

        {/* ── Left balloon ── */}
        <ellipse cx={46}  cy={600} rx={30} ry={40} fill="url(#cc-b1)" opacity={0.88} />
        <ellipse cx={34}  cy={584} rx={9}  ry={8}  fill="rgba(255,255,255,0.30)" />
        <path d="M46 640 Q40 662 46 684"  stroke="#880000" strokeWidth={1.5} fill="none" />
        <ellipse cx={46}  cy={642} rx={4}  ry={3}  fill="#FF1744" />

        {/* ── Right balloon ── */}
        <ellipse cx={554} cy={600} rx={30} ry={40} fill="url(#cc-b3)" opacity={0.88} />
        <ellipse cx={542} cy={584} rx={9}  ry={8}  fill="rgba(255,255,255,0.30)" />
        <path d="M554 640 Q560 662 554 684" stroke="#006064" strokeWidth={1.5} fill="none" />
        <ellipse cx={554} cy={642} rx={4}  ry={3}  fill="#00ACC1" />

        {/* ── Left gift box (red) ── */}
        <rect x={38}  y={724} width={76} height={50} rx={4} fill="#FFFFFF" stroke="#FF6B6B" strokeWidth={1.5} />
        <rect x={34}  y={708} width={84} height={18} rx={4} fill="#FFF0F0" stroke="#FF6B6B" strokeWidth={1.5} />
        <rect x={71}  y={708} width={10} height={66} fill="#FF6B6B" opacity={0.88} />
        <rect x={38}  y={734} width={76} height={7}  fill="#FF6B6B" opacity={0.88} />
        <ellipse cx={62}  cy={704} rx={12} ry={7} fill="#FF6B6B" transform="rotate(-28 62 704)"  opacity={0.88} />
        <ellipse cx={90}  cy={704} rx={12} ry={7} fill="#FF6B6B" transform="rotate(28 90 704)"   opacity={0.88} />
        <circle  cx={76}  cy={706} r={5} fill="#FFD93D" />

        {/* ── Right gift box (teal) ── */}
        <rect x={486} y={724} width={76} height={50} rx={4} fill="#FFFFFF" stroke="#4ECDC4" strokeWidth={1.5} />
        <rect x={482} y={708} width={84} height={18} rx={4} fill="#F0FFFE" stroke="#4ECDC4" strokeWidth={1.5} />
        <rect x={519} y={708} width={10} height={66} fill="#4ECDC4" opacity={0.88} />
        <rect x={486} y={734} width={76} height={7}  fill="#4ECDC4" opacity={0.88} />
        <ellipse cx={510} cy={704} rx={12} ry={7} fill="#4ECDC4" transform="rotate(-28 510 704)" opacity={0.88} />
        <ellipse cx={538} cy={704} rx={12} ry={7} fill="#4ECDC4" transform="rotate(28 538 704)"  opacity={0.88} />
        <circle  cx={524} cy={706} r={5} fill="#A29BFE" />

        {/* ── Outer border ── */}
        <rect x={6} y={6} width={588} height={768} rx={8}
          fill="none" stroke="rgba(160,140,200,0.25)" strokeWidth={1.5} />
      </svg>

      {/* ── Logo ── */}
      <div style={{ position:"absolute", top:"18px", left:0, right:0, display:"flex", justifyContent:"center", zIndex:4 }}>
        <div style={{ backgroundColor:"rgba(255,255,255,0.82)", borderRadius:"14px", padding:"6px 22px", border:"1px solid rgba(160,140,200,0.30)", boxShadow:"0 2px 12px rgba(0,0,0,0.08)" }}>
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
        boxShadow:"0 4px 22px rgba(0,0,0,0.12)",
        overflow:"hidden",
        backgroundImage: formData.profilePhoto ? `url(${formData.profilePhoto})` : "none",
        backgroundColor:"#E8E0F8",
        backgroundSize:"cover",
        backgroundPosition:"center top",
      }} />

      {/* ── Name ── */}
      <div style={{
        position:"absolute", top:"360px", left:"20px", right:"20px",
        textAlign:"center", zIndex:4,
        fontSize:"26px", fontWeight:800,
        letterSpacing:"1.5px", textTransform:"uppercase",
        background:"linear-gradient(90deg,#FF6B6B,#A29BFE)",
        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
      }}>
        {formData.name || "Employee Name"}
      </div>

      {formData.role && (
        <div style={{
          position:"absolute", top:"398px", left:"20px", right:"20px",
          textAlign:"center", zIndex:4,
          color:"#546E7A", fontSize:"13px", fontWeight:600,
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
        fontSize:"56px",
        background:"linear-gradient(90deg,#FF6B6B 0%,#FFD93D 40%,#6BCB77 70%,#4ECDC4 100%)",
        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        lineHeight:1.1,
      }}>
        Happy Birthday
      </div>

      {/* ── Message ── */}
      <div style={{
        position:"absolute",
        top: formData.role ? "502px" : "480px",
        left:"72px", right:"72px",
        textAlign:"center", zIndex:4,
        color:"#1A1A1A", fontSize:"15px", lineHeight:"1.75", fontWeight:500, fontStyle:"italic",
      }}>
        {message || <span style={{ color:"#BBBBBB", fontStyle:"italic" }}>Fill in details and generate a message...</span>}
      </div>

      {/* ── Footer ── */}
      <div style={{ position:"absolute", bottom:"24px", left:0, right:0, textAlign:"center", zIndex:4 }}>
        <div style={{ color:"#666666", fontSize:"14px" }}>Best Regards,</div>
        <div style={{ fontSize:"16px", fontWeight:800, marginTop:"3px",
          background:"linear-gradient(90deg,#FF6B6B,#A29BFE)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          The AeonX Team
        </div>
      </div>
    </div>
  );
}
