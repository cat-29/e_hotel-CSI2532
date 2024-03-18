import http from "../http-common";
class ConnexionCompteService {

    async getCompteClient(params) {
        return http.get("/compte/signIn/client", {params});
    }

    async getCompteEmploye(params) {
        return http.get("/compte/signIn/employe", {params});
    }

    async getAllActiveReservationsForEmploye(idHotel) {
        return http.get(`/employe/activeReservation/${idHotel}`)
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

}

export default new ConnexionCompteService();