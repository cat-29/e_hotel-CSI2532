import { useLocation } from "react-router-dom";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const ChambreDommageInfo = () => {
  const { state } = useLocation();
  console.log("ds chambre dommage info: ", state);

  return (<>
    <AppHeader/>
  </>);
};
