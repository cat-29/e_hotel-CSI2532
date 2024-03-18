import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidateFcts from "../ValidationFcts/container";
import fcts from "../ApiFcts/Api";
import InputMask from 'react-input-mask';


export const EmployeAjouteLocation = () => {

    // State to store form data
    const [formData, setFormData] = useState({
        nas: '',
        prenom: '',
        nomFamille:'',
        numero:'',
        rue:'',
        ville:'',
        province:'',
        pays:'',
        codePostal:'',
        dateCheckIn:'',
        dateCheckOut:''
    });

    const [formDataError,setFormDataError] = useState([]);

    const handleInputChange = (event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name == "nas" || name == "numero"){
            // This desactivates all keyboards buttons axcept numbers
            const newValue = event.target.value.replace(/\D/, '');
            setFormData({ ...formData, [name]: newValue });
        } 
        else if (name == "prenom" || name == "nomFamille") {
            const newValue = event.target.value.replace(/[^A-Za-z]+/g, '');
            setFormData({ ...formData, [name]: newValue });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const navigate = useNavigate();


    const handleSubmit = (e)=>{
        e.preventDefault();
        const validationResult = ValidateFcts.validateAllfields(formData);

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
            const createResponse = fcts.createAccount(formData);
        }
    }

    const backHomePage = (event)=>{
        console.log("navigating back to home ...");
        navigate('/');
    }

    const [isShow, setIsShown] = useState(false);

    const hideNAS = () => {
        setIsShown(false);
    }

    const showNAS = () => {
        setIsShown(true);
    }

    return(
        // <div>I am the create account form</div>
        <>
            <h2 className="text-center p-3">Ajout d'une location</h2>
            <p className="p-3 ">* Veuillez vous assurer de compléter tous les champs</p>
            <form noValidate className="mx-4" onSubmit={handleSubmit}>
                <div className="m-3 col-sm-5 col-md-3 col-lg-2">
                    <label htmlFor="nas" className="form-label">Numéro Assurance Sociale</label>
                    <InputMask className="form-control border" mask='999 999 999' placeholder="XXX XXX XXX" maskChar={''} value={formData.nas} onChange={handleInputChange} type={isShow ? "text" : "password"} onBlur={hideNAS} onClick={showNAS} name="nas"/>
                    {formDataError[0] != "" ?
        
                    <div style={{color:"red"}}>
                        {formDataError[0]}
                    </div> 
                    
                    :<></>}
                </div>

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

                <div className="d-grid gap-2 d-md-flex m-3">
                    <div>
                        <label htmlFor="checkin" className="form-label">Date Check-In</label>
                        <input type="date" className="form-control border" name="checkin" value={formData.dateCheckIn} onChange={handleInputChange}/>
                    </div>

                    <div>
                        <label htmlFor="checkout" className="form-label">Date Check-Out</label>
                        <input type="date" className="form-control border" name='checkout' value={formData.dateCheckOut} onChange={handleInputChange}/>
                        {formDataError[10] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[10]}
                            </div> 
                        :<></>}
                    </div>
                </div>

                {/* 1. Add Hotel textbox where it is disabled and set as the hotel name the employe works at */}
                {/* 2. when create location, return 1st chambreNumber that is not used during the dates suggested */}
                {/* 3. Add the payment section on Suivant and add the handleSubmit on the button */}
                <div className="d-grid gap-2 d-md-flex m-3">
                    {/* <button type="submit" className='btn btn-primary'>Créesr un compte</button> */}
                    <button type='submit' onClick={backHomePage} className='btn btn-secondary'>Suivant</button>
                </div>

            </form>
        </>  
    )
}