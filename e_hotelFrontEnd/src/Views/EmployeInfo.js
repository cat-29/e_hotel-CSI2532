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
  const [isSelectedEmployeSignedIn, setIsSelectedEmployeSignedIn] =
    useState(false);
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
    if (state.employeInfo.id == state.adminInfo.id) {
      setIsSelectedEmployeSignedIn(true);
      console.log("employe is signed in");
    }

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

  const handleDeleteSubmit = async (e) => {
    console.log(e);
    console.log("handleDeleteSubmit sent");
    try {
      await adminService.deleteEmploye(state.employeInfo.id).then(() => {
        console.log("deleteEmploye called for: ", state.employeInfo.id);
        navigateToChambresRetour();
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("state admin info: ", state.adminInfo);
  }, []);

  return (
    <>
      <AppHeader info={state.adminInfo} isUserTypeClient={false} />
      <div className="d-grid gap-2 d-md-flex m-3 mx-4">
        <button
          className="btn btn-secondary ms-3"
          onClick={navigateToChambresRetour}
        >
          Retour
        </button>
      </div>
      <div className="text-center">
        <h1 className="mx-4 my-4">Administration</h1>
      </div>
      <div className="text-center">
        <h4 className="">Information sur l'employé</h4>
      </div>
      <form noValidate className="align-middle mx-5 my-2 mb-5 border p-2">
        {!modify ? (
          <div className="d-grid gap-2 d-md-flex mt-3">
            <button
              type="submit"
              className="btn btn-secondary ms-3"
              onClick={() => {
                hidePageInfo();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pen me-1"
                viewBox="0 0 15 18"
              >
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
              </svg>
              Modifier
            </button>
            {!isSelectedEmployeSignedIn ? (
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => {
                  handleDeleteSubmit();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash3 me-1"
                  viewBox="0 0 15 18"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
                Supprimer
              </button>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
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
                <option value="ADMIN">Administrateur</option>
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
        {modify ? (
          <div className="d-grid gap-2 d-md-flex">
            <button
              type="submit"
              className="btn btn-dark ms-3"
              onClick={handleSubmit}
            >
              Soumettre
            </button>
          </div>
        ) : (
          <></>
        )}
      </form>
    </>
  );
};
