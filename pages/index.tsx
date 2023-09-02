import { useLayout } from "@/Contexts/useLayoutContext";
import Intro from "@/components/Intro";
import { useEffect } from "react";

export default function Home() {
  const { setHeader, setHideText } = useLayout();
  useEffect(() => {
    setHeader(false);
    setHideText(true);
  }, []);
  return (
    <main className="w-full h-screen flex flex-col">
      <Intro type="sejong" />
    </main>
  );
}
