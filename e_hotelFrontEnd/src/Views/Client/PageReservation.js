import ValidateFcts from "../../ValidationFcts/container";
import { Filters } from "../../components/Filters/Filters";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation,useLoaderData, useNavigate } from "react-router-dom";

import { Button, Modal } from 'react-bootstrap';
import fcts from "../../ApiFcts/Api";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import connexionCompte from "../../services/connexion-compte";

// This function is getting called each time the page renders
export const loaderAllRooms = ()=>{
    const rooms = fcts.getAllRooms();
    return rooms;
}

export const renderStars = (item)=>{
    if (item == 1){
        return (<>⭐</>);
    }else if (item == 2){
        return (<>⭐⭐</>);
    }else if (item == 3){
        return(<>⭐⭐⭐</>)
    }else if(item == 4){
        return(<>⭐⭐⭐⭐</>)
    }else{
        return(<>⭐⭐⭐⭐⭐</>)
    }
}

// La premiere page que l utilisateur voie quand il log in
export const PageReservation = () => {

    const todayCheckin = new Date();

    todayCheckin.setDate(todayCheckin.getDate()+1);

    // Init the checkout to 3 days after tomorrow

    const todayCheckout = new Date();
    todayCheckout.setDate(todayCheckout.getDate() + 4);

    const vCheckin = todayCheckin.toISOString().slice(0,10);
    const vCheckout = todayCheckout.toISOString().slice(0,10);

    // Les filtres seront recu ici de la part du component Filters

    const [filters, setComponentFilters] = useState({
        checkin: vCheckin,
        checkout:vCheckout,
        capacite:'SIMPLE',
        etendre:false,
        vue:'MER',
        prixMin:'0',
        prixMax:'10000',
        chaine:[],
        classement:[],
        chambreMin:'1',
        chambreMax:'1000'
    });

    // Avoir les details de client, state est un object client
    const {state} = useLocation();


    // Tous les erreurs doivent être enregistrés ici

    const [filterError,setFilterError] = useState([]);

    // All rooms at the very beginning
    const roomsTotal = useLoaderData();

    const navigate = useNavigate();

    const [rooms,setRooms] = useState(roomsTotal);

    // Call back function that sets the state of PageReservation to the state of its child filters

    const handleFilters = (newState)=>{
        setComponentFilters(newState);
    }

    // To control error modal
    const [show,setShow] = useState(false);

    const [isChambreDispo, setIsChambreDispo] = useState(true);

    // Controling modal behavior (toggle between two states)

    const handleClose = ()=>{
        setShow((prev)=>!prev);
    }

    // La fonction que l'on appelle lorsque l'on clique sur filtrer, elle valide la valeur de quelques 
    // filtres: checkin<checkout, priceMin<prixMax,chambreMin<chambreMax

    const handleFilterSub=async()=>{
        console.log("in handle filters submit");
        // BEFORE MAKING A GET REQUEST VALIDATE!
        // dates checkin < date checkout
        // price min < price max
        // chambre min < chambre max       
        const errors = ValidateFcts.validateFilters(filters);
        setFilterError(errors);

        // flag used to track whether we submit to backend or we wait for user to fix its errors

        let flag = false;

        for (let i = 0;i<errors.length;i++){
            if (errors[i] != ""){
                flag = true;
            }
        }

        if (flag == true){
            console.log("there are still errors to fix");
            setShow(true);

        }else{
            console.log("fields are ready to be submitted to backend");

            // Si la liste de la chaine est nulle, alors on insere toutes les chaines par defaut
            // set le boolean de retour a true, pour qu'on ne vois pas l'erreur 
            setIsChambreDispo(true);
            const rooms  = await ValidateFcts.submitFilters(filters);
            setRooms(rooms);
            
            if (rooms.length == 0) {
                // Affiche un message pour laisser l'usager savoir qu'aucune chambre n'est disponible
                setIsChambreDispo(false);
            } 
            return rooms;
        }
    }


    // Ceci permet d'aller à la page qui contient les détails d'une chambre spécifique
    const voirDetail = (chambre)=>{
        navigate(`${chambre.idHotel}/${chambre.numeroChambre}`,{state: {client:state, chambre:chambre,nas:state.nas}});
    }

    // Images ajout
    const renderImages = (capacite)=>{
        if (capacite == 'simple'){
            console.log("here");
            return './images/simple.png'

        }else if (capacite == 'double'){
            return './images/double.png'

        }else if (capacite == 'triple'){
            return './images/triple.png'

        }
    }
    
   
    return (
        <>
            <AppHeader info={state} isUserTypeClient={true}/>
            <h5 className="title m-3 p-3 col-md-3 col-6 mx-auto text-center border-5 border-bottom col-md-8">Réserver des chambres</h5>
            {/* onStateChange passes Filters's component state to PageReservation component state */}
            <Filters onStateChange={handleFilters}/>  
            <button onClick={handleFilterSub} type='button' className='btn bg-info w-25 mx-auto m-2' data-bs-toggle="modal" data-bs-target="modalErr">Filtrer</button>
            {/* Showing modal in case of errors */}

            {!isChambreDispo ? <div className="col-5 mx-auto border-black border-1 text-center m-3"><h5>Aucune chambre trouvée.</h5><h5>Veuillez changer vos filtres.</h5></div> : <></>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title key={'title'}>Des erreurs détectées</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {filterError.map((itemErr,index)=>(
                        itemErr?<li id={`error${index}`} key={`error${index}`}>{itemErr}</li>:<></>
                    ))}
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Ok</Button>
                </Modal.Footer>
            </Modal>


            {/* Rooms go here */}
            {rooms ?
            <div className="d-flex flex-row p-3 gap-4 flex-wrap justify-content-center">
                {rooms.map((item,index)=>{
                    return(
                        <div key={`card${index}`} className="text-center">
                            <div className="card border-3 border-dark" style={{width: "300px"}}>
                                <img className="card-img-top" src={renderImages(item.capaciteChambre.toLowerCase())} alt={item.numeroChambre}/>
                                <div className="card-body">
                                    <h4 style={{marginTop:"10px"}} className="card-title">{`chambre ${item.capaciteChambre.toLowerCase()}`}</h4>
                                    <div id="hotel">{item.nom}</div>
                                    <div id="chaine">{item.nomChaine}</div>
                                    <div id="numChambre">Numero de chambre: {item.numeroChambre}</div>
                                    <div id="prix">{`${item.prix} $ / nuit`}</div>
                                    <div id="rating">{renderStars(item.rating)}</div>
                                    <a className="btn btn-secondary p-1 m-3" onClick={()=>voirDetail(item)}>Voir</a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>:<></>
            }

        </>
        
    );
}