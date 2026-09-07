export function AboutSection() {
  return (
    <section className="py-2">
      {/* 去掉了厚重的背景色和粗边框，改用极简排版 */}
      <div className="relative overflow-hidden px-2 py-4 sm:px-5">
        
        {/* 引用语 - 卢梭 */}
        <blockquote className="mb-10 text-center">
          <p className="font-serif text-xl italic leading-9 tracking-wide text-stone-700 sm:text-2xl">
            "人生而自由，却无往不在枷锁之中"
          </p>
          <cite className="mt-5 block text-[10px] uppercase tracking-[0.3em] text-pink-400">
            — Jean-Jacques Rousseau
          </cite>
        </blockquote>

        {/* 极细的装饰线 */}
        <div className="mx-auto my-8 h-px w-12 bg-pink-200" />

        <div className="space-y-4 text-center">
          <p className="text-sm leading-7 tracking-[0.14em] text-stone-600">
            萌 <span className="text-pink-300 mx-2">/</span> 03年 INFP <span className="text-pink-300 mx-2">/</span> 永远在路上
          </p>
          <p className="text-xs font-light italic tracking-[0.3em] text-stone-400">
            我思故我在
          </p>
        </div>

        {/* 原本在这里的 address 和联系方式列表已被彻底删除 */}
      </div>
    </section>
  )
}
