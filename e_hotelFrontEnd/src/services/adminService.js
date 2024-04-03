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

  async saveHotel(newHotel) {
    await fetch("http://localhost:8080/chaine/ajoutHotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHotel),
    }).catch((e) => {
      console.log("LOLOL");
    });
  }

  async saveChambre(info) {
    const infoN = { ...info };
    // Formate
    const chambreInfo = {};
    chambreInfo.numeroChambre = infoN.numero_chambre;
    chambreInfo.idHotel = infoN.id_hotel;
    chambreInfo.prix = infoN.prix;
    chambreInfo.capaciteChambre = infoN.capacite_chambre;
    chambreInfo.vueChambre = infoN.vue_chambre;
    chambreInfo.capaciteAEtendre = infoN.capacite_a_etendre;

    await fetch("http://localhost:8080/chaine/ajoutChambre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chambreInfo),
    }).catch((e) => {
      console.log("LOLOL");
    });
  }

  async saveEmploye(newEmploye) {
    await fetch("http://localhost:8080/chaine/ajoutEmploye", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmploye),
    }).catch((e) => {
      console.log("LOLOL");
    });
  }

  async updateChaine(info) {
    const infoN = { ...info };
    // Formate
    const chaineInfo = {};
    chaineInfo.nomChaine = infoN.nomChaine;
    chaineInfo.nbrHotel = infoN.nbrHotel;
    chaineInfo.numero = infoN.numero;
    chaineInfo.rue = infoN.rue;
    chaineInfo.ville = infoN.ville;
    chaineInfo.province = infoN.province;
    chaineInfo.pays = infoN.pays;
    chaineInfo.codePostal = infoN.codePostal;

    await fetch("http://localhost:8080/chaine/updateChaine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chaineInfo),
    });
  }

  async updateHotel(info) {
    const infoN = { ...info };
    // Formate
    const hotelInfo = {};
    hotelInfo.id = infoN.id;
    hotelInfo.nomChaine = infoN.nomChaine;
    hotelInfo.nom = infoN.nom;
    hotelInfo.rating = infoN.rating;
    hotelInfo.nbrChambre = infoN.nbrChambre;
    hotelInfo.numero = infoN.numero;
    hotelInfo.rue = infoN.rue;
    hotelInfo.ville = infoN.ville;
    hotelInfo.province = infoN.province;
    hotelInfo.pays = infoN.pays;
    hotelInfo.codePostal = infoN.codePostal;

    await fetch("http://localhost:8080/chaine/updateHotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotelInfo),
    });
  }

  async updateEmploye(info) {
    const infoN = { ...info };
    // Formate
    const employeInfo = {};
    employeInfo.id = infoN.id;
    employeInfo.prenom = infoN.prenom;
    employeInfo.nomFamille = infoN.nomFamille;
    employeInfo.numero = infoN.numero;
    employeInfo.rue = infoN.rue;
    employeInfo.ville = infoN.ville;
    employeInfo.province = infoN.province;
    employeInfo.pays = infoN.pays;
    employeInfo.codePostal = infoN.codePostal;
    employeInfo.roleEmploye = infoN.roleEmploye;
    employeInfo.idHotel = infoN.idHotel;

    await fetch("http://localhost:8080/chaine/updateEmploye", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeInfo),
    });
  }

  async updateChambre(info) {
    const infoN = { ...info };
    // Formate
    const chambreInfo = {};
    chambreInfo.numeroChambre = infoN.numero_chambre;
    chambreInfo.idHotel = infoN.id_hotel;
    chambreInfo.prix = infoN.prix;
    chambreInfo.capaciteChambre = infoN.capacite_chambre;
    chambreInfo.vueChambre = infoN.vue_chambre;
    chambreInfo.capaciteAEtendre = infoN.capacite_a_etendre;

    await fetch("http://localhost:8080/chaine/updateChambre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chambreInfo),
    });
  }
}

export default new AdminService();
