import type { ReactNode } from "react"
import imgCreatorStudio from "../../assets/feature-creator-studio.png"
import imgDashboard from "../../assets/feature-dashboard.png"
import imgRegistration from "../../assets/feature-registration.png"
import imgShareEvent from "../../assets/feature-share-event.png"
import { Container, SECTION_X } from "./layout"

/** Small outlined pill naming the product surface a card is about. */
function FeatureBadge({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[rgba(216,68,75,0.1)] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[12px] shrink-0">
      <div
        aria-hidden
        className="absolute border border-[#d8444b] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-none relative shrink-0 text-[16px] text-[rgba(245,245,245,0.8)] whitespace-nowrap">
        {children}
      </p>
    </div>
  )
}

/**
 * Card with a badge, a headline and a product screenshot that fades out at the
 * bottom.
 *
 * Each screenshot is a finished composite from Figma — the app window with its
 * red highlight glow already burned in — so it is rendered as one plain image at
 * its own aspect ratio. The export used to redraw the highlight as a second,
 * separately positioned image on top, which double-drew the panel and forced the
 * screenshot into a box the wrong shape for it.
 */
function FeatureCard({
  badge,
  title,
  screenshot,
  screenshotAlt,
}: {
  badge: string
  title: string
  screenshot: string
  screenshotAlt: string
}) {
  return (
    <div className="bg-[#181818] border border-[rgba(245,245,245,0.1)] border-solid content-stretch duration-300 flex flex-col gap-[16px] group hover:bg-[rgba(216,68,75,0.1)] hover:border-[#d8444b] hover:z-10 items-start min-w-px pb-[20px] pt-[32px] px-[24px] relative rounded-[16px] transition-colors md:pt-[40px] md:px-[40px]">
      <FeatureBadge>{badge}</FeatureBadge>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[1.2] min-w-full relative shrink-0 text-[#f5f5f5] text-[20px] md:text-[24px] w-[min-content] z-10">
        {title}
      </p>
      <img
        alt={screenshotAlt}
        className="block duration-500 ease-out group-hover:scale-[1.06] h-auto max-w-none pointer-events-none relative shrink-0 transition-transform w-full"
        src={screenshot}
      />
      <div
        aria-hidden
        className="absolute bg-gradient-to-b bottom-0 duration-300 from-[rgba(24,24,24,0)] group-hover:from-[rgba(31,21,22,0)] group-hover:to-[#1f1516] h-[160px] inset-x-0 rounded-b-[16px] to-[#181818] to-[54.327%] transition-colors z-10"
      />
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section className={`pb-[48px] pt-[64px] w-full ${SECTION_X}`}>
      <Container className="content-stretch flex flex-col gap-[48px] items-center md:gap-[64px]">
        <div className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#f5f5f5] text-[32px] md:text-[40px] lg:text-[48px] text-center w-full whitespace-pre-wrap">
          <p className="leading-[1.2] mb-0">{`One Platform, `}</p>
          <p className="leading-[1.2]">Every Step of Your Event</p>
        </div>
        {/* A grid rather than two flex rows: grid rows equalise card heights for
            free, and the cards drop to one column on their own. */}
        <div className="gap-[24px] grid grid-cols-1 lg:grid-cols-2 relative shrink-0 w-full">
          <FeatureCard
            badge="Event Creator Studio"
            screenshot={imgCreatorStudio}
            screenshotAlt="The Noosa event editor with the ticket setup panel open, showing General and VIP tickets"
            title="Build the page, set the tickets, go live"
          />
          <FeatureCard
            badge="Share Event"
            screenshot={imgShareEvent}
            screenshotAlt="An event page with the share dialog open, offering social links and a downloadable QR code"
            title="A link and QR built for fast and easy"
          />
          <FeatureCard
            badge="Event Management Dashboard"
            screenshot={imgDashboard}
            screenshotAlt="The guest check-in dashboard showing capacity, guest statuses and a guest list"
            title="Guests, check-ins, and capacity, all under control"
          />
          <FeatureCard
            badge="Event Registration"
            screenshot={imgRegistration}
            screenshotAlt="A public event page beside a phone showing the attendee's QR ticket"
            title="Easy for guests, tidy for you"
          />
        </div>
      </Container>
    </section>
  )
}
