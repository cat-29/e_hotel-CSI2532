import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ValidateFcts from "../ValidationFcts/container";
import InputMask from 'react-input-mask';
import connexionCompte from "../services/connexion-compte";
import { AppHeader } from "../components/AppHeader/AppHeader";


export const EmployeAjouteLocation = () => {

    const {state} = useLocation();

    // When get employe id, get the hotel 
    useEffect(() => {
        connexionCompte.getNameHotelEmployeWorksFor(state.employeInfo.idHotel).then((response) => {
            setFormData({...formData, nomHotel: response.data});
        }).catch((e) => {
            console.log(e);
        })
    }, state.employeInfo);

   
    // State to store form data
    const [formData, setFormData] = useState({
        idClient: '' , 
        prenom: '',
        nomFamille:'',
        numero:'',
        rue:'',
        ville:'',
        province:'',
        pays:'',
        codePostal:'',
        dateCheckin: '',
        dateCheckout:'',
        email: '',
        idHotel: state.employeInfo.idHotel,
        nomHotel: '',
        vue: 'MONTAGNE',
        capacite: 'TRIPLE',
        numeroChambre: '',
        idEmploye: state.employeInfo.id, 
        montantDu: 0
    });

    const [formDataError,setFormDataError] = useState([]);

    const handleInputChange = (event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name == "numero"){
            const newValue = event.target.value.replace(/\D/, '');
            setFormData({ ...formData, [name]: newValue });
        } else if (name == "idClient" || name == "codePostal") {
            const newValue = event.target.value.replace(/ /g, '');
            setFormData({ ...formData, [name]: newValue });
        }
        else if (name == "prenom" || name == "nomFamille") {
            const newValue = event.target.value.replace(/\d/, '');
            setFormData({ ...formData, [name]: newValue });
        }
        else if (name == "dateCheckin" || name == "dateCheckout") {
            const newValue = event.target.value;
            setFormData({ ...formData, [name]: newValue});
            console.log("checkin" + formData.dateCheckin);
            console.log("checkout" + formData.dateCheckout);

        } else if (name == "vue") {
            const newValue = event.target.id;
            setFormData({ ...formData, [name]: newValue});
        } else if (name == "capacite") {
            const newValue = event.target.id;
            setFormData({ ...formData, [name]: newValue});
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const [roomNumberInfo, setRoomNumberInfo] = useState('');

    const navigate = useNavigate();

    useEffect(() => {

        //******************//
        // CALCULE LE PRIX  //
        //******************//
        // Le nombre de millisecondes dans une journee
        const JOUR_MSEC = 1000 * 60 * 60 * 24;

        // Calcule la differente des deux dates en milliseconde
        const checkOut = new Date(formData.dateCheckout);
        const checkIn = new Date(formData.dateCheckin);
        const diffNbrJours = Math.abs(checkOut - checkIn);

        // Convertis en nombre de jour;
        const nbrJour = Math.round(diffNbrJours / JOUR_MSEC);

        // Calcule le prix de la chambre pour le nombre de jours
        const montant = roomNumberInfo.prix * nbrJour;
        
        // Set le prix comme le montant du
        formData.montantDu = montant;
        setFormData({ ...formData, ["montantDu"]: montant});

        // Le client existe-t-il? Si oui, on continue, sinon, on cree un nouveau client avec les informations entrees
        connexionCompte.doesClientExist(formData.idClient).then((response) => {
            if (!response.data) {
                // Client n'existe pas. Cree un nouveau client
                connexionCompte.createNewClient(formData).then(() => {
                    console.log("client cree avec succes.");
                }).catch((e) => {
                    console.log("une erreur est survenue lors de la creation d'un client.", e);
                })
            } 
        
            // Sauvegarde la location du client, fait par l'employe
            connexionCompte.saveLocation(formData).then(() => {
                console.log("Location avec les infos du client on ete sauvegarde");
            }).catch((e) => {
                console.log("une erreur c'est produite lors de la sauvegarde de la location. " + e);
            })

            // Ajoute dans la base de donnee l'enregistrement du client. 
            connexionCompte.enregistreClient(formData).then(() => {
                console.log("enregistrement du client fait avec succes.");

                // L'employe sera redirigee vers la page qui s'occupe du paiement
                continueAvecPaiement();
            }).catch((e) => {
                console.log("une erreur c'est produite lors de l'enregistrement. " + e);
            })
            
        }).catch((e) => {
            console.log("une erreur est survenu lors de la recherche si client existe.");
        })

    }, [roomNumberInfo]);
    
  
    const handleSubmit = (e)=>{
        e.preventDefault();
        const validationResult = ValidateFcts.validateAllLocationFields(formData);
        setFormDataError(validationResult);

        // flag used to track whether we submit to backend or we wait for user to fix its errors
        let flag = false;

        for (let i = 0;i<validationResult.length;i++){
            if (validationResult[i] != ""){
                flag = true;
            }
        }

        if (flag == true){
            console.log("there are still errors to fix");
        } else{
            console.log("fields are ready to be submitted to backend");

            // get the first room that matches the specifications.. if no room, then show alert
            // continue to the payment section
            connexionCompte.getNumeroChambreForSpecifications(state.employeInfo.idHotel, new Date(formData.dateCheckin).toISOString().slice(0,10), new Date(formData.dateCheckout).toISOString().slice(0,10), formData.capacite, formData.vue).then((response) => {
                
                // check if an element is null in the response data. If so, then show error msg.
                if (response.data.errorType == 1) {
                    alert("Aucune chambre trouvé. Veuillez changer vos filtres!");
                } else if (response.data.errorType == 2) {
                    alert("Aucune chambre de disponible pour les dates de checkin et checkout entrées. Veuillez changer ces dates!");
                } else {
                    // Set les informations concernant la chambre de libre
                    setRoomNumberInfo(response.data);
                    console.log(response.data);
                    // Prend le numero de chambre
                    formData.numeroChambre = response.data.numeroChambre;
                }
            }).catch((e) => {
                alert("Une erreur c'est produite avec les données entrés. Veuillez modifier vos filtres");
                console.log(e);
            });
        }
    }

    const continueAvecPaiement = () => {
        navigate('/methodePaiement', {state: {userInfo: formData, employeInfo: state.employeInfo}})
    }

    const [isShow, setIsShown] = useState(false);

    const hideNAS = () => {
        setIsShown(false);
    }

    const showNAS = () => {
        setIsShown(true);
    }

    return(
        <>
            <AppHeader info={state.employeInfo} isUserTypeClient={false}/>
            <h1 className="text-center mx-4 my-4">Ajout d'une location</h1>
            <p className="p-3 ">* Veuillez vous assurer de compléter tous les champs</p>
            <form noValidate className="mx-4" onSubmit={handleSubmit}>
                <div className="d-grid gap-2 d-md-flex m-3">
                    <div className="col-5">
                        <label htmlFor="prenom" className="form-label">Prénom</label>
                        <input required type="text" className="form-control border" id="prenom" name='prenom' value={formData.prenom} onChange={handleInputChange}/>
                        {formDataError[1] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[1]}
                            </div> 
                        :<></>}
                    </div>

                    <div className="col-5">
                        <label htmlFor="nomFamille" className="form-label">Nom de famille</label>
                        <input required type="text" className="form-control border" id="nomFamille" name='nomFamille' value={formData.nomFamille} onChange={handleInputChange}/>
                        {formDataError[2] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[2]}
                            </div> 
                        :<></>}
                    </div>
                </div>

                <div className="d-grid gap-2 d-md-flex m-3">
                    <div className="col-md-1">
                        <label htmlFor="numero" className="form-label">Numéro</label>
                        <input required type="text" className="form-control" id="numero" aria-describedby="numero" name='numero' value={formData.numero} onChange={handleInputChange}/>
                        {formDataError[3] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[3]}
                            </div> 
                        :<></>}
                    </div>

                    <div className="col-5">
                        <label htmlFor="NomRue" className="form-label">Rue</label>
                        <input required type="text" className="form-control border" id="NomRue" name='rue' value={formData.rue} onChange={handleInputChange}/>
                        {formDataError[4] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[4]}
                            </div> 
                        :<></>}
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="ville" className="form-label">Ville</label>
                        <input required type="text" className="form-control" id="ville" aria-describedby="ville" name='ville' value={formData.ville} onChange={handleInputChange}/>
                        {formDataError[5] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[5]}
                            </div> 
                        :<></>}
                    </div>
                </div>

                <div className="d-grid gap-2 d-md-flex m-3">
                    <div className="col-md-1">
                        <label htmlFor="province" className="form-label">Province</label>
                        <InputMask className="form-control border" mask={'LL'} formatChars={{'L':'[A-Z]'}} maskChar={''} value={formData.province} onChange={handleInputChange} name="province"/>
                        {formDataError[6] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[6]}
                            </div> 
                        :<></>}
                    </div>

                    <div>
                        <label htmlFor="pays" className="form-label">Pays</label>
                        <input required type="text" className="form-control border" id="pays" name='pays' value={formData.pays} onChange={handleInputChange}/>
                        {formDataError[7] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[7]}
                            </div> 
                        :<></>}
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="codePostal" className="form-label">Code Postal</label>
                        <InputMask className="form-control border" mask={'LDL DLD'} formatChars={{'L': '[A-Z]', 'D': '[0-9]'}} maskChar={''} value={formData.codePostal} onChange={handleInputChange} name="codePostal" />
                        {formDataError[8] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[8]}
                            </div> 
                        :<></>}
                    </div>
                </div>

                <div className="d-grid gap-5 d-md-flex m-3">
                    <div className="col-md-5">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control border" name="email" value={formData.email} onChange={handleInputChange}/>
                        {formDataError[11] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[11]}
                            </div> 
                        :<></>}
                    </div>

                    <div className="col-sm-5 col-md-3 col-lg-2">
                        <label htmlFor="idClient" className="form-label">Numéro Assurance Sociale</label>
                        <InputMask className="form-control border" mask='999 999 999' placeholder="XXX XXX XXX" maskChar={''} value={formData.idClient} onChange={handleInputChange} type={isShow ? "text" : "password"} onBlur={hideNAS} onClick={showNAS} name="idClient"/>
                        {formDataError[0] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[0]}
                            </div> 
                        :<></>}
                    </div>
                </div>

                {/* Filtres */}
                <h3 className="m-3">Filtres</h3>
                <div className="d-grid gap-2 d-md-flex m-3">
                    <div className="col-md-5">
                        <label htmlFor="hotel" className="form-label">Hotel</label>
                        <input type="text" className="form-control border" name="hotel" value={formData.nomHotel} disabled/>
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-flex m-3">
                    <div>
                        <label htmlFor="dateCheckin" className="form-label">Date Check-In</label>
                        <input type="date" className="form-control border" name="dateCheckin" value={formData.dateCheckin} onChange={handleInputChange}/>
                        {formDataError[9] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[9]}
                            </div> 
                        :<></>}
                    </div>

                    <div>
                        <label htmlFor="dateCheckout" className="form-label">Date Check-Out</label>
                        <input type="date" className="form-control border" name='dateCheckout' min={formData.dateCheckin} onChange={handleInputChange}/>
                        {formDataError[10] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[10]}
                            </div> 
                        :<></>}
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-flex mx-3">
                    
                    <div className="col-md-5 d-md-flex">
                        <label className="form-label">Vue sur: </label>
                        <div class="form-check d-md-flex mx-2">
                            <input class="form-check-input" type="radio" name="vue" id="MER" onClick={handleInputChange}/>
                            <label class="form-check-label ms-1" for="vue">Mer</label>
                        </div>
                        <div class="form-check d-md-flex">
                            <input class="form-check-input" type="radio" name="vue" id="MONTAGNE" defaultChecked onClick={handleInputChange}/>
                            <label class="form-check-label ms-1" for="vue">Montagne</label>
                        </div>
                    </div>
                </div>

                <div className="d-grid gap-2 d-md-flex mx-3">
                    
                    <div className="col-md-5 d-md-flex">
                        <label className="form-label">Capacité: </label>
                        <div class="form-check d-md-flex mx-2">
                            <input class="form-check-input" type="radio" name="capacite" id="SIMPLE"  value={formData.capacite} onClick={handleInputChange} />
                            <label class="form-check-label ms-1" for="vue">Simple</label>
                        </div>
                        <div class="form-check d-md-flex me-2">
                            <input class="form-check-input" type="radio" name="capacite" id="DOUBLE"  value={formData.capacite} onClick={handleInputChange}/>
                            <label class="form-check-label ms-1" for="vue">Double</label>
                        </div>
                        <div class="form-check d-md-flex">
                            <input class="form-check-input" type="radio" name="capacite" id="TRIPLE" value={formData.capacite} defaultChecked onClick={handleInputChange}/>
                            <label class="form-check-label ms-1" for="vue">Triple</label>
                        </div>
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-flex m-3 mb-5">
                    <button type='submit' onClick={handleSubmit} className='btn btn-secondary'>Suivant</button>
                </div>
            </form>
        </>  
    )
}