import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const EmployeInfo = () => {
  const { state } = useLocation();
  const [modify, setModify] = useState(false);

  console.log("ds employe info: ", state);

  return (
    <>
      <form noValidate className="mx-4">
        <fieldset disabled={!modify}>
          <div className="d-grid gap-2 d-md-flex m-3">
            <div className="col-md-2">
              <label htmlFor="nom" className="form-label">
                NAS
              </label>
              <input
                required
                value={state.employeInfo.id}
                type="text"
                className="form-control border"
                id="nomHotel"
                name="nomHotel"
              ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="nbrHotel" className="form-label">
                Prénom
              </label>
              <input
                required
                value={state.employeInfo.prenom}
                type="text"
                className="form-control border"
                id="nbrHotel"
                name="nbrHotel"
              ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="rating" className="form-label">
                Nom
              </label>
              <input
                required
                value={state.employeInfo.nomFamille}
                type="text"
                className="form-control border"
                id="rating"
                name="rating"
              ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="nom" className="form-label">
                Role
              </label>
              <input
                required
                value={state.employeInfo.roleEmploye}
                type="text"
                className="form-control border"
                id="nomHotel"
                name="nomHotel"
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
                value={state.employeInfo.numero}
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
                value={state.employeInfo.rue}
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
                value={state.employeInfo.ville}
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
                value={state.employeInfo.province}
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
                value={state.employeInfo.pays}
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
                value={state.employeInfo.codePostal}
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
    </>
  );
};
