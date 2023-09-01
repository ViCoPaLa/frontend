import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen bg-gray-200">
      <div className="w-full max-w-md h-screen overflow-auto absolute right-[10%] bg-white shadow-lg">
        {children}
      </div>
    </div>
  );
}
