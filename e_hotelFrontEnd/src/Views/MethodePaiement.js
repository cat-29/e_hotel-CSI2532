import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';
import ValidateFcts from "../ValidationFcts/container";
import connexionCompte from "../services/connexion-compte";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const MethodePaiement = () => {

    const { state } = useLocation();
    const [formData, setFormData] = useState({
        prenom: '',
        numCarte: '',
        dateExpiration: '',
        cvc: ''
    });

    const [newLocation, setNewLocation] = useState({
        codePostal: state.userInfo.codePostal,
        dateCheckin: state.userInfo.dateCheckin,
        dateCheckout: state.userInfo.dateCheckout,
        datePaiementComplete: new Date(),
        idClient: state.userInfo.idClient,
        idEmploye: state.employeInfo.id,
        idHotel: state.userInfo.idHotel,
        isPaiementComplete: true,
        isUserCheckedInLocation: state.userInfo.isUserCheckedInLocation,
        montantDu: state.userInfo.montantDu,
        nomFamille: state.userInfo.nomFamille,
        numero: state.userInfo.numero,
        numeroChambre: state.userInfo.numeroChambre,
        pays: state.userInfo.pays,
        prenom: state.userInfo.prenom,
        prix: state.userInfo.montantDu,
        province: state.userInfo.province,
        rue: state.userInfo.rue,
        ville: state.userInfo.ville
    });

    const [formDataError, setFormDataError] = useState([]);

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name == "numero" || name == "numCarte") {
            // This desactivates all keyboards buttons axcept numbers
            const newValue = event.target.value.replace(/\D/, '');
            setFormData({ ...formData, [name]: newValue });
        }
        else if (name == "prenom") {
            const newValue = event.target.value.replace(/\d/, '');
            setFormData({ ...formData, [name]: newValue });
        }
        else if (name == "cvc") {
            setIsShown(true);
            setFormData({ ...formData, [name]: value });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const [isShow, setIsShown] = useState(false);

    const hideCVC = () => {
        setIsShown(false);
    }

    const showCVC = () => {
        setIsShown(true);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const validationResult = ValidateFcts.validatePaiementFields(formData);
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
            console.log(state.userInfo);
            console.log(state.employeInfo);
            sending();
        }
    }

    const sending = () => {

        const checkinN = new Date(state.userInfo.dateCheckin);
        const checkoutN = new Date(state.userInfo.dateCheckout);
        console.log("checking new",checkinN.getTime());
        console.log("checkout new",checkoutN.getTime())

        setNewLocation ({
            codePostal: state.userInfo.codePostal,
            dateCheckin: checkinN.toISOString().slice(0,10),
            dateCheckout: checkoutN.toISOString().slice(0,10),
            datePaiementComplete: new Date(),
            idClient: state.userInfo.idClient,
            idEmploye: state.employeInfo.id,
            idHotel: state.userInfo.idHotel,
            isPaiementComplete: true,
            isUserCheckedInLocation: true,
            montantDu: 0.00,
            nomFamille: state.userInfo.nomFamille,
            numero: state.userInfo.numero,
            numeroChambre: state.userInfo.numeroChambre,
            pays: state.userInfo.pays,
            prenom: state.userInfo.prenom,
            prix: state.userInfo.montantDu,
            province: state.userInfo.province,
            rue: state.userInfo.rue,
            ville: state.userInfo.ville
        });

        // enregistre les donnees dans la base de donnee
        connexionCompte.saveMethodePaiementForClientLoueChambre(newLocation).then(() => {
            navigateBackToReservationActive();
        });       
    }

     const navigateBackToReservationActive = async() => {
        navigate("/historiqueReservation", {state : { employeInfo: state.employeInfo}});
    }

    return (
        <>
            <AppHeader info={state.employeInfo} isUserTypeClient={false}/>
            <form noValidate className="mx-4" onSubmit={handleSubmit}>
                <div className="mx-3">
                    <h1 className="my-4">Méthode de paiement</h1>
                    <label htmlFor="montant">Montant dû</label>
                    <h2 id="montant">$ {state.userInfo.montantDu}.00</h2>
                </div>
                <div className="d-grid d-md-flex m-3">
                    <div className="col-sm-5">
                        <label htmlFor="prenom" className="form-label">Nom du titulaire de la carte</label>
                        <input required type="text" className="form-control border" id="prenom" name="prenom" value={formData.prenom} onChange={handleInputChange} />
                        {formDataError[1] != "" ?
                            <div style={{ color: "red" }}>
                                {formDataError[0]}
                            </div>
                            : <></>}
                    </div>
                </div>

                <div className="d-grid gap-2 d-md-flex m-3">
                    <div className="col-sm-5">
                        <label htmlFor="numCarte" className="form-label">Numéro de la carte</label>
                        <InputMask className="form-control border" mask='9999 9999 9999 9999' placeholder="XXXX XXXX XXXX XXXX" maskChar={''} value={formData.numCarte} onChange={handleInputChange} name="numCarte"></InputMask>
                        {formDataError[2] != "" ?
                            <div style={{ color: "red" }}>
                                {formDataError[1]}
                            </div>
                            : <></>}
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-flex m-3">
                    <div  className="col-sm-3 col-md-2">
                        <label htmlFor="dateExpiration" className="form-label">Date d'expiration</label>
                        <InputMask className="form-control border" mask='MM / YY' formatChars={{ 'M': '[0-9]', 'Y': '[0-9]' }} maskChar={''} placeholder="MM / YY" value={formData.dateExpiration} onChange={handleInputChange} name="dateExpiration"></InputMask>
                        {formDataError[2] != "" ?
                            <div style={{ color: "red" }}>
                                {formDataError[2]}
                            </div>
                            : <></>}
                    </div>
                    <div className="col-sm-2 col-md-1 mx-1">
                        <label htmlFor="cvc" className="form-label">CVC</label>
                        <InputMask className="form-control border" mask='999' maskChar={''} type={isShow ? "text" : "password"} onBlur={hideCVC} onClick={showCVC} placeholder="XXX" value={formData.cvc} onChange={handleInputChange} name="cvc"></InputMask>
                        {formDataError[2] != "" ?
                            <div style={{ color: "red" }}>
                                {formDataError[3]}
                            </div>
                            : <></>}
                    </div>
                </div>

                <div className="d-grid gap-2 d-sm-flex m-3">
                    <button type="submit" className='btn btn-secondary col-sm-3 col-md-2'>Payer ${state.userInfo.montantDu}.00</button>
                </div>
            </form>
        </>
    )
}