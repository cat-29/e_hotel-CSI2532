import { useLocation, useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';
import ValidateFcts from "../../ValidationFcts/container";
import { useState } from "react";
import fcts from "../../ApiFcts/Api";
import { AppHeader } from "../../components/AppHeader/AppHeader";


export const MethodePaiementClient = ()=>{

    // The state here has: nas,num_chambre,id_hotel,checkin,checkout,price,prix
    // as well as an object for client details

    const {state} = useLocation();
    const paiementInfo = state.paiementInfo;
    const userInfo = state.clientInfo; // ici!

    // console.log("paiementInfo",paiementInfo);
    let [formDataError,setFormDataError] = useState([]);
    const navigate = useNavigate();
    const [pending,setPending] = useState(false);
    // console.log("in methode paiement client",state);

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
            const newValue = event.target.value.replace(/[^A-Za-z]+/g, '');
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

    const [formData, setFormData] = useState({
        prenom: '',
        numCarte: '',
        dateExpiration: '',
        cvc: ''
    });

    const [isShow, setIsShown] = useState(false);

    const hideCVC = () => {
        setIsShown(false);
    }

    const showCVC = () => {
        setIsShown(true);
    }

    const handleSubmit = async (e)=>{
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
            setPending(true);
            const data = {...paiementInfo};
            data.isPaiementComplete = true;
            data.datePaiementComplete = new Date().toISOString().slice(0,10);
            // console.log("sur le point d envoyer",data);
            const res = await fcts.ajouterReservationDB(data);
            setPending(false);
            navigate('/reservationChambre',{state:userInfo});
        }
    }

    return(
        <>
            <AppHeader info={userInfo} isUserTypeClient={true}/>
            <form noValidate className="mx-4" onSubmit={handleSubmit}>
                {/* Thinking about how to send price here */}
                <div className="mx-3">
                    <h1 className="my-4">Méthode de paiement</h1>
                    <label htmlFor="montant">Montant dû:</label>
                    <h2 id="montant">$ {paiementInfo.prix}</h2>
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
                        <InputMask className="form-control border" mask='MN / YY' formatChars={{ 'M': '[0-1]', 'N': '[0-2]', 'Y': '[0-9]' }} maskChar={''} placeholder="MM / YY" value={formData.dateExpiration} onChange={handleInputChange} name="dateExpiration"></InputMask>
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
                    <button type="submit" className='btn btn-secondary col-sm-3 col-md-2' disabled={pending}>Payer</button>
                </div>
                {pending ? <p>Soumission...</p>:<></>}
            </form>



        </>

    );
}