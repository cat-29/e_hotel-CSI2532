import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputMask from 'react-input-mask';
import connexionCompte from "../services/connexion-compte";
import ValidateFcts from "../ValidationFcts/container";
import { AppHeader } from "../components/AppHeader/AppHeader";


export const ShowUserProfile = () => {

    const {state} = useLocation();
    
    // State to store form data
    const [formData, setFormData] = useState({
        nas: '' , 
        prenom: '',
        nomFamille:'',
        numero:'',
        rue:'',
        ville:'',
        province:'',
        pays:'',
        codePostal:'',
        email: '',
        password: '',
        passwordConfirme: ''
    });

    const [compteInfo, setCompteInfo] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        console.log("voyons le profil du user:");
        console.log(state);

        if (formData.prenom == '') {
            getUserInfo();
        }

    }, []);

    useEffect(() => {

        setFormData({
            nas: state.userInfo.nas,
            prenom: state.userInfo.prenom,
            nomFamille: state.userInfo.nomFamille,
            numero: state.userInfo.numero,
            rue: state.userInfo.rue,
            ville: state.userInfo.ville,
            province: state.userInfo.province,
            pays: state.userInfo.pays,
            codePostal: state.userInfo.codePostal,
            email: compteInfo.email,
            password: compteInfo.password,
            passwordConfirme: ''
        });

        console.log(formData);
    }, [compteInfo])

    const getUserInfo = async() => {

        // Is the user type a client or employe,
        if (state.isClientUser) {
            console.log("dealing with a client");
            
            // Retrieve client's email & password
            try {
                const response = await connexionCompte.getInfoCompteClient(state.userInfo.nas);
                console.log("Compte client information!");
                console.log(response.data);
                setCompteInfo({email: response.data.email, password: response.data.pwd});
            } catch (error) {
                console.error(error);
            }
        } else if (!state.isClientUser) {
            console.log("dealing with an EMPLOYE or admin")
            
            // Get employe's email & password
            try {
                const response = await connexionCompte.getInfoCompteEmploye(state.userInfo.nas);
                console.log("Compte employee information!");
                console.log(response.data);
                setCompteInfo({email: response.data.email, password: response.data.password});
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log("type is null. Error");
        }
        
    }

    const [formDataError,setFormDataError] = useState([]);
    const [enablePassword, setEnablePassword] = useState(false);
    const [isShow, setIsShown] = useState(false);
    const [disableProfil, setDisableProfil] = useState(true);

    const handleInputChange = (event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name == "numero"){
            // This desactivates all keyboards buttons axcept numbers
            const newValue = event.target.value.replace(/\D/, '');
            setFormData({ ...formData, [name]: newValue });
        } else if (name == "nas" || name == "codePostal") {
            const newValue = event.target.value.replace(/ /g, '');
            setFormData({ ...formData, [name]: newValue });
        }
        else if (name == "prenom" || name == "nomFamille") {
            const newValue = event.target.value.replace(/\d/, '');
            setFormData({ ...formData, [name]: newValue });
        } else if (name == "password") {
            // make sure the mot de passe confirmee box is visible
            setEnablePassword(true);
            setFormData({ ...formData, [name]: value });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    }


    const hideNAS = () => {
        setIsShown(false);
    }

    const showNAS = () => {
        setIsShown(true);
    }

    const isProfilDisabled = () => {
        setDisableProfil(false);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (formData.password == compteInfo.password) {
            
            // mot de passe n'a pas changee, alors on confirme le password
            formData.passwordConfirme = formData.password;
            setFormData({ ...formData, ["passwordConfirme"]: formData.password });
        }

        // Validate inputs
        const validationResult = ValidateFcts.validateAllModifProfile(formData);

        // Set error state
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
            console.log("modified fields in the user profile are ready to be submitted to backend");
            console.log(formData);

            // sending to the backend to insert the changes in database
            try {
                if (state.isClientUser) {
                    // Client
                    connexionCompte.updateClientProfile(formData).then(() => {
                        connexionCompte.updateClientCompte(formData).then(() => {
                            console.log("reussi!")
                            
                            // Retourne a la derniere page dans l'historique
                            window.history.back();
                        })
                    })
                } else {
                    // Employe
                    connexionCompte.updateEmployeProfile(formData, state.isClientUser).then(() => {
                        connexionCompte.updateEmployeCompte(formData).then(() => {
                            console.log("reussi!")
                            
                            // Retourne a la derniere page dans l'historique
                            window.history.back();
                        })
                    })
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const navigateBack = () => {
        window.history.back();
    }

    return (
        <>
            <AppHeader/>
            <div className="text-center">
                <h1 className="mx-4 my-4">Profil</h1>                    
            </div>

            <form noValidate onSubmit={handleSubmit} className="align-middle mx-5 my-2 mx-auto mb-3 border p-2" id="formUserProfil" >
                {/* Bouton pour modifier le profil */}
                <div className="text-end">
                    {disableProfil ?
                    <button type="button" className="btn btn-dark" onClick={isProfilDisabled}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen me-1" viewBox="0 0 15 18">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                        </svg>
                        Modifier
                    </button> : <></>
                    }
                </div>

                <div>
                    <>
                        <div className="d-grid gap-5 d-md-flex m-3">
                            <div className="">
                                <label htmlFor="nas" className="form-label">Numéro Assurance Sociale</label>
                                <div  className="d-grid d-flex">
                                    <InputMask className="form-control border" mask='999 999 999' placeholder="XXX XXX XXX" maskChar={''} value={formData.nas} onChange={handleInputChange} type={isShow ? "text" : "password"} onBlur={hideNAS} onClick={showNAS} name="nas" disabled/>
                                    <div className="ms-2 my-auto">
                                        {!isShow ?
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={showNAS} width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                            </svg>
                                        : 
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={hideNAS} width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                                                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                                            </svg>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <div className="d-grid gap-2 d-md-flex m-3">
                            <div className="col-6">
                                <label htmlFor="prenom" className="form-label">Prénom</label>
                                <input required type="text" className="form-control border" id="prenom" name='prenom' value={formData.prenom} onChange={handleInputChange} disabled={disableProfil}/>
                                {formDataError[1] != "" ?
                                    <div style={{color:"red"}}>
                                        {formDataError[1]}
                                    </div> 
                                :<></>}
                            </div>

                            <div className="col-6">
                                <label htmlFor="nomFamille" className="form-label">Nom de famille</label>
                                <input required type="text" className="form-control border" id="nomFamille" name='nomFamille' value={formData.nomFamille} onChange={handleInputChange} disabled={disableProfil}/>
                                {formDataError[2] != "" ?
                                    <div style={{color:"red"}}>
                                        {formDataError[2]}
                                    </div> 
                                :<></>}
                            </div>
                        </div>

                        <div className="d-grid gap-2 d-md-flex m-3">
                            <div className="col-md-2">
                                <label htmlFor="numero" className="form-label">Numéro</label>
                                <input required type="text" className="form-control" id="numero" aria-describedby="numero" name='numero' value={formData.numero} onChange={handleInputChange} disabled={disableProfil}/>
                                {formDataError[3] != "" ?
                                    <div style={{color:"red"}}>
                                        {formDataError[3]}
                                    </div> 
                                :<></>}
                            </div>

                            <div className="col-6">
                                <label htmlFor="NomRue" className="form-label">Rue</label>
                                <input required type="text" className="form-control border" id="NomRue" name='rue' value={formData.rue} onChange={handleInputChange} disabled={disableProfil}/>
                                {formDataError[4] != "" ?
                                    <div style={{color:"red"}}>
                                        {formDataError[4]}
                                    </div> 
                                :<></>}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="ville" className="form-label">Ville</label>
                                <input required type="text" className="form-control" id="ville" aria-describedby="ville" name='ville' value={formData.ville} onChange={handleInputChange} disabled={disableProfil}/>
                                {formDataError[5] != "" ?
                                    <div style={{color:"red"}}>
                                        {formDataError[5]}
                                    </div> 
                                :<></>}
                            </div>
                        </div>

                        <div className="d-grid gap-2 d-md-flex m-3">
                            <div className="col-md-2">
                                <label htmlFor="province" className="form-label">Province</label>
                                <InputMask className="form-control border" mask={'LL'} formatChars={{'L':'[A-Z]'}} maskChar={''} value={formData.province} onChange={handleInputChange} name="province" disabled={disableProfil}/>
                                {formDataError[6] != "" ?
                                    <div style={{color:"red"}}>
                                        {formDataError[6]}
                                    </div> 
                                :<></>}
                            </div>

                            <div>
                                <label htmlFor="pays" className="form-label">Pays</label>
                                <input required type="text" className="form-control border" id="pays" name='pays' value={formData.pays} onChange={handleInputChange} disabled={disableProfil}/>
                                {formDataError[7] != "" ?
                                    <div style={{color:"red"}}>
                                        {formDataError[7]}
                                    </div> 
                                :<></>}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="codePostal" className="form-label">Code Postal</label>
                                <InputMask className="form-control border" mask={'LDL DLD'} formatChars={{'L': '[A-Z]', 'D': '[0-9]'}} maskChar={''} value={formData.codePostal} onChange={handleInputChange} name="codePostal" disabled={disableProfil}/>
                                {formDataError[8] != "" ?
                                    <div style={{color:"red"}}>
                                        {formDataError[8]}
                                    </div> 
                                :<></>}
                            </div>
                        </div>              
                    </>
                </div>

                <div className="d-grid gap-5 d-md-flex m-3">
                    <div className="col-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control border" name="email" value={formData.email} onChange={handleInputChange} disabled={disableProfil}/>
                        {formDataError[9] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[9]}
                            </div> 
                        :<></>}
                    </div>
                </div>
                <div className="d-grid gap-5 d-md-flex m-3">
                    <div className="col-4">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control border" name="password" value={formData.password} onChange={handleInputChange} disabled={disableProfil}/>
                        {formDataError[10] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[10]}
                            </div> 
                        :<></>}
                    </div>

                    {enablePassword ? <div className="col-4">
                        <label htmlFor="passwordConfirme" className="form-label">Mot de passe confirmé</label>
                        <input type="password" className="form-control border" name="passwordConfirme" onChange={handleInputChange} value={formData.passwordConfirme}/>
                        {formDataError[11] != "" ?
                            <div style={{color:"red"}}>
                                {formDataError[11]}
                            </div> 
                        :<></>}
                    </div>
                    : <></>}
                </div>
            
                {!disableProfil 
                    ? <div className="text-center">
                        <button type="submit" className="btn btn-dark">Sauvegarder les changements</button>
                    </div>
                    : <></>
                }

                
            </form>

            <div className="text-center">
                <button type="button" className="btn btn-secondary mb-5" onClick={navigateBack}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 19 19">
                        <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>Retour</button>                   
            </div>
            
            
        </>
    )
}