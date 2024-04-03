import { useLocation, useNavigate } from "react-router-dom";
import adminService from "../services/adminService";
import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import ValidateFcts from "../ValidationFcts/container";
import InputMask from "react-input-mask";

export const ChaineInfo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState([]);
  const [modify, setModify] = useState(false);
  const [formDataError, setFormDataError] = useState([]);

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

  useEffect(() => {
    setFormData({
      nomChaine: state.chaineInfo.nomChaine,
      nbrHotel: state.chaineInfo.nbrHotel,
      numero: state.chaineInfo.numero,
      rue: state.chaineInfo.rue,
      ville: state.chaineInfo.ville,
      province: state.chaineInfo.province,
      pays: state.chaineInfo.pays,
      codePostal: state.chaineInfo.codePostal,
    });

    console.log(formData);
  }, []);

  console.log("ds chaine info: ", state);

  const showHotelInfo = (hotelInfo) => {
    navigate("/hotelInfo", {
      state: {
        hotelInfo: hotelInfo,
        employeInfo: state.employeInfo,
        chaineInfo: state.chaineInfo,
      },
    });
  };

  const showAjoutHotel = () => {
    navigate("/ajoutHotel", {
      state: { chaineInfo: state.chaineInfo, employeInfo: state.employeInfo },
    });
  };

  const showPageInfo = () => {
    setModify(false);
  };

  const hidePageInfo = () => {
    setModify(true);
  };

  // When get chaine, get the hotels
  useEffect(() => {
    //console.log("test hotels before");
    adminService
      .getHotelsFromChaine(state.chaineInfo.nomChaine)
      .then((response) => {
        setHotel(response.data);
        //console.log("test hotels after");
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const navigateToChaines = () => {
    navigate("/managementHotel", {
      state: { employeInfo: state.employeInfo },
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
      ValidateFcts.validateAllModifChaineFields(formData);
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
        await adminService.updateChaine(formData).then(() => {
          console.log("saveChaine called");
          console.log(formData);
          navigateToChaines();
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <AppHeader info={state.employeInfo} isUserTypeClient={false} />
      <div className="d-grid gap-2 d-md-flex m-3">
        <button className="btn btn-secondary" onClick={navigateToChaines}>
          Retour
        </button>
      </div>
      <div className="titre text-center">
        <h1 className="mx-4 my-4">Administration</h1>
      </div>
      <h2 className="text-center p-3">Information chaîne hôtelière</h2>

      <form noValidate className="mx-4" onSubmit={handleSubmit}>
        <fieldset disabled={!modify}>
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
                disabled
              />
              {formDataError[0] != "" ? (
                <div style={{ color: "red" }}>{formDataError[0]}</div>
              ) : (
                <></>
              )}
            </div>
            <div className="col-md-2">
              <label htmlFor="nbrHotel" className="form-label">
                Nombre d'hôtels
              </label>
              <input
                required
                value={formData.nbrHotel}
                type="text"
                className="form-control border"
                id="nbrHotel"
                name="nbrHotel"
                disabled
              />
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
        </fieldset>
      </form>
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

      <div className="titre text-center">
        <h4 className="">Hôtels</h4>
      </div>
      <table className="table align-middle table-bordered mx-5 my-2 w-auto">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Nom d'hôtel</th>
            <th>Nombre d'étoiles</th>
            <th>Nombre de chambres</th>
            <th>Adresse</th>
          </tr>
        </thead>
        {hotel.map((val, key) => {
          return (
            <tbody>
              <tr>
                <td className="text-center">{key + 1}</td>
                <td>{val.nom}</td>
                <td className="text-center">{val.rating}</td>
                <td className="text-center">{val.nbrChambre}</td>
                <td>
                  {val.numero} {val.rue}, {val.ville}, {val.province} {val.pays}{" "}
                  {val.codePostal}
                </td>
                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      showHotelInfo(val);
                    }}
                  >
                    {">"}
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <div className="d-grid gap-2 d-md-flex m-3">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            showAjoutHotel();
          }}
        >
          Ajouter un hôtel
        </button>
      </div>
    </>
  );
};
