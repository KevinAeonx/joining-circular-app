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

// Twinkle stars — scattered across card
const STARS = [
  {x:42,  y:44,  r:1.4, c:"#fff"   }, {x:88,  y:76,  r:1.0, c:"#A5F3FC"},
  {x:175, y:60,  r:1.2, c:"#FDE68A"}, {x:218, y:22,  r:1.5, c:"#fff"   },
  {x:310, y:28,  r:2.0, c:"#FDE68A"}, {x:395, y:26,  r:1.4, c:"#A5F3FC"},
  {x:440, y:56,  r:1.0, c:"#fff"   }, {x:522, y:68,  r:1.2, c:"#fff"   },
  {x:560, y:38,  r:1.4, c:"#A5F3FC"}, {x:34,  y:148, r:1.2, c:"#FDE68A"},
  {x:566, y:143, r:1.4, c:"#fff"   }, {x:28,  y:258, r:1.6, c:"#A5F3FC"},
  {x:572, y:253, r:1.0, c:"#FDE68A"}, {x:30,  y:358, r:1.2, c:"#fff"   },
  {x:38,  y:655, r:1.2, c:"#fff"   }, {x:562, y:650, r:1.6, c:"#A5F3FC"},
];

export default function BirthdayTemplateMidnight({ formData, message, id }: Props) {
  return (
    <div id={id} style={{
      width: "600px", height: "780px", position: "relative", overflow: "hidden",
      background: "linear-gradient(150deg, #050518 0%, #0A0A38 40%, #0D1B52 70%, #091530 100%)",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    }}>
      <svg style={{ position:"absolute", inset:0, width:"600px", height:"780px", pointerEvents:"none", zIndex:2 }}
        viewBox="0 0 600 780">
        <defs>
          <radialGradient id="mn-bal" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#FFE082" />
            <stop offset="55%"  stopColor="#FFB300" />
            <stop offset="100%" stopColor="#CC8800" />
          </radialGradient>
        </defs>

        {/* ── Nebula glows ── */}
        <ellipse cx={150} cy={130} rx={130} ry={90}  fill="rgba(99,102,241,0.08)" />
        <ellipse cx={450} cy={120} rx={110} ry={75}  fill="rgba(167,139,250,0.07)" />
        <ellipse cx={300} cy={700} rx={200} ry={100} fill="rgba(99,102,241,0.07)" />

        {/* ── Twinkle stars ── */}
        {STARS.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r={s.r}     fill={s.c} opacity={0.90} />
            <circle cx={s.x} cy={s.y} r={s.r*2.8} fill={s.c} opacity={0.10} />
          </g>
        ))}

        {/* ── Crescent moon ── */}
        <circle cx={540} cy={138} r={40} fill="#FDE68A" opacity={0.12} />
        <circle cx={553} cy={130} r={36} fill="#0A0A38" />

        {/* ── Shooting star ── */}
        <line x1={415} y1={40} x2={488} y2={80} stroke="#ffffff" strokeWidth={1.2} opacity={0.38} strokeLinecap="round" />
        <circle cx={415} cy={40} r={2.5} fill="#ffffff" opacity={0.55} />

        {/* ── Gold + cyan confetti ── */}
        {RECTS.map((p, i) => (
          <rect key={i} x={p.x-p.w/2} y={p.y-p.h/2} width={p.w} height={p.h}
            fill={i % 2 === 0 ? "#D4AF37" : "#A5F3FC"} opacity={0.72}
            transform={`rotate(${p.a} ${p.x} ${p.y})`} rx={1.5} />
        ))}
        {DOTS.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r}
            fill={i % 2 === 0 ? "#FFD700" : "#A5F3FC"} opacity={0.68} />
        ))}

        {/* ── Left balloons ── */}
        <ellipse cx={50}  cy={488} rx={30} ry={40} fill="url(#mn-bal)" opacity={0.88} />
        <ellipse cx={38}  cy={472} rx={9}  ry={8}  fill="rgba(255,255,255,0.25)" />
        <path d="M50 528 Q44 558 50 588"  stroke="#7A5800" strokeWidth={1.5} fill="none" />
        <ellipse cx={50}  cy={530} rx={4}  ry={3}  fill="#D4AF37" />
        <ellipse cx={26}  cy={560} rx={22} ry={30} fill="url(#mn-bal)" opacity={0.78} />
        <ellipse cx={16}  cy={547} rx={7}  ry={6}  fill="rgba(255,255,255,0.22)" />
        <path d="M26 590 Q22 614 26 638"  stroke="#7A5800" strokeWidth={1.5} fill="none" />
        <ellipse cx={26}  cy={592} rx={3}  ry={2.5} fill="#D4AF37" />

        {/* ── Right balloons ── */}
        <ellipse cx={550} cy={488} rx={30} ry={40} fill="url(#mn-bal)" opacity={0.88} />
        <ellipse cx={538} cy={472} rx={9}  ry={8}  fill="rgba(255,255,255,0.25)" />
        <path d="M550 528 Q556 558 550 588" stroke="#7A5800" strokeWidth={1.5} fill="none" />
        <ellipse cx={550} cy={530} rx={4}  ry={3}  fill="#D4AF37" />
        <ellipse cx={574} cy={560} rx={22} ry={30} fill="url(#mn-bal)" opacity={0.78} />
        <ellipse cx={564} cy={547} rx={7}  ry={6}  fill="rgba(255,255,255,0.22)" />
        <path d="M574 590 Q578 614 574 638" stroke="#7A5800" strokeWidth={1.5} fill="none" />
        <ellipse cx={574} cy={592} rx={3}  ry={2.5} fill="#D4AF37" />

        {/* ── Left gift box (dark navy) ── */}
        <rect x={38}  y={722} width={76} height={58} rx={4} fill="#0D1B52" stroke="#A5F3FC" strokeWidth={1.5} />
        <rect x={34}  y={708} width={84} height={18} rx={4} fill="#091530" stroke="#A5F3FC" strokeWidth={1.5} />
        <rect x={71}  y={722} width={10} height={58} fill="#D4AF37" opacity={0.85} />
        <rect x={71}  y={708} width={10} height={18} fill="#D4AF37" opacity={0.85} />
        <rect x={38}  y={746} width={76} height={8}  fill="#D4AF37" opacity={0.85} />
        <ellipse cx={62}  cy={706} rx={12} ry={7} fill="#D4AF37" transform="rotate(-28 62 706)"  opacity={0.85} />
        <ellipse cx={90}  cy={706} rx={12} ry={7} fill="#D4AF37" transform="rotate(28 90 706)"   opacity={0.85} />
        <circle  cx={76}  cy={708} r={5} fill="#FDE68A" />

        {/* ── Right gift box (dark navy) ── */}
        <rect x={486} y={722} width={76} height={58} rx={4} fill="#0D1B52" stroke="#A5F3FC" strokeWidth={1.5} />
        <rect x={482} y={708} width={84} height={18} rx={4} fill="#091530" stroke="#A5F3FC" strokeWidth={1.5} />
        <rect x={519} y={722} width={10} height={58} fill="#D4AF37" opacity={0.85} />
        <rect x={519} y={708} width={10} height={18} fill="#D4AF37" opacity={0.85} />
        <rect x={486} y={746} width={76} height={8}  fill="#D4AF37" opacity={0.85} />
        <ellipse cx={510} cy={706} rx={12} ry={7} fill="#D4AF37" transform="rotate(-28 510 706)" opacity={0.85} />
        <ellipse cx={538} cy={706} rx={12} ry={7} fill="#D4AF37" transform="rotate(28 538 706)"  opacity={0.85} />
        <circle  cx={524} cy={708} r={5} fill="#FDE68A" />

        {/* ── Outer border ── */}
        <rect x={4} y={4} width={592} height={772} rx={6}
          fill="none" stroke="rgba(99,102,241,0.22)" strokeWidth={1.5} />
      </svg>

      {/* ── Logo ── */}
      <div style={{ position:"absolute", top:"18px", left:0, right:0, display:"flex", justifyContent:"center", zIndex:4 }}>
        <div style={{ backgroundColor:"rgba(5,5,40,0.65)", borderRadius:"14px", padding:"6px 22px", border:"1px solid rgba(165,243,252,0.28)", boxShadow:"0 0 16px rgba(99,102,241,0.25)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aeonx-logo-light.png" alt="AeonX Digital"
            style={{ height:"44px", objectFit:"contain", display:"block", filter:"drop-shadow(0 0 6px rgba(165,243,252,0.50))" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
      </div>

      {/* ── Photo frame (rectangular) ── */}
      <div style={{
        position:"absolute", top:"88px", left:"50%", transform:"translateX(-50%)",
        width:"210px", height:"255px", zIndex:4,
        border:"3px solid #A5F3FC",
        borderRadius:"10px",
        boxShadow:"0 0 24px rgba(165,243,252,0.30), 0 4px 20px rgba(0,0,0,0.40)",
        overflow:"hidden",
        backgroundImage: formData.profilePhoto ? `url(${formData.profilePhoto})` : "none",
        backgroundColor:"#1a1a4a",
        backgroundSize:"cover",
        backgroundPosition:"center top",
      }} />

      {/* ── Name ── */}
      <div style={{
        position:"absolute", top:"360px", left:"20px", right:"20px",
        textAlign:"center", zIndex:4,
        color:"#FDE68A", fontSize:"26px", fontWeight:800,
        letterSpacing:"1.5px", textTransform:"uppercase",
        textShadow:"0 0 22px rgba(253,230,138,0.45)",
      }}>
        {formData.name || "Employee Name"}
      </div>

      {formData.role && (
        <div style={{
          position:"absolute", top:"398px", left:"20px", right:"20px",
          textAlign:"center", zIndex:4,
          color:"#A5F3FC", fontSize:"13px", fontWeight:600,
          letterSpacing:"2px", textTransform:"uppercase",
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
        fontSize:"62px", color:"#FFFFFF",
        textShadow:"0 0 32px rgba(165,243,252,0.55), 0 0 65px rgba(99,102,241,0.32)",
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
        color:"rgba(200,220,255,0.88)", fontSize:"13.5px", lineHeight:"1.7", fontWeight:400,
      }}>
        {message || <span style={{ color:"rgba(100,130,200,0.55)", fontStyle:"italic" }}>Fill in details and generate a message...</span>}
      </div>

      {/* ── Divider ── */}
      <div style={{
        position:"absolute", bottom:"68px", left:"90px", right:"90px",
        height:"1px", zIndex:4,
        background:"linear-gradient(90deg,transparent,#A5F3FC,#818CF8,#A5F3FC,transparent)",
      }} />

      {/* ── Footer ── */}
      <div style={{ position:"absolute", bottom:"24px", left:0, right:0, textAlign:"center", zIndex:4 }}>
        <div style={{ color:"rgba(165,243,252,0.52)", fontSize:"12px" }}>Best Regards,</div>
        <div style={{ color:"rgba(165,243,252,0.88)", fontSize:"14px", fontWeight:700, marginTop:"2px" }}>The AeonX Team</div>
      </div>
    </div>
  );
}
