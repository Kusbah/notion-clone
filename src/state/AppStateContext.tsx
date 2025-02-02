import { createContext, useContext } from "react";

import { usePgaeState } from "./usePageState";
import { page } from "../utils/types";

type AppStateContextType = ReturnType<typeof usePgaeState>;

const AppStateContext = createContext<AppStateContextType>(
  {} as AppStateContextType
);

type AppStateProvidProps = {
  children: React.ReactNode;
  initialState: page;
};

export const AppStateProvider = ({
  children,
  initialState,
}: AppStateProvidProps) => {
  const pageStateHandlers = usePgaeState(initialState);

  return (
    <AppStateContext.Provider value={pageStateHandlers}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
