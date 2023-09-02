import InputWithButton from "../Common/InputWithButton";
import Icons from "../Icons";

export default function ChatList() {
  return (
    <>
      <div className="w-full h-full overflow-auto">
        <div className="h-[150vh]">dddf</div>
      </div>
      <div className="w-full shrink-0 p-2 pb-8">
        <InputWithButton
          button={<Icons.Send className="w-6 h-6 stroke-white" />}
          onClick={() => {}}
        />
      </div>
    </>
  );
}
