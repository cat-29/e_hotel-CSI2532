import { useLocation, useNavigate } from "react-router-dom";
import adminService from "../services/adminService";
import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const ManagementHotel = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [chaine, setChaine] = useState([]);
  const [totalHotels, setTotalHotels] = useState([]);

  const showChaineInfo = (chaineInfo) => {
    navigate("/chaineInfo", {
      state: { chaineInfo: chaineInfo, employeInfo: state.employeInfo },
    });
  };

  const showAjoutChaine = () => {
    navigate("/ajoutChaine", { state: { employeInfo: state.employeInfo } });
  };

  // chaine.map((nbrHotel) => {
  //   setTotalHotels(totalHotels + chaine.nbrHotel);
  // });
  // console.log("sum of hotels: ", totalHotels);

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
      <AppHeader info={state.employeInfo} isUserTypeClient={false} />
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
                <td className="text-center">{key + 1}</td>
                <td>{val.nomChaine}</td>
                <td className="text-center">{val.nbrHotel}</td>
                <td>
                  {val.numero} {val.rue}, {val.ville}, {val.province} {val.pays}{" "}
                  {val.codePostal}
                </td>
                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      showChaineInfo(val);
                    }}
                  >
                    {">"}
                  </button>
                </td>
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
