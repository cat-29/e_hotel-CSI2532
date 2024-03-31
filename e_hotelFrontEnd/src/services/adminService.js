import http from "../http-common";
class AdminService {
  async getAllChaineInfo() {
    return http.get("/chaine");
  }
  async getHotelsFromChaine(nomChaine) {
    return http.get(`/chaine/hotels/${nomChaine}`);
  }
}
export default new AdminService();
