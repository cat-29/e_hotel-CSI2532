import { useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useEffect, useState } from "react";
import ValidateFcts from "../ValidationFcts/container";
import InputMask from "react-input-mask";
import adminService from "../services/adminService";

export const AjoutChambre = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log("ds ajout chambre: ", state);

  const [formData, setFormData] = useState({
    numero_chambre: "",
    id_hotel: state.hotelInfo.id,
    prix: "",
    capacite_chambre: "SIMPLE",
    vue_chambre: "MONTAGNE",
    capacite_a_etendre: false,
  });

  const [formDataError, setFormDataError] = useState([]);
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name == "numero_chambre" || name == "prix") {
      // This desactivates all keyboards buttons axcept numbers
      const newValue = event.target.value.replace(/\D/, "");
      setFormData({ ...formData, [name]: newValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    console.log("handleSubmit sent");
    console.log("formData: ", formData);
    const validationResult = ValidateFcts.validateAllChambreFields(formData);
    setFormDataError(validationResult);

    //?
    // flag used to track whether we submit to backend or we wait for user to fix its errors
    let flag = false;

    for (let i = 0; i < validationResult.length; i++) {
      if (validationResult[i] != "") {
        flag = true;
      }
    }

    if (flag == true) {
      console.log("there are still errors to fix");
    } else {
      console.log("fields are ready to be submitted to backend");
      try {
        await adminService.saveChambre(formData).then(() => {
          console.log("saveHotel called");
          console.log(formData);
          navigateToChambres();
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const navigateToChambres = () => {
    navigate("/hotelInfo", {
      state: { employeInfo: state.employeInfo, hotelInfo: state.hotelInfo },
    });
  };

  return (
    <>
      <AppHeader info={state.employeInfo} isUserTypeClient={false} />

      <div className="d-grid gap-2 d-md-flex m-3">
        <button className="btn btn-secondary" onClick={navigateToChambres}>
          Retour
        </button>
      </div>

      <div className="titre text-center">
        <h1 className="mx-4 my-4">Administration</h1>
      </div>
      <h2 className="text-center p-3">Ajout Chambre</h2>

      <form noValidate className="mx-4">
        <div className="d-grid gap-2 d-md-flex m-3">
          <div className="col-md-2">
            <label htmlFor="numero_chambre" className="form-label">
              Numéro de chambre
            </label>
            <input
              required
              type="number"
              className="form-control border"
              id="numero_chambre"
              name="numero_chambre"
              value={formData.numero_chambre}
              onChange={handleInputChange}
            />
            {formDataError[0] != "" ? (
              <div style={{ color: "red" }}>{formDataError[0]}</div>
            ) : (
              <></>
            )}
          </div>
          <div className="col-md-2">
            <label htmlFor="capacite_chambre" className="form-label">
              Capacité
            </label>
            <br />
            <select
              required
              id="capacite_chambre"
              name="capacite_chambre"
              value={formData.capacite_chambre}
              onChange={handleInputChange}
            >
              <option value="SIMPLE">Simple</option>
              <option value="DOUBLE">Double</option>
              <option value="TRIPLE">Triple</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="prix" className="form-label">
              Prix par nuit ($ entier)
            </label>
            <input
              required
              type="number"
              className="form-control border"
              id="prix"
              name="prix"
              value={formData.prix}
              onChange={handleInputChange}
            />
            {formDataError[2] != "" ? (
              <div style={{ color: "red" }}>{formDataError[2]}</div>
            ) : (
              <></>
            )}
          </div>
          <div className="col-md-2">
            <label htmlFor="vue_chambre" className="form-label">
              Vue
            </label>
            <br />
            <select
              required
              id="vue_chambre"
              name="vue_chambre"
              value={formData.vue_chambre}
              onChange={handleInputChange}
            >
              <option value="MONTAGNE">Montagne</option>
              <option value="MER">Mer</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="capacite_a_etendre" className="form-label">
              Capacité à étendre
            </label>
            <br />
            <select
              required
              id="capacite_a_etendre"
              name="capacite_a_etendre"
              value={formData.capacite_a_etendre}
              onChange={handleInputChange}
            >
              <option value={false}>Non</option>
              <option value={true}>Oui</option>
            </select>
          </div>
        </div>
      </form>
      <div className="d-grid gap-2 d-md-flex m-3">
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={handleSubmit}
        >
          Soumettre
        </button>
      </div>
    </>
  );
};
