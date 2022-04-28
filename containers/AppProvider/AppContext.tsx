import { createContext } from "react";

export type LayoutState = "menu" | "default" | "search";

interface IAppContext {
  layoutState: LayoutState;
  setLayoutState: React.Dispatch<React.SetStateAction<LayoutState>>;
}

const initState: IAppContext = {
  layoutState: "default",
  setLayoutState: () => {},
};

const AppContext = createContext<IAppContext>(initState);

export default AppContext;
