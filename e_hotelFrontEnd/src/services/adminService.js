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
  async getEmployeFromHotel(id) {
    return http.get(`/chaine/hotels/employe/${id}`);
  }

  async saveChaine(newChaine) {
    await fetch("http://localhost:8080/chaine/ajoutChaine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChaine),
    }).catch((e) => {
      console.log("LOLOL");
    });
  }
}
export default new AdminService();
