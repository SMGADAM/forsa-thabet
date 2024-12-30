import { createContext, useState } from "react";

export const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const [refreshAuth, setRefreshAuth] = useState(false);
  return (
    <RefreshContext.Provider
      value={{ setRefresh, refresh, refreshAuth, setRefreshAuth }}
    >
      {children}
    </RefreshContext.Provider>
  );
};
