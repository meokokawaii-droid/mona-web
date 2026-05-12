export function AboutSection() {
  return (
    <section className="py-6">
      {/* 去掉了厚重的背景色和粗边框，改用极简排版 */}
      <div className="p-8 relative overflow-hidden">
        
        {/* 引用语 - 卢梭 */}
        <blockquote className="text-center mb-10">
          <p className="text-lg md:text-xl text-gray-600 font-serif italic leading-relaxed tracking-wide">
            "人生而自由，却无往不在枷锁之中"
          </p>
          <cite className="text-[10px] text-gray-400 mt-4 block tracking-[0.3em] uppercase">
            — Jean-Jacques Rousseau
          </cite>
        </blockquote>

        {/* 极细的装饰线 */}
        <div className="w-12 h-px bg-pink-100 mx-auto my-8 opacity-60" />

        <div className="space-y-3 text-center">
          <p className="text-gray-600 tracking-widest text-sm">
            萌 <span className="text-pink-300 mx-2">/</span> 03年 INFP <span className="text-pink-300 mx-2">/</span> 永远在路上
          </p>
          <p className="text-gray-400 font-light text-xs tracking-[0.4em] italic">
            我思故我在
          </p>
        </div>

        {/* 原本在这里的 address 和联系方式列表已被彻底删除 */}
      </div>
    </section>
  )
}