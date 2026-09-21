// Motif d'arrière-plan des pages d'authentification.
// Dessiné directement en SVG : aucune image à charger, donc rien qui puisse être endommagé.
// Des sphères aux anneaux hexagonaux, très discrètes, sur le gris de la sidebar.

const BASE = '#565b5f'; // même gris que la sidebar du Dashboard

// cx, cy, r : position et rayon dans un repère de 1500 x 1000 ; rot : rotation des hexagones.
// Dessinées de l'arrière vers l'avant.
const SPHERES = [
  { cx: 840, cy: 110, r: 340, rot: 15 },
  { cx: 1000, cy: 610, r: 280, rot: 0 },
  { cx: 200, cy: 220, r: 360, rot: 30 },
  { cx: 120, cy: 790, r: 240, rot: 10 },
  { cx: 1300, cy: 170, r: 230, rot: 20 },
  { cx: 1330, cy: 600, r: 200, rot: 40 },
  { cx: 1290, cy: 940, r: 190, rot: 5 },
  { cx: 540, cy: 500, r: 190, rot: 25 },
  { cx: 660, cy: 880, r: 310, rot: 0 },
];

const RINGS = 10;

function hexagon(cx, cy, r, rotDeg) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((60 * i + rotDeg) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
}

export default function AuthBackground() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1500 1000"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="auth-bg-shade" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.07" />
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.12" />
        </radialGradient>
        {SPHERES.map((s, i) => (
          <clipPath id={`auth-bg-clip-${i}`} key={i}>
            <circle cx={s.cx} cy={s.cy} r={s.r} />
          </clipPath>
        ))}
      </defs>

      {SPHERES.map((s, i) => (
        <g key={i}>
          <circle cx={s.cx} cy={s.cy} r={s.r} fill={BASE} />
          <circle cx={s.cx} cy={s.cy} r={s.r} fill="url(#auth-bg-shade)" />
          <g
            clipPath={`url(#auth-bg-clip-${i})`}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.035"
            strokeWidth={s.r / 26}
          >
            {Array.from({ length: RINGS }, (_, k) => (
              <polygon
                key={k}
                points={hexagon(s.cx, s.cy, (s.r * 1.25 * (k + 1)) / RINGS, s.rot)}
              />
            ))}
          </g>
        </g>
      ))}
    </svg>
  );
}
