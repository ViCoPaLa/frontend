import { useAlert } from "@/Contexts/useAlert";
import { useLayout } from "@/Contexts/useLayout";
import ChatList from "@/components/Chat/List";
import InputWithButton from "@/components/Common/InputWithButton";
import Hint from "@/components/Hint";
import Icons from "@/components/Icons";
import MissionModal from "@/components/Modal/Mission";
import { ChatType } from "@/types/chat";
import { SceneType } from "@/types/scene";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

export default function Scene({ scene }: { scene: SceneType }) {
  const { setHeader, setBackground, setHideText, setText, setDarker } =
    useLayout();
  const { push } = useAlert();

  const [isMissionOpened, setIsMissionOpened] = useState(true);

  useEffect(() => {
    setHeader(false);
    setBackground(scene.background_image);
    setText(scene.description);
    setHideText(false);
    setDarker(true);

    setIndex(0);
    setChats([]);
    setIsMissionOpened(!!scene.mission.mission_no);
  }, [scene]);

  const [index, setIndex] = useState(-1);
  const [chats, setChats] = useState<ChatType[]>([]);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (index >= 0) {
      if (index < scene.chats.length) {
        setChats((chats) => [...chats, scene.chats[index]]);
      } else {
        if (scene.is_user_scene) setDisabled(false);
        else router.push(`/scene/${scene.scene_no + 1}`);
      }
    }
  }, [index]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
  }, [chats]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    try {
      setChats((chats) => [
        ...chats,
        {
          isUser: true,
          message: [text],
        },
      ]);
      const result = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/story/${scene.scene_no}/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              person: "세종",
              message: text,
            }),
          }
        )
      ).json();
      if (
        result.basics === "1" ||
        result.basics === "2" ||
        result.basics === "3"
      )
        push(
          "✔" +
            ["상형의 원리", "가획의 원리", "합용의 원리"][
              parseInt(result.basics) - 1
            ] +
            "를 언급하셨습니다."
        );
      setChats((chats) => [
        ...chats,
        {
          isUser: false,
          ...result.chat,
        },
      ]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main
        className="relative w-full h-full flex flex-col"
        onClick={() => {
          setIndex((index) => index + 1);
        }}
      >
        <div className="absolute bg-background py-2 w-full h-12 xl:h-16 flex items-center justify-center gap-2 text-xl xl:text-2xl">
          <Icons.Location className="w-8 h-8 stroke-black" />
          {scene.location}
        </div>
        <div
          className="w-full h-full overflow-y-auto pt-20 xl:pt-20 pb-32"
          ref={scrollRef}
        >
          {!isMissionOpened && <ChatList chats={chats} isLoading={isLoading} />}
        </div>
        <div className="absolute w-full bottom-0 pb-8 px-4">
          <InputWithButton
            disabled={disabled || isLoading}
            button={<Icons.Send className="w-6 h-6 stroke-white" />}
            onClick={(text: string) => {
              handlePost(text);
            }}
          />
        </div>
      </main>
      {disabled && (
        <div className="absolute inset-x-0 bottom-28 text-gray-600 px-4 text-center animate-pulse">
          다음으로 넘어가려면 화면을 누르시오
        </div>
      )}
      {scene.mission?.mission_no && (
        <>
          <Hint text={scene.mission.mission_hint} />
          <MissionModal
            isOpened={isMissionOpened}
            setIsOpened={setIsMissionOpened}
            index={scene.mission.mission_no}
            text={scene.mission.mission_description}
          />
        </>
      )}
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
    mission: {
      mission_no: 0,
      mission_description: "",
      mission_hint: "",
    },
    is_user_scene: false,
  };
  try {
    scene = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/story/${context.params?.id}`
      )
    ).json();
    console.log({
      ...scene,
      chats: scene.chats.map((chat) => ({ ...chat, isUser: false })),
    });
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      scene,
    },
  };
};
