import { useState,useEffect } from "react";
import ValidateFcts from "../../ValidationFcts/container";
import fcts from "../../ApiFcts/Api";
import { useNavigate } from "react-router-dom";

export const CreateAccountForm = ()=>{
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
        email:'',
        pwd:'',
        pwdConfirmed:''
    });

    // State that stores erros

    const [formDataError,setFormDataError] = useState([]);

    const [submitted,setSubmitted] = useState(false);

    // I have an idea of disabling nas inputs once it's correct, this is more like styling and not a top priority, gonna come back to it though
    const [disableNas,setDisableNas] = useState(false);

    // This handles all our inputs

    const handleInputChange = (event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name == "nas" || name == "numero"){
            // This desactivates all keyboards buttons except numbers
            const newValue = event.target.value.replace(/\D/, '');
            setFormData({ ...formData, [name]: newValue });
        } 
        // else if (name == "prenom"){
        //     setDisableNas(true);
        //     setFormData({ ...formData, [name]: value });
        // }
        else {
            setFormData({ ...formData, [name]: value });
        }
        // For debugging purposes

        // console.log("target",target);
        // console.log("name",name);
        // console.log("value",value);
        // console.log("formData",formData);
    }

    // navigate from a page to another

    const navigate = useNavigate();

    // Handles our submit event

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // console.log("the complete form is",formData);
        // Validate input !
        const validationResult = ValidateFcts.validateAllfields(formData);
        // console.log("validation result",validationResult);

        // Set error state to what you found

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
            setSubmitted(true);
            const createResponse = fcts.createAccount(formData);
            // Look deeply into that, could be improved

            createResponse.then((response)=>{
                console.log("the response was finally",response);
                setSubmitted(false);
                setFormData({
                    nas: '',
                    prenom: '',
                    nomFamille:'',
                    numero:'',
                    rue:'',
                    ville:'',
                    province:'',
                    pays:'',
                    codePostal:'',
                    email:'',
                    pwd:'',
                    pwdConfirmed:''
                });
            })
        }
    }

    const backHomePage = (event)=>{
        console.log("navigating back to home ...");
        navigate('/');
    }

    return(
        // <div>I am the create account form</div>
        <>
            <h2 className="text-center p-3">Créer un compte</h2>
            <p className="p-3 ">* Veuillez vous assurer de compléter tous les champs</p>
            <form noValidate onSubmit={handleSubmit}>
                <div className={"m-3 w-50"}>
                    <label htmlFor="nasUtilisateur" className="form-label">Numéro D'assurance Sociale</label>
                    <input style={disableNas?{color:"black",backgroundColor:"black"}:{}} required type="text" disabled = {disableNas?true:false} className="form-control" id="nasUtilisateur" aria-describedby="nas" name='nas' value={formData.nas} onChange={handleInputChange}/>
                    {formDataError[0] != "" ?
        
                    <div style={{color:"red"}}>
                        {formDataError[0]}
                    </div> 
                    
                    :<></>}
                </div>

                <div className="d-grid gap-2 d-md-flex m-3">
                    <div>
                        <label htmlFor="prenom" className="form-label">Prénom</label>
                        <input required type="text" className="form-control border" id="prenom" name='prenom' value={formData.prenom} onChange={handleInputChange}/>
                        {formDataError[1] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[1]}
                            </div> 
                        :<></>}
                    </div>

                    <div>
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

                    <div>
                        <label htmlFor="NomRue" className="form-label">Nom de Rue</label>
                        <input required type="text" className="form-control border" id="NomRue" name='rue' value={formData.rue} onChange={handleInputChange}/>
                        {formDataError[4] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[4]}
                            </div> 
                        :<></>}
                    </div>


                </div>

                <div className="d-grid gap-4 d-md-flex m-3">
                    <div className="col-md-3">
                        <label htmlFor="ville" className="form-label">Ville</label>
                        <input required type="text" className="form-control" id="ville" aria-describedby="ville" name='ville' value={formData.ville} onChange={handleInputChange}/>
                        {formDataError[5] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[5]}
                            </div> 
                        :<></>}
                    </div>

                    <div className="col-md-1">
                        <label htmlFor="province" className="form-label">Province</label>
                        <input  required type="text" className="form-control border" id="province" name='province' value={formData.province} onChange={handleInputChange}/>
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
                        <input required type="text" className="form-control" id="codePostal" aria-describedby="codePostal" name='codePostal' value={formData.codePostal} onChange={handleInputChange}/>
                        {formDataError[8] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[8]}
                            </div> 
                        :<></>}
                    </div>
                </div>

                <div className="d-grid gap-2 d-md-flex m-3">
                    <div>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input required type="email" className="form-control border" id="email" name='email' value={formData.email} onChange={handleInputChange}/>
                        {formDataError[9] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[9]}
                            </div> 
                        :<></>}
                    </div>

                    <div>
                        <label htmlFor="motDePasse" className="form-label">Mot de passe</label>
                        <input required type="password" className="form-control border" id="motDePasse" name='pwd' value={formData.pwd} onChange={handleInputChange}/>
                        {formDataError[10] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[10]}
                            </div> 
                        :<></>}
                    </div>

                    <div>
                        <label htmlFor="motDePasseConfirme" className="form-label">Mot de passe Confirmé</label>
                        <input required type="password" className="form-control border" id="motDePasseConfirme" name='pwdConfirmed' value={formData.pwdConfirmed} onChange={handleInputChange}/>
                        {formDataError[11] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[11]}
                            </div> 
                        :<></>}
                    </div>
                </div>


                <div className="d-grid gap-2 d-md-flex m-3">
                    <button type="submit" className='btn btn-primary'>{submitted ? 'soumission...':'Créer un compte'}</button>
                    <button type='button' onClick={backHomePage} className='btn btn-secondary'>Annuler</button>
                </div>
            </form>
        </>  
    )
}