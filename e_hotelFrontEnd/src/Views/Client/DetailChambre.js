import { useLocation,useNavigate } from "react-router-dom";
import { renderStars } from "./PageReservation";
import { AppHeader } from "../../components/AppHeader/AppHeader";

export const DetailChambre = ()=>{
    const {state} = useLocation();

    const chambre = state.chambre;
    const userNas = state.nas;
    const navigate = useNavigate();
    // Having different info on a particular client, so that our app wont crash when we redirect users to rooms page after booking.
    const userInfo = state.client;

    // console.log('state user',state.client);
    // console.log('chambre',chambre);
    // console.log('nas',userNas);

    // construct an object with all required fields for booking, and go to book page 
    const reserve = (numeroChambre,nom,nas,prix,idHotel)=>{
        // console.log("si on veut reserver, les params sont:",numeroChambre);
        // console.log("nom",nom);
        // console.log("nas",nas);
        // console.log("prix",prix);
        const data = {};
        data.numeroChambre = numeroChambre;
        data.nom = nom;
        data.nas = nas;
        data.prix = prix;
        data.idHotel = idHotel;
        navigate('/reserver',{state:{client:userInfo,bookingInfo:data}});
    }

    
    // console.log("Dans la page de details: ",state);
    return(
        <>
            <AppHeader info={state} isUserTypeClient={true}/>
            <h5 className="title m-3 p-3 col-md-3 col-6 mx-auto text-center border-5 border-bottom col-md-8">Détails de la chambre</h5>
            <div style={{lineHeight:"2rem"}} className="container-fluid mx-auto text-center d-flex flex-column justify-content-center">

                <div id="hotel"><b>Nom de l'hôtel:</b> {chambre.nom}</div>
                <div id="chaine"><b>Nom de la chaîne:</b> {chambre.nomChaine}</div>
                <div id="numChambre"><b>Numero de chambre:</b> {chambre.numeroChambre}</div>
                <div id="prix"><b>Prix:</b> {`${chambre.prix} $ / nuit`}</div>
                <div id="rating"><b>Classement de l'hôtel:</b> {renderStars(chambre.rating)}</div>
                <div id="capaciteEtendre"><b>Capacité à Étendre:</b> {chambre.capaciteAEtendre ? 'Oui':'Non'} </div>
                <div id="capaciteChambre"><b>Capacité de chambre:</b> {chambre.capaciteChambre.toLowerCase()} </div>
                <div id="vue"><b>Vue:</b> {chambre.vueChambre}</div>
                <div id="nbreChambreTot"><b>Nombre de chambres de l'hôtel:</b> {chambre.nbrChambre}</div>
                <div id="Addresse"><b>Addresse:</b> {`${chambre.numero} ${chambre.rue}, ${chambre.ville}, ${chambre.province}, ${chambre.codePostal}, ${chambre.pays} `}</div> 
                <a className="btn btn-secondary p-1 m-2 mx-auto" onClick={()=>reserve(chambre.numeroChambre,chambre.nom,userNas,chambre.prix,chambre.idHotel)}>Réserver</a>
            </div>
        </>
    )
}