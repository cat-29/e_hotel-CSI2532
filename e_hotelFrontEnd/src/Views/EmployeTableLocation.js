import { useLocation, useNavigate } from "react-router-dom";
import connexionCompte from "../services/connexion-compte";
import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const EmployeTableLocation = () => {

    const {state} = useLocation();
    const navigate = useNavigate();

    const [historiqueLocation, setHistoriqueLocation] = useState({
        location: []
    });

    // Get all locations for user info
    useEffect(() => {

        connexionCompte.getAllLocationsFromIdHotelOfEmploye(state.employeInfo.idHotel).then((response) => {
            setHistoriqueLocation({
                location: response.data
            });
        }).catch((e) => {
            console.log("Une erreur c'est produite. " + e);
        })
    }, []);

    const ajoutLocation = () => {
        navigate("/ajoutLocation", {state: {employeInfo: state.employeInfo}});
    }

    const formatDate = (date) => {
        return new Date(date).toISOString().substring(0, 10);
    }

    const showReservationActive = () => {
        navigate("/historiqueReservation",{state: {employeInfo: state.employeInfo}});
    }

    return (
        <>
            <AppHeader info={state.employeInfo} isUserTypeClient={false}/>
            <div className="text-center">
                <h1 className="mx-4 my-4">Historique des locations</h1>                    
            </div>

            <div className="mx-5 d-flex justify-content-between">
                <button type="button" className="btn btn-info me-3" onClick={showReservationActive}>Voir l'historique des réservations</button>
                <button type="button" className="btn btn-secondary" onClick={ajoutLocation}>Ajout d'une location
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"/>
                        <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>                
            </div>

            <table className="table align-middle table-bordered mx-5 my-2 mb-5 w-auto">
                <thead>
                    <tr className="text-center">
                        <th className="col">#</th>
                        <th className="col-3">Nom du client</th>
                        <th className="col"># Chambre réservé</th>
                        <th className="col-2">Date checkin</th>
                        <th className="col-2">Date checkout</th>
                        <th className="col">Méthode de paiement</th>
                        <th className="col">Paiement complété</th>
                        <th className="col">Date Paiement Complété</th>
                    </tr>
                </thead>

                {historiqueLocation.location.map((val, key) => {
                    return (
                        <tbody>
                            <tr>
                                <th className="text-center">{key}</th>
                                <td>{val.prenom} {val.nomFamille}</td>
                                <td className="text-center">{val.numeroChambre}</td>
                                <td>{formatDate(val.dateCheckin)}</td>
                                <td>{formatDate(val.dateCheckout)}</td>
                                {(val.montantDu == 0) 
                                    ?<td className="text-center">En ligne</td>
                                    :<td className="text-center">En personne</td>
                                }
                                {val.isPaiementComplete ? <td className="text-center" style={{color: 'green'}}>Oui</td> : <td className="text-center" style={{color: 'red'}}>Non</td>}
                                {val.datePaiementComplete !== null ? <td className="text-center">{formatDate(val.datePaiementComplete)}</td>
                                    : <td className="text-center">-</td>
                                }
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </>
    );
}