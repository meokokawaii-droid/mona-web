'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { StudioReveal } from '@/components/studio-reveal'
import { StudioSpotlight } from '@/components/studio-spotlight'

const projects = [
  {
    number: '01',
    eyebrow: 'B2B sales tool · Independent demo',
    title: 'Leeway Parts Search',
    summary:
      'A working demo that turns scattered B2B prospect data into batch outreach emails, Notion-ready exports and follow-up records for ongoing CRM work.',
    challenge:
      'Finding prospects and writing development emails one by one was repetitive, slow and difficult to track across follow-up stages.',
    contribution: 'I independently designed and built the demo, including batch email generation, data export to Notion and CRM-style follow-up records.',
    outcome: 'Validated a more structured workflow for moving from prospect discovery to outreach and follow-up in one place.',
    image: '/images/leeway-parts-search.png',
    imageAlt: 'Leeway Parts Search B2B prospect monitoring and outreach dashboard',
    href: '#contact',
    cta: 'Request a demo walkthrough',
  },
  {
    number: '02',
    eyebrow: 'AI product experiment · Product thinking',
    title: 'AI Life Strategy Simulator',
    summary:
      'A decision-support experiment that helps people examine possible life choices through variables, trade-offs and ranged scenarios—not fake certainty.',
    challenge:
      'The first version produced confident scores that looked precise but were not trustworthy enough to guide a real decision.',
    contribution: 'Concept development, prompt logic, uncertainty model, interaction design and iteration.',
    outcome: 'Reframed the product from “predict my future” into a transparent tool for structured reflection.',
    image: '/images/Simulator.jpg',
    imageAlt: 'AI Life Strategy Simulator interface',
    href: 'https://ylsds.findmemoe.top',
    cta: 'Open the simulator',
  },
  {
    number: '03',
    eyebrow: 'Manskill · Automated customer acquisition',
    title: 'Manskill Auto-Lead System',
    summary:
      'An independent demo for turning scattered company data into a repeatable customer-acquisition workflow: discover prospects, prepare outreach and keep follow-up records in one place.',
    challenge:
      'Business development work was spread across spreadsheets, inboxes and chat threads, making prospecting and follow-up easy to lose.',
    contribution: 'Independent BD consulting, workflow mapping, lead qualification logic, outreach preparation and CRM-style follow-up design.',
    outcome: 'A focused demo that makes the path from lead discovery to first contact and next action visible and repeatable.',
    image: '/images/manskill-auto-lead.png',
    imageAlt: 'Manskill automated customer acquisition workflow prototype',
    workflow: ['Discover', 'Qualify', 'Prepare outreach', 'Follow up', 'CRM record'],
    metrics: ['97 prospects', '65 qualified', '33 outreach-ready'],
    href: '#contact',
    cta: 'Request a demo walkthrough',
  },
  {
    number: '04',
    eyebrow: 'Social perception experiment · Prototype',
    title: 'Seen / Strangers',
    summary: 'A multi-perspective experiment that shows how the same public profile can be read differently by strangers from different social positions.',
    challenge: 'A single online identity is often reduced to one confident judgment, hiding the gaps between observable clues and personal interpretation.',
    contribution: 'I shaped the observation and perception layers, persona-based analysis flow and presentation of evidence, disagreement and confidence.',
    outcome: 'A quieter way to ask how we are seen: not one definitive answer, but several perspectives that leave room for reflection.',
    image: '/images/seen-strangers.png',
    imageAlt: 'Seen Strangers multi-perspective social perception experiment',
    href: 'https://seen.findmemoe.top',
    cta: 'Try the Stranger Room',
  },
]

const experience = [
  {
    role: 'Independent BD Consultant',
    company: 'Manskill',
    context: 'Business development · Independent consulting',
    date: '2026.07 — Present',
    detail: 'Supporting business development through prospect research, outreach strategy and independent client-development work.',
  },
  {
    role: 'International Business Intern',
    company: 'Baoding Jutuo Machinery',
    context: 'Agricultural machinery · B2B export',
    date: '2026 — Present',
    detail: 'Supporting cross-border client development, prospect research and digital trade operations.',
  },
  {
    role: 'AI Voice Data Trainer',
    company: 'iFLYTEK',
    context: 'AI · Speech recognition',
    date: '2024',
    detail: 'Quality auditing and data curation for large-scale language and speech systems.',
  },
]

const capabilities = [
  ['Global business', 'Cross-border trade', 'Market research', 'Business English', 'B2B outreach'],
  ['Product & AI', 'Product thinking', 'Prompt systems', 'Next.js', 'Rapid prototyping'],
  ['Research & craft', 'User research', 'Strategic writing', 'Information design', 'Content creation'],
]

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#302e2a] antialiased">
      <Navbar />

      <section className="border-b border-[#d9d2c5] px-6 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:items-start lg:gap-8">
          <StudioReveal className="lg:col-span-8" delay={40}>
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.24em] text-[#667360]">
              INTERNATIONAL BUSINESS · BD · AI WORKFLOWS
            </p>
            <h1 className="max-w-5xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] text-[#302e2a] sm:text-7xl lg:text-[104px]">
              <span className="studio-title-line block">I turn complex ideas{' '}</span>
              <span className="studio-title-line studio-title-line--accent block">into useful systems.</span>
            </h1>
            <p className="mt-10 max-w-2xl font-serif text-xl leading-8 text-[#845f4a] sm:text-2xl sm:leading-9">International Business &amp; BD — building AI-enabled systems for prospecting, research and cross-border growth.</p>
          </StudioReveal>

          <StudioReveal className="lg:col-span-4 lg:ml-8 lg:-mt-8" delay={150}>
            <figure className="group/portrait relative mx-auto w-full max-w-[360px] lg:mr-0">
              <div className="relative aspect-[4/5] overflow-hidden [clip-path:polygon(9%_3%,78%_0%,96%_13%,100%_68%,82%_96%,23%_100%,3%_82%,0%_24%)] transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/portrait:-translate-y-2 group-hover/portrait:rotate-[0.8deg] group-hover/portrait:drop-shadow-[0_24px_24px_rgba(48,46,42,0.18)] motion-reduce:transform-none motion-reduce:transition-none">
                <Image
                  src="/images/moe-editorial-portrait.png"
                  alt="Portrait of Mona Wang"
                  fill
                  priority
                  sizes="(min-width: 1024px) 360px, 80vw"
                  className="object-cover object-[50%_42%] transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/portrait:scale-[1.035] group-hover/portrait:saturate-[1.06] motion-reduce:transform-none motion-reduce:transition-none"
                />
              </div>
              <figcaption className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-[#667360] transition-colors duration-300 group-hover/portrait:text-[#9b4a3c]">
                Mona Wang · 2026
              </figcaption>
            </figure>

            <div className="mt-10 border-t border-[#8f9a88] pt-6">
              <p className="max-w-md text-base leading-7 text-[#5f5a52]">
                I’m <strong className="font-medium text-[#302e2a]">Mona Wang</strong>. I combine AI with global trade to build practical tools and workflows for prospect research, outreach and cross-border business development.
              </p>
              <a href="#work" className="mt-8 inline-flex min-h-12 items-center gap-2 text-sm font-medium text-[#9b4a3c] underline decoration-[#c98f82] underline-offset-8 transition-colors hover:text-[#74372e]">
                Selected work <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </StudioReveal>
        </div>
      </section>

      <section id="work" className="px-6 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <StudioReveal className="mb-20 grid items-end gap-8 border-b border-[#bfb7aa] pb-8 md:grid-cols-12 lg:mb-24">
            <div className="md:col-span-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#667360]">Selected work</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-[-0.035em] text-[#9b4a3c] sm:text-6xl">Selected systems for business development, research and decision-making</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#777168] md:col-span-4 md:justify-self-end md:text-right">
              Product experiments and business systems shaped through research, iteration and use.
            </p>
          </StudioReveal>

          <div className="space-y-28 lg:space-y-40">
            {projects.map((project, index) => (
              <StudioReveal key={project.title} delay={index * 70}>
              <article className={`group/project grid gap-10 transition-[transform,opacity] duration-500 ease-out active:scale-[0.995] motion-reduce:transform-none motion-reduce:transition-none ${index === 1 ? 'lg:grid-cols-12 lg:gap-8' : 'lg:grid-cols-12 lg:gap-8'} ${index === projects.length - 1 ? '' : 'border-b border-[#d9d2c5] pb-28 lg:pb-40'}`}>
                <StudioSpotlight className={index === 1 ? 'lg:col-span-12' : 'lg:col-span-7'}>
                  <Link
                    href={project.href}
                    target={project.href.startsWith('http') ? '_blank' : undefined}
                    rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={`${project.cta}: ${project.title}`}
                    className={`relative block overflow-hidden border border-[#d9d2c5] bg-[#eee9df] transition-[border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/project:-translate-y-1 group-hover/project:border-[#aeb7a9] group-hover/project:shadow-[0_24px_64px_-32px_rgba(48,46,42,0.35)] motion-reduce:transform-none motion-reduce:transition-none ${index === 1 ? 'aspect-[16/8]' : 'aspect-[4/3]'}`}
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/project:scale-[1.025] group-hover/project:saturate-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                    />
                    <span className="studio-image-sheen" aria-hidden="true" />
                    <span className="absolute left-0 top-0 bg-[#667360] px-4 py-3 font-mono text-[11px] tracking-[0.18em] text-[#f8f5ef] transition-colors duration-500 group-hover/project:bg-[#9b4a3c] motion-reduce:transition-none">
                      {project.number}
                    </span>
                  </Link>
                </StudioSpotlight>

                <div className={`flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/project:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none ${index === 1 ? 'lg:col-span-10 lg:col-start-2 lg:grid lg:grid-cols-3 lg:gap-8' : 'lg:col-span-4 lg:col-start-9 lg:pt-2'}`}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#667360]">{project.eyebrow}</p>
                  <h3 className="mt-5 font-serif text-4xl leading-[1.05] tracking-[-0.035em] text-[#9b4a3c] transition-colors duration-500 group-hover/project:text-[#74372e] motion-reduce:transition-none sm:text-5xl">{project.title}</h3>
                  <p className="mt-6 text-base leading-7 text-[#5f5a52]">{project.summary}</p>

                  {index === 2 && project.workflow ? (
                    <div className="mt-8 border-y border-[#bfb7aa] py-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#667360]">BD workflow</p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-[#845f4a]">
                        {project.workflow.map((step, stepIndex) => <span key={step} className="inline-flex items-center gap-2"><span>{step}</span>{stepIndex < project.workflow.length - 1 ? <span className="text-[#b9ac8c]">→</span> : null}</span>)}
                      </div>
                      {project.metrics ? <div className="mt-5 flex flex-wrap gap-3">{project.metrics.map(metric => <span key={metric} className="border border-[#c9b4ad] px-3 py-2 font-mono text-[10px] tracking-[.08em] text-[#667360]">{metric}</span>)}</div> : null}
                    </div>
                  ) : null}

                  <dl className="mt-10 space-y-6 border-t border-[#bfb7aa] pt-8 text-sm transition-[border-color,opacity] duration-500 group-hover/project:border-[#8f9a88] group-hover/project:opacity-100 motion-reduce:transition-none lg:opacity-90">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#667360]">Challenge</dt>
                      <dd className="mt-2 leading-6 text-[#68625a]">{project.challenge}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#667360]">My contribution</dt>
                      <dd className="mt-2 leading-6 text-[#68625a]">{project.contribution}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#667360]">Outcome</dt>
                      <dd className="mt-2 leading-6 text-[#302e2a]">{project.outcome}</dd>
                    </div>
                  </dl>

                  <Link
                    href={project.href}
                    target={project.href.startsWith('http') ? '_blank' : undefined}
                    rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group/link mt-8 inline-flex min-h-12 items-center gap-2 self-start text-sm font-medium text-[#9b4a3c] underline decoration-[#c98f82] underline-offset-8 transition-[color,transform] duration-300 hover:translate-x-1 hover:text-[#74372e] active:scale-[0.97] motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    {project.cta} <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
                  </Link>
                </div>
              </article>
              </StudioReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-y border-[#d9d2c5] bg-[#eee9df] px-6 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-12 lg:gap-8">
          <StudioReveal className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#667360]">Experience</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl tracking-[-0.035em] text-[#9b4a3c] sm:text-6xl">Where I learned by doing</h2>
            <div className="mt-16">
              {experience.map((item) => (
                <article key={item.role} className="studio-experience-row grid border-t border-[#c9b4ad] py-8 first:border-t-0 first:pt-0 sm:grid-cols-[1fr_112px] sm:gap-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-base font-medium">{item.role}</h3>
                    <span className="font-mono text-xs text-[#667360]">{item.date}</span>
                  </div>
                  <p className="mt-2 text-sm text-[#465342]">{item.company} · {item.context}</p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#68625a]">{item.detail}</p>
                </article>
              ))}
            </div>
          </StudioReveal>

          <StudioReveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#667360]">Capabilities</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.035em] text-[#9b4a3c] sm:text-5xl">A cross-disciplinary toolkit</h2>
            <div className="mt-16 space-y-10">
              {capabilities.map(([title, ...items]) => (
                <div key={title} className="studio-capability border-t border-[#c9b4ad] pt-6">
                  <h3 className="text-sm font-medium text-[#302e2a]">{title}</h3>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                    {items.map((item) => (
                      <span key={item} className="border-b border-[#b9c1b4] pb-1 text-sm text-[#68625a] transition-colors hover:border-[#9b4a3c] hover:text-[#9b4a3c]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </StudioReveal>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <StudioReveal className="mx-auto max-w-5xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#667360]">Open to opportunities</p>
          <h2 className="mx-auto mt-6 max-w-4xl font-serif text-5xl leading-[1.05] tracking-[-0.04em] text-[#9b4a3c] sm:text-7xl lg:text-[88px]">
            Let’s build something useful—and human.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-[#68625a]">
            I’m open to international BD, overseas business and AI-enabled business operations opportunities, including remote collaboration.
          </p>
          <a href="mailto:meokokawaii@gmail.com" className="studio-contact-cta mt-10 inline-flex min-h-12 items-center gap-3 overflow-hidden bg-[#9b4a3c] px-8 py-3 text-sm font-medium text-[#fff8f3] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#74372e] hover:shadow-[0_16px_32px_-18px_rgba(116,55,46,0.6)] active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none">
            <Mail className="h-4 w-4" aria-hidden="true" /> Email Mona
          </a>
          <p className="mt-8 text-xs text-[#8a8378]">Based in China · Available for remote collaboration</p>
        </StudioReveal>
      </section>
    </main>
  )
}
