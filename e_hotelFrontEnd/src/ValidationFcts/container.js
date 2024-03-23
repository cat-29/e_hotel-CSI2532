// Similar to ApiFcts, container.js will be where we do all our validation from a client side perspective. 
// either use those fcts or create your own, you should import  functions objects to your page so you can use it.

const ValidateFcts = {};

// Sign In section Validation

const validateEmailPwd = (email,pwd)=>{
    console.log("validating data input");
    console.log(email,pwd);

}

// Create account section validation

// Function to validate Nas
const validateNas = (nas,res)=>{
    // console.log("the nas is",nas);
    let feedback = "";
    if(nas.length != 9){
        feedback =  "La taille d'un nas est de 9 chiffres exactement.";
    }
    res.push(feedback);
    return res;
}

// Function to validate family name, first name

const validateNom = (nom,res)=>{
    let feedback = "";

    if (nom.length <=1){
        feedback = "La taille du nom/prénom doit être supérieur à 1.";
    }
    res.push(feedback);
    return res;
}

// Function to validateNum

const validateNumero = (numero,res)=>{
    let feedback = "";
    let regexp = /^[0-9]+$/
    if (regexp.test(numero) == false){
        feedback = "Le numéro ne doit avoir que des chiffres";
    }
    res.push(feedback);
    return res;
}

// Function to validate Place: Street,city,province,country

const validatePlace = (place,res)=>{
    let feedback = "";
    if (place.length <= 2){
        feedback = "La taille doit être plus que 2 charactères"
    }
    res.push(feedback);
    return res;
}

const validateProvince = (province,res)=>{
    let feedback = "";
    if (province.length != 2){
        feedback = "Le code provincial est exactement 2 charactères"
    }
    res.push(feedback);
    return res;
}

//Function to validate ZipCode

const validateZip = (zip,res)=>{
    let feedback = "";
    let regexp = /^[A-Za-z0-9]+$/
    if (regexp.test(zip) == false){
        feedback = "Le code postal ne doit avoir que des lettres ou des chiffres";
    }
    res.push(feedback);
    return res;
}

// Function to validate email

const validateEmail = (email,res)=>{
    let feedback = "";
    let regexp = /^[A-Za-z0-9]+(\.)?[A-Za-z0-9]*@[A-Za-z0-9]+(\.)[A-Za-z]+$/;
    if (regexp.test(email) == false){
        feedback = "Veuillez entrer une addresse email valide"
    }
    res.push(feedback);
    return res;
}

// Validate Same password

const validateSamePwd = (arrPwd,res)=>{
    let feedback = "";
    if (arrPwd[0].length < 5 || arrPwd[1].length >20){
        feedback = "La taille du mot de passe doit être entre 5 et 20"
    }
    else if (arrPwd[0]!=arrPwd[1]){
        feedback = "Les deux mots de passe ne sont pas pareils";
    }
    res.push(feedback)
    res.push(feedback);
    return res;
}

const validateCardNumber = (cardNum, res) => {
    let feedback = "";
    if (cardNum.length < 16) { 
        feedback = "Numero de carte incorrect. La taille doit être de 16"
    }
    res.push(feedback);
    return res;
}

const validateDateExpiration = (dateExpiration, res) => {
    let feedback = "";
    if (dateExpiration.length < 4) { 
        feedback = "Date d'expiration incorrecte. La taille doit être de 4"
    }
    res.push(feedback);
    return res;
}

const validateCVC = (cvc, res) => {
    let feedback = "";
    if (cvc.length < 3) { 
        feedback = "Code de sécurité incorrect. La taille doit être 3"
    }
    res.push(feedback);
    return res;
}

// Validate all fields

const validatePaiementFields = (answer) => {
    let res = [];
    let items = [];
    for (let key in answer){
        // items.push(answer[key]);
        if (key == "prenom"){
            res = validateNom(answer[key],res)
        }else if (key == "numCarte"){
            res = validateCardNumber(answer[key],res);
        }else if (key == "dateExpiration"){
            res = validateDateExpiration(answer[key],res);
        }else if (key == "cvc"){
            res = validateCVC(answer[key],res);
        }
    }
    // console.log("at the end",items);
    return res;
}

const validateDateCheckIn = (dateCheckin, res) => {
    let feedback = "";
    if (dateCheckin == '') { 
        feedback = "Veuillez entrer une date de Check-In"
    }
    res.push(feedback);
    return res;
}

const validateDateCheckOut = (dateCheckout, dateCheckIn, res) => {
    console.log("lets validate the date checkout and date checkin:", dateCheckout, dateCheckIn);
    let feedback = "";
    if (dateCheckout == '') { 
        feedback = "Veuillez entrer une date de Check-Out"
    } else if (((dateCheckIn!='') && (dateCheckout < dateCheckIn)) ) {
        feedback = "Veuillez entrer une date de Check-Out valide"
    }
    res.push(feedback);
    return res;
}

const validateAllfields = (answer) =>{
    console.log("the answer to be validated is",answer);
    let res = [];
    let items = [];
    for (let key in answer){
        // items.push(answer[key]);
        if (key == "nas"){
            res = validateNas(answer[key],res);
            console.log("helo");
        }else if (key == "prenom" || key == "nomFamille"){
            res = validateNom(answer[key],res)
        }else if (key == "numero"){
            res = validateNumero(answer[key],res);
        }else if (key == "rue" || key == "ville" || key == "pays"){
            res = validatePlace(answer[key],res);
        }else if (key == "province"){
            res = validateProvince(answer[key],res);
        }else if (key == "codePostal"){
            res = validateZip(answer[key],res);
        }else if(key == "email"){
            res = validateEmail(answer[key],res);
        }else if (key == "pwd"){
            res = validateSamePwd([answer[key],answer["pwdConfirmed"]],res);
        }
    }
    // console.log("at the end",items);
    return res;
}

const validateAllLocationFields = (answer) => {
    console.log("the answer to be validated is",answer);
    let res = [];
    let items = [];
    for (let key in answer){
        if (key == "nas"){
            res = validateNas(answer[key],res);
            console.log("helo");
        }else if (key == "prenom" || key == "nomFamille"){
            res = validateNom(answer[key],res)
        }else if (key == "numero"){
            res = validateNumero(answer[key],res);
        }else if (key == "rue" || key == "ville" || key == "pays"){
            res = validatePlace(answer[key],res);
        }else if (key == "province"){
            res = validateProvince(answer[key],res);
        }else if (key == "codePostal"){
            res = validateZip(answer[key],res);
        }else if(key == "email"){
            res = validateEmail(answer[key],res);
        }else if (key == "dateCheckIn"){
            res = validateDateCheckIn(answer[key],res);
        }else if (key == "dateCheckOut"){
            res = validateDateCheckOut(answer[key], answer["dateCheckIn"],res);
        }
    }
    return res;
}


ValidateFcts.validateEmailPwd = (email,pwd)=>{
    validateEmailPwd(email,pwd);
}
// ValidateFcts.validateNas = (nas)=>{
//     return validateNas(nas);
// }
ValidateFcts.validateAllfields = (answer)=>{
    return validateAllfields(answer);
}

ValidateFcts.validatePaiementFields = (answer) => {
    return validatePaiementFields(answer);
}

ValidateFcts.validateAllLocationFields = (answer) => {
    return validateAllLocationFields(answer);
}
export default ValidateFcts;