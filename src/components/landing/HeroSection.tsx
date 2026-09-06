import type { ReactNode } from "react"
import imgAvatarOrganizer3 from "../../assets/avatar-organizer-3.png"
import imgAvatarOrganizer4 from "../../assets/avatar-organizer-4.png"
import imgAvatarSomeoneSpace from "../../assets/avatar-someone-space.png"
import imgAvatarTamangKarya from "../../assets/avatar-tamang-karya.png"
import imgHero from "../../assets/hero-app-preview.png"
import { useTypewriter } from "../../hooks"
import { UserKeyIcon } from "../icons"
import { Container, SECTION_X } from "./layout"

/** Radial red glow behind the hero, flipped so the bright edge sits at the bottom. */
const HERO_GLOW =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1710 800' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-8.6716e-13 -80 85.5 4.7579e-10 855 800)'><stop stop-color='rgba(137,48,53,1)' offset='0'/><stop stop-color='rgba(108,41,45,1)' offset='0.25'/><stop stop-color='rgba(78,34,36,1)' offset='0.5'/><stop stop-color='rgba(49,26,28,1)' offset='0.75'/><stop stop-color='rgba(19,19,19,1)' offset='1'/></radialGradient></defs></svg>\")"

/** Rotating second line of the hero headline. */
const HEADLINES = [
  "Noosa Handles the Rest",
  "Noosa Finds Your Crowd",
  "Noosa Does the Busywork",
  "Noosa Tracks Every Rupiah",
  "Noosa Keeps the List Tidy",
] as const

function RotatingHeadline() {
  const { text, settled } = useTypewriter(HEADLINES)

  return (
    <p className="leading-[1.2] text-[#d8444b]">
      {/* Every phrase is stacked invisibly in the same grid cell so the cell is
          always as big as the longest one — the headline never reflows or jumps
          height as the text types and deletes. */}
      <span className="inline-grid">
        {HEADLINES.map((phrase) => (
          <span aria-hidden className="col-start-1 invisible row-start-1" key={phrase}>
            {phrase}
          </span>
        ))}
        <span className="col-start-1 row-start-1">
          {/* Screen readers get one stable phrase instead of every keystroke. */}
          <span className="sr-only">{HEADLINES[0]}</span>
          <span aria-hidden>
            {text}
            <span
              className={`-mr-[0.08em] border-[#d8444b] border-r-[0.06em] inline-block h-[0.85em] ml-[0.04em] translate-y-[0.08em] ${settled ? "animate-[caret-blink_1s_step-end_infinite]" : ""}`}
            />
          </span>
        </span>
      </span>
    </p>
  )
}

function Headline() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-center leading-[0] relative shrink-0 text-[#f5f5f5] text-center w-full">
      <div className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[32px] sm:text-[40px] lg:text-[48px]">
        <p className="leading-[1.2] mb-0">You Host the Event</p>
        <RotatingHeadline />
      </div>
      {/* Capped rather than hard-broken, so the copy rewraps instead of
          keeping a desktop line break on a phone. */}
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[1.5] max-w-[620px] relative shrink-0 text-[16px] md:text-[18px]">
        {`Publish an event page in minutes, manage your guest list in one place, and see who's actually coming. All made for organizers in Indonesia.`}
      </p>
    </div>
  )
}

function CallToAction() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[280px] relative shrink-0 w-full">
      <div className="bg-[rgba(216,68,75,0.8)] relative rounded-[16px] shrink-0 w-full">
        <div
          aria-hidden
          className="absolute border border-[#d8444b] border-solid inset-0 pointer-events-none rounded-[16px]"
        />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[12px] py-[16px] relative size-full">
            <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#f5f5f5] text-[14px] whitespace-nowrap">
              Create Your First Event
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(216,68,75,0.1)] content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[16px] relative rounded-[16px] shrink-0 w-full">
        <div
          aria-hidden
          className="absolute border border-[#d8444b] border-solid inset-0 pointer-events-none rounded-[16px]"
        />
        <UserKeyIcon />
        <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#f5f5f5] text-[14px] whitespace-nowrap">
          See How it Works
        </p>
      </div>
    </div>
  )
}

/**
 * One 40px avatar in the overlapping social-proof stack. Each portrait is cropped
 * differently in the design, so the `<img>` markup is passed in rather than shared.
 */
function AvatarChip({
  offsetClass,
  children,
}: {
  offsetClass: string
  children: ReactNode
}) {
  return (
    <div
      className={`col-1 ${offsetClass} mt-0 relative rounded-[199.8px] row-1 size-[40px]`}
    >
      {children}
      <div
        aria-hidden
        className="absolute border-2 border-[#f5f5f5] border-solid inset-[-2px] rounded-[201.8px]"
      />
    </div>
  )
}

function SocialProof() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center leading-[0] relative shrink-0">
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start pointer-events-none relative shrink-0">
        <AvatarChip offsetClass="ml-0">
          <div className="absolute inset-0 overflow-hidden rounded-[199.8px]">
            <img
              alt=""
              className="absolute h-[120.3%] left-[-11.95%] max-w-none top-[-9.41%] w-[120.51%]"
              src={imgAvatarTamangKarya}
            />
          </div>
        </AvatarChip>
        <AvatarChip offsetClass="ml-[24px]">
          <div className="absolute inset-0 overflow-hidden rounded-[199.8px]">
            <img
              alt=""
              className="absolute h-[103.48%] left-[-4.32%] max-w-none top-0 w-[105.36%]"
              src={imgAvatarSomeoneSpace}
            />
          </div>
        </AvatarChip>
        <AvatarChip offsetClass="ml-[48px]">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover rounded-[199.8px] size-full"
            src={imgAvatarOrganizer3}
          />
        </AvatarChip>
        <AvatarChip offsetClass="ml-[72px]">
          <div className="absolute inset-0 overflow-hidden rounded-[199.8px]">
            <img
              alt=""
              className="absolute h-[112.55%] left-[-5.98%] max-w-none top-[-3.76%] w-[111.97%]"
              src={imgAvatarOrganizer4}
            />
          </div>
        </AvatarChip>
      </div>
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[#f5f5f5] text-[0px] text-center w-[221px]">
        <span className="leading-[1.2] text-[16px]">{`Loved by `}</span>
        <span className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[1.2] text-[16px]">
          100+
        </span>
        <span className="leading-[1.2] text-[16px]">{` organizers across Indonesia`}</span>
      </p>
    </div>
  )
}

export function HeroSection() {
  return (
    <section
      className={`bg-[#131313] overflow-hidden pb-[42px] pt-[56px] relative w-full md:pt-[80px] ${SECTION_X}`}
    >
      {/* Full-bleed glow: spans the screen, not the 1440px content column. */}
      <div
        aria-hidden
        className="-scale-y-100 absolute h-[520px] left-0 right-0 top-0 md:h-[800px]"
        style={{ backgroundImage: HERO_GLOW }}
      />
      <Container className="content-stretch flex flex-col gap-[32px] items-center relative">
        <Headline />
        <CallToAction />
        <div className="aspect-[1000/634] max-w-[1000px] relative shrink-0 w-full">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 overflow-hidden">
              <img
                alt=""
                className="absolute h-[218.85%] left-[-73.19%] max-w-none top-[-49.85%] w-[246.39%]"
                src={imgHero}
              />
            </div>
            <div className="absolute bg-gradient-to-b from-[61.42%] from-[rgba(19,19,19,0)] inset-0 to-[#131313] to-[88.328%]" />
          </div>
        </div>
        <SocialProof />
      </Container>
    </section>
  )
}
