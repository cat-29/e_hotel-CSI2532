import { useLocation } from "react-router-dom";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const AjoutChambreDommage = () => {
  const { state } = useLocation();
  console.log("ds ajout chambre dommage: ", state);

  return (
    <>
      <AppHeader/>
    </>
  );
};
