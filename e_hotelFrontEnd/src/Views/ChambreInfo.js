import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import ValidateFcts from "../ValidationFcts/container";
import adminService from "../services/adminService";

export const ChambreInfo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log("ds chambre info: ", state);
  const [modify, setModify] = useState(false);
  const [formDataError, setFormDataError] = useState([]);

  const [formData, setFormData] = useState({
    numero_chambre: "",
    id_hotel: "",
    prix: "",
    capacite_chambre: "",
    vue_chambre: "",
    capacite_a_etendre: "",
  });

  const hidePageInfo = () => {
    setModify(true);
  };

  useEffect(() => {
    setFormData({
      numero_chambre: state.chambreInfo.numeroChambre,
      id_hotel: state.chambreInfo.idHotel,
      prix: state.chambreInfo.prix,
      capacite_chambre: state.chambreInfo.capaciteChambre,
      vue_chambre: state.chambreInfo.vueChambre,
      capacite_a_etendre: state.chambreInfo.capaciteAEtendre,
    });

    console.log(formData);
  }, []);

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
    const validationResult =
      ValidateFcts.validateAllModifChambreFields(formData);
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
        await adminService.updateChambre(formData).then(() => {
          console.log("updateChambre called");
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
      state: {
        employeInfo: state.employeInfo,
        hotelInfo: state.hotelInfo,
        chaineInfo: state.chaineInfo,
      },
    });
  };

  const handleDeleteSubmit = async (e) => {
    console.log(e);
    console.log("handleDeleteSubmit sent");
    try {
      await adminService
        .deleteChambre(
          state.chambreInfo.idHotel,
          state.chambreInfo.numeroChambre
        )
        .then(() => {
          console.log(
            "deleteChambre called for: ",
            state.chambreInfo.idHotel,
            state.chambreInfo.numeroChambre
          );
          navigateToChambres();
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AppHeader info={state.employeInfo} isUserTypeClient={false} />
      <div className="d-grid gap-2 d-md-flex m-3 mx-4">
        <button className="btn btn-secondary ms-3" onClick={navigateToChambres}>
          Retour
        </button>
      </div>
      <div className="text-center">
        <h1 className="mx-4 my-4">Administration</h1>
      </div>
      <div className="text-center">
        <h4 className="">Information sur la chambre</h4>
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
          </div>
        ) : (
          <></>
        )}
        <fieldset disabled={!modify}>
          <div className="d-grid gap-2 d-md-flex m-3 justify-content-between">
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
                disabled
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
                Prix par nuit
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
