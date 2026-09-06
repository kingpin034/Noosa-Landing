import type { ReactNode } from "react"
import { iconPaths } from "../icon-paths"
import { IndonesiaFlagIcon, UsFlagIcon } from "../icons"
import { Container, SECTION_X } from "./layout"

/** Radial red glow that sits behind the footer watermark. */
const FOOTER_GLOW =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1920 500' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-9.7365e-13 -50 96 2.9737e-10 960 500)'><stop stop-color='rgba(137,48,53,1)' offset='0'/><stop stop-color='rgba(108,41,45,1)' offset='0.25'/><stop stop-color='rgba(78,34,36,1)' offset='0.5'/><stop stop-color='rgba(49,26,28,1)' offset='0.75'/><stop stop-color='rgba(19,19,19,1)' offset='1'/></radialGradient></defs></svg>\")"

const FOOTER_LINKS = [
  "Discover",
  "About",
  "Terms of Service",
  "Privacy Policy",
  "Feedback",
]

/**
 * The glow spans the full width of the screen; the oversized "noosa" lettering
 * sits on top of it, capped at 1440px and pinned to the bottom edge like the
 * rest of the page content.
 */
function FooterBackdrop() {
  return (
    <div
      aria-hidden
      className="h-[200px] overflow-hidden pointer-events-none relative w-full sm:h-[300px] lg:h-[500px]"
    >
      {/* The glow runs edge to edge; the lettering keeps the page gutter so it
          lines up with the content column above it. */}
      <div className="absolute inset-0" style={{ backgroundImage: FOOTER_GLOW }} />
      <div className={`absolute bottom-0 flex justify-center left-0 right-0 ${SECTION_X}`}>
        <div className="aspect-[1440/312.267] max-w-[1440px] relative w-full">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1440 312.267"
          >
            <path d={iconPaths.noosaWatermark} fill="#181818" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function LanguageOption({
  icon,
  label,
  selected = false,
}: {
  icon: ReactNode
  label: string
  selected?: boolean
}) {
  const selectedClasses = selected ? "bg-[rgba(216,68,75,0.1)] " : ""
  return (
    <div
      className={`${selectedClasses}content-stretch flex gap-[4px] items-center justify-center px-[24px] py-[10px] relative rounded-[12px] shrink-0`}
    >
      {selected && (
        <div
          aria-hidden
          className="absolute border border-[#d8444b] border-solid inset-0 pointer-events-none rounded-[12px]"
        />
      )}
      {icon}
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[14px] text-[rgba(245,245,245,0.8)] whitespace-nowrap">
        {label}
      </p>
    </div>
  )
}

function LanguageSwitcher() {
  return (
    <div className="bg-[#181818] relative rounded-[12px] shrink-0">
      <div
        aria-hidden
        className="absolute border border-[rgba(245,245,245,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center relative size-full">
          <LanguageOption
            icon={<IndonesiaFlagIcon />}
            label="Bahasa"
            selected
          />
          <LanguageOption icon={<UsFlagIcon />} label="English" />
        </div>
      </div>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="w-full">
      <div className={`py-[32px] w-full ${SECTION_X}`}>
        <Container className="content-stretch flex flex-col gap-[24px] items-center justify-between lg:flex-row lg:gap-[16px] relative">
          <LanguageSwitcher />
          <div className="[word-break:break-word] content-center flex flex-wrap font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal gap-[16px] items-center justify-center leading-[1.3] relative shrink-0 text-[14px] text-[rgba(245,245,245,0.8)] text-center">
            {FOOTER_LINKS.map((link) => (
              <p className="relative shrink-0" key={link}>
                {link}
              </p>
            ))}
          </div>
          <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[1.3] relative shrink-0 text-[14px] text-[rgba(245,245,245,0.8)] text-center whitespace-nowrap">
            ©2026 Noosa. All rights reserved.
          </p>
        </Container>
      </div>
      <FooterBackdrop />
    </footer>
  )
}
