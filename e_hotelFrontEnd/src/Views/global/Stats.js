import fcts from "../../ApiFcts/Api";
import { useLoaderData } from "react-router-dom";

export const loadCountAv = ()=>{
    const availabilities = fcts.getAvailabilities();
    return availabilities;    
}

export const Stats = ()=>{

    const countAv = useLoaderData();
    console.log("count Av is",countAv);

    

    return (
        <div className="container-flex m-3">
            <h3 className="p-3 col-md-3 col-6 mx-auto text-center border-5 border-bottom col-md-8">Données en temps réel</h3>
            <div className="m-3"><b>Disponibilité des chambres par zone</b></div>
            <div className="container-fluid d-flex flex-row bg-secondary w-50 rounded">
                <div id="province" className="col-md-4 p-3"><b>Province</b>
                    <div className="m-3">
                        {countAv.map((item,index)=>(
                            <div className="m-2" key={`Provt${index}`}>{item.province}</div>
                        ))}
                    </div>
                </div>
                <div id="nombre" className="col-md-7 p-3"><b>disponibilité (# nbre chambres)</b>
                    <div className="m-3">
                        {countAv.map((item,index)=>(
                            <div className="m-2" key={`Count${index}`}>{item.count}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
    
    
}