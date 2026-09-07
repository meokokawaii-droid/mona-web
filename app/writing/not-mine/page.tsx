"use client";

import Link from "next/link";

export default function NotMinePage() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] py-12 px-6 font-serif text-[#333]">
      {/* 极简日记纸张：排版统一，无任何边框线 */}
      <article className="max-w-xl mx-auto bg-[#fffefd] shadow-sm p-10 md:p-20 min-h-[85vh] relative">
        
        <header className="mb-20 border-b border-neutral-100 pb-10">
          <Link href="/" className="text-[10px] tracking-[0.4em] text-neutral-300 hover:text-black transition-colors font-sans uppercase">
            [ Index ]
          </Link>
          <div className="mt-12 space-y-1">
            <h1 className="text-2xl font-normal text-black tracking-tighter">那些杀不死我的也并没有让我变得强大。</h1>
            <p className="text-[11px] text-neutral-400 font-sans tracking-[0.2em] uppercase">Thursday, May 14, 2026</p>
          </div>
        </header>

        <div className="space-y-16 leading-[2.3] text-[17px]">
          
          <section className="space-y-8">
            <p className="indent-8">
              其实我很喜欢工作，比上学更喜欢。所以也不明白上学为什么比进入社会好。
              学生身份带来的愚昧是一个温床，高中的衡水制度没把我淘汰掉的在以后几年淘汰了我。
            </p>
            <p className="indent-8">
              出入那些白色药片却没让我获得 peaceful，反而在独处思考里平静掉了。
              但是偶尔也正常一样地麻乱。
            </p>
          </section>

          <section className="py-6 px-10 italic text-neutral-500 bg-[#fafafa]">
            那些杀不死我的也并没有让我变得强大，只是我选择切断了它们。
            并且时不时想来一场爆破毁掉那些铸就我的一切。
          </section>

          <section className="space-y-8">
            <p className="indent-8">
              说到工作，状态松弛，同事姐年龄差不多，不用在乎说什么话错了。
              最喜欢的是每天用工作机三星挂梯子看外网，以及五分钟通勤，有更多时间自由支配。
            </p>
          </section>

          <section className="space-y-8">
            <p className="text-neutral-400 text-[15px] leading-relaxed">
              哎可是我不喜欢灰蒙蒙的天气，每天粉尘干扰，灰暗的出租屋，永远修不完的道路扬起尘沙。
              外卖员嗡得一声越过红灯穿刺，肮脏的凸凹道路，电动车框颠簸而过。
              写字楼里疲态男女！于是我也适应了每天任由生活。
              饭后油烟机吸不净的油烟扑到脸上，隔壁阴冷的老头老太为伴。
            </p>
            <p className="text-xl font-normal italic tracking-widest text-black underline decoration-1 underline-offset-8 decoration-neutral-100">
              But that’s not mine.
            </p>
          </section>

          <footer className="mt-40 text-right">
            <div className="h-px w-12 bg-neutral-200 inline-block"></div>
            <p className="text-[10px] text-neutral-300 font-sans tracking-[0.4em] mt-4 uppercase italic">Piece End</p>
          </footer>
        </div>
      </article>
    </main>
  );
}