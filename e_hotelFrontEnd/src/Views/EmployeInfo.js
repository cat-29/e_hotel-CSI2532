import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import adminService from "../services/adminService";
import ValidateFcts from "../ValidationFcts/container";
import InputMask from "react-input-mask";

export const EmployeInfo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [modify, setModify] = useState(false);
  const [formDataError, setFormDataError] = useState([]);
  console.log("ds employe info: ", state);

  const [formData, setFormData] = useState({
    id: "",
    prenom: "",
    nomFamille: "",
    numero: "",
    rue: "",
    ville: "",
    province: "",
    pays: "",
    codePostal: "",
    roleEmploye: "",
    idHotel: "",
  });

  const hidePageInfo = () => {
    setModify(true);
  };

  useEffect(() => {
    setFormData({
      id: state.employeInfo.id,
      prenom: state.employeInfo.prenom,
      nomFamille: state.employeInfo.nomFamille,
      numero: state.employeInfo.numero,
      rue: state.employeInfo.rue,
      ville: state.employeInfo.ville,
      province: state.employeInfo.province,
      pays: state.employeInfo.pays,
      codePostal: state.employeInfo.codePostal,
      roleEmploye: state.employeInfo.roleEmploye,
      idHotel: state.employeInfo.idHotel,
    });

    console.log(formData);
  }, []);

  const navigateToChambresRetour = () => {
    navigate("/hotelInfo", {
      state: {
        employeInfo: state.adminInfo,
        hotelInfo: state.hotelInfo,
        chaineInfo: state.chaineInfo,
      },
    });
  };

  const navigateToChambres = () => {
    navigate("/hotelInfo", {
      state: {
        employeInfo: formData,
        hotelInfo: state.hotelInfo,
        chaineInfo: state.chaineInfo,
      },
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    console.log("handleSubmit sent");
    const validationResult =
      ValidateFcts.validateAllModifEmployeFields(formData);
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
        await adminService.updateEmploye(formData).then(() => {
          console.log("updateEmploye called");
          console.log(formData);
          navigate("/hotelInfo", {
            state: {
              employeInfo: state.adminInfo,
              hotelInfo: state.hotelInfo,
              chaineInfo: state.chaineInfo,
            },
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    console.log("state admin info: ", state.adminInfo);
  }, []);

  return (
    <>
      <AppHeader info={state.adminInfo} isUserTypeClient={false} />
      <div className="d-grid gap-2 d-md-flex m-3">
        <button
          className="btn btn-secondary"
          onClick={navigateToChambresRetour}
        >
          Retour
        </button>
      </div>
      <div className="text-center">
        <h1 className="mx-4 my-4">Administration</h1>
      </div>
      <h2 className="text-center p-3">Information employé</h2>
      <form noValidate className="mx-4">
        <fieldset disabled={!modify}>
          <div className="d-grid gap-2 d-md-flex m-3">
            <div className="col-md-2">
              <label htmlFor="prenom" className="form-label">
                Prénom
              </label>
              <input
                required
                type="text"
                className="form-control border"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
              />
              {formDataError[1] != "" ? (
                <div style={{ color: "red" }}>{formDataError[1]}</div>
              ) : (
                <></>
              )}
            </div>
            <div className="col-md-2">
              <label htmlFor="nomFamille" className="form-label">
                Nom
              </label>
              <input
                required
                type="text"
                className="form-control border"
                id="nomFamille"
                name="nomFamille"
                value={formData.nomFamille}
                onChange={handleInputChange}
              />
              {formDataError[2] != "" ? (
                <div style={{ color: "red" }}>{formDataError[2]}</div>
              ) : (
                <></>
              )}
            </div>
            <div className="col-md-2">
              <label htmlFor="roleEmploye" className="form-label">
                Role
              </label>
              <br />
              <select
                required
                id="roleEmploye"
                name="roleEmploye"
                value={formData.roleEmploye}
                onChange={handleInputChange}
              >
                <option value="EMPLOYE">Employé</option>
                <option value="SUPERVISEUR">Superviseur</option>
                <option value="GESTIONNAIRE">Gestionnaire</option>
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
              {formDataError[3] != "" ? (
                <div style={{ color: "red" }}>{formDataError[3]}</div>
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
              {formDataError[4] != "" ? (
                <div style={{ color: "red" }}>{formDataError[4]}</div>
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
              {formDataError[5] != "" ? (
                <div style={{ color: "red" }}>{formDataError[5]}</div>
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
              {formDataError[6] != "" ? (
                <div style={{ color: "red" }}>{formDataError[6]}</div>
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
              {formDataError[7] != "" ? (
                <div style={{ color: "red" }}>{formDataError[7]}</div>
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
              {formDataError[8] != "" ? (
                <div style={{ color: "red" }}>{formDataError[8]}</div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </fieldset>
      </form>
      <div className="text-center">
        {!modify ? (
          <div className="d-grid gap-2 d-md-flex m-3">
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={() => {
                hidePageInfo();
              }}
            >
              Modifier
            </button>
            <button type="submit" className="btn btn-secondary">
              Supprimer
            </button>
          </div>
        ) : (
          <></>
        )}
        {modify ? (
          <div className="d-grid gap-2 d-md-flex m-3">
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={handleSubmit}
            >
              Soumettre
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
