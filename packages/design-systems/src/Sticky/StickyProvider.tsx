import { createContext, useContext, useEffect, useRef, useState } from "react";

type StickyContextValue = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};
const StickyContext = createContext<StickyContextValue>({ state: false, setState: () => null });

type StickyProviderProps = {
  children: React.ReactNode;
};

export const useSticky = () => {
  return useContext(StickyContext);
};

const StickyProvider = ({ children }: StickyProviderProps) => {
  const [state, setState] = useState(false);
  const [headerHeight] = useState();
  const ref = useRef<React.LegacyRef<HTMLDivElement>>();

  useEffect(() => {
    if (ref.current) {
      console.log("hi");
    }
  }, [ref]);

  return (
    <StickyContext.Provider value={{ state, setState }}>
      <div style={{ paddingBottom: headerHeight }} />
      <div ref={ref.current}>{children}</div>
    </StickyContext.Provider>
  );
};

export default StickyProvider;
