import Icons from "@/components/Icons";
import Layout from "@/components/Layout";

export default function Scene() {
  return (
    <Layout
      header
      background="/backgrounds/1.jfif"
      text={`1397년\n조선 개국 5년 째 되는 해,\n세종이 새로운 국왕으로 즉위했다.`}
    >
      <div className="w-full h-16 flex items-center justify-center gap-2 text-2xl">
        <Icons.Location className="w-8 h-8 stroke-black" />
        집현전
      </div>
      <main className="w-full h-screen flex flex-col">asdf</main>
    </Layout>
  );
}
