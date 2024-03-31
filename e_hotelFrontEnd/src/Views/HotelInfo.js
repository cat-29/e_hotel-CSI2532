import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import adminService from "../services/adminService";

export const HotelInfo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [chambre, setChambre] = useState([]);
  const [modify, setModify] = useState(false);

  console.log("ds hotel info: ", state);

  const showChambreInfo = (chambreInfo) => {
    navigate("/chambreInfo", { state: { chambreInfo: chambreInfo } });
  };

  const showAjoutChambre = () => {
    navigate("/ajoutChambre");
  };

  const showAjoutEmploye = () => {
    navigate("/ajoutEmploye");
  };

  // When get hotel, get the chambres
  useEffect(() => {
    adminService
      .getChambresFromHotel(state.hotelInfo.id)
      .then((response) => {
        setChambre(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <div className="titre text-center">
        <h1 className="mx-4 my-4">Administration</h1>
      </div>
      <h2 className="text-center p-3">Information hôtel</h2>

      <form noValidate className="mx-4">
        <fieldset disabled={!modify}>
          <div className="d-grid gap-2 d-md-flex m-3">
            <div className="col-5">
              <label htmlFor="nom" className="form-label">
                Nom d'hôtel
              </label>
              <input
                required
                value={state.hotelInfo.nom}
                type="text"
                className="form-control border"
                id="nomHotel"
                name="nomHotel"
              ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="nbrHotel" className="form-label">
                Nombre de chambres
              </label>
              <input
                required
                value={state.hotelInfo.nbrChambre}
                type="text"
                className="form-control border"
                id="nbrHotel"
                name="nbrHotel"
                disabled
              ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="rating" className="form-label">
                Nombre d'étoiles
              </label>
              <input
                required
                value={state.hotelInfo.rating}
                type="text"
                className="form-control border"
                id="rating"
                name="rating"
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
                value={state.hotelInfo.numero}
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
                value={state.hotelInfo.rue}
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
                value={state.hotelInfo.ville}
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
                value={state.hotelInfo.province}
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
                value={state.hotelInfo.pays}
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
                value={state.hotelInfo.codePostal}
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
      <div className="titre text-center">
        <h4 className="">Employés</h4>
      </div>
      <table className="table align-middle table-bordered mx-5 my-2 w-auto">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Numéro de chambre</th>
            <th>Prix par nuit</th>
            <th>Capacité</th>
            <th>Vue</th>
            <th>Capacité à étendre</th>
          </tr>
        </thead>
        {chambre.map((val, key) => {
          return (
            <tbody>
              {/* <tr>
                <th className="text-center">{key + 1}</th>
                <th className="text-center">{val.numeroChambre}</th>
                <th className="text-center">{val.prix}</th>
                <th className="text-center">{val.capaciteChambre}</th>
                <th className="text-center">{val.vueChambre}</th>
                <th className="text-center">{val.capaciteAEtendre}</th>
                <th className="text-center">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      showChambreInfo(val);
                    }}
                  >
                    {">"}
                  </button>
                </th>
              </tr> */}
            </tbody>
          );
        })}
      </table>
      <div className="d-grid gap-2 d-md-flex m-3">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            showAjoutEmploye();
          }}
        >
          Ajouter un employé
        </button>
      </div>
      <br />
      <div className="titre text-center">
        <h4 className="">Chambres</h4>
      </div>
      <table className="table align-middle table-bordered mx-5 my-2 w-auto">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Numéro de chambre</th>
            <th>Prix par nuit</th>
            <th>Capacité</th>
            <th>Vue</th>
            <th>Capacité à étendre</th>
          </tr>
        </thead>
        {chambre.map((val, key) => {
          return (
            <tbody>
              <tr>
                <th className="text-center">{key + 1}</th>
                <th className="text-center">{val.numeroChambre}</th>
                <th className="text-center">{val.prix}</th>
                <th className="text-center">{val.capaciteChambre}</th>
                <th className="text-center">{val.vueChambre}</th>
                <th className="text-center">{val.capaciteAEtendre}</th>
                <th className="text-center">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      showChambreInfo(val);
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
            showAjoutChambre();
          }}
        >
          Ajouter une chambre
        </button>
      </div>
    </>
  );
};
