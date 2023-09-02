import Layout from "@/components/Layout";
import {
  ReactNode,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface LayoutType {
  hideText: boolean;
  setHideText: Dispatch<SetStateAction<boolean>>;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  background: string;
  setBackground: Dispatch<SetStateAction<string>>;
  header: boolean;
  setHeader: Dispatch<SetStateAction<boolean>>;
  darker: boolean;
  setDarker: Dispatch<SetStateAction<boolean>>;
}

const layoutContext = createContext<LayoutType>({
  hideText: false,
  setHideText: () => {},
  text: "",
  setText: () => {},
  background: "",
  setBackground: () => {},
  header: false,
  setHeader: () => {},
  darker: false,
  setDarker: () => {},
});

export default function LayoutProvider({ children }: { children: ReactNode }) {
  const [hideText, setHideText] = useState(false);
  const [text, setText] = useState("");
  const [background, setBackground] = useState("");
  const [header, setHeader] = useState(false);
  const [darker, setDarker] = useState(false);

  return (
    <layoutContext.Provider
      value={{
        header,
        setHeader,
        hideText,
        setHideText,
        text,
        setText,
        background,
        setBackground,
        darker,
        setDarker,
      }}
    >
      <Layout
        header={header}
        text={hideText ? "" : text}
        background={background}
        darker={darker}
      >
        {children}
      </Layout>
    </layoutContext.Provider>
  );
}

export const useLayout = () => useContext(layoutContext);
