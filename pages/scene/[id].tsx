import { useLayout } from "@/Contexts/useLayoutContext";
import ChatBubble from "@/components/Chat/Bubble";
import InputWithButton from "@/components/Common/InputWithButton";
import Hint from "@/components/Hint";
import Icons from "@/components/Icons";
import { useEffect } from "react";

export default function Scene() {
  const { setHeader, setBackground, setHideText, setText, setDarker } =
    useLayout();

  useEffect(() => {
    setHeader(false);
    setBackground("/backgrounds/1.jfif");
    setText(
      `1397년\n조선 개국 5년 째 되는 해,\n세종이 새로운 국왕으로 즉위했다.`
    );
    setHideText(false);
    setDarker(true);
  }, []);

  return (
    <>
      <main className="relative w-full h-full flex flex-col">
        <div className="absolute top-2 w-full h-12 xl:h-16 flex items-center justify-center gap-2 text-xl xl:text-2xl">
          <Icons.Location className="w-8 h-8 stroke-black" />
          집현전
        </div>
        <div className="w-full h-full overflow-y-auto pt-20 xl:pt-20 pb-24">
          <div className="">
            <ChatBubble
              texts={[
                "백성들을 위한 글자를 만들어봅시다 백성들을 위한 글자를 만들어봅시다",
                "asdf",
              ]}
              isUser={false}
            />
            <ChatBubble texts={["asdf"]} isUser={true} />
          </div>
        </div>
        <div className="absolute w-full bottom-0 pb-8 px-4">
          <InputWithButton
            disabled
            button={<Icons.Send className="w-6 h-6 stroke-white" />}
            onClick={() => {}}
          />
        </div>
      </main>
      <Hint
        text={`<h1>한글의 제자 원리</h1>\n<strong>1. 상형의 원리</strong>\n일정한 형상을 본따서 모양을 만듦.\n자음의 기본자(‘ㄱ’, ‘ㄴ’, ‘ㅁ’, ‘ㅅ’, ‘ㅇ’)는\n발음 기관의 모양을 본떠서 만들었어요.\n\n모음의 기본자(· , ㅡ, ㅣ)는\n천지인(하늘, 땅, 사람)의 모양을 본떠서 만들었어요.\n\n<strong>2. 가획의 원리</strong>\n\n‘ㅋ’, ‘ㅌ’ 등의 자음은 기본자에서\n획을 더해 더 센 소리를 표현했어요.\n\n<strong>3. 합용의 원리</strong>\n낱낱의 글자를 다시 합하여 사용함.\n\n‘ㄲ’, ‘ㄸ’, ‘ㅃ’ 등의 같은 자음은\n옆으로 나란히 합쳐서 만들었어요.`}
      />
    </>
  );
}
