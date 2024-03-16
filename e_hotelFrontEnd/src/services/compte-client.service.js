import http from "../http-common";

class CompteClientService {

    async getCompte(params) {
        return http.get("/signIn/compteclient", {params});
    }
}

export default new CompteClientService();