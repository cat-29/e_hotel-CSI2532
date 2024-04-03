// This file will contain all our backend call functions; whenever a component need to talk to backend,
// please use the functions here or use an existing one. That way we can easily debug errors by having them all 
// in one central place
import axios from "axios";

const fcts = {};


const getFilteredResultsOneElement = async(filters)=>{
    for (let key in filters){
        if (key == "checkin"){
            let rooms = null;
            try{
                // console.log("before hitting the endpoint");
                const response = await axios.get(`http://localhost:8080/chambre/getAvCheckin/${filters[key]}`);
                if (response.status == 200){
                    console.log("fetching completed successfully");
                    rooms = response.data;
                    // console.log("the rooms are here",rooms)
                }else{
                    console.log("Sorry, something went wrong while fetching");
                }

            }catch(error){
                console.log("Error occured",error);
            }
            return rooms;
        }else if (key == "checkout"){
            let rooms = null;
            try{
                // console.log("before hitting the endpoint");
                const response = await axios.get(`http://localhost:8080/chambre/getAvCheckout/${filters[key]}`);
                if (response.status == 200){
                    console.log("fetching completed successfully");
                    rooms = response.data;
                    // console.log("the rooms are here",rooms)
                }else{
                    console.log("Sorry, something went wrong while fetching");
                }

            }catch(error){
                console.log("Error occured",error);
            }
            return rooms;

        }

    }

}


const getFilteredResultsTwoElementsCheckinCheckout = async(checkin,checkout)=>{
    let rooms = null;
    try{
        // console.log("before hitting the endpoint");
        const response = await axios.get(`http://localhost:8080/chambre/getAvCheckinAndCheckout/${checkin}/${checkout}`);
        if (response.status == 200){
            console.log("fetching completed successfully");
            rooms = response.data;
            // console.log("the rooms are here",rooms)
        }else{
            console.log("Sorry, something went wrong while fetching");
        }

    }catch(error){
        console.log("Error occured",error);
    }
    return rooms;

}


const getFilteredResults = async(filters)=>{
    let rooms = null;
    try{
        // console.log("before hitting the endpoint,  "+ filters);
        const response = await axios.get(`http://localhost:8080/chambre/getRoomsFilters/${filters["checkin"]}/${filters["checkout"]}/${filters["capacite"]}/${filters["vue"]}/${filters["prixMin"]}/${filters["prixMax"]}/${filters["chaine"]}/${filters["classement"]}/${filters["chambreMin"]}/${filters["chambreMax"]}/${filters["etendre"]}`);
        if (response.status == 200){
            console.log("fetching completed successfully");
            rooms = response.data;
            // console.log("the rooms are here",rooms)
        }else{
            console.log("Sorry, something went wrong while fetching");
        }
    }catch(error){
        console.log("Error occured",error);
    }
    return rooms;
}

const getAllCommoditees = async(hotelId,numero_chambre)=>{
    let comms = null;
    try{
        // console.log("before hitting the endpoint");
        const response = await axios.get(`http://localhost:8080/chambre/getAllCommoditees/${hotelId}/${numero_chambre}`);
        if (response.status == 200){
            console.log("fetching completed successfully");
            comms = response.data;
            // console.log("the rooms are here",rooms)
        }else{
            console.log("Sorry, something went wrong while fetching");
        }

    }catch(error){
        console.log("Error occured",error);
    }
    return comms;

}

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

// Cette fonction ajoute une reservation en ligne d'une chambre de la part d'un client a la base de donnees
 
const ajouterReservationDB = async(data)=>{

    // console.log("In api, data is: ",data);
    let reservationResponse = null;
    try{
        reservationResponse = axios.post("http://localhost:8080/client/addReservation", data).then((response) => {
    
        //   console.log(response.status, response.data.token);
        // console.log("response status",response.status);
        // console.log("response data",response.data.token);
        if (response.status == 200){
            // console.log("response status",response.status);
            // console.log("booking added successfully");
            console.log("response is",response);
        } else {
            console.log("Was unable to add booking");
        }
    });
    }catch(e){
        console.log("Was unable to add reservation. Error occured");
    }
    return reservationResponse;

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

const getAvailabilities = async()=>{
    let count = null;
    try{
        const response = await axios.get("http://localhost:8080/chambre/disponibiliteParZone");
        if (response.status == 200){
            console.log("fetching completed successfully");
            count = response.data;
        }else{
            console.log("Sorry, something went wrong while fetching");
        }

    }catch(error){
        console.log("Error occured",error);
    }
    return count;
}

const getCapaciteHotels = async()=>{
    let capacites = null;
    try{
        const response = await axios.get("http://localhost:8080/hotel/getCapaciteAllRooms");
        if (response.status == 200){
            console.log("fetching completed successfully");
            capacites = response.data;
        }else{
            console.log("Sorry, something went wrong while fetching");
        }

    }catch(error){
        console.log("Error occured",error);
    }
    return capacites;
}








// Keys and values of the fcts object

fcts.getAllCommoditees = async (hotelId,numero_chambre)=>{
    const comms = await getAllCommoditees(hotelId,numero_chambre);
    return comms;

}

fcts.getFilteredResults = async (filters)=>{
    const rooms = await getFilteredResults(filters);
    return rooms;

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

fcts.getAllRooms = async ()=>{
    const rooms = await getAllRooms();
    // console.log("well here",rooms);
    return rooms;
}

fcts.ajouterReservationDB = async (data)=>{
    const res = await ajouterReservationDB(data);
    return res;
}

fcts.isRoomAvailable = async(data)=>{
    const res = await isRoomAvailable(data);
    return res;
}

fcts.getAvailabilities = async()=>{
    const count = await getAvailabilities();
    return count;
}

fcts.getCapaciteHotels = async()=>{
    const capacites = await getCapaciteHotels();
    return capacites;
}
export default fcts;