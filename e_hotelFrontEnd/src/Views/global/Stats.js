import fcts from "../../ApiFcts/Api";
import { useLoaderData } from "react-router-dom";
import { AppHeader } from "../../components/AppHeader/AppHeader";

export const loadCountAv = async()=>{
    const availabilities = await fcts.getAvailabilities();
    const capacitesHotels = await fcts.getCapaciteHotels();
    return [availabilities,capacitesHotels];    
}

export const Stats = ()=>{

    const data = useLoaderData();
    const countAv = data[0];
    const capacites = data[1]; 

    return (
        <>
            <AppHeader/>
            <div className="container-flex m-3 text-center">
                <h3 className="p-3 col-md-3 col-6 mx-auto text-center border-5 border-bottom col-md-8">Données en temps réel</h3>
                <div className="m-3 mt-5"><b>Disponibilité des chambres par zone</b></div>
                <div className="col-lg-7 container-fluid d-flex flex-row bg-secondary rounded justify-content-center">
                    <div id="province" className="col-md-auto p-3"><b>Province</b>
                        <div key="provinceName" className="m-3">
                            {countAv.map((item,index)=>(
                                <div className="m-2" key={`Provt${index}`}>{item.province}</div>
                            ))}
                        </div>
                    </div>
                    <div id="nombre" className="col-md-5 p-3"><b>Disponibilité (# nbre chambres)</b>
                        <div key="countNb" className="m-3">
                            {countAv.map((item,index)=>(
                                <div className="m-2" key={`Count${index}`}>{item.count}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="m-3 mt-5"><b>Capacités de toutes les chambres des hôtels</b></div>
                <div className="col-lg-7 container-fluid d-flex flex-row bg-secondary rounded mb-5 justify-content-center">
                    <div id="hotels" className="col-md-auto p-3 "><b>Nom de l'Hôtel</b>
                        <div key="nomHotel" className="m-3">
                            {capacites.map((item,index)=>(
                                <div className="m-2" key={`Hot${index}`}>{item.nom_hotel}</div>
                            ))}
                        </div>
                    </div>
                    <div id="nombre" className="col-md-7 p-3"><b>Capacités</b>
                        <div key="capChambreHotels" className="m-3">
                            {capacites.map((item,index)=>(
                                <div className="m-2" key={`Capacite${index}`}>
                                    {item.listeCapacites.map((item,index)=>(
                                    <span className="m-2">{item.toLowerCase()}</span>
                                ))}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    
    
}