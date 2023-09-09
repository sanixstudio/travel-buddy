/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [showTrackers, setShowTrackers] = useState(true);

  const toggleTracker = () => setShowTrackers(!showTrackers);
  const hideTrackers = () => setShowTrackers(false);

  const cancelAddTrackers = () => setShowTrackers(false);

  return (
    <AppContext.Provider
      value={{ showTrackers, hideTrackers, toggleTracker, cancelAddTrackers }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
