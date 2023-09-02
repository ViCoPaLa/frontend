import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen bg-primary flex items-center justify-center">
      <div className="w-full hidden xl:flex items-center justify-center pl-36 pr-24">
        <img src="/logo.png" className="w-full" />
      </div>
      <div className="w-full max-w-[800px] flex justify-center shrink-0">
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
