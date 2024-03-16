// This file will contain all our backend call functions; whenever a component need to talk to backend,
// please use the functions here or use an existing one. That way we can easily debug errors by having them all 
// in one central place

const fcts = {};

const sendCredentials = async(answer)=>{
    console.log("once in the api");
    console.log(answer);
    // try {
        //     const response = await axios.post('http://localhost:8080/comptes', { name: itemName });
        //     console.log('Item created:', response.data);
        //     // Optionally, update UI or show a success message
        //   } catch (error) {
        //     console.error('Error creating item:', error);
        //     // Optionally, handle error and show an error message
        //   }

    // This one is working
    // const response = await fetch('http://localhost:8080/addAccount',{method:"POST",headers:{'Accept':'application/json','Content-Type':'application/json'},
    //     body:JSON.stringify(answer),
    // });
    // return response;

}

const createAccount = async(answer)=>{


    // This one is working
    // const response = await fetch('http://localhost:8080/addAccount',{method:"POST",headers:{'Accept':'application/json','Content-Type':'application/json'},
    //     body:JSON.stringify(answer),
    // });
    // return response;



}


// Keys and values of the fcts object

fcts.submitCredentials = (answer)=>{
   const  response = sendCredentials(answer);
   return response;
} 

fcts.createAccount = (answer)=>{
    const answerN = {...answer};
    delete answerN["pwdConfirmed"];
    // const response = createAccount(answer);
    console.log("once in the api, the answer is",answerN);
    console.log("old",answer);
    // return response;
}

export default fcts;