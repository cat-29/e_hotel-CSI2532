import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import connexionCompte from "../services/connexion-compte";

export const ChambreSubiDommage = () => {
    
    const {state} = useLocation();

    const [dommages, setDommages] = useState({
        dommage: []
    });
    useEffect(() => {
        // Va chercher tout les dommages
        console.log("employe info: ");
        console.log(state.employeInfo)

        // state.employrInfo.idHotel;
        getAllDommageInfo();
        // connexionCompte.getAllDommagesSubiForIdHotel(state.employeInfo.idHotel).then((reponse) => {
        //     console.log("reponse pour all dommages subi");
        //     console.log(reponse.data);
        // }).catch((error) => {
        //     console.error(error);
        // });

    }, []);

    const getAllDommageInfo = async () => {
        try {
            const reponse = await connexionCompte.getAllDommagesSubiForIdHotel(state.employeInfo.idHotel);

            console.log("reponse pour all dommages subi");
            console.log(reponse.data);

            setDommages({
                dommage: reponse.data
            });
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            {/* Insertion d'un dommage */}
            <div className="align-middle mx-5 my-2 w-auto">
                
            </div>


            {/* Table qui affiche tout les dommages */}
            <table className="table align-middle table-bordered mx-5 my-2 w-auto">
                <thead>
                    <tr className="text-center">
                        <th className="col">#</th>
                        <th className="col-2">Chambre ayant le dommage</th>
                        <th className="col">Dommage</th>

                    </tr>
                </thead>
           
                {dommages.dommage.map((val, key) => {
                    return (
                        <tbody>
                            <tr>
                                <th className="col text-center">{key}</th>
                                <td className="col text-center">{val.numeroChambre}</td>
                                <td className="col">{val.typeDommage}</td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </>
    );
}