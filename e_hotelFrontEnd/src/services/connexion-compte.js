import http from "../http-common";
class ConnexionCompteService {

    async getCompteClient(params) {
        return http.get("/compte/signIn/client", {params});
    }

    async getCompteEmploye(params) {
        return http.get("/compte/signIn/employe", {params});
    }

    async getAllActiveReservationsForEmploye(idHotel) {
        return http.get(`/employe/activeReservation/${idHotel}`);
    }

    async getAllLocationsFromIdHotelOfEmploye(idHotel) {
        return http.get(`/employe/getAllLocations/${idHotel}`);
    }

    async saveMethodePaiementForClientLoueChambre(newLocation) {
        console.log('testons:')
        console.log(newLocation);
        await fetch("http://localhost:8080/employe/activeReservation/loueChambre", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLocation)
        });
    }

    async getNameHotelEmployeWorksFor(idHotel) {
        return http.get(`/employe/worksFor/${idHotel}`);
    }

    async getNumeroChambreForSpecifications(hotelId, dateCheckIn, dateCheckOut, capacite, vue) {        
        return http.get(`/chambre/numeroChambre/${hotelId}/${dateCheckIn}/${dateCheckOut}/${capacite}/${vue}`);
    }

    async saveLocation(newLocation) {
        await fetch("http://localhost:8080/employe/locationChambre", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLocation)
        }).catch((e) => {
            console.log("LOLOL")
        });
    }

    async doesClientExist(idClient) {
        return http.get(`/client/${idClient}`);
    }

    async createNewClient(clientInfo) {
        await fetch("http://localhost:8080/client/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientInfo)
        });
    }

    async enregistreClient(infoClient) {
        await fetch("http://localhost:8080/employe/enregistreClient", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoClient)
        });
    }
}

export default new ConnexionCompteService();