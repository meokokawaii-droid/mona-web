export function Footer() {
  return (
    <footer className="py-12 mt-8 border-t border-dashed border-pink-100/50">
      {/* 联系方式部分 - 极简排版 */}
      <div className="flex flex-col space-y-4 mb-10 px-4">
        
        {/* WhatsApp */}
        <div className="flex items-center group transition-all duration-300 hover:translate-x-1">
          <span className="text-pink-300 mr-4 opacity-40">✦</span>
          <a href="https://wa.me/8617320932309" className="text-xs tracking-[0.2em] text-gray-500 hover:text-pink-400 transition-colors">
            WhatsApp / <span className="opacity-60 text-[11px]">86 173 2093 2309</span>
          </a>
        </div>

        {/* WeChat - 保持错位感 */}
        <div className="flex items-center pl-6 group transition-all duration-300 hover:translate-x-1">
          <span className="text-pink-300 mr-4 opacity-40">✦</span>
          <p className="text-xs tracking-[0.2em] text-gray-500">
            WeChat / <span className="opacity-60 text-[11px]">miko33q33</span>
          </p>
        </div>

        {/* Email - 偏移更多 */}
        <div className="flex items-center pl-12 group transition-all duration-300 hover:translate-x-1">
          <span className="text-pink-300 mr-4 opacity-40">✦</span>
          <a href="mailto:meokokawaii@gmail.com" className="text-xs tracking-[0.1em] text-gray-400 italic hover:text-pink-400 underline underline-offset-4 decoration-pink-100">
            meokokawaii@gmail.com
          </a>
        </div>
      </div>

      {/* 底部文案部分 */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4 opacity-20">
          <span className="h-[1px] w-12 bg-gray-300"></span>
        </div>
        
        <p className="text-sm text-gray-400 font-serif tracking-[0.3em] mb-2">
          吾将上下而求索
        </p>
        
        <p className="text-[9px] text-gray-300 tracking-widest uppercase">
          © 2026 Designed by Mona
        </p>
      </div>
    </footer>
  )
}