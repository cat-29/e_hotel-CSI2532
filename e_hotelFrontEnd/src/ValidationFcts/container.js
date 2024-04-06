// Similar to ApiFcts, container.js will be where we do all our validation from a client side perspective.
// either use those fcts or create your own, you should import  functions objects to your page so you can use it.

import fcts from "../ApiFcts/Api";
import connexionCompte from "../services/connexion-compte";

const ValidateFcts = {};

// Sign In section Validation

const validateEmailPwd = (email, pwd) => {
  console.log("validating data input");
  console.log(email, pwd);
};

// Create account section validation

// Function to validate Nas
const validateNas = (nas, res) => {
  // console.log("the nas is",nas);
  let feedback = "";
  if (nas.length != 9) {
    feedback = "La taille d'un nas est de 9 chiffres exactement.";
  }
  res.push(feedback);
  return res;
};

// Function to validate family name, first name

const validateNom = (nom, res) => {
  let feedback = "";

  if (nom.length <= 1) {
    feedback = "La taille du nom/prénom doit être supérieur à 1.";
  }
  res.push(feedback);
  return res;
};

// Function to validateNum

const validateNumero = (numero, res) => {
  let feedback = "";
  let regexp = /^[0-9]+$/;
  if (regexp.test(numero) == false) {
    feedback = "Le numéro ne doit avoir que des chiffres";
  }
  res.push(feedback);
  return res;
};

const validateTypeDommage = (type, explication, res) => {
  let feedback = "";
  if (type.value == "Autre") {
    console.log("autre a valider..");

    if (explication == "") {
      feedback = "Veuillez entrer un type de dommage";
    } else if (explication.length <= 2) {
      feedback = "La taille du type doit être plus que 2 charactères";
    }
  }
  res.push(feedback);
  return res;
};

const validateExplication = (explication, type, res) => {
  let feedback = "";
  if (type == "") {
    console.log("autre a valider..");

    if (explication == "") {
      feedback = "Veuillez entrer un type de dommage";
    } else if (explication.length <= 2) {
      feedback = "La taille du type doit être plus que 2 charactères";
    }
  }
  res.push(feedback);
  return res;
};

// Function to validate Place: Street,city,province,country

const validatePlace = (place, res) => {
  let feedback = "";
  if (place.length <= 2) {
    feedback = "La taille doit être plus que 2 charactères";
  }
  res.push(feedback);
  return res;
};

const validateProvince = (province, res) => {
  let feedback = "";
  if (province.length != 2) {
    feedback = "Le code provincial est exactement 2 charactères";
  }
  res.push(feedback);
  return res;
};

//Function to validate ZipCode

const validateZip = (zip, res) => {
  let feedback = "";
  let regexp = /^[A-Za-z0-9]+$/;
  if (regexp.test(zip) == false) {
    feedback = "Le code postal ne doit avoir que des lettres ou des chiffres";
  }
  res.push(feedback);
  return res;
};

// Function to validate email

const validateEmail = (email, res) => {
  let feedback = "";
  let regexp = /^[A-Za-z0-9]+(\.)?[A-Za-z0-9]*@[A-Za-z0-9]+(\.)[A-Za-z]+$/;
  if (regexp.test(email) == false) {
    feedback = "Veuillez entrer une addresse email valide";
  }
  res.push(feedback);
  return res;
};

// Validate Same password

const validateSamePwd = (arrPwd, res) => {
  let feedback = "";
  if (arrPwd[0].length < 8 || arrPwd[1].length > 20) {
    feedback = "La taille du mot de passe doit être entre 8 et 20";
  } else if (arrPwd[0] != arrPwd[1]) {
    feedback = "Les deux mots de passe ne sont pas pareils";
  }
  res.push(feedback);
  res.push(feedback);
  return res;
};

const validateCardNumber = (cardNum, res) => {
  let feedback = "";
  if (cardNum.length < 16) {
    feedback = "Numero de carte incorrect. La taille doit être de 16";
  }
  res.push(feedback);
  return res;
};

const validateDateExpiration = (dateExpiration, res) => {
  let feedback = "";
  if (dateExpiration.length < 4) {
    feedback = "Date d'expiration incorrecte. La taille doit être de 4";
  }
  res.push(feedback);
  return res;
};

const validateCVC = (cvc, res) => {
  let feedback = "";
  if (cvc.length < 3) {
    feedback = "Code de sécurité incorrect. La taille doit être 3";
  }
  res.push(feedback);
  return res;
};

//Function to validate Price

const validatePrice = (price, res) => {
  let feedback = "";
  let regexp = /^[0-9]+$/;
  if (regexp.test(price) == false) {
    feedback = "Le numéro ne doit avoir que des chiffres";
  }
  res.push(feedback);
  return res;
};

// Validate all fields

const validatePaiementFields = (answer) => {
  let res = [];
  let items = [];
  for (let key in answer) {
    // items.push(answer[key]);
    if (key == "prenom") {
      res = validateNom(answer[key], res);
    } else if (key == "numCarte") {
      res = validateCardNumber(answer[key], res);
    } else if (key == "dateExpiration") {
      res = validateDateExpiration(answer[key], res);
    } else if (key == "cvc") {
      res = validateCVC(answer[key], res);
    }
  }
  // console.log("at the end",items);
  return res;
};

const validateDateCheckIn = (dateCheckin, res) => {
  let feedback = "";
  if (dateCheckin == "") {
    feedback = "Veuillez entrer une date de Check-In";
  }
  res.push(feedback);
  return res;
};

const validateDateCheckOut = (dateCheckout, dateCheckIn, res) => {
  console.log(
    "lets validate the date checkout and date checkin:",
    dateCheckout,
    dateCheckIn
  );
  let feedback = "";
  if (dateCheckout == "") {
    feedback = "Veuillez entrer une date de Check-Out";
  } else if (dateCheckIn != "" && dateCheckout < dateCheckIn) {
    feedback = "Veuillez entrer une date de Check-Out valide";
  }
  res.push(feedback);
  return res;
};

const validateNasWithNasEmploye = (nas_client, nas_employe, res) => {
  console.log(
    "lets validate the nas employe with the nas client:",
    nas_employe,
    nas_client
  );
  let feedback = "";
  if (nas_employe == nas_client) {
    feedback = "LE NAS entré n'est pas valide.";
  } else if (nas_client.length != 9) {
    feedback = "La taille d'un nas est de 9 chiffres exactement.";
  }
  res.push(feedback);
  return res;
};

const validateAllfields = (answer) => {
  console.log("the answer to be validated is", answer);
  let res = [];
  for (let key in answer) {
    if (key == "nas") {
      res = validateNas(answer[key], res);
    } else if (key == "prenom" || key == "nomFamille") {
      res = validateNom(answer[key], res);
    } else if (key == "numero") {
      res = validateNumero(answer[key], res);
    } else if (key == "rue" || key == "ville" || key == "pays") {
      res = validatePlace(answer[key], res);
    } else if (key == "province") {
      res = validateProvince(answer[key], res);
    } else if (key == "codePostal") {
      res = validateZip(answer[key], res);
    } else if (key == "email") {
      res = validateEmail(answer[key], res);
    } else if (key == "pwd") {
      res = validateSamePwd([answer[key], answer["pwdConfirmed"]], res);
    }
  }
  return res;
};

const validateAllModifProfile = (answer) => {
  console.log("the answer to be validated are", answer);
  let res = [];
  for (let key in answer) {
    if (key == "nas") {
      res = validateNas(answer[key], res);
    } else if (key == "prenom" || key == "nomFamille") {
      res = validateNom(answer[key], res);
    } else if (key == "numero") {
      res = validateNumero(answer[key], res);
    } else if (key == "rue" || key == "ville" || key == "pays") {
      res = validatePlace(answer[key], res);
    } else if (key == "province") {
      res = validateProvince(answer[key], res);
    } else if (key == "codePostal") {
      res = validateZip(answer[key], res);
    } else if (key == "email") {
      res = validateEmail(answer[key], res);
    } else if (key == "password") {
      res = validateSamePwd([answer[key], answer["passwordConfirme"]], res);
    }
  }
  return res;
};

const validateAllLocationFields = (answer) => {
  console.log("the answer to be validated is", answer);
  let res = [];
  let items = [];
  for (let key in answer) {
    if (key == "idClient") {
      res = validateNasWithNasEmploye(
        answer["idClient"],
        answer["idEmploye"],
        res
      );
      console.log("helo");
    } else if (key == "prenom" || key == "nomFamille") {
      res = validateNom(answer[key], res);
    } else if (key == "numero") {
      res = validateNumero(answer[key], res);
    } else if (key == "rue" || key == "ville" || key == "pays") {
      res = validatePlace(answer[key], res);
    } else if (key == "province") {
      res = validateProvince(answer[key], res);
    } else if (key == "codePostal") {
      res = validateZip(answer[key], res);
    } else if (key == "email") {
      res = validateEmail(answer[key], res);
    } else if (key == "dateCheckin") {
      res = validateDateCheckIn(answer[key], res);
    } else if (key == "dateCheckout") {
      res = validateDateCheckOut(answer[key], answer["dateCheckin"], res);
    }
  }
  return res;
};

const validateAllChaineFields = (answer) => {
  console.log("the answer to be validated is", answer);
  let res = [];
  let items = [];
  for (let key in answer) {
    if (key == "nomChaine") {
      res = validateNom(answer[key], res);
    } else if (key == "numero" || key == "nbrHotel") {
      res = validateNumero(answer[key], res);
    } else if (key == "rue" || key == "ville" || key == "pays") {
      res = validatePlace(answer[key], res);
    } else if (key == "province") {
      res = validateProvince(answer[key], res);
    } else if (key == "codePostal") {
      res = validateZip(answer[key], res);
    }
  }
  return res;
};

const validateAllModifChaineFields = (answer) => {
  console.log("the answer to be validated is", answer);
  let res = [];
  let items = [];
  for (let key in answer) {
    if (key == "nomChaine") {
      res = validateNom(answer[key], res);
    } else if (key == "numero" || key == "nbrHotel") {
      res = validateNumero(answer[key], res);
    } else if (key == "rue" || key == "ville" || key == "pays") {
      res = validatePlace(answer[key], res);
    } else if (key == "province") {
      res = validateProvince(answer[key], res);
    } else if (key == "codePostal") {
      res = validateZip(answer[key], res);
    }
  }
  return res;
};

const validateAllHotelFields = (answer) => {
  console.log("the answer to be validated is", answer);
  let res = [];
  let items = [];
  for (let key in answer) {
    if (key == "nomChaine" || key == "nom") {
      res = validateNom(answer[key], res);
    } else if (
      key == "numero" ||
      key == "nbrChambre" ||
      key == "id" ||
      key == "rating"
    ) {
      res = validateNumero(answer[key], res);
    } else if (key == "rue" || key == "ville" || key == "pays") {
      res = validatePlace(answer[key], res);
    } else if (key == "province") {
      res = validateProvince(answer[key], res);
    } else if (key == "codePostal") {
      res = validateZip(answer[key], res);
    }
  }
  return res;
};

const validateAllModifHotelFields = (answer) => {
  console.log("the answer to be validated is", answer);
  let res = [];
  let items = [];
  for (let key in answer) {
    if (key == "nomChaine" || key == "nom") {
      res = validateNom(answer[key], res);
    } else if (
      key == "numero" ||
      key == "nbrChambre" ||
      key == "id" ||
      key == "rating"
    ) {
      res = validateNumero(answer[key], res);
    } else if (key == "rue" || key == "ville" || key == "pays") {
      res = validatePlace(answer[key], res);
    } else if (key == "province") {
      res = validateProvince(answer[key], res);
    } else if (key == "codePostal") {
      res = validateZip(answer[key], res);
    }
  }
  return res;
};

const validateAllChambreFields = (answer) => {
  console.log("the answer to be validated is", answer);
  let res = [];
  let items = [];
  for (let key in answer) {
    if (key == "numero_chambre" || key == "id_hotel") {
      res = validateNumero(answer[key], res);
    } else if (key == "prix") {
      res = validatePrice(answer[key], res);
    }
  }
  return res;
};

const validateAllModifChambreFields = (answer) => {
  console.log("the answer to be validated is", answer);
  let res = [];
  let items = [];
  for (let key in answer) {
    if (key == "numero_chambre" || key == "id_hotel") {
      res = validateNumero(answer[key], res);
    } else if (key == "prix") {
      res = validatePrice(answer[key], res);
    }
  }
  return res;
};

const validateAllEmployeFields = (answer) => {
  console.log("the answer to be validated is", answer);
  let res = [];
  let items = [];
  for (let key in answer) {
    if (key == "prenom" || key == "nomFamille") {
      res = validateNom(answer[key], res);
    } else if (key == "numero") {
      res = validateNumero(answer[key], res);
    } else if (key == "id") {
      res = validateNas(answer[key], res);
    } else if (key == "rue" || key == "ville" || key == "pays") {
      res = validatePlace(answer[key], res);
    } else if (key == "province") {
      res = validateProvince(answer[key], res);
    } else if (key == "codePostal") {
      res = validateZip(answer[key], res);
    }
  }
  return res;
};

const validateAllModifEmployeFields = (answer) => {
  console.log("the answer to be validated is", answer);
  let res = [];
  let items = [];
  for (let key in answer) {
    if (key == "prenom" || key == "nomFamille") {
      res = validateNom(answer[key], res);
    } else if (key == "numero") {
      res = validateNumero(answer[key], res);
    } else if (key == "id") {
      res = validateNas(answer[key], res);
    } else if (key == "rue" || key == "ville" || key == "pays") {
      res = validatePlace(answer[key], res);
    } else if (key == "province") {
      res = validateProvince(answer[key], res);
    } else if (key == "codePostal") {
      res = validateZip(answer[key], res);
    }
  }
  return res;
};

const validateDommage = (answer) => {
  console.log("the answer to be validated is", answer);
  let res = [];
  for (let key in answer) {
    if (key == "numeroChambre") {
      res = validateNumero(answer[key], res);
    } else if (key == "typeDommage") {
      res = validateTypeDommage(answer[key], answer["explication"], res);
    } else if (key == "explication") {
      res = validateExplication(answer[key], answer["typeDommage"], res);
    }
  }
  return res;
};

// Validation of filters dates

const validateDates = (checkin, checkout, res, flag) => {
  // console.log("trying to validate dates",checkout);
  // flag == 0 means we are calling this from the filter section
  // flag == 1 means we are calling this from the point were we might make a reservation
  let s = "";
  if (flag == 1 && (checkin == "" || checkout == "")) {
    s = "Svp veuillez indiquer les deux dates checkin et checkout";
  } else {
    const today = new Date();
    // console.log("checkout",checkout);
    if (checkin != "" && checkout != "") {
      if (checkout <= checkin || checkout < today || checkin < today) {
        s = "Veuillez choisir des dates valides";
      }
    } else {
      if (checkin == "") {
        if (checkout != "" && checkout <= today) {
          s = "Veuillez entrer une date de checkout valide";
        }
      } else {
        // console.log("here?!");
        // console.log("checkin is",checkin);
        // console.log(checkin<=today);

        if (checkin != "" && checkin <= today) {
          // console.log("should come here");
          s = "Veuillez entrer une date de checkin valide";
        }
      }
    }
  }
  res.push(s);
  return res;
};

// Validation of prices

const validatePrices = (min, max, res, flag) => {
  // More formatting because since setState takes time, if there's a comma at the end of input, sometimes
  // it doesn't get deleted, so more checks here just in case.
  min = min.replace(/,/, "");
  max = max.replace(/,/, "");
  // console.log('min,max,flag');
  // console.log(min,max,flag);
  let s = "";

  let numMin = 0;
  let numMax = 100000000;
  if (min != "") {
    numMin = parseInt(min);
  }
  if (max != "") {
    numMax = parseInt(max);
  }
  if (numMin >= numMax) {
    if (flag == 0) {
      s = "Veuillez ajuster votre intervalle de prix";
    } else {
      s = "Veuillez ajuster votre intervalle de chambres";
    }
  }
  res.push(s);
  return res;
};

// Method to validate filters

const validateFilters = (filters) => {
  // console.log("the filters needing validation are", filters);
  let errors = [];
  let checkin = "";
  let checkout = "";
  try {
    if (filters.checkin != "") {
      checkin = new Date(filters.checkin);
    }
    if (filters.checkout != "") {
      checkout = new Date(filters.checkout);
    }
  } catch {
    console.log("A problem happened while trying to parse dates");
  }
  errors = validateDates(checkin, checkout, errors, 0);
  errors = validatePrices(filters.prixMin, filters.prixMax, errors, 0);
  errors = validatePrices(filters.chambreMin, filters.chambreMax, errors, 1);
  // 0 validation of prices
  // 1 validation of room number

  return errors;
};

// Method used to calculate number of days between two dates so that we can calculate totalPrice in reservation client

const calculateNumberOfDays = (start, end) => {
  let diffTime = end.getTime() - start.getTime();
  let diffDays = Math.round(diffTime / (1000 * 3600 * 24));
  return diffDays;
};

const getAllChambresFromChaineHoteliere = async (chaine) => {
  const res = await connexionCompte.getAllChambresFromChaineHoteliere(chaine);
  return res;
};

const getAllChambresFromClassement = async (classement) => {
  const res = await connexionCompte.getAllChambresFromClassement(classement);
  return res;
};

const getChambresFromNombreDeChambres = async (chambreMin, chambreMax) => {
  const res = await connexionCompte.getChambresFromNombreDeChambres(
    chambreMin,
    chambreMax
  );
  return res;
};

// Determining if a room is free or not
const isRoomAvailable = async (checkin, checkout, state) => {
  // console.log("in isRoom available,"+ checkin + " "+ checkout);
  // console.log("the state is",state);
  const data = {};
  const checkinN = new Date(checkin);
  const checkoutN = new Date(checkout);
  // console.log("checking new",checkinN.getTime());
  // console.log("checkout new",checkoutN.getTime())
  // data.checkin = checkinN.getTime();
  // data.checkout = checkoutN.getTime();
  data.checkin = checkinN.toISOString().slice(0, 10);
  data.checkout = checkoutN.toISOString().slice(0, 10);
  data.numeroChambre = state.numeroChambre;
  data.idHotel = state.idHotel;
  const res = await fcts.isRoomAvailable(data);
  return res;
};

// Handling Filters section here
const submitFilters = async (filters) => {
  for (let key in filters) {
    if (key == "prixMin" && filters[key] == "") {
      filters[key] = "0";
    } else if (key == "prixMax" && filters[key] == "") {
      filters[key] = "10000";
    } else if (key == "chambreMin" && filters[key] == "") {
      filters[key] = "1";
    } else if (key == "chambreMax" && filters[key] == "") {
      filters[key] = "1000";
    } else if (key == "checkin" && filters[key] == "") {
      filters[key] = "NAN";
    } else if (key == "checkout" && filters[key] == "") {
      filters[key] = "NAN";
    }
  }
  // console.log("activeFilters before sending a get request",filters);

  const rooms = await fcts.getFilteredResults(filters);
  // console.log("the rooms here are",rooms);
  return rooms;
};

ValidateFcts.submitFilters = async (filters) => {
  const res = await submitFilters(filters);
  return res;
};

ValidateFcts.validateEmailPwd = (email, pwd) => {
  validateEmailPwd(email, pwd);
};
// ValidateFcts.validateNas = (nas)=>{
//     return validateNas(nas);
// }
ValidateFcts.validateAllfields = (answer) => {
  return validateAllfields(answer);
};

ValidateFcts.validatePaiementFields = (answer) => {
  return validatePaiementFields(answer);
};

ValidateFcts.validateAllLocationFields = (answer) => {
  return validateAllLocationFields(answer);
};

ValidateFcts.validateAllChaineFields = (answer) => {
  return validateAllChaineFields(answer);
};

ValidateFcts.validateAllModifChaineFields = (answer) => {
  return validateAllModifChaineFields(answer);
};

ValidateFcts.validateAllHotelFields = (answer) => {
  return validateAllHotelFields(answer);
};

ValidateFcts.validateAllModifHotelFields = (answer) => {
  return validateAllModifHotelFields(answer);
};

ValidateFcts.validateAllChambreFields = (answer) => {
  return validateAllChambreFields(answer);
};

ValidateFcts.validateAllModifChambreFields = (answer) => {
  return validateAllModifChambreFields(answer);
};

ValidateFcts.validateAllEmployeFields = (answer) => {
  return validateAllEmployeFields(answer);
};

ValidateFcts.validateAllModifEmployeFields = (answer) => {
  return validateAllModifEmployeFields(answer);
};

ValidateFcts.validateFilters = (filters) => {
  return validateFilters(filters);
};

ValidateFcts.validateDommage = (answer) => {
  return validateDommage(answer);
};

ValidateFcts.validateDates = (checkin, checkout, res, flag) => {
  return validateDates(checkin, checkout, res, flag);
};

ValidateFcts.calculateNumberOfDays = (start, end) => {
  return calculateNumberOfDays(start, end);
};

ValidateFcts.isRoomAvailable = async (checkin, checkout, data) => {
  const res = await isRoomAvailable(checkin, checkout, data);
  return res;
};

ValidateFcts.validateAllModifProfile = (answer) => {
  return validateAllModifProfile(answer);
};

ValidateFcts.getAllChambresFromChaineHoteliere = async (chaine) => {
  const res = await getAllChambresFromChaineHoteliere(chaine);
  return res;
};

ValidateFcts.getAllChambresFromClassement = async (classement) => {
  const res = await getAllChambresFromClassement(classement);
  return res;
};

ValidateFcts.getChambresFromNombreDeChambres = async (
  chambreMin,
  chambreMax
) => {
  const res = await getChambresFromNombreDeChambres(chambreMin, chambreMax);
  return res;
};

export default ValidateFcts;
