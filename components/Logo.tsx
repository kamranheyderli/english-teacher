import { site } from "@/data/site";

export function LogoMark({ size = 42 }: { size?: number }) {
  return (
    <svg className="logo__mark" width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7b5cff" />
          <stop offset="0.6" stopColor="#c58bd6" />
          <stop offset="1" stopColor="#f2a7b5" />
        </linearGradient>
      </defs>
      {/* speech bubble */}
      <path
        d="M24 3C12.4 3 4 10.9 4 21c0 5.6 2.6 10.5 6.8 13.8L9 44l9.6-5.2c1.7.4 3.5.6 5.4.6 11.6 0 20-7.9 20-18.2S35.6 3 24 3Z"
        fill="url(#logo-g)"
      />
      <text
        x="24.5"
        y="27.5"
        textAnchor="middle"
        fill="#fff"
        fontSize="17"
        fontStyle="italic"
        fontWeight="700"
        style={{ fontFamily: "var(--font-display), Georgia, serif" }}
      >
        RH
      </text>
      {/* sparkle */}
      <path className="logo__spark" d="M41 2l1.3 3.2L45.5 6.5l-3.2 1.3L41 11l-1.3-3.2L36.5 6.5l3.2-1.3Z" fill="#e8c27a" />
    </svg>
  );
}

export default function Logo() {
  return (
    <a href="#top" className="logo" aria-label={`${site.name} — ana səhifə`}>
      <LogoMark />
      <span className="logo__text">
        <span className="logo__name">{site.name}</span>
        <span className="logo__sub" lang="en">{site.role}</span>
      </span>
    </a>
  );
}
