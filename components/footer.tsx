export function Footer() {
  return (
    <footer className="py-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-primary">~</span>
        <span className="text-lg text-accent">*</span>
        <span className="text-secondary">~</span>
        <span className="text-lg text-primary">*</span>
        <span className="text-accent">~</span>
      </div>
      <p className="text-base text-foreground font-bold">
        吾将上下而求索
      </p>
      <p className="text-xs text-muted-foreground mt-3">
        © 2026 Designed by Mona
      </p>
    </footer>
  )
}
