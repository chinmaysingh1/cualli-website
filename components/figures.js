// Animated schematic figures for the Science and Platform sections.
//
// These are plain SVG driven entirely by CSS keyframes (declared in
// app/globals.css), so they render on the server and need no JS to animate —
// and they go still automatically under `prefers-reduced-motion: reduce`.
// Accent colours are module constants (see the note on AC below) and mirror the
// --ac / --acw custom properties declared in app/globals.css.

// Literal hex rather than the --ac / --acw custom properties: these values are
// used in SVG *presentation attributes* (fill=, stroke=, stop-color=), which
// are not allowed to reference var(). Keep in sync with :root in globals.css.
const AC = "#86e8a8";
const ACW = "#c06e3b";

const MONO = {
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  fontSize: 8.5,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  fill: "#6e7873",
};

// Plot frame: 30..344 on x, 20..176 on y, leaving room for axis labels.
const PLOT_X0 = 30;
const PLOT_X1 = 344;
const PLOT_Y1 = 176;

function GridLines({ ys = [42, 76, 110, 144] }) {
  return ys.map((y) => (
    <line
      key={y}
      x1={PLOT_X0}
      x2={PLOT_X1}
      y1={y}
      y2={y}
      stroke="rgba(234,239,236,.06)"
      strokeWidth={1}
    />
  ));
}

function Axes() {
  return (
    <g stroke="rgba(234,239,236,.2)" strokeWidth={1}>
      <line x1={PLOT_X0} x2={PLOT_X1} y1={PLOT_Y1} y2={PLOT_Y1} />
      <line x1={PLOT_X0} x2={PLOT_X0} y1={20} y2={PLOT_Y1} />
    </g>
  );
}

// A plot line that draws itself in on loop.
function DrawnPath({ d, stroke, delay = 0, width = 2 }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      style={{
        strokeDasharray: 520,
        animation: `cualliDraw 7s ${delay}s ease-out infinite`,
      }}
    />
  );
}

// A dot that travels along `d`.
function Runner({ d, fill, dur, delay = 0, r = 4.5, glow = true }) {
  return (
    <circle
      r={r}
      cx={0}
      cy={0}
      fill={fill}
      style={{
        offsetPath: `path('${d}')`,
        offsetRotate: "0deg",
        animation: `cualliRun ${dur}s ${delay}s linear infinite`,
        filter: glow ? `drop-shadow(0 0 6px ${fill})` : undefined,
      }}
    />
  );
}

function Frame({ viewBox, children, clip = false }) {
  return (
    <svg
      viewBox={viewBox}
      width="100%"
      aria-hidden="true"
      style={{ display: "block", overflow: clip ? "hidden" : "visible" }}
    >
      {children}
    </svg>
  );
}

// ---- Step 01: colonization curve ------------------------------------------

const COL_CURVE = "M30,168 C74,164 84,96 132,76 C190,52 266,44 344,42";

export function ColonizationFigure() {
  return (
    <Frame viewBox="0 0 360 200">
      <defs>
        <linearGradient id="cg1" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0%" stopColor={AC} stopOpacity={0.26} />
          <stop offset="100%" stopColor={AC} stopOpacity={0} />
        </linearGradient>
      </defs>
      <g>
        <GridLines />
      </g>
      <path
        d={`${COL_CURVE} L344,176 L30,176 Z`}
        fill="url(#cg1)"
        style={{ animation: "cualliFadeIn 7s ease-out infinite" }}
      />
      <Axes />
      {/* Plateau marker */}
      <line
        x1={132}
        x2={132}
        y1={76}
        y2={176}
        stroke="rgba(234,239,236,.18)"
        strokeWidth={1}
        strokeDasharray="3 4"
      />
      <DrawnPath d={COL_CURVE} stroke={AC} />
      <g style={{ animation: "cualliFadeIn 7s ease-out infinite" }}>
        {[
          { cx: 30, cy: 168, r: 3.2, delay: 0 },
          { cx: 132, cy: 76, r: 3.6, delay: 0.4 },
          { cx: 240, cy: 50, r: 3.2, delay: 0.8 },
          { cx: 344, cy: 42, r: 3.6, delay: 1.2 },
        ].map((n) => (
          <circle
            key={n.cx}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill={AC}
            style={{
              animation: `cualliNode 2.6s ${n.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </g>
      <text x={138} y={68} style={{ ...MONO, fill: ACW }}>
        plateau
      </text>
      <text x={30} y={14} style={MONO}>
        log CFU / g stool
      </text>
      <text x={30} y={192} style={MONO}>
        day 0
      </text>
      <text x={178} y={192} style={MONO}>
        day 7
      </text>
      <text x={310} y={192} style={MONO}>
        day 14
      </text>
    </Frame>
  );
}

// ---- Step 02: capture inside a single chassis cell -------------------------
//
// Zoomed in one level from the Science figure: instead of cells moving through
// the lumen, this is one cell held still so the mechanism is legible — free
// PFAS drift in, dock at a surface-displayed binding domain, and pile up
// inside. The occupancy meter keeps the quantitative read the earlier
// isotherm plot carried.

const CELL = { x: 120, y: 46, w: 180, h: 90, rx: 45 };
const CELL_CY = CELL.y + CELL.h / 2; // 91

// Binding domains: a stalk off the membrane with a receptor head on the tip.
const RECEPTORS = [
  ...[150, 180, 210, 240, 270].map((x) => ({
    x1: x, y1: CELL.y, x2: x, y2: CELL.y - 8, cx: x, cy: CELL.y - 10,
  })),
  ...[150, 180, 210, 240, 270].map((x) => ({
    x1: x, y1: CELL.y + CELL.h, x2: x, y2: CELL.y + CELL.h + 8,
    cx: x, cy: CELL.y + CELL.h + 10,
  })),
  { x1: CELL.x, y1: CELL_CY, x2: CELL.x - 8, y2: CELL_CY, cx: CELL.x - 10, cy: CELL_CY },
];

// Approach paths from the lumen to a receptor head.
const INFLOWS = [
  { d: "M4,24 C46,26 96,30 148,34", dur: 3.2, delay: 0 },
  { d: "M4,96 C38,94 74,92 106,91", dur: 3.6, delay: 0.9 },
  { d: "M4,178 C56,174 116,160 178,146", dur: 3.4, delay: 1.8 },
  { d: "M4,58 C58,54 142,40 208,34", dur: 4, delay: 2.6 },
];

// Captured molecules, placed clear of the membrane. Index drives which
// cualliFill keyframe (and therefore which slot in the cycle) each one uses.
const LOAD = [
  { cx: 155, cy: 88 },
  { cx: 178, cy: 70 },
  { cx: 182, cy: 108 },
  { cx: 208, cy: 90 },
  { cx: 232, cy: 72 },
  { cx: 238, cy: 108 },
  { cx: 262, cy: 90 },
];

const CYCLE = "9s";

export function CaptureFigure() {
  return (
    <Frame viewBox="0 0 360 200">
      <defs>
        <radialGradient id="cgcell" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={AC} stopOpacity={0.16} />
          <stop offset="100%" stopColor={AC} stopOpacity={0.03} />
        </radialGradient>
      </defs>

      {/* Cell body */}
      <rect
        x={CELL.x}
        y={CELL.y}
        width={CELL.w}
        height={CELL.h}
        rx={CELL.rx}
        fill="#0f1614"
        stroke={AC}
        strokeOpacity={0.7}
        strokeWidth={1.6}
        style={{ filter: "drop-shadow(0 0 14px rgba(134,232,168,.35))" }}
      />
      <rect
        x={CELL.x}
        y={CELL.y}
        width={CELL.w}
        height={CELL.h}
        rx={CELL.rx}
        fill="url(#cgcell)"
      />

      {/* Surface-displayed binding domains */}
      <g>
        {RECEPTORS.map((r, i) => (
          <g
            key={`${r.cx}-${r.cy}`}
            style={{
              animation: `cualliDock 2.8s ${(i % 5) * 0.4}s ease-in-out infinite`,
            }}
          >
            <line
              x1={r.x1}
              y1={r.y1}
              x2={r.x2}
              y2={r.y2}
              stroke={AC}
              strokeOpacity={0.8}
              strokeWidth={1.3}
            />
            <circle cx={r.cx} cy={r.cy} r={2.4} fill={AC} />
          </g>
        ))}
      </g>

      {/* Captured PFAS accumulating inside */}
      <g>
        {LOAD.map((dot, i) => (
          <circle
            key={`${dot.cx}-${dot.cy}`}
            cx={dot.cx}
            cy={dot.cy}
            r={3.4}
            fill={ACW}
            // No `opacity: 0` base style here: under prefers-reduced-motion
            // the animation is cut to ~0s, and the element falls back to its
            // base style. Leaving it visible means the still frame shows a
            // loaded cell, which is the point of the figure.
            style={{
              animation: `cualliFill${i + 1} ${CYCLE} linear infinite`,
            }}
          />
        ))}
      </g>

      {/* Free PFAS drifting in from the lumen */}
      <g>
        {INFLOWS.map((f) => (
          <circle
            key={f.d}
            r={3.4}
            cx={0}
            cy={0}
            fill={ACW}
            style={{
              offsetPath: `path('${f.d}')`,
              offsetRotate: "0deg",
              animation: `cualliInflow ${f.dur}s ${f.delay}s linear infinite`,
            }}
          />
        ))}
      </g>

      {/* Occupancy meter */}
      <rect
        x={CELL.x}
        y={171}
        width={CELL.w}
        height={5}
        rx={2.5}
        fill="rgba(234,239,236,.1)"
      />
      <rect
        x={CELL.x}
        y={171}
        width={CELL.w}
        height={5}
        rx={2.5}
        fill={ACW}
        style={{
          transformBox: "fill-box",
          transformOrigin: "left center",
          animation: `cualliOccupancy ${CYCLE} linear infinite`,
        }}
      />

      <text x={4} y={14} style={MONO}>
        free PFAS in lumen
      </text>
      <text x={CELL.x} y={28} style={{ ...MONO, fill: AC }}>
        binding domains
      </text>
      <text x={CELL.x} y={163} style={{ ...MONO, fill: ACW }}>
        bound load per cell
      </text>
      <text x={260} y={192} style={MONO}>
        capacity
      </text>
    </Frame>
  );
}

// ---- Step 03: mass balance ------------------------------------------------

const FLOW_UP = "M64,96 C132,58 206,50 300,54";
const FLOW_DN = "M64,112 C130,138 188,152 300,156";

export function MassBalanceFigure() {
  return (
    <Frame viewBox="0 0 360 200">
      {/* dose in */}
      <rect
        x={30}
        y={62}
        width={24}
        height={84}
        rx={4}
        fill={ACW}
        fillOpacity={0.5}
        stroke={ACW}
        strokeOpacity={0.7}
      />
      {/* cleared channel */}
      <path
        d={FLOW_UP}
        fill="none"
        stroke="rgba(134,232,168,.22)"
        strokeWidth={12}
        strokeLinecap="round"
      />
      {/* retained channel */}
      <path
        d={FLOW_DN}
        fill="none"
        stroke="rgba(234,239,236,.08)"
        strokeWidth={7}
        strokeLinecap="round"
      />
      {[0, 0.7, 1.4, 2.1].map((delay) => (
        <Runner key={delay} d={FLOW_UP} fill={AC} dur={3.4} delay={delay} />
      ))}
      <Runner d={FLOW_DN} fill="#8b948f" dur={5.2} r={3} glow={false} />
      {/* cleared / retained reservoirs */}
      <rect
        x={306}
        y={30}
        width={24}
        height={52}
        rx={4}
        fill={AC}
        fillOpacity={0.55}
        stroke={AC}
        strokeOpacity={0.8}
      />
      <rect
        x={306}
        y={140}
        width={24}
        height={18}
        rx={4}
        fill="#6e7873"
        fillOpacity={0.5}
      />
      <text x={22} y={172} style={{ ...MONO, fill: ACW }}>
        dose in
      </text>
      <text x={120} y={44} style={{ ...MONO, fill: AC }}>
        bound → stool
      </text>
      <text x={150} y={180} style={MONO}>
        absorbed
      </text>
      <text x={296} y={22} style={MONO}>
        cleared
      </text>
      <text x={296} y={176} style={MONO}>
        retained
      </text>
    </Frame>
  );
}

// ---- Science section: capture inside the lumen -----------------------------

// One undulating gut wall. `flip` mirrors the scallops for the lower wall.
function Wall({ y, flip }) {
  const dy = flip ? 26 : -26;
  const seg = ` q22,${dy} 44,0`;
  return (
    <path
      d={`M0,${y}${seg.repeat(9)}`}
      fill="none"
      stroke="rgba(234,239,236,.16)"
      strokeWidth={1.4}
    />
  );
}

// A free PFAS molecule drifting downstream.
function Particle({ y, delay, dur }) {
  return (
    <circle
      cx={0}
      cy={y}
      r={3.4}
      fill={ACW}
      style={{ animation: `cualliCapture ${dur}s ${delay}s linear infinite` }}
    />
  );
}

// An engrafted chassis cell that fills with bound PFAS, then exits.
function Cell({ x, y, delay, dur }) {
  const a = `${dur}s ${delay}s linear infinite`;
  return (
    <g style={{ animation: `cualliCell ${a}` }}>
      <rect
        x={x}
        y={y}
        width={36}
        height={18}
        rx={9}
        fill="#0f1614"
        stroke={AC}
        strokeOpacity={0.75}
        strokeWidth={1.3}
        style={{ filter: "drop-shadow(0 0 10px rgba(134,232,168,.5))" }}
      />
      <circle
        cx={x + 11}
        cy={y + 9}
        r={2.6}
        fill={ACW}
        style={{ animation: `cualliClumpA ${a}` }}
      />
      <circle
        cx={x + 19}
        cy={y + 6.5}
        r={2}
        fill={ACW}
        style={{ animation: `cualliClumpB ${a}` }}
      />
      <circle
        cx={x + 26}
        cy={y + 11}
        r={2.3}
        fill={ACW}
        style={{ animation: `cualliClumpC ${a}` }}
      />
    </g>
  );
}

const CELLS = [
  { x: 160, y: 104, delay: 0, dur: 16 },
  { x: 204, y: 138, delay: 4, dur: 18 },
  { x: 168, y: 170, delay: 9, dur: 17 },
  { x: 210, y: 80, delay: 13, dur: 19 },
];

const PARTICLES = [
  { y: 92, delay: 0, dur: 11 },
  { y: 122, delay: 2.4, dur: 13 },
  { y: 150, delay: 1.2, dur: 10 },
  { y: 178, delay: 3.6, dur: 12 },
  { y: 206, delay: 4.8, dur: 14 },
  { y: 136, delay: 6.4, dur: 11.5 },
  { y: 196, delay: 7.8, dur: 13.5 },
  { y: 108, delay: 9, dur: 12.5 },
];

export function LumenFigure() {
  return (
    <Frame viewBox="0 0 400 300" clip>
      <defs>
        <linearGradient id="cgb" x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0%" stopColor={AC} stopOpacity={0} />
          <stop offset="50%" stopColor={AC} stopOpacity={0.3} />
          <stop offset="100%" stopColor={AC} stopOpacity={0} />
        </linearGradient>
      </defs>
      <g
        style={{
          transformOrigin: "200px 150px",
          animation: "cualliPeri 7s ease-in-out infinite",
        }}
      >
        <Wall y={58} />
        <Wall y={242} flip />
        <rect
          x={150}
          y={62}
          width={110}
          height={176}
          fill="url(#cgb)"
          style={{ animation: "cualliGlowBand 5s ease-in-out infinite" }}
        />
        <g>
          {CELLS.map((c) => (
            <Cell key={`${c.x}-${c.y}`} {...c} />
          ))}
        </g>
        <g>
          {PARTICLES.map((p) => (
            <Particle key={`${p.y}-${p.delay}`} {...p} />
          ))}
        </g>
      </g>
      <text x={6} y={288} style={MONO}>
        lumen in
      </text>
      <text x={150} y={288} style={{ ...MONO, fill: AC }}>
        engrafted chassis
      </text>
      <text x={290} y={288} style={{ ...MONO, fill: "#7d8781" }}>
        excreted intact
      </text>
      <text x={6} y={46} style={MONO}>
        epithelium
      </text>
    </Frame>
  );
}
