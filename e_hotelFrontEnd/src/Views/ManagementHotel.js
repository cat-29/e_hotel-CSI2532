import { useLocation, useNavigate } from "react-router-dom";
import adminService from "../services/adminService";
import { useEffect, useState } from "react";

export const ManagementHotel = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [chaine, setChaine] = useState([]);

  const showChaineInfo = (chaineInfo) => {
    navigate("/chaineInfo", { state: { chaineInfo: chaineInfo } });
  };

  const showAjoutChaine = () => {
    navigate("/ajoutChaine");
  };

  //to get all chaine info
  useEffect(() => {
    console.log(state);
    adminService
      .getAllChaineInfo()
      .then((response) => {
        setChaine(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //to send chaine info to chaineInfo page

  return (
    <>
      <div className="titre text-center">
        <h1 className="mx-4 my-4">Administration</h1>
        <h4 className="">Chaînes hôtelières</h4>
      </div>

      <table className="table align-middle table-bordered mx-5 my-2 w-auto">
        <thead>
          <tr className="text-center">
            <th className="col">#</th>
            <th className="col-4">Nom de chaîne hôtelière</th>
            <th>Nombre d'hôtel</th>
            <th>Adresse</th>
            <th>Modifier</th>
          </tr>
        </thead>
        {chaine.map((val, key) => {
          return (
            <tbody>
              <tr>
                <th className="text-center">{key + 1}</th>
                <th>{val.nomChaine}</th>
                <th className="text-center">{val.nbrHotel}</th>
                <th>
                  {val.numero} {val.rue}, {val.ville}, {val.province} {val.pays}{" "}
                  {val.codePostal}
                </th>
                <th className="text-center">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      showChaineInfo(val);
                    }}
                  >
                    {">"}
                  </button>
                </th>
              </tr>
            </tbody>
          );
        })}
      </table>
      {console.log("ds management hotel: ", state)}
      <div className="d-grid gap-2 d-md-flex m-3">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            showAjoutChaine();
          }}
        >
          Ajouter une chaîne
        </button>
      </div>
    </>
  );
};
