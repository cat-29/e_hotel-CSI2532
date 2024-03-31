import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ChambreInfo = () => {
  const { state } = useLocation();
  console.log("ds chambre info: ", state);
  const [modify, setModify] = useState(false);
  console.log("ds chambre info: ", state);

  return (
    <>
      <div className="titre text-center">
        <h1 className="mx-4 my-4">Administration</h1>
      </div>
      <h2 className="text-center p-3">Information chaîne hôtelière</h2>

      <form noValidate className="mx-4">
        <fieldset disabled={!modify}>
          <div className="d-grid gap-2 d-md-flex m-3">
            <div className="col-md-2">
              <label htmlFor="nomChaine" className="form-label">
                Numéro de chambre
              </label>
              <input
                required
                value={state.chambreInfo.numeroChambre}
                type="text"
                className="form-control border"
                id="nomChaine"
                name="nomChaine"
              ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="numero" className="form-label">
                Capacité
              </label>
              <input
                required
                value={state.chambreInfo.capaciteChambre}
                type="text"
                className="form-control border"
                id="numero"
                name="numero"
              ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="numero" className="form-label">
                Prix par nuit
              </label>
              <input
                required
                value={state.chambreInfo.prix}
                type="text"
                className="form-control border"
                id="numero"
                name="numero"
              ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="nbrHotel" className="form-label">
                Vue
              </label>
              <input
                required
                value={state.chambreInfo.vueChambre}
                type="text"
                className="form-control border"
                id="nbrHotel"
                name="nbrHotel"
                disabled
              ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="numero" className="form-label">
                Capacité à étendre
              </label>
              <input
                required
                value={state.chambreInfo.capaciteAEtendre}
                type="text"
                className="form-control border"
                id="numero"
                name="numero"
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
    </>
  );
};
