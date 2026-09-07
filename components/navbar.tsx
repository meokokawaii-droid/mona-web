'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/studio', label: 'Work' },
  { href: '/journal', label: 'Journal' },
  { href: '/studio#about', label: 'About' },
  { href: '/studio#contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-[#d9d2c5] bg-[#f8f5ef]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-3 sm:min-h-20 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-0 lg:px-12">
        <Link href="/letter" className="shrink-0 font-serif text-2xl tracking-[-0.02em] text-[#302e2a] transition-opacity hover:opacity-65">
          Mona Wang
        </Link>

        <nav aria-label="Primary navigation" className="flex w-full items-center justify-between sm:w-auto sm:justify-start sm:gap-7">
          {links.map((link) => {
            const active = link.href === '/studio' && pathname === '/studio'
            const isWork = link.href === '/studio'
            const isJournal = link.href === '/journal'
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-11 shrink-0 items-center border-b uppercase transition-colors ${
                  isWork
                    ? 'text-[13px] font-semibold tracking-[0.22em]'
                    : isJournal
                      ? 'text-[9px] tracking-[0.1em] opacity-45'
                      : 'text-[11px] tracking-[0.16em]'
                } ${
                  active
                    ? isWork
                      ? 'border-[#9b4a3c] border-b-2 text-[#7e3d31]'
                      : 'border-transparent text-[#9b8179]'
                    : 'border-transparent text-[#777168] hover:border-[#c98f82] hover:text-[#9b4a3c]'
                }`}
              >
                {isJournal ? (
                  <span className="flex flex-col items-start justify-center leading-none">
                    <span>Journal</span>
                    <span className="mt-1 text-[7px] normal-case tracking-[0.08em] text-[#b9ac8c] opacity-80">
                      personal letters
                    </span>
                  </span>
                ) : (
                  link.label
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
