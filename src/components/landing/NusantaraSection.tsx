import { indonesiaMapDots } from "./indonesia-map-dots"
import { Container, SECTION_X } from "./layout"

const GRADIENT_ID = "indonesia-map-dot"

/**
 * Dot-matrix map of the archipelago: ~5,200 rounded squares that all share one
 * vertical gradient. The geometry lives in `indonesia-map-dots.ts`.
 */
function IndonesiaMap() {
  return (
    <div className="aspect-[1440/523.128] max-w-[1440px] relative w-full">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="523.128"
        preserveAspectRatio="none"
        viewBox="0 0 1440 523.128"
        width="1440"
      >
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={GRADIENT_ID}
            x1="720"
            x2="720"
            y1="0"
            y2="523.128"
          >
            <stop stopColor="#271819" />
            <stop offset="1" stopColor="#4E2224" />
          </linearGradient>
        </defs>
        {indonesiaMapDots.map((d, i) => (
          <path d={d} fill={`url(#${GRADIENT_ID})`} key={i} />
        ))}
      </svg>
    </div>
  )
}

export function NusantaraSection() {
  return (
    <section
      className={`overflow-hidden py-[80px] relative w-full md:py-[120px] ${SECTION_X}`}
    >
      {/* The map is a backdrop: centred, capped at 1440px, behind the copy. */}
      <div
        aria-hidden
        className={`absolute flex inset-0 items-center justify-center pointer-events-none ${SECTION_X}`}
      >
        <IndonesiaMap />
      </div>
      <Container className="relative">
        <div className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[0] relative text-[#f5f5f5] text-[0px] text-center w-full whitespace-pre-wrap">
          <p className="leading-[1.2] mb-0 text-[24px] md:text-[36px] lg:text-[48px]">{`From small meetups to local festivals, `}</p>
          <p className="leading-[1.2] text-[#d8444b] text-[24px] md:text-[36px] lg:text-[48px]">
            Noosa is right there with the community across Nusantara.
          </p>
        </div>
      </Container>
    </section>
  )
}
