import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import connexionCompte from "../services/connexion-compte";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const ChambreSubiDommage = () => {
    
    const {state} = useLocation();

    const navigate = useNavigate();

    const [dommages, setDommages] = useState({
        dommage: []
    });

    const [formData, setFormData] = useState({
        idHotel: state.employeInfo.idHotel,
        numeroChambre: '',
        typeDommage: '',
        explication: ''
    });
    

    useEffect(() => {
        // Va chercher tout les dommages
        console.log("employe info: ");
        console.log(state.employeInfo)

        getAllDommageInfo();
    }, []);

    const getAllDommageInfo = async () => {
        try {
            const reponse = await connexionCompte.getAllDommagesSubiForIdHotel(state.employeInfo.idHotel);

            setDommages({
                dommage: reponse.data
            });

            console.log("testons: " + reponse.data[0].typeDommage);
            formData.typeDommage = reponse.data[0].typeDommage;
            setFormData({...formData, ["typeDommage"]:reponse.data[0].typeDommage})

        } catch (error) {
            console.error(error);
        }
    }


    const navigateToAjouteDommage = () => {
        navigate("/ajouteDommage", {state: {employeInfo: state.employeInfo}});
    }


    const showReservationActive = () => {
        navigate("/historiqueReservation",{state: {employeInfo: state.employeInfo}});
    }


    return (
        <>
            <AppHeader info={state.employeInfo} isUserTypeClient={false}/>
            {/* Bouton pour le retour a la page d'historique de reservation */}
            <div className="text-center">
                <h1 className="mx-4 mt-4">Liste des dommages enregistrés</h1>                    
            </div>
            <div className="mx-5 d-flex my-1 justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={showReservationActive}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 19 19">
                        <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                    Retour</button>

                    <button type="button" className="btn btn-secondary" onClick={navigateToAjouteDommage}>Ajouter un dommage</button>
            </div>

            {/* Table qui affiche tout les dommages */}
            <table className="table align-middle table-bordered mx-5 my-2 w-auto mb-5">
                <thead>
                    <tr className="text-center">
                        <th className="col">#</th>
                        <th className="col-2">Chambre ayant le dommage</th>
                        <th className="col">Type de dommage</th>

                    </tr>
                </thead>
           
                {dommages.dommage.map((val, key) => {
                    return (
                        <tbody>
                            <tr>
                                <th className="col text-center">{key+1}</th>
                                
                                <td className="col text-center">{val.numeroChambre}</td>
                                <td className="col">{val.typeDommage}</td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </>
    );
}