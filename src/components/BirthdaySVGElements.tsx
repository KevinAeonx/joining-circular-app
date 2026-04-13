// Shared birthday SVG components used across all templates

function dripPath(cx: number, y: number, width: number): string {
  const hw = width / 2;
  const count = Math.max(3, Math.floor(width / 18));
  const dw = width / count;
  let d = `M ${cx - hw} ${y}`;
  for (let i = 0; i < count; i++) {
    const x1 = cx - hw + i * dw;
    const x2 = x1 + dw;
    const mx = (x1 + x2) / 2;
    d += ` Q ${mx} ${y + 13} ${x2} ${y}`;
  }
  d += ` V ${y - 7} H ${cx - hw} Z`;
  return d;
}

export function BirthdayCake({ x, y, s = 1, t1 = "#FF8FAB", t2 = "#FF6B9D", t3 = "#EC407A",
  frost = "#ffffff", plate = "#e0d0ff", candleColors = ["#FFD700","#FF6B6B","#4ECDC4","#A29BFE","#6BCB77"],
  opacity = 1 }: {
  x: number; y: number; s?: number;
  t1?: string; t2?: string; t3?: string; frost?: string; plate?: string;
  candleColors?: string[]; opacity?: number;
}) {
  const cc = candleColors;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      {/* Plate */}
      <ellipse cx={0} cy={6} rx={66} ry={10} fill={plate} opacity={0.55} />
      {/* Bottom tier */}
      <rect x={-56} y={-42} width={112} height={48} rx={8} fill={t1} />
      <path d={dripPath(0, -42, 112)} fill={frost} opacity={0.88} />
      {/* Deco dots bottom */}
      {[-36,-18,0,18,36].map((dx,i) => <circle key={i} cx={dx} cy={-18} r={4.5} fill={cc[i%cc.length]} opacity={0.9}/>)}
      {/* Middle tier */}
      <rect x={-39} y={-76} width={78} height={36} rx={7} fill={t2} />
      <path d={dripPath(0, -76, 78)} fill={frost} opacity={0.88} />
      {/* Deco dots middle */}
      {[-22,-8,8,22].map((dx,i) => <circle key={i} cx={dx} cy={-57} r={3.5} fill={cc[(i+2)%cc.length]} opacity={0.9}/>)}
      {/* Top tier */}
      <rect x={-25} y={-102} width={50} height={28} rx={6} fill={t3} />
      <path d={dripPath(0, -102, 50)} fill={frost} opacity={0.88} />
      {/* Candles */}
      {[-16,-8,0,8,16].map((cx,i) => (
        <g key={i}>
          <rect x={cx-3.5} y={-122} width={7} height={22} rx={2.5} fill={cc[i%cc.length]} />
          <ellipse cx={cx} cy={-127} rx={4.5} ry={7} fill="#FFE566" opacity={0.95} />
          <ellipse cx={cx} cy={-130} rx={2.8} ry={5} fill="#FF9800" />
          <ellipse cx={cx} cy={-132} rx={1.5} ry={3} fill="#ffffff" opacity={0.85} />
          <circle  cx={cx} cy={-127} r={9}   fill="#FFD700" opacity={0.14} />
        </g>
      ))}
    </g>
  );
}

export function Cupcake({ x, y, s = 1, base = "#FF8FAB", cream = "#ffffff", cherry = "#FF1744", opacity = 1 }: {
  x: number; y: number; s?: number; base?: string; cream?: string; cherry?: string; opacity?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      {/* Base wrapper */}
      <path d="M -18 0 L -22 -28 L 22 -28 L 18 0 Z" fill={base} />
      {/* Wrapper lines */}
      {[-12,-6,0,6,12].map((dx,i) => (
        <line key={i} x1={dx} y1={-28} x2={dx + (dx < 0 ? -2 : 2)} y2={0}
          stroke="rgba(0,0,0,0.12)" strokeWidth={1} />
      ))}
      {/* Cream swirl */}
      <ellipse cx={0} cy={-32} rx={18} ry={8} fill={cream} />
      <ellipse cx={0} cy={-38} rx={13} ry={7} fill={cream} />
      <ellipse cx={0} cy={-43} rx={8} ry={6} fill={cream} />
      <ellipse cx={0} cy={-47} rx={5} ry={4} fill={cream} />
      {/* Cherry on top */}
      <circle cx={0} cy={-52} r={5} fill={cherry} />
      <circle cx={0} cy={-52} r={2.5} fill="rgba(255,255,255,0.4)" />
      {/* Stem */}
      <path d="M 2 -52 Q 8 -60 4 -64" stroke="#4CAF50" strokeWidth={1.5} fill="none" strokeLinecap="round" />
    </g>
  );
}

export function GiftBox({ x, y, s = 1, box = "#FF6B6B", lid = "#E53935", ribbon = "#FFD700", opacity = 1 }: {
  x: number; y: number; s?: number; box?: string; lid?: string; ribbon?: string; opacity?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      {/* Shadow */}
      <ellipse cx={1} cy={5} rx={28} ry={6} fill="rgba(0,0,0,0.15)" />
      {/* Box body */}
      <rect x={-25} y={-42} width={50} height={47} rx={4} fill={box} />
      {/* Lid */}
      <rect x={-28} y={-52} width={56} height={14} rx={4} fill={lid} />
      {/* Vertical ribbon */}
      <rect x={-3.5} y={-52} width={7} height={61} fill={ribbon} opacity={0.88} />
      {/* Horizontal ribbon */}
      <rect x={-28} y={-30} width={56} height={7} fill={ribbon} opacity={0.88} />
      {/* Left bow loop */}
      <ellipse cx={-13} cy={-56} rx={12} ry={7} fill={ribbon}
        transform="rotate(-30 -13 -56)" opacity={0.95} />
      {/* Right bow loop */}
      <ellipse cx={13} cy={-56} rx={12} ry={7} fill={ribbon}
        transform="rotate(30 13 -56)" opacity={0.95} />
      {/* Bow knot */}
      <circle cx={0} cy={-55} r={5.5} fill={ribbon} />
      {/* Shine on box */}
      <rect x={-20} y={-40} width={6} height={40} rx={3} fill="rgba(255,255,255,0.18)" />
    </g>
  );
}

export function Balloon({ x, y, rx = 22, ry = 28, color = "#FFD700", stringLen = 110 }: {
  x: number; y: number; rx?: number; ry?: number; color?: string; stringLen?: number;
}) {
  const knotY = y + ry;
  return (
    <g>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={color} />
      <ellipse cx={x - rx * 0.28} cy={y - ry * 0.28} rx={rx * 0.2} ry={ry * 0.22} fill="rgba(255,255,255,0.44)" />
      <polygon points={`${x-4},${knotY} ${x+4},${knotY} ${x},${knotY+10}`} fill={color} />
      <path d={`M ${x} ${knotY+10} C ${x+18} ${knotY+50} ${x-12} ${knotY+88} ${x+6} ${knotY+stringLen}`}
        stroke="rgba(60,40,0,0.38)" strokeWidth="1.4" fill="none" />
    </g>
  );
}

export function Bunting({ y = 38, colors = ["#FF6B6B","#FFD93D","#6BCB77","#4ECDC4","#A29BFE","#FF9FF3"],
  strokeColor = "rgba(100,80,50,0.45)", opacity = 1 }: {
  y?: number; colors?: string[]; strokeColor?: string; opacity?: number;
}) {
  const count = 13;
  const xs = Array.from({ length: count }, (_, i) => 28 + i * ((600 - 56) / (count - 1)));
  const ys = xs.map((_, i) => y + Math.sin(i * (Math.PI / (count - 1))) * 14);
  const pathD = `M ${xs[0]} ${ys[0]} ` + xs.slice(1).map((x,i) => `L ${x} ${ys[i+1]}`).join(' ');
  return (
    <g opacity={opacity}>
      <path d={pathD} stroke={strokeColor} strokeWidth="1.8" fill="none" />
      {xs.map((fx, i) => (
        <polygon key={i}
          points={`${fx-11},${ys[i]} ${fx+11},${ys[i]} ${fx},${ys[i]+24}`}
          fill={colors[i % colors.length]} opacity={0.88}
        />
      ))}
    </g>
  );
}

export function PartyPopper({ x, y, angle = 0, c1 = "#FF6B6B", c2 = "#FFD93D", opacity = 1 }: {
  x: number; y: number; angle?: number; c1?: string; c2?: string; opacity?: number;
}) {
  const streamers = [
    { dx: -28, dy: -32, c: "#FF6B6B" }, { dx: -12, dy: -44, c: "#FFD93D" },
    { dx: 4,   dy: -40, c: "#4ECDC4" }, { dx: 18,  dy: -28, c: "#A29BFE" },
    { dx: -20, dy: -20, c: "#6BCB77" },
  ];
  const dots = [
    { dx: -20, dy: -30 }, { dx: -8, dy: -42 }, { dx: 6, dy: -38 }, { dx: 16, dy: -26 },
  ];
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} opacity={opacity}>
      {/* Cone body */}
      <path d="M 0 0 L 34 -16 L 30 6 Z" fill={c1} />
      <path d="M 0 0 L 34 -16 L 30 -5 Z" fill={c2} opacity={0.55} />
      {/* Rim */}
      <ellipse cx={31} cy={-7} rx={9} ry={7} fill={c2} />
      {/* Streamers */}
      {streamers.map((s, i) => (
        <path key={i}
          d={`M 31 -7 Q ${31+s.dx/2} ${-7+s.dy/2} ${31+s.dx} ${-7+s.dy}`}
          stroke={s.c} strokeWidth={3} fill="none" strokeLinecap="round" />
      ))}
      {/* Confetti dots */}
      {dots.map((d, i) => (
        <circle key={i} cx={31+d.dx} cy={-7+d.dy} r={3}
          fill={streamers[i % streamers.length].c} opacity={0.85} />
      ))}
    </g>
  );
}

export function StarSparkle({ x, y, r = 8, color = "#FFD700", opacity = 1 }: {
  x: number; y: number; r?: number; color?: string; opacity?: number;
}) {
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4 - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.42;
    pts.push(`${x + Math.cos(a) * rad},${y + Math.sin(a) * rad}`);
  }
  return <polygon points={pts.join(" ")} fill={color} opacity={opacity} />;
}
