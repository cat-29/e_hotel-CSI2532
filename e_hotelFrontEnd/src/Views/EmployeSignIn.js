import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import connexionCompte from "../services/connexion-compte";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const EmployeSignIn=()=>{

    // State to store form data
    const [employe, setEmploye] = useState({
        email: '',
        motDePasse: ''
    });

    const [getEmployeInfo, setEmployeInfo] = useState({
        employe:[],
    });

    
    useEffect(() => {
        console.log("Bonjour: " + getEmployeInfo.employe.prenom + ", " + getEmployeInfo.employe.nomFamille);
        console.log(getEmployeInfo);
        if (getEmployeInfo.employe.prenom != undefined){ 
            console.log("votre type d'employe est un ", getEmployeInfo.employe.roleEmploye);
            if (getEmployeInfo.employe.roleEmploye=='EMPLOYE' || getEmployeInfo.employe.roleEmploye=='SUPERVISEUR') {
                navigate("/historiqueReservation", {state: {employeInfo: getEmployeInfo.employe}});
            } else if (getEmployeInfo.employe.roleEmploye=='GESTIONNAIRE') {
                navigate("/managementHotel", {state: {employeInfo: getEmployeInfo.employe}});
            }
        };
    },[getEmployeInfo]);

    const navigate = useNavigate();

    const [formDataError,setFormDataError] = useState('');

    const handleSubmit = async(event)=>{
        event.preventDefault();
        const answer = employe;
        console.log("Alo houston",answer);

        try {
            const reponse = await connexionCompte.getCompteEmploye(answer); 
            setEmployeInfo({
                employe: reponse.data
            });    
            setFormDataError('');
        }catch (error) {
            setFormDataError('Les données entrées sont incorrect.');
            console.error(error);
        }
    }    

    const handleInputChange = (event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setEmploye({ ...employe, [name]: value });
    }

    return(
        <>
            <AppHeader/>
            <>
                <h2 className="text-center p-3">Veuillez vous connecter</h2>
                <form onSubmit={handleSubmit}>
                    <div className="m-3 w-50">
                        <label htmlFor="emailUtilisateur" className="form-label">Email</label>
                        <input type="email" className="form-control" id="emailUtilisateur" aria-describedby="email" name='email' value={employe.email} onChange={handleInputChange}/>
                    </div>

                    <div className="m-3 w-50">
                        <label htmlFor="motDePasse" className="form-label">Mot de passse</label>
                        <input type="password" className="form-control border" id="motDePasse" name='motDePasse' value={employe.motDePasse} onChange={handleInputChange}/>
                        {formDataError != "" ?
                            <div style={{color:"red"}}>
                                {formDataError}
                            </div> 
                        :<></>}
                    </div>

                    
                    <div className="d-grid gap-2 d-md-flex m-3">
                        <button type="submit" className='btn btn-primary'>Connecter</button>
                    </div>

                </form>
            </>
        </>  
    )
}