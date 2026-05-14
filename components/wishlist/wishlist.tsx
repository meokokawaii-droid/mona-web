'use client'
import { useState } from 'react'

export function Wishlist() {
  const [wishes, setWishes] = useState([
    { id: 1, text: "GET JLPT N1 CERTIFICATE", completed: false },
    { id: 2, text: "RELOCATE TO NEWTOWN", completed: false },
    { id: 3, text: "DEVELOP FINDMEMOE.TOP WEBSITE", completed: true },
    { id: 4, text: "STAY REBEL, STAY OPEN,STAY FULL", completed: true },
    { id: 5, text: "GOT A SWITCH,GOT A NEW LAPTOP OR COMPUTER,GOT A NEW IPHONE", completed: true },
  ])

  const toggleWish = (id: number) => {
    setWishes(wishes.map(w => w.id === id ? { ...w, completed: !w.completed } : w))
  }

  return (
    <section className="mt-16 relative font-mono">
      {/* --- Ins风蝴蝶结装饰 --- */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 w-16 h-16 animate-pulse">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path 
            d="M50 40c-10-15-35-15-35 5s25 15 35 5m0 0c10-15 35-15 35 5s-25 15-35 5M50 40v15m-5-5l-10 15m20-15l10 15" 
            stroke="#f472b6" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          <circle cx="50" cy="42" r="4" fill="#f472b6" />
        </svg>
      </div>

      {/* --- 简约装饰边框容器 --- */}
      <div className="relative bg-white/40 backdrop-blur-sm p-8 rounded-[2rem] border-2 border-pink-100 shadow-sm transition-all duration-500 hover:shadow-md">
        
        {/* 四角的简约装饰小点 */}
        <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-pink-200 rounded-full"></div>
        <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-pink-200 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-pink-200 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-pink-200 rounded-full"></div>

        <h2 className="text-center text-[10px] font-bold tracking-[0.4em] text-pink-300 uppercase mb-10">
          Future / Goals
        </h2>
        
        <div className="space-y-6">
          {wishes.map((wish) => (
            <div 
              key={wish.id}
              onClick={() => toggleWish(wish.id)}
              className="flex items-center justify-between cursor-pointer group"
            >
              <span className={`text-[11px] tracking-widest transition-all duration-500 ${
                wish.completed ? 'text-pink-200 line-through opacity-60' : 'text-gray-500'
              }`}>
                {wish.text}
              </span>
              
              {/* 极简开关感特效 */}
              <div className={`w-8 h-4 rounded-full border border-pink-100 relative transition-colors ${
                wish.completed ? 'bg-pink-100' : 'bg-transparent'
              }`}>
                <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  wish.completed ? 'right-1 bg-white shadow-sm' : 'left-1 bg-pink-100'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* 底部装饰线 */}
        <div className="mt-10 flex justify-center gap-2">
          <div className="w-1 h-1 bg-pink-100 rounded-full"></div>
          <div className="w-12 h-[1px] bg-pink-50 self-center"></div>
          <div className="w-1 h-1 bg-pink-100 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}