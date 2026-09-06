import { iconPaths } from "./icon-paths"

export function UserKeyIcon() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="18"
        preserveAspectRatio="none"
        viewBox="0 0 18 18"
        width="18"
      >
        <path
          d={iconPaths.userKey}
          stroke="#F5F5F5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  )
}

export function NoosaWordmark() {
  return (
    <div className="h-[24px] relative shrink-0 w-[129.661px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="24"
        preserveAspectRatio="none"
        viewBox="0 0 129.66 24"
        width="129.66"
      >
        <path d={iconPaths.wordmarkN} fill="#F5F5F5" />
        <path d={iconPaths.wordmarkO1} fill="#F5F5F5" />
        <path d={iconPaths.wordmarkO2} fill="#F5F5F5" />
        <path d={iconPaths.wordmarkS} fill="#F5F5F5" />
        <path d={iconPaths.wordmarkA} fill="#F5F5F5" />
        <path d={iconPaths.wordmarkMark} fill="#D8444B" />
      </svg>
    </div>
  )
}

export function IndonesiaFlagIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="20"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
        width="20"
      >
        <defs>
          <clipPath id="clip-flag-id">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
        <g clipPath="url(#clip-flag-id)">
          <path d={iconPaths.flagIdRed} fill="#DC1F26" />
          <path d={iconPaths.flagIdWhite} fill="#F5F5F5" />
        </g>
      </svg>
    </div>
  )
}

export function UsFlagIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="20"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
        width="20"
      >
        <defs>
          <clipPath id="clip-flag-us">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
        <g clipPath="url(#clip-flag-us)">
          <path d={iconPaths.flagUsStripesRed} fill="#B22334" />
          <path d={iconPaths.flagUsStripesWhite} fill="#F5F5F5" />
          <path d={iconPaths.flagUsCanton} fill="#3C3B6E" />
          <path d={iconPaths.flagUsStars} fill="#F5F5F5" />
        </g>
      </svg>
    </div>
  )
}

export function NavigationIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[18px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="18"
        preserveAspectRatio="none"
        viewBox="0 0 18 18"
        width="18"
      >
        <path d={iconPaths.navigation} fill="#F5F5F5" fillOpacity="0.4" />
      </svg>
    </div>
  )
}

export function TicketIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[17px]">
      <div className="absolute inset-[0_12.5%]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="17"
          preserveAspectRatio="none"
          viewBox="0 0 12.75 17"
          width="12.75"
        >
          <path d={iconPaths.ticketBody} fill="#F5F5F5" fillOpacity="0.4" />
        </svg>
      </div>
      <div className="absolute inset-[62.5%_41.67%_29.17%_41.67%]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="1.41667"
          preserveAspectRatio="none"
          viewBox="0 0 2.83333 1.41667"
          width="2.83333"
        >
          <path d={iconPaths.ticketNotch} fill="#F5F5F5" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  )
}

export function BalloonsIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[17px]">
      <div className="absolute inset-[29.17%_16.76%_49.99%_70.84%]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="3.54286"
          preserveAspectRatio="none"
          viewBox="0 0 2.10849 3.54286"
          width="2.10849"
        >
          <path
            d={iconPaths.balloonStringRight}
            fill="#F5F5F5"
            fillOpacity="0.4"
          />
        </svg>
      </div>
      <div className="absolute inset-[29.17%_58.43%_49.99%_29.17%]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="3.54287"
          preserveAspectRatio="none"
          viewBox="0 0 2.10849 3.54287"
          width="2.10849"
        >
          <path
            d={iconPaths.balloonStringLeft}
            fill="#F5F5F5"
            fillOpacity="0.4"
          />
        </svg>
      </div>
      <div className="absolute inset-[0_-0.01%_-0.04%_0]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="17.006"
          preserveAspectRatio="none"
          viewBox="0 0 17.0025 17.006"
          width="17.0025"
        >
          <path d={iconPaths.balloons} fill="#F5F5F5" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  )
}

export function PlusIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[18px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="18"
        preserveAspectRatio="none"
        viewBox="0 0 18 18"
        width="18"
      >
        <path d={iconPaths.plus} fill="#F5F5F5" />
      </svg>
    </div>
  )
}

export function SearchIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[18px]">
      <div className="absolute inset-[-0.13%_0.05%_0.05%_-0.13%]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="18.0148"
          preserveAspectRatio="none"
          viewBox="0 0 18.0148 18.0148"
          width="18.0148"
        >
          <path d={iconPaths.search} fill="#F5F5F5" fillOpacity="0.8" />
        </svg>
      </div>
    </div>
  )
}

export function BellRingIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[18px]">
      <div className="absolute inset-[0_0.13%_0_0.02%]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="18.0002"
          preserveAspectRatio="none"
          viewBox="0 0 17.9732 18.0002"
          width="17.9732"
        >
          <path d={iconPaths.bellRing} fill="#F5F5F5" fillOpacity="0.8" />
        </svg>
      </div>
    </div>
  )
}
