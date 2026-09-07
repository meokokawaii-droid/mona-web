'use client'

import type { PointerEvent, ReactNode } from 'react'

export function StudioSpotlight({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const updateSpotlight = (event: PointerEvent<HTMLDivElement>) => {
    const element = event.currentTarget
    const bounds = element.getBoundingClientRect()
    element.style.setProperty('--studio-spot-x', `${event.clientX - bounds.left}px`)
    element.style.setProperty('--studio-spot-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <div className={`studio-spotlight ${className}`} onPointerMove={updateSpotlight}>
      {children}
      <span className="studio-spotlight-glow" aria-hidden="true" />
    </div>
  )
}
