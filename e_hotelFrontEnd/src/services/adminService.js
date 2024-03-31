import http from "../http-common";
class AdminService {
  async getAllChaineInfo() {
    return http.get("/chaine");
  }
  async getHotelsFromChaine(nomChaine) {
    return http.get(`/chaine/hotels/${nomChaine}`);
  }
  async getChambresFromHotel(id) {
    return http.get(`/chaine/hotels/chambres/${id}`);
  }
}
export default new AdminService();
