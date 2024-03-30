import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const AjoutHotel = () => {
  const { state } = useLocation();

  return (
    <>
      <form noValidate className="mx-4">
        <div className="d-grid gap-2 d-md-flex m-3">
          <div className="col-5">
            <label htmlFor="nomHotel" className="form-label">
              Nom d'hôtel
            </label>
            <input
              required
              type="text"
              className="form-control border"
              id="nomHotel"
              name="nomHotel"
            ></input>
          </div>
          <div className="col-5">
            <label htmlFor="rating" className="form-label">
              Nombre d'étoiles
            </label>
            <input
              required
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
              type="text"
              className="form-control border"
              id="codePostal"
              name="codePostal"
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
      {console.log("ds ajout chaine: ", state)}
    </>
  );
};
