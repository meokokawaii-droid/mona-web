'use client'

import Link from "next/link"
import Image from "next/image"

export default function HomelandPage() {
  return (
    <article className="min-h-screen bg-[#fcfbf9] py-16 px-6 md:px-8 max-w-2xl mx-auto font-serif text-[#4e4a42] leading-loose selection:bg-[#e4ded2]">
      
      {/* 🧭 返回导航 */}
      <div className="mb-12">
        <Link 
          href="/writing" 
          className="text-xs text-[#bfa17a] hover:text-[#a0825b] transition-all flex items-center gap-2 font-mono tracking-widest"
        >
          ← BACK TO ARCHIVE / 归档
        </Link>
      </div>

      {/* 🍂 诗歌行文头部 */}
      <header className="mb-16 border-b border-[#ebd9c2] pb-8">
        <h1 className="text-2xl md:text-3xl font-normal text-[#2e2b25] tracking-widest leading-snug mb-6 text-center md:text-left">
          被工业浪潮遗忘的山村，<br className="hidden md:block"/>与沙漠里的圆形绿洲
        </h1>
        
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px] text-[#9c9384] font-mono tracking-wider uppercase">
          <span>June, 2026</span>
          <span>•</span>
          <span>No. 042</span>
          <div className="flex gap-2 text-[10px]">
            <span className="px-2 py-0.5 border border-[#dfd5c6] rounded bg-[#f4eee3] text-[#8c7e6b]">随笔</span>
            <span className="px-2 py-0.5 border border-[#dfd5c6] rounded bg-[#f4eee3] text-[#8c7e6b]">乡愁</span>
            <span className="px-2 py-0.5 border border-[#dfd5c6] rounded bg-[#f4eee3] text-[#8c7e6b]">工业与土地</span>
          </div>
        </div>
      </header>

      {/* 📖 正文区域 */}
      <div className="space-y-12 text-[16px] text-[#3d3a33] tracking-widest">
        
        {/* 💬 聊天气泡框 */}
        <div className="relative ml-4 md:ml-6 mt-6 mb-8 bg-[#e1eedd]/80 border-2 border-[#c2dcbc] rounded-[24px_24px_24px_4px] p-5 md:p-6 shadow-[4px_4px_0px_rgba(194,220,188,0.4)] text-[14px] font-sans">
          <div className="absolute left-[-10px] bottom-[-2px] w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-[#c2dcbc] border-b-[0px] border-b-transparent"></div>
          <div className="absolute left-[-7px] bottom-[0px] w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-[#e1eedd] border-b-[0px] border-b-transparent z-10"></div>
          
          <div className="text-[10px] uppercase font-mono tracking-wider text-[#6b8c6e] mb-2 flex items-center gap-1">
            <span>💬 QUOTE / 远方的回响</span>
          </div>

          <div className="space-y-4 text-[#4a634c] italic font-medium leading-relaxed">
            <p>
              “通过你的工业化农场，我想到了我的故乡。这是我的故乡，在中国北方的山区里，我还是个化子的时候，会跟着老农民一起上山采摘板栗，前几天我回到了故乡，我发现它还是曾经的样子，没有任何拖拉机无人机现代机械的痕迹，因为在山里面无法进入。
            </p>
            <p>
              我觉得很遗憾，因为老人们依旧在自己人工背着背包浇水给作物打药。虽然我是机械公司的产品经理，但是并不能给我的山村带来任何改变。我的家乡的农民们依旧自给自足地生活着。自己种作物自己吃。这样的生活像是田园牧歌一般。”
            </p>
          </div>
        </div>

        {/* 诗歌段落 1 */}
        <div className="space-y-3 pl-4 border-l border-[#ebd9c2] italic text-[#5c564a]">
          <p>农业的工业化，</p>
          <p>终究把我的山村遗忘了。</p>
          <p>前几日假期，我像个重回旧地的小孩，</p>
          <p>看见那些熟悉的老人，依然背着笨重的背包，</p>
          <p>在寂静的山谷里，孤独地给作物打药。</p>
        </div>

        {/* 🖼️ 图片 1：故乡山村的花 */}
        <div className="my-10 p-3 bg-[#f5f2eb] border border-[#e1d9cc] rounded-lg shadow-sm">
          <div className="overflow-hidden rounded-md">
            <Image 
              src="/images/hometown-flower.jpg" 
              alt="故乡山村的花" 
              width={700} 
              height={930} 
              className="w-full h-auto object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="mt-3 text-center text-[12px] tracking-widest text-[#8c8270] font-sans">
            —— ✦ 北方山区故乡里，依旧是记忆中的模样
          </div>
        </div>

        {/* 🖼️ 画面并排区域 */}
        <div className="my-10 p-3 bg-[#f5f2eb] border border-[#e1d9cc] rounded-lg shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="overflow-hidden rounded-md border border-[#e1d9cc]/60">
              <Image 
                src="/images/saudi-chat-2.jpg" 
                alt="对话记录" 
                width={350} 
                height={450} 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-md border border-[#e1d9cc]/60">
              <Image 
                src="/images/saudi-chat-1.jpg" 
                alt="对话记录" 
                width={350} 
                height={450} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* 诗歌段落 2 */}
        <div className="space-y-2">
          <p>当远方的沙特阿拉伯客户把地址发给我时，</p>
          <p>我顺手拉开了卫星地图的轴线——</p>
          <p>那是怎样一幅震撼的画面，</p>
          <p>大片大片完美的圆形地块，毫无保留地镶嵌在无垠的黄色大漠里，</p>
          <p>像遗落在荒原上的，一枚枚葱郁的斑点。</p>
        </div>

        {/* 🖼️ 图片 2：沙特客户聊天记录 */}
        <div className="my-10 p-3 bg-[#f5f2eb] border border-[#e1d9cc] rounded-lg shadow-sm">
          <div className="overflow-hidden rounded-md">
            <Image 
              src="/images/chat-screenshot.jpg" 
              alt="与沙特客户的聊天" 
              width={700} 
              height={850} 
              className="w-full h-auto object-cover opacity-95"
            />
          </div>
          <div className="mt-3 text-center text-[12px] tracking-widest text-[#8c8270] font-sans">
            —— ✦ 远方客户发来的讯息，与跨越地域的中国制造链条
          </div>
        </div>

        {/* 🖼️ 图片 3：沙特农田微观细节 */}
        <div className="my-10 p-3 bg-[#f5f2eb] border border-[#e1d9cc] rounded-lg shadow-sm">
          <div className="overflow-hidden rounded-md">
            <Image 
              src="/images/saudi-farm-detail.jpg" 
              alt="沙特圆形农田近景" 
              width={700} 
              height={430} 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="mt-3 text-center text-[12px] tracking-widest text-[#8c8270] font-sans">
            —— ✦ 镶嵌在黄色沙漠中的巨型圆形农田
          </div>
        </div>

        {/* 诗歌段落 3 */}
        <div className="space-y-3">
          <p>高中时死记硬背的地理课本，</p>
          <p>写着沙特利用深层地下水灌溉的宏大叙事。</p>
          <p>但在少年的填鸭式教育下，我从未真正凝视过它的全貌。</p>
          <p>直到今天才发现，那些如齿轮般严密排列的麦田，</p>
          <p>跨越万里，也需要一颗来自中国工厂的机械座椅，</p>
          <p>以便让另一个人，继续在滚烫的黄沙里丈量绿洲。</p>
        </div>

        {/* 🖼️ 图片 4：沙特农田宏观密集群 */}
        <div className="my-10 p-3 bg-[#f5f2eb] border border-[#e1d9cc] rounded-lg shadow-sm">
          <div className="overflow-hidden rounded-md">
            <Image 
              src="/images/saudi-farm-macro.jpg" 
              alt="沙特农田密集斑点" 
              width={700} 
              height={520} 
              className="w-full h-auto object-cover grayscale-[15%]"
            />
          </div>
          <div className="mt-3 text-center text-[12px] tracking-widest text-[#8c8270] font-sans">
            —— ✦ 地图上如斑点般整齐排列的现代农业奇迹
          </div>
        </div>

        {/* 分隔线 */}
        <div className="py-6 text-center text-[#c2b5a3] tracking-[0.6em] text-xs">✦ ✦ ✦</div>

        {/* 诗歌段落 4 */}
        <div className="space-y-2">
          <p>而我的家乡呢？</p>
          <p>年轻人一个接一个地挥别了这片故土，</p>
          <p>让它在地图上渐渐坍塌成一种抽象的乡愁。</p>
          <p>只有不愿离去的老人，固执地经营着眼前的一亩三分，</p>
          <p>那是他们半生的安身之所，也是农业时代最后的微缩剪影。</p>
          <p>在这里，金秋的收获没有收割机的轰鸣，</p>
          <p>只有面朝黄土的壮汉与媳妇，合力把玉米一捧捧装进粗糙的蛇皮袋中。</p>
        </div>

        {/* 诗歌段落 5 */}
        <div className="space-y-2">
          <p>在这被现代工业和速度裹挟的洪流里，</p>
          <p>这份仿佛静止的田园牧歌，分外孤独真诚。</p>
          <p>我无法否认，古老的农业社会正从大地上悄然消退——</p>
          <p>如果注定要有人留在山林里隐居，</p>
          <p>就让那些属于土地的老人，做完这场漫长的告别吧。</p>
        </div>

        {/* 强力的结尾诗行 */}
        <div className="pt-6 border-t border-dashed border-[#ebd9c2] font-normal text-[#1a1916] text-[18px] tracking-widest leading-relaxed">
          我很幸运，<br />
          我曾赤脚踩过泥土，拥有着农业时代的乡土中国烙印；<br />
          我也正目视前方，亲眼见证着这个工业化时代的钢铁巨轮，轰鸣向前。
        </div>
      </div>

      {/* 🎀 页脚 */}
      <footer className="mt-24 pt-8 border-t border-[#ebd9c2] text-center text-[10px] font-mono tracking-[0.3em] text-[#9c9384]">
        © MONA VISUAL STUDIO // WRITING PORTFOLIO 2026
      </footer>
    </article>
  )
}