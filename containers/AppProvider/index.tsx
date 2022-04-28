import { ReactNode, useState } from "react";
import AppContext, { LayoutState } from "./AppContext";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [layoutState, setLayoutState] = useState<LayoutState>("default");

  return (
    <AppContext.Provider value={{ layoutState, setLayoutState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
