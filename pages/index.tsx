import Intro from "@/components/Intro";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <main className="w-full h-screen flex flex-col">
        <Intro type="sejong" />
      </main>
    </Layout>
  );
}
