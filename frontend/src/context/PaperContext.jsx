import { createContext, useState } from "react";

export const PaperContext = createContext();

export function PaperProvider({ children }) {
  const [papers, setPapers] = useState([]);

  return (
    <PaperContext.Provider value={{ papers, setPapers }}>
      {children}
    </PaperContext.Provider>
  );
}
