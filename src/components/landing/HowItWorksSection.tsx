import { useEffect, useRef, useState } from "react"
import imgStep01 from "../../assets/step-01-publish.png"
import imgStep02 from "../../assets/step-02-guests.png"
import imgStep03 from "../../assets/step-03-numbers.png"
import { Container, SECTION_X } from "./layout"

const STEPS = [
  {
    number: "01",
    title: "Publish in minutes",
    body: "Add a title, date, and poster. Your event goes live at mynoosa.id/your-event, ready to take registrations instantly. Share the link anywhere, no website needed.",
    image: imgStep01,
    alt: "An event page for Community Event Summer 2027 with its poster, share link and registration details",
  },
  {
    number: "02",
    title: "Every guest, one glance",
    body: "Paid, confirmed, checked in, cancelled. One color-coded list tells you everything before anyone asks.",
    image: imgStep02,
    alt: "The guest check-in screen listing guests with their paid and checked-in status",
  },
  {
    number: "03",
    title: "Know your numbers",
    body: "Tickets sold, revenue, and seats left in every tier, live as it happens. Export the data anytime, withdraw your earnings when you're ready.",
    image: imgStep03,
    alt: "The ticket transaction screen showing tickets sold, revenue and remaining seats per tier",
  },
]

function Heading() {
  return (
    <div className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#f5f5f5] text-[32px] md:text-[40px] lg:text-[48px] text-center w-full whitespace-pre-wrap">
      <p className="leading-[1.2] mb-0">{`Built Around How `}</p>
      <p className="leading-[1.2]">Organizers Actually Work</p>
    </div>
  )
}

/**
 * One numbered step. The red rail is always present but transparent when the
 * step is inactive, so the text never shifts sideways as the active step moves.
 * The body copy is revealed by animating the grid row from `0fr` to `1fr`, which
 * gives a real height transition without measuring anything.
 */
function Step({ step, active }: { step: (typeof STEPS)[number]; active: boolean }) {
  return (
    <div
      className={`border-l-4 border-solid pl-[20px] py-[8px] relative transition-colors duration-500 ${active ? "border-[#d8444b]" : "border-transparent"}`}
    >
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[1.2] text-[16px] text-[rgba(245,245,245,0.8)]">
        {step.number}
      </p>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[1.2] mt-[12px] text-[#f5f5f5] text-[20px] md:text-[24px]">
        {step.title}
      </p>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[1.5] pt-[8px] text-[16px] text-[rgba(245,245,245,0.8)]">
            {step.body}
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * The section pins itself while the reader scrolls through the three steps.
 *
 * Rather than blocking the wheel (which breaks keyboard, trackpad momentum and
 * assistive tech), the track below is `STEPS.length` viewports tall and the panel
 * inside it is `sticky`. The page keeps scrolling normally the whole time; it
 * just has nowhere else to go until the track is used up, so step 03 is always
 * reached before the next section appears.
 *
 * Below `lg` there is no pinning — a phone gets every step expanded with its own
 * screenshot, which reads better than trapping the reader in a tall sticky block.
 */
export function HowItWorksSection() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    const update = () => {
      frame = 0
      const { top, height } = track.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.min(Math.max(-top / scrollable, 0), 1)
      setActiveStep(Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section className="w-full" id="how-it-works">
      <div className={`lg:hidden py-[64px] w-full ${SECTION_X}`}>
        <Container className="flex flex-col gap-[48px]">
          <Heading />
          {STEPS.map((step) => (
            <div className="flex flex-col gap-[24px]" key={step.number}>
              <Step active step={step} />
              <img
                alt={step.alt}
                className="aspect-[960/584] object-cover w-full"
                src={step.image}
              />
            </div>
          ))}
        </Container>
      </div>

      <div
        className="hidden lg:block relative w-full"
        ref={trackRef}
        style={{ height: `${STEPS.length * 100}vh` }}
      >
        <div className={`h-screen overflow-hidden sticky top-0 w-full ${SECTION_X}`}>
          <Container className="flex flex-col gap-[48px] h-full py-[64px]">
            <Heading />
            <div className="flex gap-[64px] items-center min-h-0 grow">
              <div className="flex flex-col gap-[16px] shrink-0 w-[30%]">
                {STEPS.map((step, i) => (
                  <Step active={i === activeStep} key={step.number} step={step} />
                ))}
              </div>
              <div className="grid grow h-full min-w-0 place-items-center">
                {STEPS.map((step, i) => (
                  <img
                    alt={step.alt}
                    aria-hidden={i !== activeStep}
                    className={`col-start-1 max-h-full max-w-full object-contain row-start-1 transition-opacity duration-500 ${i === activeStep ? "opacity-100" : "opacity-0"}`}
                    key={step.number}
                    src={step.image}
                  />
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
