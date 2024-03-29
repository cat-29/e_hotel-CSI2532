import http from "../http-common";
class AdminService {
  async getAllChaineInfo() {
    return http.get("/chaine");
  }
}
export default new AdminService();
