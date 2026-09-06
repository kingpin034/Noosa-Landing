import imgAvatarSomeoneSpace from "../../assets/avatar-someone-space.png"
import imgAvatarTamangKarya from "../../assets/avatar-tamang-karya.png"
import { Container, SECTION_X } from "./layout"

function Testimonial({
  avatar,
  avatarClassName,
  quote,
  attribution,
}: {
  avatar: string
  avatarClassName: string
  quote: string
  attribution: string
}) {
  return (
    <div className="bg-[#131313] content-stretch flex flex-col items-center min-w-0 relative">
      <div className="content-stretch flex flex-col gap-[24px] items-start md:gap-[32px] relative shrink-0 w-full">
        <div className="pointer-events-none relative rounded-[16px] shrink-0 size-[80px] md:size-[128px]">
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className={avatarClassName} src={avatar} />
          </div>
          <div
            aria-hidden
            className="absolute border-2 border-[#f5f5f5] border-solid inset-[-2px] rounded-[18px]"
          />
        </div>
        <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[#f5f5f5] text-[24px] md:text-[36px] lg:text-[52px] w-[min-content]">
          {quote}
        </p>
        <p className="[word-break:break-word] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[#f5f5f5] text-[16px] md:text-[20px] lg:text-[24px] w-[min-content]">
          {attribution}
        </p>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className={`py-[80px] md:py-[128px] w-full ${SECTION_X}`}>
      <Container className="gap-[48px] grid grid-cols-1 lg:gap-[32px] lg:grid-cols-2">
        <Testimonial
          attribution="Event Organizer at Someone Space"
          avatar={imgAvatarSomeoneSpace}
          avatarClassName="absolute h-[103.48%] left-[-4.32%] max-w-none top-0 w-[105.36%]"
          quote="We used to lose sign-ups inside manual WhatsApp forms; with Noosa registration runs itself, even while I sleep."
        />
        <Testimonial
          attribution="Event Organizer at Tamang Karya"
          avatar={imgAvatarTamangKarya}
          avatarClassName="absolute h-[120.3%] left-[-11.95%] max-w-none top-[-9.41%] w-[120.51%]"
          quote={`Noosa turned my messy participant recaps and payment confirmations into a clean, tracked flow, so I can focus on the attendee experience."`}
        />
      </Container>
    </section>
  )
}
