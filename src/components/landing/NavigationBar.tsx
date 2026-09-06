import type { ReactNode } from "react"
import imgProfileAvatar from "../../assets/nav-profile-avatar.png"
import {
  BalloonsIcon,
  BellRingIcon,
  NavigationIcon,
  NoosaWordmark,
  PlusIcon,
  SearchIcon,
  TicketIcon,
} from "../icons"

/** One pill in the centre nav group. Presentational only — these are not links yet. */
function NavLink({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center px-[24px] py-[10px] relative rounded-[100px] shrink-0">
      {icon}
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[14px] text-[rgba(245,245,245,0.4)] whitespace-nowrap">
        {label}
      </p>
    </div>
  )
}

function NavLinks() {
  return (
    <div className="bg-[#212121] hidden items-center relative rounded-[100px] shrink-0 xl:flex">
      <NavLink icon={<NavigationIcon />} label="Discover" />
      <NavLink icon={<TicketIcon />} label="Tickets" />
      <NavLink icon={<BalloonsIcon />} label="My Events" />
    </div>
  )
}

function CreateEventButton() {
  return (
    <div className="bg-[rgba(216,68,75,0.1)] content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[16px] shrink-0">
      <div
        aria-hidden
        className="absolute border border-[#d8444b] border-solid inset-0 pointer-events-none rounded-[16px]"
      />
      <PlusIcon />
      <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#f5f5f5] text-[14px] whitespace-nowrap">
        Create Event
      </p>
    </div>
  )
}

/** Round icon-only button, used for search and notifications. */
function IconButton({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`bg-[#212121] items-center justify-center p-[12px] relative rounded-[100px] shrink-0 ${className}`}
    >
      <div
        aria-hidden
        className="absolute border border-[rgba(245,245,245,0.1)] border-solid inset-0 pointer-events-none rounded-[100px]"
      />
      {children}
    </div>
  )
}

function NavActions() {
  return (
    <div className="content-stretch flex gap-[12px] items-center md:gap-[16px] relative shrink-0">
      <CreateEventButton />
      {/* Secondary actions are the first thing to go when the bar gets tight. */}
      <IconButton className="hidden md:flex">
        <SearchIcon />
      </IconButton>
      <IconButton className="hidden md:flex">
        <BellRingIcon />
      </IconButton>
      <div className="pointer-events-none relative rounded-[100px] shrink-0 size-[42px]">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover rounded-[100px] size-full"
          src={imgProfileAvatar}
        />
        <div
          aria-hidden
          className="absolute border border-[rgba(245,245,245,0.8)] border-solid inset-0 rounded-[100px]"
        />
      </div>
    </div>
  )
}

/**
 * The one component that is deliberately not capped at 1440px — it spans the
 * full width of the screen, so its contents sit against the viewport edges
 * rather than the content column.
 *
 * From `xl` up the wordmark and the actions each sit in a `flex-1` frame. Equal
 * frames on both sides is what keeps the Discover/Tickets/My Events group dead
 * centre — pinning the wordmark to the actions' measured width would drift every
 * time a breakpoint adds or removes one of those buttons.
 *
 * The centre group appears at `xl` rather than `lg` because below ~1200px the
 * wordmark, the pills and the actions do not all fit with equal side frames; the
 * pills would either overlap the actions or sit visibly off centre. Below `xl`
 * the frames are dropped and the actions simply sit hard right.
 */
export function NavigationBar() {
  return (
    <header className="bg-[#181818] relative w-full">
      <div
        aria-hidden
        className="absolute border-[rgba(245,245,245,0.1)] border-b border-solid inset-0 pointer-events-none"
      />
      <nav className="content-stretch flex gap-[16px] h-[74px] items-center px-[20px] py-[16px] relative md:px-[48px] 2xl:px-[128px]">
        <div className="flex items-center justify-start xl:flex-1">
          <NoosaWordmark />
        </div>
        <NavLinks />
        <div className="flex items-center justify-end ml-auto xl:flex-1 xl:ml-0">
          <NavActions />
        </div>
      </nav>
    </header>
  )
}
