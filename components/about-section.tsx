export function AboutSection() {
  return (
    <section className="py-6">
      <div className="paper-card backdrop-blur-sm p-8 shadow-lg relative overflow-hidden">
        {/* 引用框 */}
        <blockquote className="text-center mb-6">
          <p className="text-lg md:text-xl text-foreground italic leading-relaxed">
            {'"'}人生而自由，却无往不在枷锁之中{'"'}
          </p>
          <cite className="text-sm text-muted-foreground mt-2 block">— 卢梭</cite>
        </blockquote>

        <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto my-6" />

        <div className="space-y-4 text-center">
          <p className="text-foreground leading-relaxed">
            萌萌，03年 INFP，永远在路上
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm">
            我思故我在
          </p>
        </div>
      </div>
    </section>
  )
}
