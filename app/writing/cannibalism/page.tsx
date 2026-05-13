import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] text-[#333] selection:bg-pink-100">
      <div className="max-w-2xl mx-auto px-6 py-20">
        {/* 返回按钮 */}
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-pink-500 transition-colors mb-12 group">
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          返回主页
        </Link>

        {/* 文章主体 */}
        <article className="space-y-10 leading-[1.8] tracking-wider">
          <header className="text-center space-y-4">
            <h1 className="text-3xl font-medium text-black">
              吃人：一种安居乐业的诅咒
            </h1>
            <p className="text-sm text-muted-foreground italic">—— 萌</p>
          </header>

          <div className="space-y-8 text-[17px] text-neutral-700">
            <p>在这个世界上不仅仅美国爱泼斯坦岛吃人，据说专吃年轻女孩。在大洋彼岸另一端，不愿透露姓名的萌女郎表示：吃人是很平常的事情，发生在我身边自己曾见过的人吃人历久弥新。出生在无数未开化过、云烟缭绕、山峦叠嶂的百姓们会不断吃下一个又一个人。</p>
            
            <div className="bg-neutral-50 p-6 border-l-2 border-pink-200 italic text-neutral-600 rounded-r-lg">
              “在吃人的时代里吃人的地方：幸存者或亦是这吃人规矩的制定者。远远望去，只需稍稍撂下一句话：努力吧，这样能够吃更多的人。便引来大家分拨蚕食，吃了一代又一代的年轻人。”
            </div>

            <p>雄性天然带着上一代半辈子留下的血和肉（以至于哀求亲友相赠），由着这劣根献上。于是雌性被裹挟着服下这剂慢性毒药，结合着感化下一代人。</p>

            <p>当然一切一切只发生在萌女管中窥豹之间，她甚至只能看到豹的屁眼。地球上最低下的蜜蜂也会歌颂自己为了采蜜而死吗？当然如此。不然地球最高等的我们为什么要心甘情愿吃人。所以他们死之后，蜂王蜂后会不会感激他们？</p>

            <p className="font-semibold text-black py-2 border-b border-dashed border-neutral-200">
              吃人就是一种顺其自然的规则，一种安居乐业的诅咒。
            </p>

            <p>吃人者不知其张口结舌间，心神热血已下肚；被吃者不知其早已被他人预定价格，静待分崩离析之际，茶余饭后之谈。吆喝着吃人的人，后代并不会被吃，甚至于继续高呼着吃人；心愿情甘被吃的人，后代继续踩着肩膀上桌，等待被宰割；吃过更多人的人，给每份肉打上标签，掂量值不值得吃这一顿饱腹。</p>

            <p>有人会不被吃干抹净吗？买猪肉皆知要花色红润、肥瘦相间，符合这统一的品相标准。其所谓不被吃的人，是吃人者口中大逆不道之流，这样的味道也不会过于鲜美，品相也如摧枯拉朽差得远。</p>
            
            <p>为什么他们不自己吃自己诞下的血肉？因为彼时他们已借着苍天大老爷身份离开吃人之地域，但茹毛饮血，本性难改，再加只尝过人肉的美味，更何况正值吃人浪潮！便跳脱着一遍遍喊着吃人！</p>

            <p className="italic text-neutral-500">所谓萌女子是不是也被吃了或者也要被吃？也许是的。如今存在的也许是她深夜每个鬼魂的呼唤。</p>

            <div className="mt-16 pt-8 border-t border-neutral-100">
              <div className="bg-pink-50/30 p-6 rounded-2xl space-y-4">
                <p className="text-sm font-medium text-pink-700">“你好我不幸在这吃人的地方！马上二十而礼成，怎么样才能不被吃！”</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  “你可以选择屁滚尿流地逃离这个地方！但愿你的肉质鲜美、值得他们献祭给上天自己选。但是…某种情形下，被吃也是伟大的事、幸运的事。你不知道，多少人为了被吃掉削尖脑袋！赶快净身下锅吧。没准对于你来说空气也是一种慢性毒药！”
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}