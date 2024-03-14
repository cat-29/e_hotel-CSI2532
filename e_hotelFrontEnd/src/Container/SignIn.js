import React,{useState} from 'react';



export const SignIn=()=>{

    // State to store form data
    const [formData, setFormData] = useState({
        email: '',
        motDePasse: ''
    });

    const handleSubmit = async(event)=>{
        event.preventDefault();
        const answer = formData;
        console.log("Alo houston",answer);
        // try {
        //     const response = await axios.post('http://localhost:8080/comptes', { name: itemName });
        //     console.log('Item created:', response.data);
        //     // Optionally, update UI or show a success message
        //   } catch (error) {
        //     console.error('Error creating item:', error);
        //     // Optionally, handle error and show an error message
        //   }
        // const response = await fetch('http://localhost:8080/comptes',{method:"POST",headers:{'Accept':'application/json','Content-Type':'application/json'},
        // body:JSON.stringify(answer),
        // });
        // return response.json();
        setFormData({email:'',motDePasse:''});
    }

    const handleInputChange = (event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        // let item = {...this.state.item};
        // item[name] = value;
        // this.setState({item});
        // console.log("target",target);
        // console.log("name",name);
        // console.log("value",value);
        setFormData({ ...formData, [name]: value });
        // console.log("formData",formData);

    }
    return(
        <>
            <h2 className="text-center p-3">Veuillez vous connecter</h2>
            <form onSubmit={handleSubmit}>
                <div className="m-3 w-50">
                    <label htmlFor="emailUtilisateur" className="form-label">Email</label>
                    <input type="email" className="form-control" id="emailUtilisateur" aria-describedby="email" name='email' value={formData.username} onChange={handleInputChange}/>
                </div>

                <div className="m-3 w-50">
                    <label htmlFor="motDePasse" className="form-label">Mot de passse</label>
                    <input type="password" className="form-control border" id="motDePasse" name='motDePasse' value={formData.password} onChange={handleInputChange}/>
                </div>

                <div className="d-grid gap-2 d-md-flex m-3">
                    <button type="submit" className='btn btn-primary'>Connecter</button>
                    <button className='btn btn-secondary'>Créer un compte</button>
                </div>

            </form>
        </>  
    )
}