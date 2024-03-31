import { useLocation, useNavigate } from "react-router-dom";

export const EmployeInfo = () => {
  const { state } = useLocation();
  console.log("ds employe info: ", state);

  return <></>;
};
