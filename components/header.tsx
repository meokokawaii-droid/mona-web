import Image from 'next/image'

const AVATAR_SRC = process.env.NEXT_PUBLIC_AVATAR_SRC ?? '/images/avatar.png'

export function Header() {
  return (
    <header className="px-2 pb-12 pt-8 text-center sm:pb-14 sm:pt-10">
      <div className="mb-8 flex justify-center">
        <div className="group relative">
          <div className="absolute -inset-2 animate-spin rounded-full border border-dashed border-pink-300/70" style={{ animationDuration: '24s' }} />
          <div className="absolute -inset-4 animate-spin rounded-full border border-dotted border-stone-300/60" style={{ animationDuration: '36s', animationDirection: 'reverse' }} />

          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-[0_16px_36px_-18px_rgba(108,73,84,0.55)] transition-transform duration-500 group-hover:scale-[1.03] sm:h-36 sm:w-36">
            <Image src={AVATAR_SRC} alt="Moe 的头像" fill className="object-cover" />
          </div>
        </div>
      </div>

      <h1 className="mb-4 font-serif text-5xl font-medium tracking-[-0.04em] text-stone-800 sm:text-6xl">
        MOE
      </h1>

      <p className="journal-signature text-sm leading-7 text-[#83927a] sm:text-base">
        观察者 / 游荡者 / 我心飘零久
      </p>

      <div className="journal-bow-divider mx-auto mt-6" aria-hidden="true">
        <span />
        <b>୨୧</b>
        <span />
      </div>
    </header>
  )
}
