import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import connexionCompte from "../services/connexion-compte";
import ValidateFcts from "../ValidationFcts/container";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const AjouteDommage = () => {
    
    const {state} = useLocation();

    const navigate = useNavigate();

    const [dommages, setDommages] = useState({
        dommage: []
    });

    const [chambres, setChambres] = useState({
        numChambres: []
    });

    const [formData, setFormData] = useState({
        idHotel: state.employeInfo.idHotel,
        numeroChambre: '',
        typeDommage: '',
        explication: ''
    });
    
    const [isShow, setIsShown] = useState(false);
    const [formDataError,setFormDataError] = useState([]);


    useEffect(() => {
        // Va chercher tout les dommages
        console.log("employe info: ");
        console.log(state.employeInfo)

        getAllDommageInfo();
    }, []);

    const getAllDommageInfo = async () => {
        try {
            const reponse = await connexionCompte.getAllDommagesTypes();

            console.log("reponse pour all dommages subi");
            console.log(reponse.data);

            setDommages({
                dommage: reponse.data
            });

            console.log("testons: " + reponse.data[0]);
            formData.typeDommage = reponse.data[0];
            setFormData({...formData, ["typeDommage"]:reponse.data[0]})

        } catch (error) {
            console.error(error);
        }

        try {
            const reponse = await connexionCompte.getAllChambresForIdHotel(state.employeInfo.idHotel);
            
            console.log("reponse pour all chambres de l'hotel");
            console.log(reponse.data);

            setChambres({
                numChambres: reponse.data
            });
            
            setFormData({...formData, ["numeroChambre"]:reponse.data[0].numeroChambre})
            
        } catch (error) {
            console.error(error);
        }
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name == "numeroChambre") {
            setFormData({ ...formData, [name]: value });
        } else if (name == "typeDommage") {
            if (value == "Autre") {
                setIsShown(true);
                setFormData({ ...formData, [name]: "" });
            } else {

                setFormData({ ...formData, [name]: value });
                setIsShown(false);
            }
        } 
        else if (name == "explication") {
            const newValue = event.target.value.replace(/[^A-Za-z]+/g, '');
            setFormData({ ...formData, [name]: newValue });

        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("demande de submit");
        console.log(formData);
        const validationResult = ValidateFcts.validateDommage(formData);

        setFormDataError(validationResult);

        // flag used to track whether we submit to backend or we wait for user to fix its errors
        let flag = false;

        for (let i = 0;i<validationResult.length;i++){
            if (validationResult[i] != ""){
                flag = true;
            }
        }

        if (flag == true){
            console.log("there are still errors to fix");
        } else{
            console.log("fields are ready to be submitted to backend");

            if (formData.typeDommage == "" && formData.explication != "") {
                console.log("on fait le switch du type de dommage");
                formData.typeDommage = formData.explication;
                setFormData({...formData, ["typeDommage"]:formData.explication});
            }

            try {
                connexionCompte.enregistreDommage(formData).then(() => {
                    connexionCompte.enregistreSubiDommage(formData).then(() => {
                        navigateBackToDommagesSubi();
                    });
                });
            } catch(error) {
                console.error(error);
            }
        }
    }

    const navigateBackToDommagesSubi = () => {
        navigate("/dommagesSubi", {state: {employeInfo: state.employeInfo}});
    }

    const showTextInputForTypeDommage = () => {
        console.log("is true");
        setIsShown(true);
    }

    const hideTextInputForTypeDommage = () => {
        console.log("is false");
        setIsShown(false);
    }

    
    return (
        <>
            <AppHeader info={state.employeInfo} isUserTypeClient={false}/>
            <div className="titre text-center">
                <h1 className="mx-4 my-4">Ajouter un dommage</h1>                    
            </div>
            <div className="align-middle mx-5 my-2 mx-auto" style={{height: '240px', maxWidth: '900px'}}>
                <form noValidate className="mx-5 border h-100" onSubmit={handleSubmit}>
                    <div className=""> 
                        <div className="d-grid gap-2 d-md-flex justify-content-between m-3">
                            <div>
                                <label htmlFor="numeroChambre" className="form-label me-2">Numéro de chambre</label>
                                <select name="numeroChambre" id="numeroChambre" className="border dropdown" onClick={handleInputChange}>
                                    {chambres.numChambres.map((val, key) => {
                                        return (
                                            <option key={key} value={val.numeroChambre}>{val.numeroChambre}</option>
                                        )
                                    })}
                                </select>
                                {formDataError[1] != "" ?
                                <div style={{color:"red"}}>
                                        {formDataError[0]}
                                    </div> 
                                :<></>}
                            </div>

                            <div>
                                <label htmlFor="typeDommage" className="form-label me-2">Nouveau type de dommage</label>
                                <select name="typeDommage" id="typeDommage" className="border dropdown" onClick={handleInputChange}>
                                    {dommages.dommage.map((val, key) => {
                                        return (
                                            <option key={key} value={val} onSelect={hideTextInputForTypeDommage}>{val}</option>
                                        )
                                    })}
                                    <option key={dommages.dommage.length} value={"Autre"} onSelect={showTextInputForTypeDommage}>Autre</option>
                                </select>
                                {formDataError[1] != "" ?
                                    <div style={{color:"red"}}>
                                        {formDataError[1]}
                                    </div> 
                                :<></>}
                            </div>
                        </div>
                    </div>

                    

                    <div className="d-grid gap-2 d-md-flex m-3">
                        {isShow ? 
                        <>
                            <div className="col-5">
                                <label htmlFor="explication" className="form-label">Type de dommage</label>
                                <input type="text" className="form-control border" name="explication" value={formData.explication} onChange={handleInputChange}/>
                                {formDataError[2] != "" ?
                                <div style={{color:"red"}}>
                                    {formDataError[2]}
                                </div> 
                            :<></>}
                            </div>
                        </>
                        : <></>
                        }
                    </div>
                    
                    <div className="text-center">
                        <button type="submit" onClick={handleSubmit} className="btn btn-secondary my-2">Ajouter</button>

                    </div>
                </form>
            </div>
        </>
    );
}