'use client'
import { useState } from 'react'

export function Wishlist() {
  const [wishes, setWishes] = useState([
    { id: 1, text: "Pass the JLPT N1 exam & keep learning", completed: false },
    { id: 2, text: "Relocate to Newtown", completed: false },
    { id: 3, text: "Develop findmemoe.top website", completed: true },
    { id: 4, text: "Stay rebel, stay open, stay full", completed: true },
    { id: 5, text: "Got a Switch, a new laptop, and a new iPhone", completed: true },
  ])

  const toggleWish = (id: number) => {
    setWishes(wishes.map(w => w.id === id ? { ...w, completed: !w.completed } : w))
  }

  // 💡 ✨ 将抹茶黑换成高级的“雾霾冷炭灰” (Cool Muted Slate)
  const darkColor = "#6e6a75"

  return (
    <section className="mt-20 relative font-serif italic antialiased select-none">
      
      {/* 🤍 纸感纸质错位投影 */}
      <div 
        className="absolute inset-0 rounded-3xl translate-x-2 translate-y-2 pointer-events-none opacity-20" 
        style={{ backgroundColor: darkColor }}
      />

      {/* 🎀 左上角：小黑领结 */}
      <div className="absolute -top-6 -left-2 z-20 w-12 h-12 transform -rotate-12 opacity-95">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M50 45c-8-12-28-12-28 4s20 12 28 4m0 0c8-12 28-12 28 4s-20 12-28 4M50 45v20m-4-4l-8 12m16-12l8 12" stroke={darkColor} strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="50" cy="46" r="4.5" fill={darkColor} />
        </svg>
      </div>

      {/* --- 🌸 主容器：樱花牛乳粉背景 (#fff1f6) --- */}
      <div 
        className="relative p-9 pt-14 pb-20 rounded-3xl border-4 bg-[#fff1f6]/90 backdrop-blur-sm shadow-sm overflow-hidden transition-colors duration-500"
        style={{
          borderColor: `${darkColor}a0`,
          backgroundImage: `radial-gradient(${darkColor} 1.2px, transparent 1.2px)`,
          backgroundSize: '18px 18px',
          backgroundPosition: '0 0',
        }}
      >
        {/* 左右两侧的复古手账滚边 */}
        <div className="absolute top-0 bottom-0 left-0 w-2.5 border-r-[3px] border-dashed bg-black/5" style={{ borderColor: `${darkColor}25` }} />
        <div className="absolute top-0 bottom-0 right-0 w-2.5 border-l-[3px] border-dashed bg-black/5" style={{ borderColor: `${darkColor}25` }} />
        
        {/* 顶部复古蕾丝帘 */}
        <div className="absolute top-0 left-0 right-0 h-3 border-b-2 border-dashed bg-repeat-x opacity-25" 
             style={{ backgroundImage: `radial-gradient(circle, ${darkColor} 1.5px, transparent 2.5px)`, backgroundSize: '8px 12px', borderColor: darkColor }} />

        {/* 📌 高亮醒目标题贴纸 */}
        <div className="flex justify-center mb-12">
          <h2 
            className="relative text-[13px] font-sans font-black tracking-[0.5em] uppercase px-6 py-2 rounded-2xl border-2 transform -rotate-1 shadow-[3px_3px_0px_rgba(110,106,117,0.25)] select-none" 
            style={{ 
              color: darkColor,
              borderColor: darkColor,
              backgroundColor: '#ffffff',
            }}
          >
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] opacity-50">✦</span>
            <span className="pl-[0.5em]">future / goals</span>
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] opacity-50">✦</span>
          </h2>
        </div>
        
        {/* 愿望列表 */}
        <div className="space-y-7 relative z-10">
          {wishes.map((wish) => (
            <div 
              key={wish.id}
              onClick={() => toggleWish(wish.id)}
              className="flex items-center justify-between cursor-pointer group gap-6"
            >
              <span 
                className={`text-[14px] tracking-wide leading-relaxed transition-all duration-500 ${
                  wish.completed 
                    ? 'line-through italic opacity-40 font-normal' 
                    : 'font-bold group-hover:text-pink-500 group-hover:translate-x-1'
                }`}
                style={{ color: wish.completed ? `${darkColor}80` : '#4a4650' }}
              >
                {wish.text}
              </span>
              
              {/* 🖤 贴纸圆钮 */}
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0 group-hover:scale-110 active:scale-95"
                style={{ 
                  borderColor: `${darkColor}80`,
                  backgroundColor: wish.completed ? darkColor : 'rgba(255,255,255,0.7)' 
                }}
              >
                <span 
                  className={`text-[9px] transition-all duration-300 transform font-sans ${
                    wish.completed ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                  style={{ color: '#fff1f6' }}
                >
                  ❤
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ———————— 🎀 底部大蝴蝶结缎带 ———————— */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none flex items-center justify-center">
          <div className="absolute bottom-6 left-0 right-0 h-5 border-y border-dashed flex items-center justify-between px-4"
               style={{ backgroundColor: `${darkColor}cc`, borderColor: 'rgba(255,241,246,0.2)' }}>
            <div className="text-[7px] font-sans opacity-30" style={{ color: '#fff1f6' }}>✦ ✦</div>
            <div className="text-[7px] font-sans opacity-30" style={{ color: '#fff1f6' }}>✦ ✦</div>
          </div>
          
          <div className="absolute bottom-0 w-44 h-16 filter drop-shadow-[0_4px_8px_rgba(110,106,117,0.2)]">
            <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M100 40 C70 10, 20 20, 35 45 C45 60, 85 45, 100 40 Z" fill={darkColor} opacity="0.9" />
              <path d="M100 40 C130 10, 180 20, 165 45 C155 60, 115 45, 100 40 Z" fill={darkColor} opacity="0.9" />
              <path d="M100 40 C75 18, 35 25, 45 42" stroke="#fff" strokeWidth="1" opacity="0.2" />
              <path d="M100 40 C125 18, 165 25, 155 42" stroke="#fff" strokeWidth="1" opacity="0.2" />
              <path d="M95 42 C85 55, 60 75, 55 78 C65 78, 85 62, 95 45 Z" fill={darkColor} />
              <path d="M105 42 C115 55, 140 75, 145 78 C135 78, 115 62, 105 45 Z" fill={darkColor} />
              <rect x="91" y="33" width="18" height="14" rx="4" fill={darkColor} />
            </svg>
          </div>
        </div>

      </div>
    </section>
  )
}
