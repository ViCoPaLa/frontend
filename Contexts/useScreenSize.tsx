import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ScreenSizeContext = createContext({
  width: 0,
});

export default function ScreenSizeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const setScreen = () => {
      setWidth(window.innerWidth);
    };
    setScreen();
    window.addEventListener("resize", setScreen);
    return () => window.removeEventListener("resize", setScreen);
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ width }}>
      {children}
    </ScreenSizeContext.Provider>
  );
}

export const useScreenSize = () => useContext(ScreenSizeContext);
