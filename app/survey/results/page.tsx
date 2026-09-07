import Link from "next/link";
export default function Results() {
  return (
    <main className="survey-wrap">
      <p className="survey-eyebrow">中国青年社会观念调查</p>
      <section className="survey-card">
        <h1>数据收集中</h1>
        <p>结果将在调查结束后公布。</p>
        <p>届时将根据匿名数据公布整体统计结果。</p>
        <Link className="survey-link" href="/survey">
          返回调查首页
        </Link>
      </section>
    </main>
  );
}
