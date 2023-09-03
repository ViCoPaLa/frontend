import LayoutProvider from "@/Contexts/useLayout";
import ScreenSizeProvider from "@/Contexts/useScreenSize";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ScreenSizeProvider>
      <LayoutProvider>
        <Component {...pageProps} />
      </LayoutProvider>
    </ScreenSizeProvider>
  );
}
