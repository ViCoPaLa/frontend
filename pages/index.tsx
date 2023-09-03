import { useLayout } from "@/Contexts/useLayout";
import Intro from "@/components/Intro";
import { useEffect } from "react";

export default function Home() {
  const { setBackground, setHeader, setHideText } = useLayout();
  useEffect(() => {
    setBackground("");
    setHeader(false);
    setHideText(true);
  }, []);
  return (
    <main className="w-full h-full flex flex-col">
      <Intro type="sejong" />
    </main>
  );
}
