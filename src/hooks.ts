import { useEffect, useRef, useState } from "react"

/**
 * Attach the returned ref to an element; `inView` flips true once that element
 * scrolls into view and then stays true — these drive entrance animations, which
 * should not replay every time the user scrolls back past them.
 *
 * The negative bottom `rootMargin` means "in view" needs the element to be
 * properly on screen, not just poking over the bottom edge by a pixel.
 */
export function useInView<T extends Element>(rootMargin = "0px 0px -15% 0px") {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    // Without an observer, skip straight to the finished state.
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        observer.disconnect()
      },
      { rootMargin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, inView] as const
}

/** Tracks the OS "reduce motion" setting so animations can be skipped. */
export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(query.matches)

    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return reducedMotion
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

/**
 * Counts from 0 up to `target` once `active` becomes true, decelerating as it
 * lands. Returns `target` immediately when the user prefers reduced motion.
 */
export function useCountUp(target: number, active: boolean, durationMs = 1800) {
  const reducedMotion = usePrefersReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (reducedMotion) {
      setValue(target)
      return
    }

    let frame = 0
    let startedAt: number | undefined
    const tick = (now: number) => {
      startedAt ??= now
      const progress = Math.min((now - startedAt) / durationMs, 1)
      setValue(Math.round(target * easeOutCubic(progress)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, durationMs, reducedMotion, target])

  return value
}

/**
 * Types a phrase out one character at a time, holds it, backspaces it, then moves
 * on to the next one and loops. Returns the text to render plus whether it is
 * mid-word, so a caret can stop blinking while characters are moving.
 *
 * `phrases` must be a stable reference (a module-level constant), since it drives
 * the effect that schedules each keystroke.
 */
export function useTypewriter(
  phrases: readonly string[],
  { typeMs = 55, deleteMs = 30, holdMs = 2000 } = {},
) {
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    const phrase = phrases[index % phrases.length]

    // Typing: add a character, or pause on the finished phrase before erasing.
    if (!deleting) {
      if (text.length < phrase.length) {
        const timer = setTimeout(
          () => setText(phrase.slice(0, text.length + 1)),
          typeMs,
        )
        return () => clearTimeout(timer)
      }
      const timer = setTimeout(() => setDeleting(true), holdMs)
      return () => clearTimeout(timer)
    }

    // Erasing: drop a character, or move on to the next phrase once empty.
    if (text.length > 0) {
      const timer = setTimeout(
        () => setText(phrase.slice(0, text.length - 1)),
        deleteMs,
      )
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % phrases.length)
      setDeleting(false)
    }, typeMs * 4)
    return () => clearTimeout(timer)
  }, [deleteMs, deleting, holdMs, index, phrases, reducedMotion, text, typeMs])

  if (reducedMotion) return { text: phrases[0], settled: true }
  return { text, settled: !deleting && text === phrases[index % phrases.length] }
}
