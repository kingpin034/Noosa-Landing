import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "../../hooks"

/**
 * The hero's existing glow palette. Keeping the bubbles on these exact stops is
 * what stops the effect reading as a different, louder background — they add
 * movement to the red that is already there rather than replacing it.
 */
const RED_BRIGHT = "137, 48, 53"
const RED_MID = "108, 41, 45"
const RED_DEEP = "78, 34, 36"

const BUBBLES = [
  { color: RED_BRIGHT, alpha: 0.3, size: 62, top: "8%", left: "20%", animation: "bubble-drift-y 30s ease-in-out infinite" },
  { color: RED_MID, alpha: 0.28, size: 54, top: "22%", left: "62%", animation: "bubble-orbit-reverse 22s linear infinite" },
  { color: RED_DEEP, alpha: 0.34, size: 72, top: "38%", left: "36%", animation: "bubble-orbit 40s linear infinite" },
  { color: RED_BRIGHT, alpha: 0.2, size: 48, top: "48%", left: "74%", animation: "bubble-drift-x 38s ease-in-out infinite" },
  { color: RED_MID, alpha: 0.24, size: 58, top: "12%", left: "46%", animation: "bubble-orbit 26s linear infinite" },
]

/** Fraction of the remaining distance the trailing bubble closes each frame. */
const FOLLOW_EASE = 0.06
/** Centres a bubble on its own anchor point; composed after any movement. */
const CENTRE = "translate(-50%, -50%)"

const gradient = (color: string, alpha: number) =>
  `radial-gradient(circle closest-side, rgba(${color}, ${alpha}) 0%, rgba(${color}, 0) 100%)`

/**
 * Drifting gradient bubbles behind the hero copy, in the same reds as the static
 * glow underneath. One extra bubble trails the cursor.
 *
 * Each bubble is split in two: an outer element that owns its position and the
 * centring transform, and an inner element that owns the animation. They would
 * otherwise fight over the single `transform` property — a keyframe setting
 * `translateY` silently drops the centring, and the cursor follower's inline
 * transform would do the same.
 *
 * The gradients already fade to transparent, so no blur filter is needed to
 * soften them; everything is compositor-only transforms. Under
 * `prefers-reduced-motion` the bubbles render in place and neither the keyframes
 * nor the cursor tracking run.
 */
export function BubbleBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const followerRef = useRef<HTMLDivElement | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    const follower = followerRef.current
    if (!container || !follower || reducedMotion) return
    // Touch has no hover state to follow, and a bubble parked at the last tap
    // looks broken — leave it centred.
    if (!window.matchMedia("(pointer: fine)").matches) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let frame = 0

    const tick = () => {
      currentX += (targetX - currentX) * FOLLOW_EASE
      currentY += (targetY - currentY) * FOLLOW_EASE
      follower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) ${CENTRE}`
      // Keep easing until it has essentially caught up, then stop the loop.
      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        frame = requestAnimationFrame(tick)
      } else {
        frame = 0
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      targetX = event.clientX - rect.left - rect.width / 2
      targetY = event.clientY - rect.top - rect.height / 2
      if (!frame) frame = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      ref={containerRef}
    >
      {/* `screen` keeps the bubbles additive over the dark page, so overlaps
          brighten instead of stacking into muddy blocks. */}
      <div className="absolute inset-0 mix-blend-screen">
        {BUBBLES.map((b, i) => (
          <div
            className="absolute"
            key={i}
            style={{
              height: `${b.size}%`,
              left: b.left,
              top: b.top,
              transform: CENTRE,
              width: `${b.size}%`,
            }}
          >
            <div
              className="size-full"
              style={{
                animation: reducedMotion ? undefined : b.animation,
                background: gradient(b.color, b.alpha),
              }}
            />
          </div>
        ))}
        <div
          className="absolute h-[46%] left-1/2 top-1/2 w-[46%]"
          ref={followerRef}
          style={{ transform: CENTRE }}
        >
          <div className="size-full" style={{ background: gradient(RED_BRIGHT, 0.22) }} />
        </div>
      </div>
    </div>
  )
}
