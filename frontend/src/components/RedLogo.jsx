// Logo RED PRODUCT — tracés exacts extraits du SVG de la maquette (Se_connecter.svg).
export default function RedLogo({ size = 26.66, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26.663 26.663"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 0H26.663V26.663L0 0Z" fill="white" />
      <path d="M0 0H19.997L13.331 13.332L0 0Z" fill="black" fillOpacity="0.15" />
      <path d="M0 0H13.331L0 26.663V0Z" fill="white" />
    </svg>
  );
}
