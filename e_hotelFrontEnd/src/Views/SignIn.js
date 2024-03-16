import React,{useEffect, useState} from 'react';
import ConnexionCompte from '../services/connexion-compte';
import { PageReservation } from './PageReservation';
import fcts from '../ApiFcts/Api';
import ValidateFcts from '../ValidationFcts/container';
import { useNavigate } from 'react-router-dom';



export const SignIn=()=>{

    // State to store form data
    const [formData, setFormData] = useState({
        email: '',
        motDePasse: ''
    });

    const [retourClient, setRetourClient] = useState({
        client:[],
    });

    const [appelPageReservation, setPageReservation] = useState(false);
    
    useEffect(() => {
        console.log("Bonjour: " + retourClient.client.prenom + ", " + retourClient.client.nomFamille);
        console.log(retourClient);
        if (retourClient.client.prenom != undefined){ 
            setPageReservation(true);
        };
    },[retourClient]);

    const navigate = useNavigate();

        
    const handleSubmit = async(event)=>{
        event.preventDefault();
        const answer = formData;
        const client = retourClient;
        console.log("Alo houston",answer);

        ConnexionCompte.getCompteClient(answer).then((response) => {
            setRetourClient({
                client: response.data
            });            
        }).catch(e => {
            console.log(e);
        });   
    }    

    // this functions calls the api.js that calls the java endpoint.
    const handleSubmitOld = async(event)=>{
        event.preventDefault();
        const answer = formData;
        console.log("answer is",answer);  
        ValidateFcts.validateEmailPwd(answer.email,answer.motDePasse); 
        const response = fcts.submitCredentials(answer); 
        setFormData({email:'',motDePasse:''});
        // console.log("the reponse was",response);
        // response.then((answer) => {
        //     console.log(`Received response: ${answer.status}`);
        //     setFormData({email:'',motDePasse:''});
        // });    
    }

    const handleInputChange = (event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        // console.log("target",target);
        // console.log("name",name);
        // console.log("value",value);
        setFormData({ ...formData, [name]: value });
        // console.log("formData",formData);
    }

    const goToCreateAccountForm = ()=>{
        navigate("/createAccount");
    }
    return(
        <>
            {/* {console.log(appelPageReservation)} */}
                {appelPageReservation ? <PageReservation userInfo = {retourClient.client}/> :
                <>
                    <h2 className="text-center p-3">Veuillez vous connecter</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="m-3 w-50">
                            <label htmlFor="emailUtilisateur" className="form-label">Email</label>
                            <input type="email" className="form-control" id="emailUtilisateur" aria-describedby="email" name='email' value={formData.email} onChange={handleInputChange}/>
                        </div>

                        <div className="m-3 w-50">
                            <label htmlFor="motDePasse" className="form-label">Mot de passse</label>
                            <input type="password" className="form-control border" id="motDePasse" name='motDePasse' value={formData.motDePasse} onChange={handleInputChange}/>
                        </div>

                        
                        <div className="d-grid gap-2 d-md-flex m-3">
                            <button type="submit" className='btn btn-primary'>Connecter</button>
                            <button type='button' onClick={goToCreateAccountForm} className='btn btn-secondary'>Créer un compte</button>
                        </div>

                    </form>
                </>
                }
        </>  
    )
}