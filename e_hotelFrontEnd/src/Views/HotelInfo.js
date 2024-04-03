import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import adminService from "../services/adminService";
import { AppHeader } from "../components/AppHeader/AppHeader";
import ValidateFcts from "../ValidationFcts/container";
import InputMask from "react-input-mask";

export const HotelInfo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [chambre, setChambre] = useState([]);
  const [employe, setEmploye] = useState([]);
  const [modify, setModify] = useState(false);
  const [formDataError, setFormDataError] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    nomChaine: "",
    nom: "",
    rating: "",
    nbrChambre: "",
    numero: "",
    rue: "",
    ville: "",
    province: "",
    pays: "",
    codePostal: "",
  });

  useEffect(() => {
    setFormData({
      id: state.hotelInfo.id,
      nomChaine: state.hotelInfo.nomChaine,
      nom: state.hotelInfo.nom,
      rating: state.hotelInfo.rating,
      nbrChambre: state.hotelInfo.nbrChambre,
      numero: state.hotelInfo.numero,
      rue: state.hotelInfo.rue,
      ville: state.hotelInfo.ville,
      province: state.hotelInfo.province,
      pays: state.hotelInfo.pays,
      codePostal: state.hotelInfo.codePostal,
    });
    console.log(formData);
  }, []);

  console.log("ds hotel info: ", state);

  const showChambreInfo = (chambreInfo) => {
    navigate("/chambreInfo", {
      state: {
        chambreInfo: chambreInfo,
        employeInfo: state.employeInfo,
        hotelInfo: state.hotelInfo,
        chaineInfo: state.chaineInfo,
      },
    });
  };

  const showEmployeInfo = (employeInfo) => {
    navigate("/employeInfo", {
      state: {
        employeInfo: employeInfo,
        adminInfo: state.employeInfo,
        hotelInfo: state.hotelInfo,
        chaineInfo: state.chaineInfo,
      },
    });
  };

  const showAjoutChambre = () => {
    navigate("/ajoutChambre", {
      state: {
        employeInfo: state.employeInfo,
        hotelInfo: state.hotelInfo,
        chaineInfo: state.chaineInfo,
      },
    });
  };

  const showAjoutEmploye = () => {
    navigate("/ajoutEmploye", {
      state: {
        employeInfo: state.employeInfo,
        hotelInfo: state.hotelInfo,
        chaineInfo: state.chaineInfo,
      },
    });
  };

  const showBoolean = (val) => {
    if (val == true) {
      {
        return "Oui";
      }
    } else {
      {
        return "Non";
      }
    }
  };

  // When get hotel, get the chambres
  useEffect(() => {
    adminService
      .getChambresFromHotel(state.hotelInfo.id)
      .then((response) => {
        setChambre(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // When get hotel, get the employes
  useEffect(() => {
    adminService
      .getEmployeFromHotel(state.hotelInfo.id)
      .then((response) => {
        setEmploye(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const navigateToHotels = () => {
    navigate("/chaineInfo", {
      state: {
        employeInfo: state.employeInfo,
        hotelInfo: state.hotelInfo,
        chaineInfo: state.chaineInfo,
      },
    });
  };

  const hidePageInfo = () => {
    setModify(true);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    console.log("handleSubmit sent");
    const validationResult = ValidateFcts.validateAllModifHotelFields(formData);
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
        await adminService.updateHotel(formData).then(() => {
          console.log("saveHotel called");
          console.log(formData);
          navigateToHotels();
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
        <button className="btn btn-secondary" onClick={navigateToHotels}>
          Retour
        </button>
      </div>

      <div className="text-center">
        <h1 className="mx-4 my-4">Administration</h1>
      </div>
      <h2 className="text-center p-3">Information hôtel</h2>

      <form noValidate className="mx-4">
        <fieldset disabled={!modify}>
          <div className="d-grid gap-2 d-md-flex m-3">
            <div className="col-5">
              <label htmlFor="nom" className="form-label">
                Nom d'hôtel
              </label>
              <input
                required
                value={formData.nom}
                onChange={handleInputChange}
                type="text"
                className="form-control border"
                id="nom"
                name="nom"
              ></input>
              {formDataError[2] != "" ? (
                <div style={{ color: "red" }}>{formDataError[2]}</div>
              ) : (
                <></>
              )}
            </div>
            <div className="col-md-2">
              <label htmlFor="nbrHotel" className="form-label">
                Nombre de chambres
              </label>
              <input
                required
                value={formData.nbrChambre}
                onChange={handleInputChange}
                type="text"
                className="form-control border"
                id="nbrHotel"
                name="nbrHotel"
                disabled
              ></input>
            </div>
            <div className="col-md-2">
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
                value={formData.numero}
                onChange={handleInputChange}
                type="text"
                className="form-control border"
                id="numero"
                name="numero"
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
                value={formData.rue}
                onChange={handleInputChange}
                type="text"
                className="form-control border"
                id="rue"
                name="rue"
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
                value={formData.ville}
                onChange={handleInputChange}
                type="text"
                className="form-control border"
                id="ville"
                name="ville"
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
                value={formData.pays}
                onChange={handleInputChange}
                type="text"
                className="form-control border"
                id="pays"
                name="pays"
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
        <div className="text-center">
          <h4 className="">Employés</h4>
        </div>
        <table className="table align-middle table-bordered mx-5 my-2 w-auto mb-5">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>NAS</th>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Role</th>
            </tr>
          </thead>
          {employe.map((val, key) => {
            return (
              <tbody>
                <tr>
                  <td className="text-center">{key + 1}</td>
                  <td className="text-center">{val.id}</td>
                  <td className="text-center">
                    {val.prenom} {val.nomFamille}
                  </td>
                  <td className="text-center">
                    {val.numero} {val.rue}, {val.ville}, {val.province}{" "}
                    {val.pays} {val.codePostal}
                  </td>
                  <td className="text-center">{val.roleEmploye}</td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        showEmployeInfo(val);
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
              showAjoutEmploye();
            }}
          >
            Ajouter un employé
          </button>
        </div>
        <br />
        <div className="text-center">
          <h4 className="">Chambres</h4>
        </div>
        <table className="table align-middle table-bordered mx-5 my-2 w-auto mb-5">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Numéro de chambre</th>
              <th>Prix par nuit</th>
              <th>Capacité</th>
              <th>Vue</th>
              <th>Capacité à étendre</th>
            </tr>
          </thead>
          {chambre.map((val, key) => {
            return (
              <tbody>
                <tr>
                  <td className="text-center">{key + 1}</td>
                  <td className="text-center">{val.numeroChambre}</td>
                  <td className="text-center">{val.prix}</td>
                  <td className="text-center">{val.capaciteChambre}</td>
                  <td className="text-center">{val.vueChambre}</td>
                  <td className="text-center">
                    {showBoolean(val.capaciteAEtendre)}
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        showChambreInfo(val);
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
      </div>
      <div className="d-grid gap-2 d-md-flex m-3">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            showAjoutChambre();
          }}
        >
          Ajouter une chambre
        </button>
      </div>
    </>
  );
};
