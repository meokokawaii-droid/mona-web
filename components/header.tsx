import Image from "next/image"

const AVATAR_SRC =
  process.env.NEXT_PUBLIC_AVATAR_SRC ?? "/images/avatar.png"

export function Header() {
  return (
    <header className="text-center py-8">
      {/* 头像 - 带装饰边框 */}
      <div className="mb-6 flex justify-center">
        <div className="relative group">
          {/* 装饰圆环 */}
          <div className="absolute -inset-2 rounded-full border-2 border-dashed border-primary/50 animate-spin" style={{ animationDuration: "20s" }} />
          <div className="absolute -inset-4 rounded-full border-2 border-dotted border-accent/30 animate-spin" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
          
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-card shadow-xl ring-4 ring-primary/20">
            <Image
              src={AVATAR_SRC}
              alt="萌萌的头像"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* 名字 - 可爱风格 */}
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        萌萌
      </h1>
      <p className="text-lg text-primary font-bold mb-2">moe</p>
      
      {/* 副标题 */}
      <p className="text-muted-foreground text-sm tracking-wider">
        观察者 / 游荡者 / 我心飘零久
      </p>

      {/* 简约装饰线 */}
      <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-6" />
    </header>
  )
}
