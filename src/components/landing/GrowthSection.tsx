import { useCountUp, useInView, usePrefersReducedMotion } from "../../hooks"
import { iconPaths } from "../icon-paths"
import { Container, SECTION_X } from "./layout"

const STATS = [
  { value: 74, suffix: "K", label: "Active User" },
  { value: 410, suffix: "K", label: "Website Visitors" },
  { value: 800, suffix: "+", label: "Event Listed in Noosa" },
  { value: 30, suffix: "+", label: "Event Listed Every Week" },
]

const COUNT_DURATION_MS = 1800
const DRAW_DURATION_MS = 2200
/** Matches `easeOutCubic`, so the lines and the counters decelerate alike. */
const EASE_OUT_CUBIC = "cubic-bezier(0.33, 1, 0.68, 1)"

function StatCard({
  value,
  suffix,
  label,
  animate,
}: {
  value: number
  suffix: string
  label: string
  animate: boolean
}) {
  const count = useCountUp(value, animate, COUNT_DURATION_MS)

  return (
    <div className="min-w-0 relative">
      <div className="flex flex-col justify-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] p-[20px] relative size-full">
          <div className="[word-break:break-word] content-stretch flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold gap-[8px] items-start leading-[1.2] relative shrink-0 text-[#f5f5f5] w-full">
            {/* The final value is the accessible one; the ticking digits are decoration. */}
            <p
              aria-label={`${value}${suffix}`}
              className="relative shrink-0 tabular-nums text-[40px] md:text-[52px] lg:text-[64px] w-full"
            >
              <span aria-hidden>
                {count}
                {suffix}
              </span>
            </p>
            <p className="relative shrink-0 text-[18px] md:text-[24px] w-full">
              {label}
            </p>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#d8444b] border-l-4 border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function StatsRow() {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <div
      className="gap-[20px] grid grid-cols-1 relative shrink-0 sm:grid-cols-2 w-full xl:grid-cols-4"
      ref={ref}
    >
      {STATS.map((stat) => (
        <StatCard
          animate={inView}
          key={stat.label}
          label={stat.label}
          suffix={stat.suffix}
          value={stat.value}
        />
      ))}
    </div>
  )
}

/**
 * Two overlaid trend lines — a faded one behind the solid one — that draw
 * themselves left to right when the chart scrolls into view.
 *
 * `pathLength={1}` renormalises each line to a length of 1 regardless of its
 * real geometry, so a single dash of length 1 covers the whole line: offset it
 * by 1 and the line is hidden, ease the offset to 0 and it draws in from the
 * left-hand end.
 */
function GrowthChart() {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reducedMotion = usePrefersReducedMotion()

  const drawIn = (delayMs: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: inView || reducedMotion ? 0 : 1,
    transition: reducedMotion
      ? undefined
      : `stroke-dashoffset ${DRAW_DURATION_MS}ms ${EASE_OUT_CUBIC} ${delayMs}ms`,
  })

  return (
    <div className="aspect-[1254/316] relative shrink-0 w-full" ref={ref}>
      <div className="absolute inset-[19.65%_0.08%_13.26%_0]">
        <div className="absolute inset-[-1.27%_0_-0.67%_-0.11%]">
          <svg
            className="block size-full"
            fill="none"
            height="248.15"
            preserveAspectRatio="none"
            viewBox="0 0 1440.48 248.15"
            width="1440.48"
          >
            <path
              d={iconPaths.growthLineFaded}
              pathLength={1}
              stroke="#D8444B"
              strokeOpacity="0.4"
              strokeWidth="4.5933"
              style={drawIn(0)}
            />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.26%_0.08%_15.16%_0]">
        <div className="absolute inset-[-1.11%_0_-0.46%_-0.13%]">
          <svg
            className="block size-full"
            fill="none"
            height="282.25"
            preserveAspectRatio="none"
            viewBox="0 0 1441.79 282.25"
            width="1441.79"
          >
            <path
              d={iconPaths.growthLine}
              pathLength={1}
              stroke="#D8444B"
              strokeWidth="4.5933"
              style={drawIn(120)}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export function GrowthSection() {
  return (
    <section className={`py-[80px] md:py-[128px] w-full ${SECTION_X}`}>
      <Container className="content-stretch flex flex-col gap-[48px] items-center md:gap-[64px]">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[1.2] relative shrink-0 text-[#f5f5f5] w-full">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[32px] md:text-[40px] lg:text-[48px] w-full">
            Growth Together with Noosa
          </p>
          <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[16px] w-full">
            Data from Jan - Aug 2026
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[48px] items-start md:gap-[64px] relative shrink-0 w-full">
          <GrowthChart />
          <StatsRow />
        </div>
      </Container>
    </section>
  )
}
