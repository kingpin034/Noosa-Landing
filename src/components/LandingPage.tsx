import { FeaturesSection } from "./landing/FeaturesSection"
import { GrowthSection } from "./landing/GrowthSection"
import { HeroSection } from "./landing/HeroSection"
import { HowItWorksSection } from "./landing/HowItWorksSection"
import { NavigationBar } from "./landing/NavigationBar"
import { NusantaraSection } from "./landing/NusantaraSection"
import { OrganizerLogosSection } from "./landing/OrganizerLogosSection"
import { SiteFooter } from "./landing/SiteFooter"
import { TestimonialsSection } from "./landing/TestimonialsSection"

/**
 * Sections stack in normal document flow and each owns its own vertical padding.
 * Every one of them spans the full width and caps its contents at 1440px via
 * `Container`; the navigation bar is the exception and runs edge to edge.
 */
export function LandingPage() {
  return (
    <div className="bg-[#131313] flex flex-col w-full">
      <NavigationBar />
      <main>
        <HeroSection />
        <OrganizerLogosSection />
        <HowItWorksSection />
        <FeaturesSection />
        <GrowthSection />
        <NusantaraSection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </div>
  )
}
