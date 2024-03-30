// This file will contain all our backend call functions; whenever a component need to talk to backend,
// please use the functions here or use an existing one. That way we can easily debug errors by having them all 
// in one central place
import axios from "axios";

const fcts = {};

const createAccount = async(answerClient,answerAccount)=>{
    // Axios seems nicer
    // Further formating is needed (I will need two objects one for client and second for clientAccount) so two post requests
    let compteResponse = null;
    const response = axios.post("http://localhost:8080/client/addClient", answerClient).then((response) => {
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

const getAllRooms = async()=>{
    let rooms = null;
    try{
        const response = await axios.get("http://localhost:8080/chambre/tous");
        if (response.status == 200){
            console.log("fetching completed successfully");
            rooms = response.data;
        }else{
            console.log("Sorry, something went wrong while fetching");
        }

    }catch(error){
        console.log("Error occured",error);
    }
    return rooms;
}


const ajouterReservationDB = (data)=>{
    console.log("In api, data is: ",data);
}


const isRoomAvailable = async (data)=>{
    let res = false;
    try{
        const response = await axios.get(`http://localhost:8080/chambre/getIsRoomAvailable/${data.checkin}/${data.checkout}/${data.idHotel}/${data.numeroChambre}`);
        if (response.status == 200){
            console.log("completed successfully");
            res = response.data;
            // console.log("the res after get is",res);
        }else{
            console.log("Sorry, something went wrong.");
        }

    }catch(error){
        console.log("Error occured",error);
    }
    return res;
}






// Keys and values of the fcts object


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

fcts.getAllRooms = async ()=>{
    const rooms = await getAllRooms();
    // console.log("well here",rooms);
    return rooms;
}

fcts.ajouterReservationDB = (data)=>{
    return ajouterReservationDB(data);
}

fcts.isRoomAvailable = async(data)=>{
    const res = await isRoomAvailable(data);
    return res;
}
export default fcts;