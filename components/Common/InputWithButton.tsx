import { ReactNode } from "react";

export default function InputWithButton({
  button,
  onClick,
}: {
  button: ReactNode;
  onClick: Function;
}) {
  return (
    <div className="flex gap-2 w-full border border-gray-500 rounded-lg p-2">
      <div className="w-full px-2 flex items-center">
        <input className="w-full bg-transparent focus:outline-none" />
      </div>
      <button
        className="bg-black px-4 py-2 rounded-lg"
        onClick={() => onClick()}
      >
        {button}
      </button>
    </div>
  );
}
