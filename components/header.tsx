import Image from "next/image"

const AVATAR_SRC =
  process.env.NEXT_PUBLIC_AVATAR_SRC ?? "/images/avatar.png"

export function Header() {
  return (
    <header className="text-center py-8">
      {/* 头像 - 蕾丝感装饰边框 */}
      <div className="mb-6 flex justify-center">
        <div className="relative group">
          {/* 装饰圆环 - 改为淡淡的粉色虚线，模拟蕾丝感 */}
          <div className="absolute -inset-2 rounded-full border-2 border-dashed border-pink-200/60 animate-spin" style={{ animationDuration: "20s" }} />
          <div className="absolute -inset-4 rounded-full border-2 border-dotted border-stone-200/50 animate-spin" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
          
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <Image
              src={AVATAR_SRC}
              alt="萌萌的头像"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* 名字 - 优雅文艺风格 */}
      <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-2 font-serif">
        萌萌
      </h1>
      <p className="text-sm text-stone-400 tracking-[0.3em] font-light mb-4 uppercase">Mona Meoko</p>
      
      {/* 副标题 - 更有呼吸感的间距 */}
      <p className="text-stone-500 text-sm tracking-widest italic font-serif">
        观察者 / 游荡者 / 我心飘零久
      </p>

      {/* 简约装饰线 - 改为浅灰色渐变，去掉绿色 */}
      <div className="w-20 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent mx-auto mt-6" />
    </header>
  )
}