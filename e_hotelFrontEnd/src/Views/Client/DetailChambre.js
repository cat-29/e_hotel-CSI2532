import { useLocation,useNavigate } from "react-router-dom";
import { renderStars } from "./PageReservation";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { useEffect, useState } from "react";
import fcts from "../../ApiFcts/Api";

export const DetailChambre = ()=>{
    const {state} = useLocation();

    const chambre = state.chambre;
    const userNas = state.nas;
    const navigate = useNavigate();
    // Having different info on a particular client, so that our app wont crash when we redirect users to rooms page after booking.
    const userInfo = state.client;

    // Commodites ici
    const [comms,setComms] = useState([]);

    useEffect(() => {

        const getComms = async()=>{
            console.log("chambre in use effect",chambre);
            const comms = await fcts.getAllCommoditees(chambre.idHotel,chambre.numeroChambre);
            console.log("comms ",comms);
            setComms(comms);
        }

        getComms();
       
        
    }, []);

    // construct an object with all required fields for booking, and go to book page 
    const reserve = (numeroChambre,nom,nas,prix,idHotel)=>{
        const data = {};
        data.numeroChambre = numeroChambre;
        data.nom = nom;
        data.nas = nas;
        data.prix = prix;
        data.idHotel = idHotel;
        navigate('/reserver',{state:{client:userInfo,bookingInfo:data}});
    }

    return(
        <>
            <AppHeader info={state} isUserTypeClient={true}/>
            <h5 className="title m-3 p-3 col-md-3 col-6 mx-auto text-center border-5 border-bottom col-md-8">Détails de la chambre</h5>
            <div className="d-flex flex-row">
                <div style={{lineHeight:"2rem"}} className="col-5 container-fluid mx-auto d-flex flex-column justify-content-center">

                    <div id="hotel"><b>Nom de l'hôtel:</b> {chambre.nom}</div>
                    <div id="chaine"><b>Nom de la chaîne:</b> {chambre.nomChaine}</div>
                    <div id="numChambre"><b>Numero de chambre:</b> {chambre.numeroChambre}</div>
                    <div id="prix"><b>Prix:</b> {`${chambre.prix} $ / nuit`}</div>
                    <div id="rating"><b>Classement de l'hôtel:</b> {renderStars(chambre.rating)}</div>
                    <div id="capaciteEtendre"><b>Capacité à Étendre:</b> {chambre.capaciteAEtendre ? 'Oui':'Non'} </div>
                    <div id="capaciteChambre"><b>Capacité de chambre:</b> {chambre.capaciteChambre.toLowerCase()} </div>
                    <div id="vue"><b>Vue:</b> {chambre.vueChambre.toLowerCase()}</div>
                    <div id="nbreChambreTot"><b>Nombre de chambres de l'hôtel:</b> {chambre.nbrChambre}</div>
                    <div id="Addresse"><b>Addresse:</b> {`${chambre.numero} ${chambre.rue}, ${chambre.ville}, ${chambre.province}, ${chambre.codePostal}, ${chambre.pays} `}</div> 
                    <a className="btn btn-secondary p-1 mt-3 mb-5" onClick={()=>reserve(chambre.numeroChambre,chambre.nom,userNas,chambre.prix,chambre.idHotel)}>Réserver</a>
                </div>
                <div style={{lineHeight:"2rem"}} className="col-4 container-fluid d-flex flex-column">
                    {comms.length ? 
                    <div style={{lineHeight:"2rem",height:"fit-content"}} className="container-fluid mx-auto d-flex flex-column bg-secondary rounded ">
                        <h3 className="p-3 text-center border-2 border-bottom">Commoditées</h3>
                        <div className="d-flex flex-row text-center justify-content-center flex-wrap m-1">
                            {comms.map((item,index)=>(
                                    <div className="m-2 fs-5" key={`Comm${index}`}>{item}</div>
                                ))}
                        </div>
                    </div>:<></>}
                    <div style={{lineHeight:"2rem"}} className="container-fluid mx-auto text d-flex flex-column justify-content-center">
                    </div>  
                </div>
            </div>
        </>
    )
}