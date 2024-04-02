import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ValidateFcts from "../ValidationFcts/container";
import InputMask from "react-input-mask";
import adminService from "../services/adminService";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const AjoutChaine = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomChaine: "",
    nbrHotel: "",
    numero: "",
    rue: "",
    ville: "",
    province: "",
    pays: "",
    codePostal: "",
  });

  const [formDataError, setFormDataError] = useState([]);

  formData.nbrHotel = 0;

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name == "numero") {
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

  // useEffect(() => {
  //   adminService
  //     .saveChaine(formData)
  //     .then(() => {
  //       console.log(formData);
  //       console.log("Chaine avec les infos du client on ete sauvegarde");
  //     })
  //     .catch((e) => {
  //       console.log(
  //         "une erreur c'est produite lors de la sauvegarde de la chaine. " + e
  //       );
  //     });
  //   // L'employe sera redirigee vers la page qui s'occupe du paiement
  //   //continueAvecPaiement();
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log("handleSubmit sent");
    const validationResult = ValidateFcts.validateAllChaineFields(formData);
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
        adminService.saveChaine(formData).then(() => {
          console.log("saveChaine called");
          console.log(formData);
          navigateToChaines();
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const navigateToChaines = () => {
    navigate("/managementHotel", { state: { employeInfo: state.employeInfo } });
  };

  return (
    <>
      <AppHeader info={state.employeInfo} isUserTypeClient={false} />
      <form noValidate className="mx-4" onSubmit={handleSubmit}>
        <div className="d-grid gap-2 d-md-flex m-3">
          <div className="col-5">
            <label htmlFor="nomChaine" className="form-label">
              Nom de Chaîne Hôtelière
            </label>
            <input
              required
              type="text"
              className="form-control border"
              id="nomChaine"
              name="nomChaine"
              value={formData.nomChaine}
              onChange={handleInputChange}
            />
            {formDataError[0] != "" ? (
              <div style={{ color: "red" }}>{formDataError[0]}</div>
            ) : (
              <></>
            )}
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
            {formDataError[2] != "" ? (
              <div style={{ color: "red" }}>{formDataError[2]}</div>
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
            {formDataError[3] != "" ? (
              <div style={{ color: "red" }}>{formDataError[3]}</div>
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
            {formDataError[4] != "" ? (
              <div style={{ color: "red" }}>{formDataError[4]}</div>
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
            {formDataError[5] != "" ? (
              <div style={{ color: "red" }}>{formDataError[5]}</div>
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
            {formDataError[6] != "" ? (
              <div style={{ color: "red" }}>{formDataError[6]}</div>
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
            {formDataError[7] != "" ? (
              <div style={{ color: "red" }}>{formDataError[7]}</div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </form>
      <div className="d-grid gap-2 d-md-flex m-3">
        {/* <button type="submit" className='btn btn-primary'>Créesr un compte</button> */}
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={handleSubmit}
        >
          Soumettre
        </button>
      </div>
      {console.log("ds ajout chaine: ", state)}
    </>
  );
};
