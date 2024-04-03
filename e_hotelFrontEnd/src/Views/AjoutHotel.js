import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ValidateFcts from "../ValidationFcts/container";
import InputMask from "react-input-mask";
import adminService from "../services/adminService";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ChaineInfo } from "./ChaineInfo";

export const AjoutHotel = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log("ds ajout hotel info: ", state);

  const [formData, setFormData] = useState({
    id: "",
    nomChaine: "",
    nom: "",
    rating: 1,
    nbrChambre: "",
    numero: "",
    rue: "",
    ville: "",
    province: "",
    pays: "",
    codePostal: "",
  });

  const [formDataError, setFormDataError] = useState([]);

  formData.id = state.chaineInfo.nbrHotel + 1;
  formData.nomChaine = state.chaineInfo.nomChaine;
  formData.nbrChambre = 0;

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name == "numero" || name == "rating") {
      // This desactivates all keyboards buttons axcept numbers
      const newValue = event.target.value.replace(/\D/, "");
      setFormData({ ...formData, [name]: newValue });
    } else if (name == "codePostal") {
      const newValue = event.target.value.replace(/ /g, "");
      setFormData({ ...formData, [name]: newValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log("handleSubmit sent");
    const validationResult = ValidateFcts.validateAllHotelFields(formData);
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
        adminService.saveHotel(formData).then(() => {
          console.log("saveHotel called");
          console.log(formData);
          navigateToHotels();
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const navigateToHotels = () => {
    navigate("/chaineInfo", {
      state: { employeInfo: state.employeInfo, chaineInfo: state.chaineInfo },
    });
  };

  return (
    <>
      <AppHeader info={state.employeInfo} isUserTypeClient={false} />
      <div className="d-grid gap-2 d-md-flex m-3">
        <button className="btn btn-secondary" onClick={navigateToHotels}>
          Retour
        </button>
      </div>
      <form noValidate className="mx-4" onSubmit={handleSubmit}>
        <div className="d-grid gap-2 d-md-flex m-3">
          <div className="col-5">
            <label htmlFor="nom" className="form-label">
              Nom d'hôtel
            </label>
            <input
              required
              type="text"
              className="form-control border"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
            />
            {formDataError[2] != "" ? (
              <div style={{ color: "red" }}>{formDataError[2]}</div>
            ) : (
              <></>
            )}
          </div>
          <div className="col-5">
            <label htmlFor="rating" className="form-label">
              Nombre d'étoiles
            </label>
            <br />
            <select
              required
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
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
              value={formData.numero}
              onChange={handleInputChange}
            />
            {formDataError[5] != "" ? (
              <div style={{ color: "red" }}>{formDataError[5]}</div>
            ) : (
              <></>
            )}
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
              value={formData.rue}
              onChange={handleInputChange}
            />
            {formDataError[6] != "" ? (
              <div style={{ color: "red" }}>{formDataError[6]}</div>
            ) : (
              <></>
            )}
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
              value={formData.ville}
              onChange={handleInputChange}
            />
            {formDataError[7] != "" ? (
              <div style={{ color: "red" }}>{formDataError[7]}</div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="d-grid gap-2 d-md-flex m-3">
          <div className="col-md-1">
            <label htmlFor="province" className="form-label">
              Province
            </label>
            <InputMask
              className="form-control border"
              mask={"LL"}
              formatChars={{ L: "[A-Z]" }}
              maskChar={""}
              value={formData.province}
              onChange={handleInputChange}
              name="province"
            />
            {formDataError[8] != "" ? (
              <div style={{ color: "red" }}>{formDataError[8]}</div>
            ) : (
              <></>
            )}
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
              value={formData.pays}
              onChange={handleInputChange}
            />
            {formDataError[9] != "" ? (
              <div style={{ color: "red" }}>{formDataError[9]}</div>
            ) : (
              <></>
            )}
          </div>
          <div className="col-md-2">
            <label htmlFor="codePostal" className="form-label">
              Code Postal
            </label>
            <InputMask
              className="form-control border"
              mask={"LDL DLD"}
              formatChars={{ L: "[A-Z]", D: "[0-9]" }}
              maskChar={""}
              value={formData.codePostal}
              onChange={handleInputChange}
              name="codePostal"
            />
            {formDataError[10] != "" ? (
              <div style={{ color: "red" }}>{formDataError[10]}</div>
            ) : (
              <></>
            )}
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
