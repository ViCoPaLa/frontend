import cc from "classcat";
import { ReactNode, useState } from "react";

export default function InputWithButton({
  button,
  disabled = false,
  onClick,
}: {
  button: ReactNode;
  disabled?: boolean;
  onClick: Function;
}) {
  const [text, setText] = useState("");
  return (
    <div
      className={cc([
        "flex gap-2 w-full border border-stroke rounded-lg p-2",
        disabled ? "bg-background" : "bg-white",
      ])}
    >
      <div className="w-full px-2 flex items-center">
        <textarea
          disabled={disabled}
          className="w-full bg-transparent focus:outline-none resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              //@ts-ignore
              if (e.isComposing) return;
              e.preventDefault();
              onClick(text);
              setText("");
            }
          }}
        />
      </div>
      <button
        disabled={disabled}
        className="bg-[#0D622F] px-4 py-3 rounded-lg hover:bg-[#123821] disabled:bg-gray-500 transition-colors"
        onClick={() => {
          onClick(text);
          setText("");
        }}
      >
        {button}
      </button>
    </div>
  );
}
