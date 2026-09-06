import type { ReactNode } from "react"

/**
 * Horizontal gutter every section uses. Kept in one place so the whole page
 * breathes the same amount at each breakpoint.
 */
export const SECTION_X = "px-[20px] md:px-[32px]"

/**
 * Caps content at the 1440px design width and centres it. Everything on the page
 * sits inside one of these — the navigation bar is the single exception, because
 * it is meant to span the full width of the screen.
 */
export function Container({
  className = "",
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`max-w-[1440px] mx-auto w-full ${className}`}>{children}</div>
  )
}
