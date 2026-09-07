"use client";

import { outfits } from "@/lib/wardrobe-data";

export default function WardrobePage() {
  return (
    <main className="min-h-screen bg-[#fff0f5] py-20 px-8"
          style={{ backgroundImage: 'radial-gradient(#ffc0cb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-[#ff69b4] tracking-[0.2em] drop-shadow-sm font-serif">MY CLOSET</h1>
          <p className="text-[#ffb6c1] mt-2 tracking-[0.3em] text-[10px]">PRETTY COLLECTION</p>
        </header>

        {/* 九宫格陈列柜 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {outfits.map((outfit) => (
            <div key={outfit.id} className="group cursor-pointer">
              {/* 橱窗框体：毛玻璃质感 + 甜美边框 */}
              <div className="relative w-full aspect-[3/4] bg-white/60 backdrop-blur-sm border-[6px] border-white shadow-[0_8px_16px_rgba(255,105,180,0.2)] rounded-2xl flex items-center justify-center p-2 transition-all hover:-translate-y-2">
                
                {/* 内部图片：通过 flex 居中对齐 */}
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={`/wardrobe/${outfit.id}.png`} 
                    alt={outfit.name}
                    className="max-w-[80%] max-h-[80%] object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = `/wardrobe/${outfit.id}.jpg`; }}
                  />
                </div>
                
                {/* 右上角精致的小丝带元素（装饰） */}
                <div className="absolute top-2 right-2 w-6 h-6 text-[#ff69b4]">🎀</div>
              </div>
              
              {/* 名称标签 */}
              <div className="mt-4 text-center">
                <span className="text-[10px] font-bold text-[#ff69b4] bg-white px-3 py-1 rounded-full shadow-sm uppercase tracking-widest">{outfit.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
