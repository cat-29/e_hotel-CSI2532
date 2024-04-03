import { useLocation, useNavigate } from "react-router-dom";
import adminService from "../services/adminService";
import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const ChaineInfo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState([]);
  const [modify, setModify] = useState(false);

  console.log("ds chaine info: ", state);

  const showHotelInfo = (hotelInfo) => {
    navigate("/hotelInfo", {
      state: { hotelInfo: hotelInfo, employeInfo: state.employeInfo },
    });
  };

  const showAjoutHotel = () => {
    navigate("/ajoutHotel", {
      state: { employeInfo: state.employeInfo },
    });
  };

  // When get chaine, get the hotels
  useEffect(() => {
    //console.log("test hotels before");
    adminService
      .getHotelsFromChaine(state.chaineInfo.nomChaine)
      .then((response) => {
        setHotel(response.data);
        //console.log("test hotels after");
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <AppHeader info={state.employeInfo} isUserTypeClient={false} />
      <div className="text-center">
        <h1 className="mx-4 my-4">Administration</h1>
      </div>
      <h2 className="text-center p-3">Information chaîne hôtelière</h2>

      <form noValidate className="mx-4">
        <fieldset disabled={!modify}>
          <div className="d-grid gap-2 d-md-flex m-3">
            <div className="col-5">
              <label htmlFor="nomChaine" className="form-label">
                Nom de Chaîne Hôtelière
              </label>
              <input
                required
                value={state.chaineInfo.nomChaine}
                type="text"
                className="form-control border"
                id="nomChaine"
                name="nomChaine"
              ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="nbrHotel" className="form-label">
                Nombre d'hôtels
              </label>
              <input
                required
                value={state.chaineInfo.nbrHotel}
                type="text"
                className="form-control border"
                id="nbrHotel"
                name="nbrHotel"
                disabled
              ></input>
            </div>
          </div>

          <div className="d-grid gap-2 d-md-flex m-3">
            <div className="col-md-1">
              <label htmlFor="numero" className="form-label">
                Numéro
              </label>
              <input
                required
                value={state.chaineInfo.numero}
                type="text"
                className="form-control border"
                id="numero"
                name="numero"
              ></input>
            </div>
            <div className="col-5">
              <label htmlFor="rue" className="form-label">
                Rue
              </label>
              <input
                required
                value={state.chaineInfo.rue}
                type="text"
                className="form-control border"
                id="rue"
                name="rue"
              ></input>
            </div>
            <div className="col-md-3">
              <label htmlFor="ville" className="form-label">
                Ville
              </label>
              <input
                required
                value={state.chaineInfo.ville}
                type="text"
                className="form-control border"
                id="ville"
                name="ville"
              ></input>
            </div>
          </div>

          <div className="d-grid gap-2 d-md-flex m-3">
            <div className="col-md-1">
              <label htmlFor="province" className="form-label">
                Province
              </label>
              <input
                required
                value={state.chaineInfo.province}
                type="text"
                className="form-control border"
                id="province"
                name="province"
              ></input>
            </div>
            <div>
              <label htmlFor="pays" className="form-label">
                Pays
              </label>
              <input
                required
                value={state.chaineInfo.pays}
                type="text"
                className="form-control border"
                id="pays"
                name="pays"
              ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="codePostal" className="form-label">
                Code Postal
              </label>
              <input
                required
                value={state.chaineInfo.codePostal}
                type="text"
                className="form-control border"
                id="codePostal"
                name="codePostal"
              ></input>
            </div>
          </div>
        </fieldset>
      </form>
      <div className="d-grid gap-2 d-md-flex m-3">
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={() => {
            setModify(true);
          }}
        >
          Modifier
        </button>
        <button type="submit" className="btn btn-secondary">
          Supprimer
        </button>
      </div>
      <div className="text-center">
        <h4 className="">Hôtels</h4>
      </div>
      <table className="table align-middle table-bordered mx-5 my-2 w-auto">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Nom d'hôtel</th>
            <th>Nombre d'étoiles</th>
            <th>Nombre de chambres</th>
            <th>Adresse</th>
          </tr>
        </thead>
        {hotel.map((val, key) => {
          return (
            <tbody>
              <tr>
                <th className="text-center">{key + 1}</th>
                <th>{val.nom}</th>
                <th className="text-center">{val.rating}</th>
                <th className="text-center">{val.nbrChambre}</th>
                <th>
                  {val.numero} {val.rue}, {val.ville}, {val.province} {val.pays}{" "}
                  {val.codePostal}
                </th>
                <th className="text-center">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      showHotelInfo(val);
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
      <div className="d-grid gap-2 d-md-flex m-3">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            showAjoutHotel();
          }}
        >
          Ajouter un hôtel
        </button>
      </div>
    </>
  );
};
