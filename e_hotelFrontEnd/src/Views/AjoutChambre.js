import { useLocation } from "react-router-dom";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const AjoutChambre = () => {
  const { state } = useLocation();
  console.log("ds ajout chambre: ", state);

  return (
    <>
      <AppHeader info={state.employeInfo} isUserTypeClient={false} />
      <div className="text-center">
        <h1 className="mx-4 my-4">Administration</h1>
      </div>
      <h2 className="text-center p-3">Information chaîne hôtelière</h2>

      <form noValidate className="mx-4">
        <div className="d-grid gap-2 d-md-flex m-3">
          <div className="col-md-2">
            <label htmlFor="nomChaine" className="form-label">
              Numéro de chambre
            </label>
            <input
              required
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
              type="text"
              className="form-control border"
              id="nbrHotel"
              name="nbrHotel"
            ></input>
          </div>
          <div className="col-md-2">
            <label htmlFor="numero" className="form-label">
              Capacité à étendre
            </label>
            <input
              required
              type="text"
              className="form-control border"
              id="numero"
              name="numero"
            ></input>
          </div>
        </div>
      </form>
      <div className="d-grid gap-2 d-md-flex m-3">
        {/* <button type="submit" className='btn btn-primary'>Créesr un compte</button> */}
        <button type="submit" className="btn btn-secondary">
          Soumettre
        </button>
      </div>
    </>
  );
};
