import React,{useEffect, useState} from 'react';
import compteClientService from '../services/compte-client.service';
import { PageReservation } from './PageReservation';
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
        
    const handleSubmit = async(event)=>{
        event.preventDefault();
        const answer = formData;
        const client = retourClient;
        console.log("Alo houston",answer);

        compteClientService.getCompte(answer).then((response) => {
            setRetourClient({
                client: response.data
            });            
        }).catch(e => {
            console.log(e);
        });       


    }

    const handleInputChange = (event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        // let item = {...this.state.item};
        // item[name] = value;
        // this.setState({item});
        // console.log("target",target);
        // console.log("name",name);
        // console.log("value",value);
        setFormData({ ...formData, [name]: value });
        // console.log("formData",formData);

    }
    return(
        <>
        {console.log(appelPageReservation)}
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
                        <input type="motDePasse" className="form-control border" id="motDePasse" name='motDePasse' value={formData.motDePasse} onChange={handleInputChange}/>
                    </div>

                    <div className="d-grid gap-2 d-md-flex m-3">
                        <button type="submit" className='btn btn-primary'>Connecter</button>
                        <button className='btn btn-secondary'>Créer un compte</button>
                    </div>

                </form>
            </>
            }
        </>  
    )
}