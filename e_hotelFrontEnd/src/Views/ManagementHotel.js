import { useLocation, useNavigate } from "react-router-dom";
import adminService from "../services/adminService";
import { useEffect, useState } from "react";

export const ManagementHotel = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [chaine, setChaine] = useState([]);

  useEffect(() => {
    adminService
      .getAllChaineInfo()
      .then((response) => {
        setChaine(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  //const [chaineInfo, setChaineInfo]

  return (
    <>
      <div className="titre text-center">
        <h1 className="mx-4 my-4">Administration</h1>
      </div>

      <table>
        <thead>
          <th className="col">#</th>
          <th>Nom Chaîne</th>
          <th>Nombre d'hôtel</th>
          <th>Adresse</th>
        </thead>
        {chaine.map((val, key) => {
          return (
            <tbody>
              <th>{key}</th>
              <th>{val.nomChaine}</th>
              <th>{val.nbrHotel}</th>
              <th>
                {val.numero} {val.rue}, {val.ville}, {val.province} {val.pays}{" "}
                {val.codePostal}
              </th>
            </tbody>
          );
        })}
      </table>
      {console.log("ds management hotel: ", state)}
    </>
  );
};
