import imgLogo01 from "../../assets/organizer-logo-01.png"
import imgLogo02 from "../../assets/organizer-logo-02.png"
import imgLogo03 from "../../assets/organizer-logo-03.png"
import imgLogo04 from "../../assets/organizer-logo-04.png"
import imgLogo05 from "../../assets/organizer-logo-05.png"
import imgLogo06 from "../../assets/organizer-logo-06.png"
import imgLogo07 from "../../assets/organizer-logo-07.png"
import imgLogo08 from "../../assets/organizer-logo-08.png"
import imgLogo09 from "../../assets/organizer-logo-09.png"
import imgLogo10 from "../../assets/organizer-logo-10.png"
import imgLogo11 from "../../assets/organizer-logo-11.png"
import imgLogo12 from "../../assets/organizer-logo-12.png"
import imgLogo13 from "../../assets/organizer-logo-13.png"
import imgLogo14 from "../../assets/organizer-logo-14.png"
import imgLogo15 from "../../assets/organizer-logo-15.png"
import { Container } from "./layout"

/**
 * Organizers and venues already running events on Noosa. Each logo keeps the
 * exact box it was given in the design — they are optically balanced rather than
 * uniform, so a single shared height would make some read much heavier than
 * others. The files are 2x exports of those boxes.
 */
const LOGOS = [
  { src: imgLogo01, box: "h-[48px] w-[94px]", fit: "object-bottom" },
  { src: imgLogo02, box: "h-[48px] w-[106px]", fit: "object-bottom" },
  { src: imgLogo03, box: "h-[48px] w-[70px]", fit: "object-bottom" },
  { src: imgLogo04, box: "h-[36px] w-[160px]", fit: "object-contain" },
  { src: imgLogo05, box: "h-[48px] w-[135px]", fit: "object-contain" },
  { src: imgLogo06, box: "h-[48px] w-[80px]", fit: "object-bottom" },
  { src: imgLogo07, box: "h-[48px] w-[127px]", fit: "object-bottom" },
  { src: imgLogo08, box: "size-[48px]", fit: "object-bottom" },
  { src: imgLogo09, box: "h-[48px] w-[52px]", fit: "object-contain" },
  { src: imgLogo10, box: "h-[48px] w-[88px]", fit: "object-bottom" },
  { src: imgLogo11, box: "h-[48px] w-[39px]", fit: "object-contain" },
  { src: imgLogo12, box: "h-[48px] w-[84px]", fit: "object-bottom" },
  { src: imgLogo13, box: "h-[48px] w-[62px]", fit: "object-contain" },
  { src: imgLogo14, box: "h-[48px] w-[110px]", fit: "object-contain" },
  { src: imgLogo15, box: "size-[48px]", fit: "object-contain" },
]

/** The list twice over: the second pass is what the first scrolls into. */
const TRACK = [...LOGOS, ...LOGOS]

export function OrganizerLogosSection() {
  return (
    <section className="py-[32px] w-full" aria-label="Organizers already using Noosa">
      <Container className="overflow-hidden relative">
        <div className="animate-[organizer-marquee_45s_linear_infinite] flex hover:[animation-play-state:paused] items-center motion-reduce:animate-none w-max">
          {TRACK.map(({ src, box, fit }, i) => (
            <div
              // The second copy is decorative duplication; keep it out of the
              // accessibility tree so the list is not announced twice.
              aria-hidden={i >= LOGOS.length}
              className={`mr-[32px] md:mr-[64px] relative shrink-0 ${box}`}
              key={i}
            >
              <img
                alt=""
                className={`absolute inset-0 max-w-none pointer-events-none size-full ${fit}`}
                src={src}
              />
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="absolute bg-gradient-to-r from-[#131313] inset-y-0 left-0 to-[rgba(19,19,19,0)] w-[80px] md:w-[252px]"
        />
        <div
          aria-hidden
          className="absolute bg-gradient-to-l from-[#131313] inset-y-0 right-0 to-[rgba(19,19,19,0)] w-[80px] md:w-[252px]"
        />
      </Container>
    </section>
  )
}
