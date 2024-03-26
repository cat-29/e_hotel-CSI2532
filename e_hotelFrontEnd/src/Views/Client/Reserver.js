import {useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import ValidateFcts from '../../ValidationFcts/container';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Modal } from 'react-bootstrap';
import fcts from '../../ApiFcts/Api';

export const Reserver = () => {
    const {state} = useLocation();
    console.log("the state in reserver",state);

    const [dates, setDates] = useState({
        checkin: '',
        checkout:'',
    });

    const [errors, setErrors] = useState([]);

    // Showing modal or not
    const [shown,setShown] = useState(false);

    // price show
    const [shownPrice,setShownPrice] = useState(false);

    // Price value
 
    const [price,setPrice] = useState(0);

    const navigate = useNavigate();
 

    const handleInputChange = (event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setDates({
            ...dates,
            [name]: value
        });
    }

    const checkDatesAndCalculatePrice = ()=>{
        // console.log("let's check whether dates is saved or not");
        // console.log(dates);
        // Validating dates
        let checkin = "";
        if (dates.checkin != ""){
            checkin = new Date(dates.checkin);
        }
        let checkout = "";
        if (dates.checkout != ""){
            checkout = new Date(dates.checkout);
        }
        let res = [];
        ValidateFcts.validateDates(checkin,checkout,res,1);
        console.log("errors are",res);
        setErrors(res); 
        let flag = false;

        for (let i = 0;i<res.length;i++){
            if (res[i] != ""){
                flag = true;
            }
        }

        if (flag == true){
            console.log("Dates need to be fixed");
            setShown(true);

        }else{
            console.log("Ready for further processing");
            let days = ValidateFcts.calculateNumberOfDays(checkin,checkout);
            let totPrice = days * parseInt(state.prix);
            // console.log("days are ",days);
            // console.log("prix",state.prix);
            // console.log("for you, price is", totPrice);
            setShownPrice(true);
            setPrice(totPrice);
        }
    }

    // Controling modal behavior (toggle between two states)

    const handleClose = ()=>{
        setShown((prev)=>!prev);
    }

    const ajouterReservationDB = (data)=>{
        const newState = {...data};
        newState.priceTotal = price;
        console.log("Dans ajouter reservation BD",newState);
        fcts.ajouterReservationDB(newState);
        // Should await for reservation to be added first, then navigate back
        navigate('/');
    }

    const goToPaiement = (event)=>{
        const newState = {...state};
        newState.priceTotal = price;
        // console.log('dans go to paiement',newState);
        navigate('/payerClient',{state:newState});
    }

    return (
        <>
            <h5 className="title m-3 p-3 col-md-3 col-6 mx-auto text-center border-5 border-bottom col-md-8">Réserver</h5>
            <div className="m-3">
                <div className='w-50 p-3'>
                    <label htmlFor="dateCheckIn" className="form-label">Date Check-In</label>
                    <input type="date" className="form-control border" name="checkin" value={dates.checkin} onChange={handleInputChange}/>
                </div>

                <div className='w-50 p-3'>
                    <label htmlFor="dateCheckOut" className="form-label">Date Check-Out</label>
                    <input type="date" className="form-control border" name='checkout' min={dates.checkin} onChange={handleInputChange}/>
                </div>

                <button style={{width:'50px'}} className="btn btn-primary" onClick={()=>checkDatesAndCalculatePrice()}>Ok</button>
                {shownPrice ? 
                    <div>
                        <b>Prix Total:</b> {`${price} $`}
                        <p>Désirez vous payer maintenant ?</p>
                            <div className='form-check'>
                                <input className="form-check-input" type="checkbox" name='paie' onChange={()=>goToPaiement()} id="paieOui"/>
                                    <label className="form-check-label" htmlFor="paieOui">Oui</label>
                            </div> 
                            <div className='form-check'>
                                <input className="form-check-input" type="checkbox" name='paie' onChange={()=>ajouterReservationDB(state)} id="paieNon"/>
                                    <label className="form-check-label" htmlFor="paieNon">Non</label>
                            </div>
                             {/*Si oui alors on navigue vers la page payerClient ou le client doit pouvoir payer en avance 
                             et c'est de la ou on fait un post request pour creer la reservation, */}
                             {/* S'il dit non, alors on  fait le post request maintenant, completedPaye false et prix = prixTotal */}
                    </div>:<></>}

            </div>

            <Modal show={shown} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title key={'title'}>Des erreurs détectées</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errors.map((itemErr,index)=>(
                        itemErr?<li id={`error${index}`} key={`error${index}`}>{itemErr}</li>:<></>
                    ))}
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

