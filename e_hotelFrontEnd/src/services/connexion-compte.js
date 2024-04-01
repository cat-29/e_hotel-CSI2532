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

    async updateEmployeProfile(info, isTypeClient) {
        const infoN = {...info};
        delete infoN["passwordConfirme"];
        // Formate
        const profileInfo = {};
        profileInfo.nas = infoN.nas;
        profileInfo.prenom = infoN.prenom;
        profileInfo.nomFamille = infoN.nomFamille;
        profileInfo.numero = infoN.numero;
        profileInfo.rue = infoN.rue;
        profileInfo.ville = infoN.ville;
        profileInfo.province = infoN.province;
        profileInfo.pays = infoN.pays;
        profileInfo.codePostal = infoN.codePostal;

        await fetch("http://localhost:8080/compte/employe/updateProfile", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileInfo)
        })        
    }

    async updateEmployeCompte(info) {

        const infoN = {...info};
        delete infoN["passwordConfirme"];

        const compte = {};
        compte.nas = infoN.nas;
        compte.email = infoN.email;
        compte.password = infoN.password;
        console.log(compte);
        await fetch("http://localhost:8080/compte/employe/updateCompte", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(compte)
        });
    }

    async updateClientProfile(info) {
        const infoN = {...info};
        delete infoN["passwordConfirme"];
        // Formate
        const profileInfo = {};
        profileInfo.nas = infoN.nas;
        profileInfo.prenom = infoN.prenom;
        profileInfo.nomFamille = infoN.nomFamille;
        profileInfo.numero = infoN.numero;
        profileInfo.rue = infoN.rue;
        profileInfo.ville = infoN.ville;
        profileInfo.province = infoN.province;
        profileInfo.pays = infoN.pays;
        profileInfo.codePostal = infoN.codePostal;

        await fetch("http://localhost:8080/compte/client/updateProfile", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileInfo)
        })        
    }

    async updateClientCompte(info) {

        const infoN = {...info};
        delete infoN["passwordConfirme"];

        const compte = {};
        compte.nas = infoN.nas;
        compte.email = infoN.email;
        compte.password = infoN.password;

        await fetch("http://localhost:8080/compte/client/updateCompte", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(compte)
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

    async enregistreDommage(dommage) {
        await fetch("http://localhost:8080/chambre/addDommage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dommage)
        })
    }

    async enregistreSubiDommage(dommage) {
        await fetch("http://localhost:8080/chambre/addSubiDommage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dommage)
        })
    }

    async getAllNomChaines() {
        return http.get("/chaine/nom");
    }


    async getChambresFromNombreDeChambres(chambreMin, chambreMax) {

        console.log("value of chambre min = " + chambreMin + ", chambreMax = " + chambreMax);
        if (chambreMin == '' && chambreMax == '') {
            
            // returne toutes les chambres
            console.log("il n'y a pas de chambres min et chambres max de selectionnees. Retourne tout les hotels")
            return await this.getAllRooms();
        } 
        else if (chambreMin == '') {
            // trouve juste les chambres qui satisfont la borne chambreMax
            console.log("il n'y a pas de classements chambreMin de selectionnee. Retourne tout les hotels qui respectent chambreMax")
            return http.get(`/chambre/getAllRooms/nbrChambreMax/${chambreMax}`)
        } 
        else if (chambreMax == '') {
            // trouve juste les chambres qui satisfont la borne chambreMin
            console.log("il n'y a pas de classements chambreMax de selectionnee. Retourne tout les hotels qui respectent chambreMin")
            return http.get(`/chambre/getAllRooms/nbrChambreMin/${chambreMin}`)
        }

        // Dernier cas... retourne toutes les chambres qui satisfont aux deux bornes
        return http.get(`/chambre/getAllRooms/${chambreMin}/${chambreMax}`);
    }


    async getAllChambresFromClassement(classement) {
        const params = new URLSearchParams();

        if (classement.length == 0) {
            console.log("il n'y a pas de classements selectionnees. Retourne tout les hotels")
            return await this.getAllRooms();
        }
        classement.forEach((item, idx) => {
            params.append(`rating`, item);
        });
        return http.get("/chambre/getAllRooms/rating?" + params.toString());
    }


    async getAllRooms() {
        // Retourne toutes les chambres
        return http.get("/chambre/getAllRooms"); 
    }


    async getAllChambresFromChaineHoteliere(arrayChaine) {
        const params = new URLSearchParams();

        if (arrayChaine.length == 0) {
            console.log("il n'y a pas de chaines selectionnees. Retourne tout les hotels")
            return await this.getAllRooms();
        }
        arrayChaine.forEach((item, idx) => {
            params.append(`chaines`, item);
        });
        
        return http.get("/chambre/getAllRooms/chaine?" + params.toString());
    }


    async getAllDommagesSubiForIdHotel(idHotel) {
        return http.get(`/chambre/${idHotel}/getAllRooms/dommages`);
    }

    async getAllDommagesTypes() {
        return http.get("/chambre/getAllRooms/dommageType");
    }

    async getAllChambresForIdHotel(idHotel) {
        return http.get(`/chambre/${idHotel}/getAllRooms`);
    }

    async getInfoCompteClient(nas) {
        return http.get(`/compte/compteClientInfo/${nas}`);
    }

    async getInfoCompteEmploye(nas) {
        return http.get(`/compte/compteEmployeInfo/${nas}`);
    }

    async getInfoEmploye(nas) {
        return http.get(`/compte/employeInfo/${nas}`);
    }

    async getInfoClient(nas) {
        return http.get(`/compte/clientInfo/${nas}`);
    }
}

export default new ConnexionCompteService();