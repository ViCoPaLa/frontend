import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen bg-primary flex items-center justify-center">
      <div className="lg:absolute w-[800px] right-0 flex">
        <img
          src="/border-l.png"
          className="hidden lg:block h-screen object-contain translate-x-1/3"
        />
        <div className="w-full max-w-md h-screen overflow-auto bg-background z-10">
          {children}
        </div>
        <img
          src="/border-r.png"
          className="hidden lg:block h-screen object-contain -translate-x-1/3"
        />
      </div>
    </div>
  );
}
