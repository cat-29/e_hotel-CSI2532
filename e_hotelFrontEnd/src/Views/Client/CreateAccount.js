import { useState } from "react";
import ValidateFcts from "../../ValidationFcts/container";
import fcts from "../../ApiFcts/Api";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import InputMask from 'react-input-mask';
import connexionCompte from "../../services/connexion-compte";

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
    const [userExistError, setUserExistsError] = useState('');

    const [submitted,setSubmitted] = useState(false);

    // I have an idea of disabling nas inputs once it's correct, this is more like styling and not a top priority, gonna come back to it though
    const [disableNas,setDisableNas] = useState(false);

    // This handles all our inputs

    const handleInputChange = (event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name == "nas" || name == "codePostal") {
            const newValue = event.target.value.replace(/ /g, '');
            setFormData({ ...formData, [name]: newValue });
        } else if (name == "numero"){
            // This desactivates all keyboards buttons except numbers
            const newValue = event.target.value.replace(/\D/, '');
            setFormData({ ...formData, [name]: newValue });
        } 
        else if (name == "prenom"){
            const newValue = event.target.value.replace(/\d/, '');
            setFormData({ ...formData, [name]: newValue });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    }

    // navigate from a page to another
    const navigate = useNavigate();

    // Handles our submit event

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // Validate input !
        const validationResult = ValidateFcts.validateAllfields(formData);

        // Set error state to what you found
        setFormDataError(validationResult);
        setUserExistsError('');
        
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
            
            try {
                connexionCompte.doesClientExist(formData.nas).then((response) => {
                    if (!response.data) {
                        // Client n'existe pas. Continue
                        setSubmitted(true);
                        const createResponse = fcts.createAccount(formData);

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
                        });
                        
                        // navigate back to previous page
                        window.history.back();
                    } else {
                        // Le client existe. On a un probleme. 
                        setUserExistsError('Un client avec ces données existe déjà. Veuillez modifier vos données.')
                        flag = true;
                    }
                });
            } catch (error) {
                console.log(error);
            }
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
        <AppHeader/>
            <h2 className="text-center p-3">Créer un compte</h2>
            <p className="p-3 ">* Veuillez vous assurer de compléter tous les champs</p>
            <form noValidate onSubmit={handleSubmit}>
                <div className="d-grid gap-2 d-md-flex m-3">                    
                    <div>
                        <label htmlFor="nasUtilisateur" className="form-label">Numéro D'assurance Sociale</label>
                        <InputMask className="form-control border" mask='999 999 999' placeholder="XXX XXX XXX" id="nasUtilisateur" maskChar={''} value={formData.nas} onChange={handleInputChange} type={isShow ? "text" : "password"} onBlur={hideNAS} onClick={showNAS} name="nas"/>
                        {formDataError[0] != "" ?
        
                            <div style={{color:"red"}}>
                                {formDataError[0]}
                            </div> 
                            
                            :<></>}
                    </div>                    
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

                <div className="m-3">
                    {userExistError != "" ?
                        <div style={{color:"red"}}>
                            {userExistError}
                        </div> 
                    :<></>}
                </div>

                <div className="d-grid gap-2 d-md-flex m-3 mb-5">
                    <button type="submit" className='btn btn-secondary'>{submitted ? 'soumission...':'Créer un compte'}</button>
                    <button type='button' onClick={backHomePage} className='btn btn-primary'>Annuler</button>
                </div>
            </form>
        </>  
    )
}