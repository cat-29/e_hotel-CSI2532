// This file will contain all our backend call functions; whenever a component need to talk to backend,
// please use the functions here or use an existing one. That way we can easily debug errors by having them all 
// in one central place
import axios from "axios";

const fcts = {};

const sendCredentials = async(answer)=>{
    console.log("once in the api");
    console.log(answer);
    // try {
        //     const response = await axios.post('http://localhost:8080/comptes', { name: itemName });
        //     console.log('Item created:', response.data);
        //     // Optionally, update UI or show a success message
        //   } catch (error) {
        //     console.error('Error creating item:', error);
        //     // Optionally, handle error and show an error message
        //   }

    // This one is working
    // const response = await fetch('http://localhost:8080/addAccount',{method:"POST",headers:{'Accept':'application/json','Content-Type':'application/json'},
    //     body:JSON.stringify(answer),
    // });
    // return response;

}

const createAccount = async(answerClient,answerAccount)=>{


    // This one is working
    // const response = await fetch('http://localhost:8080/addAccount',{method:"POST",headers:{'Accept':'application/json','Content-Type':'application/json'},
    //     body:JSON.stringify(answer),
    // });
    // return response;

    // Axios seems nicer
    // Further formating is needed (I will need two objects one for client and second for clientAccount) so two post requests
    let compteResponse = null;
    const response = axios.post("http://localhost:8080/addClient", answerClient).then((response) => {
    //   console.log(response.status, response.data.token);
    // console.log("response status",response.status);
    // console.log("response data",response.data.token);
    if (response.status == 200){
        compteResponse = axios.post("http://localhost:8080/addClientAccount",answerAccount).then((response)=>{
            console.log("response status",response.status);
            console.log("client account added successfully");
        })
    } else {
        console.log("Was unable to add client");
    }

    });

    return compteResponse;



}


// Keys and values of the fcts object

fcts.submitCredentials = (answer)=>{
   const  response = sendCredentials(answer);
   return response;
} 

fcts.createAccount = (answer)=>{
    // We just want to submit all fields except passwordConfirmed one since it's going to be a duplicate of what we already have in pwdfield
    const answerN = {...answer};
    delete answerN["pwdConfirmed"];
    // More formating
    const client = {};
    client.nas = answerN.nas;
    client.prenom = answerN.prenom;
    client.nomFamille = answerN.nomFamille;
    client.numero = answerN.numero;
    client.rue = answerN.rue;
    client.ville = answerN.ville;
    client.province = answerN.province;
    client.pays = answerN.pays;
    client.codePostal = answerN.codePostal;

    const compte = {};
    compte.nas = answerN.nas;
    compte.email = answerN.email;
    compte.pwd = answerN.pwd;

    // console.log("before sending to backend",client);
    const response = createAccount(client,compte);
    return response;
}

export default fcts;