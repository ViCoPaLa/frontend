import { useLayout } from "@/Contexts/useLayoutContext";
import ChatList from "@/components/Chat/List";
import InputWithButton from "@/components/Common/InputWithButton";
import Hint from "@/components/Hint";
import Icons from "@/components/Icons";
import MissionModal from "@/components/Modal/Mission";
import { ChatType } from "@/types/chat";
import { SceneType } from "@/types/scene";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

export default function Scene({ scene }: { scene: SceneType }) {
  const { setHeader, setBackground, setHideText, setText, setDarker } =
    useLayout();

  const [isMissionOpened, setIsMissionOpened] = useState(true);

  useEffect(() => {
    setHeader(false);
    setBackground("/backgrounds/1.jfif");
    setText(scene.description);
    setHideText(false);
    setDarker(true);
  }, []);

  const [index, setIndex] = useState(-1);
  const [chats, setChats] = useState<ChatType[]>([]);

  useEffect(() => {
    if (index >= 0 && index < scene.chats.length)
      setChats((chats) => [...chats, scene.chats[index]]);
  }, [index]);

  return (
    <>
      <main
        className="relative w-full h-full flex flex-col"
        onClick={() => setIndex((index) => index + 1)}
      >
        <div className="absolute top-2 w-full h-12 xl:h-16 flex items-center justify-center gap-2 text-xl xl:text-2xl">
          <Icons.Location className="w-8 h-8 stroke-black" />
          {scene.location}
        </div>
        <div className="w-full h-full overflow-y-auto pt-20 xl:pt-20 pb-24">
          {!isMissionOpened && <ChatList chats={chats} />}
        </div>
        <div className="absolute w-full bottom-0 pb-8 px-4">
          <InputWithButton
            disabled
            button={<Icons.Send className="w-6 h-6 stroke-white" />}
            onClick={() => {}}
          />
        </div>
      </main>
      <div className="absolute inset-x-0 bottom-28 text-gray-600 px-4 text-center animate-pulse">
        다음으로 넘어가려면 화면을 누르시오
      </div>
      <Hint text={scene.mission[0].mission_hint} />
      <MissionModal
        isOpened={isMissionOpened}
        setIsOpened={setIsMissionOpened}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let scene: SceneType = {
    scene_no: 1,
    background_image: "",
    location: "위치",
    chats: [],
    description: "",
    mission: [],
  };
  try {
    scene = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/story/${context.params?.id}`
      )
    ).json();
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      scene,
    },
  };
};