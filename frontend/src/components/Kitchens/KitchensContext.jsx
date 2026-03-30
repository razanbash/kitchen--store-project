import { createContext, useState, useEffect } from "react";
import api from "../../api";

export const KitchensContext = createContext();

export function KitchensProvider({ children }) {
  const [kitchens, setKitchens] = useState([]);

  const getKitchens = async () => {
    try {
      const res = await api.get("/kitchens");
      setKitchens(res.data);
    } catch (err) {
      console.log("GET KITCHENS ERROR:", err);
    }
  };

  useEffect(() => {
    getKitchens();
  }, []);

  return (
    <KitchensContext.Provider value={{ kitchens, setKitchens, getKitchens }}>
      {children}
    </KitchensContext.Provider>
  );
}
