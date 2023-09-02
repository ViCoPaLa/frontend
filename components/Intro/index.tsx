import Link from "next/link";
import Icons from "../Icons";

export default function Intro({ type }: { type: "sejong" }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-12">
      <img
        src="/stories/sejong.png"
        className="w-56 h-56 rounded-full intro-profile"
      />
      <Link
        href="/scene/1"
        className="px-8 py-5 border border-stroke rounded-xl text-3xl flex items-center gap-4 transition-colors hover:border-primary hover:bg-primary hover:text-white"
      >
        들어가기 <Icons.ChevronRight className="w-4 h-9 stroke-black" />
      </Link>
    </div>
  );
}
