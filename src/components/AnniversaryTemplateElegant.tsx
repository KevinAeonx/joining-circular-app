"use client";
import { AnniversaryFormData } from "@/types";

interface Props { formData: AnniversaryFormData; message: string; id?: string; }

function ordinal(n: number) {
  const s = ["th","st","nd","rd"]; const v = n % 100;
  return n + (s[(v-20)%10] || s[v] || s[0]);
}

const ACCENT       = "#D4AF37";
const ACCENT_LIGHT = "#FFE082";
const C1           = "#D4AF37";
const C2           = "#FFD700";

const RECTS = [
  {x:52,y:52,w:13,h:5,a:28},{x:138,y:40,w:10,h:4,a:-18},{x:222,y:34,w:8,h:4,a:55},
  {x:308,y:46,w:12,h:5,a:-35},{x:402,y:36,w:10,h:4,a:65},{x:490,y:50,w:8,h:4,a:-48},
  {x:558,y:42,w:10,h:4,a:38},{x:28,y:152,w:8,h:4,a:42},{x:572,y:148,w:8,h:4,a:-38},
  {x:24,y:250,w:10,h:4,a:55},{x:576,y:246,w:10,h:4,a:-45},{x:80,y:656,w:12,h:5,a:28},
  {x:520,y:650,w:10,h:4,a:-35},{x:155,y:668,w:8,h:4,a:55},{x:445,y:662,w:10,h:4,a:-22},
];
const DOTS = [
  {x:165,y:22,r:3.5},{x:362,y:18,r:3},{x:530,y:25,r:3.5},{x:72,y:20,r:3},
  {x:248,y:16,r:4},{x:450,y:640,r:3},{x:200,y:650,r:3.5},{x:350,y:636,r:4},
];

export default function AnniversaryTemplateElegant({ formData, message, id }: Props) {
  const yearsLabel = formData.years > 0 ? `${ordinal(formData.years)} Work Anniversary` : "Work Anniversary";

  return (
    <div id={id} style={{
      width: "600px", height: "780px", position: "relative", overflow: "hidden",
      background: "linear-gradient(155deg, #0D1117 0%, #161B22 55%, #21262D 100%)",
      fontFamily: "Georgia, 'Times New Roman', serif",
    }}>
      {/* ── SVG layer ── */}
      <svg style={{ position:"absolute", inset:0, width:"600px", height:"780px", pointerEvents:"none", zIndex:2 }}
        viewBox="0 0 600 780">

        {/* Confetti rects */}
        {RECTS.map((p, i) => (
          <rect key={i} x={p.x-p.w/2} y={p.y-p.h/2} width={p.w} height={p.h}
            fill={i%2===0 ? C1 : C2} opacity={0.80}
            transform={`rotate(${p.a} ${p.x} ${p.y})`} rx={1.5} />
        ))}
        {DOTS.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r}
            fill={i%2===0 ? C1 : C2} opacity={0.75} />
        ))}

        {/* Subtle gold glow arcs */}
        <ellipse cx={-20} cy={390} rx={50} ry={320} fill="none" stroke="#D4AF37" strokeWidth={8} opacity={0.18} />
        <ellipse cx={620} cy={390} rx={50} ry={320} fill="none" stroke="#D4AF37" strokeWidth={8} opacity={0.18} />

        {/* Left sparkle */}
        <path d="M46,578 L50,596 L62,600 L50,604 L46,622 L42,604 L30,600 L42,596 Z" fill={ACCENT} opacity={0.90} />
        <circle cx={46} cy={600} r={5} fill={ACCENT_LIGHT} opacity={0.80} />
        <path d="M36,618 L38,624 L44,626 L38,628 L36,634 L34,628 L28,626 L34,624 Z" fill={ACCENT} opacity={0.70} />

        {/* Right sparkle */}
        <path d="M554,578 L558,596 L570,600 L558,604 L554,622 L550,604 L538,600 L550,596 Z" fill={ACCENT} opacity={0.90} />
        <circle cx={554} cy={600} r={5} fill={ACCENT_LIGHT} opacity={0.80} />
        <path d="M564,618 L566,624 L572,626 L566,628 L564,634 L562,628 L556,626 L562,624 Z" fill={ACCENT} opacity={0.70} />

        {/* Left award star */}
        <polygon points="76,702 81.9,717.9 98.8,718.6 85.5,729.1 90.1,745.4 76,736 61.9,745.4 66.5,729.1 53.2,718.6 70.1,717.9"
          fill={ACCENT} opacity={0.90} />
        <polygon points="76,710 79.9,720.7 91.3,721.2 82.4,727.5 85.5,738.6 76,732.4 66.5,738.6 69.6,727.5 60.7,721.2 72.1,720.7"
          fill={ACCENT_LIGHT} opacity={0.80} />
        <circle cx={76} cy={726} r={6} fill="white" opacity={0.85} />

        {/* Right award star */}
        <polygon points="524,702 529.9,717.9 546.8,718.6 533.5,729.1 538.1,745.4 524,736 509.9,745.4 514.5,729.1 501.2,718.6 518.1,717.9"
          fill={ACCENT} opacity={0.90} />
        <polygon points="524,710 527.9,720.7 539.3,721.2 530.4,727.5 533.5,738.6 524,732.4 514.5,738.6 517.6,727.5 508.7,721.2 520.1,720.7"
          fill={ACCENT_LIGHT} opacity={0.80} />
        <circle cx={524} cy={726} r={6} fill="white" opacity={0.85} />

        {/* Outer border */}
        <rect x={6} y={6} width={588} height={768} rx={8}
          fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth={1.5} />
      </svg>

      {/* ── Logo pill ── */}
      <div style={{ position:"absolute", top:"18px", left:0, right:0, display:"flex", justifyContent:"center", zIndex:4 }}>
        <div style={{ backgroundColor:"rgba(20,15,5,0.60)", borderRadius:"14px", padding:"6px 22px", border:"1px solid rgba(212,175,55,0.40)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aeonx-logo-light.png" alt="AeonX Digital"
            style={{ height:"44px", objectFit:"contain", display:"block" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
      </div>

      {/* ── Photo frame ── */}
      <div style={{
        position:"absolute", top:"88px", left:"50%", transform:"translateX(-50%)",
        width:"210px", height:"255px", zIndex:4,
        border:`3px solid ${ACCENT}`,
        borderRadius:"10px",
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
        color:"#D4AF37", fontSize:"26px", fontWeight:800,
        letterSpacing:"1.5px", textTransform:"uppercase",
      }}>
        {formData.name || "Employee Name"}
      </div>

      {/* ── Role ── */}
      {formData.role && (
        <div style={{
          position:"absolute", top:"398px", left:"20px", right:"20px",
          textAlign:"center", zIndex:4,
          color:"rgba(255,255,255,0.85)", fontSize:"13px", fontWeight:600,
          letterSpacing:"1.5px", textTransform:"uppercase",
        }}>
          {formData.role}
        </div>
      )}

      {/* ── Years Work Anniversary ── */}
      <div style={{
        position:"absolute",
        top: formData.role ? "422px" : "400px",
        left:"16px", right:"16px",
        textAlign:"center", zIndex:4,
        fontFamily:'"Brush Script MT","Segoe Script",cursive',
        fontSize:"52px", lineHeight:1.1,
        color:"#D4AF37",
        textShadow:"0 0 24px rgba(212,175,55,0.40)",
      }}>
        {yearsLabel}
      </div>

      {/* ── Message ── */}
      <div style={{
        position:"absolute",
        top: formData.role ? "548px" : "526px",
        left:"72px", right:"72px",
        textAlign:"center", zIndex:4,
        color:"rgba(235,235,235,1)", fontSize:"15px", lineHeight:"1.75", fontWeight:400, fontStyle:"italic",
      }}>
        {message || <span style={{ color:"rgba(160,140,80,0.55)", fontStyle:"italic" }}>Fill in details and generate a message...</span>}
      </div>

      {/* ── Footer ── */}
      <div style={{ position:"absolute", bottom:"24px", left:0, right:0, textAlign:"center", zIndex:4 }}>
        <div style={{ color:"rgba(255,255,255,0.60)", fontSize:"14px" }}>Best Regards,</div>
        <div style={{ color:"rgba(255,255,255,0.88)", fontSize:"16px", fontWeight:"bold", marginTop:"3px" }}>The AeonX Team</div>
      </div>
    </div>
  );
}
