import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import connexionCompte from "../services/connexion-compte";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const ReservationActive = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    const [activeReservationInfo, setActiveReservationInfo] = useState({
        reservation:[]
    });

    useEffect(() => {
        // get all reservations for that hotel
        connexionCompte.getAllActiveReservationsForEmploye(state.employeInfo.idHotel).then((response) => {
            setActiveReservationInfo({
                reservation: response.data
            });
        }).catch(e => {
            console.log(e);
        });
    },[]);
    
    const checkIfPaiementComplete = (userInfo) => {        
        if (!userInfo.isPaiementComplete) {
            console.log("paiement pas complete", state.employeInfo.id);
            navigate('/methodePaiement', {state: {userInfo: userInfo, employeInfo: state.employeInfo}})
        } else {
            userInfo.isUserCheckedInLocation = true;
            // Now, we need to save that the user is checkin in the database
            sending(userInfo);
        }
    }
    const [newLocation, setNewLocation] = useState({
        codePostal: '',
        dateCheckin: '',
        dateCheckout: '',
        datePaiementComplete: '',
        idClient: '',
        idEmploye: '',
        idHotel: '',
        isPaiementComplete: true,
        isUserCheckedInLocation: '',
        montantDu: '',
        nomFamille: '',
        numero: '',
        numeroChambre: '',
        pays: '',
        prenom: '',
        prix: '',
        province: '',
        rue: '',
        ville: ''
    });

    const sending = async (userInfo) => {

        const checkinN = new Date(userInfo.dateCheckin);
        const checkoutN = new Date(userInfo.dateCheckout);

        setNewLocation ({
            codePostal: userInfo.codePostal,
            dateCheckin: checkinN.toISOString().slice(0,10),
            dateCheckout: checkoutN.toISOString().slice(0,10),
            datePaiementComplete: new Date(),
            idClient: userInfo.idClient,
            idEmploye: state.employeInfo.id,
            idHotel: userInfo.idHotel,
            isPaiementComplete: true,
            isUserCheckedInLocation: true,
            montantDu: 0.00,
            nomFamille: userInfo.nomFamille,
            numero: userInfo.numero,
            numeroChambre: userInfo.numeroChambre,
            pays: userInfo.pays,
            prenom: userInfo.prenom,
            prix: userInfo.montantDu,
            province: userInfo.province,
            rue: userInfo.rue,
            ville: userInfo.ville
        });
    }

    useEffect(() => {
        // In case the client prepaid, we just need to update his location info in the database
        console.log("after new location: ");
        console.log(newLocation);

        // Create the location in the database
        if (newLocation.nomFamille != '') {
            createLocation();
        }
    }, [newLocation]);

    const createLocation = async() => {
        try {
            await connexionCompte.saveMethodePaiementForClientLoueChambre(newLocation);
        } catch (error) {
            console.error(error);
        } 
    }

    const showHistoriqueLocation = () => {
        navigate("/historiqueLocation", {state: {employeInfo: state.employeInfo}});
    }

    const ajoutLocation = () => {
        navigate("/ajoutLocation", {state: {employeInfo: state.employeInfo}});
    }

    const dommagesSubi = () => {
        navigate("/dommagesSubi", {state: {employeInfo: state.employeInfo}});
    }

    const formatDate = (date) => {
        return new Date(date).toISOString().substring(0, 10);
    }
    return ( 
        <>
            <AppHeader info={state.employeInfo} isUserTypeClient={false}/>
            <div className="text-center">
                <h1 className="mx-4 my-4">Historique des réservations</h1>                    
            </div>

            <div className="mx-5 d-flex justify-content-between">
                <button type="button" className="btn btn-info rounded-5 me-3" onClick={showHistoriqueLocation}>Voir l'historique des locations</button>
                <div>
                    <button type="button" className="btn btn-primary rounded-5 me-3" onClick={dommagesSubi}>Dommages subi</button>
                    <button type="button" className="btn btn-secondary rounded-5" onClick={ajoutLocation}>Ajout d'une location
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"/>
                            <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>       
                </div>             
            </div>
            
            <table className="table align-middle table-bordered mx-5 my-2 mb-5 w-auto">
                <thead>
                    <tr className="text-center">
                        <th className="col">#</th>
                        <th className="col-4">Nom du client</th>
                        <th className="col-2">Date checkin</th>
                        <th className="col-2">Date checkout</th>
                        <th className="col-2">CheckIn location</th>
                        <th className="col-1"># Chambre réservé</th>
                        <th className="col-2">Paiement complété</th>
                    </tr>
                </thead>

                {activeReservationInfo.reservation.map((val, key) => {
                    return (
                        <tbody>
                            <tr>
                                <th className="text-center">{key+1}</th>
                                <td>{val.prenom} {val.nomFamille}</td>
                                {}
                                <td>{formatDate(val.dateCheckin)}</td>
                                <td>{formatDate(val.dateCheckout)}</td>
                                {(val.isUserCheckedInLocation == true) ? 
                                    <td className="text-center">Checked In 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className="bi bi-check-circle-fill mx-1" viewBox="0 0 18 18">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                    </td>
                                    : <td className="text-center"><button className="btn btn-secondary rounded-5" onClick={() => {
                                        checkIfPaiementComplete((val))
                                        
                                    }}>CheckIn</button></td>
                                }
                                <td className="text-center">{val.numeroChambre}</td>
                                {val.isPaiementComplete ? <td className="text-center" style={{color: 'green'}}>Oui</td> : <td className="text-center" style={{color: 'red'}}>Non</td>}
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </>
    );
}