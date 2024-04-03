import { useEffect, useState } from 'react';
import './Filters.css';
import InputMask from 'react-input-mask';
import connexionCompte from '../../services/connexion-compte';

// State to store filters data

// Init the filters checkin to tomorrow

const todayCheckin = new Date();

todayCheckin.setDate(todayCheckin.getDate()+1);

// Init the checkout to 3 days after tomorrow

const todayCheckout = new Date();
// const nextDay = (new Date()+3).toISOString().slice(0,10);
todayCheckout.setDate(todayCheckout.getDate() + 4);

const vCheckin = todayCheckin.toISOString().slice(0,10);
const vCheckout = todayCheckout.toISOString().slice(0,10);

// console.log("todayCheckinHere is   ",vCheckin);
// console.log("next day checkout here is    ",vCheckout);

export const Filters = ({onStateChange})=>{
    const [filters, setFilters] = useState({
        checkin: vCheckin,
        checkout:vCheckout,
        capacite:'SIMPLE',
        etendre:false,
        vue:'MER',
        prixMin:'0',
        prixMax:'10000',
        chaine:'Hotels Bellevue',
        classement:'3',
        chambreMin:'1',
        chambreMax:'1000'
    });


    const [nomchaines, setNomChaines] = useState([]);
    // console.log("filters in filters component",filters);
    // Later on, those should come from a database
    // const chaines = ['Hotels Bellevue','Grand Horizon Hotels','Sunset Vista Hotels & Resorts','The Grand Hotels','Séjour Bonnaventure']

    useEffect(() => {
        // get nomchaine
        connexionCompte.getAllNomChaines().then((response) => {
            console.log(response.data);
            setNomChaines(response.data);
        });
    }, []);

    useEffect(()=>{
        console.log("filters are now child",{filters});
        // send to parent component
        onStateChange(filters);
    },[filters])

    const handleInputChange=(event)=>{
        // console.log("sth changed");
        const target = event.target;
        const value = target.value;
        const name = target.name;
        // console.log("name   ",   name);
        // console.log("value ",   value);

        if(name == 'etendre'){
            let prevValue = filters.etendre;
            setFilters({
                ...filters,
                [name]: !prevValue
            });
        }else if(name == 'vueMer'){
            // this else if won't be used now but stays here for future use
            // console.log("I am mer");
            let nameV = 'vue';
            let merIncluded = filters.vue.includes('MER');
            if(!merIncluded){
                setFilters((prev)=>(
                    {...filters,[nameV]:[...prev.vue,'MER']}));
            }else{
                let vueArray = [...filters.vue];
                let index = vueArray.indexOf('MER');
                vueArray.splice(index,1);
                setFilters({...filters,[nameV]:vueArray});

            }
            
        }else if(name == 'vueMontagne'){
            let nameV = 'vue';
            let montagneIncluded = filters.vue.includes('MONTAGNE');
            if(!montagneIncluded){
                setFilters((prev)=>(
                    {...filters,[nameV]:[...prev.vue,'MONTAGNE']}));
            }else{
                let vueArray = [...filters.vue];
                let index = vueArray.indexOf('MONTAGNE');
                vueArray.splice(index,1);
                setFilters({...filters,[nameV]:vueArray});     
            }
        }
        // else if(name == 'chaines' || name == 'classement'){
        //     console.log('chaine ou classement');
        //     console.log(value);
    
        //     let included = filters[name].includes(value);
        //     if (!included){
        //         setFilters((prev)=>(
        //             {...filters,[name]:[...prev[name],value]}
        //         ));
        //     }else {
        //         let chainesArray = [...filters[name]];
        //         let index = chainesArray.indexOf(value);
        //         chainesArray.splice(index,1);
        //         setFilters({...filters,[name]:chainesArray});
        //     }

        // }
        else{
            if(name == 'prixMin' || name== 'prixMax' || name=='chambreMin' || name=='chambreMax'){
                let newValue = value.replace(/,/,'');
                setFilters({
                    ...filters,
                    [name]: newValue
                });
            }
            else{
                // console.log("the name is",name);
                // console.log("the value", value);
                setFilters({
                ...filters,
                [name]: value
            })};
        
        }
        // For debugging purposes

        // console.log("target",target);
        // console.log("name",name);
        // console.log("value",value);
    }
    return(
        <>
        <div className="container-fluid d-flex flex-row px-0">
            <div id="leftFilters" className="col-md-8 bg-primary p-3">
                {/* Filtres obligatoires */}
                <div id='pricipauxFiltres' className=' text-center gap-5 ms-1 d-md-flex flex-wrap'>
                    <div id='checkin' className="">
                        <label className='p-2 m-1 fw-bold'>Date Checkin</label>
                        <input type="date" className="form-control border w-100" name="checkin" value={filters.checkin} onChange={handleInputChange}/>
                        {/* <Calendar name='checkin' value={filters.checkin} onChange={onChangeDate1} /> */}
                    </div>
                    <div id='checkout' className="">
                        <label className='p-2 m-1 fw-bold'>Date Checkout</label>
                        <input type="date" className="form-control border" name="checkout" value={filters.checkout} onChange={handleInputChange}/>
                        {/* <Calendar name='checkout' value={filters.checkout} onChange={onChangeDate2} /> */}
                    </div> 
                    <div id='capaciteChambre' className=''>
                        <label className='p-2 m-1 fw-bold'>Capacité</label>
                        <select className='form-select' name='capacite' onChange={handleInputChange}>
                            {/* <option value={''}></option> */}
                            <option value={'SIMPLE'}>Simple</option>
                            <option value={'DOUBLE'}>Double</option>
                            <option value={'TRIPLE'}>Triple</option>
                            </select>
                    </div> 
                    <div id='etendre' className=''>
                        <label className='p-2 m-1 fw-bold'>Étendre</label>
                            {/* Je vais retourner a faire le switcher apres */}
                            {/* <span className='switch'>
                                    <input type='checkbox' id='switcher'/>
                                    <label htmlFor='switcher'></label>
                            </span> */}

                        <div className='form-check text-start'>

                            <input className="form-check-input" type="checkbox" name='etendre' value={filters.etendre} onChange={handleInputChange} id="etendreOui"/>
                                <label className="form-check-label" htmlFor="etendreOui">Oui</label>
                        </div> 
                    </div>
                    <div id='vue' className=''>
                        <label className='p-2 fw-bold'>Vue</label>
                            <div className='form-check text-start'>
                                <input className="form-check-input" type="radio" name='vue' checked={filters.vue == 'MER'} value={'MER'} onChange={handleInputChange} id="merCheck"/>
                                <label className="form-check-label" htmlFor="merCheck">Mer</label>
                            </div>

                            <div className='form-check text-start'>
                                <input className="form-check-input" type="radio" name='vue' checked={filters.vue == 'MONTAGNE'} value={'MONTAGNE'} onChange={handleInputChange} id="montagneCheck"/>
                                <label className="form-check-label" htmlFor="montagneCheck">Montagne</label>
                            </div>  
                    </div>
                    <div id='priceRangerMin'>
                        <label htmlFor="priceMin" className="form-label fw-bold p-2">Prix Minimum</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            {/* <input type="text" className="form-control" onChange={handleInputChange} aria-label="Amount (to the nearest dollar)"/> */}
                            <InputMask id='priceMin' className="form-control border" mask='99999999' placeholder="XXXXXXXX" maskChar={''} value={filters.prixMin} onChange={handleInputChange} name="prixMin"/>
                            <span className="input-group-text">.00</span>
                        </div>
                        {/* <input type="range" className="form-range" min="0" max="5" id="price"></input> */}
		            </div>
                    <div id='priceRangeMax'>
                        <label htmlFor="priceMax" className="form-label fw-bold p-2">Prix Maximum</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            {/* <input type="text" className="form-control" onChange={handleInputChange} aria-label="Amount (to the nearest dollar)"/> */}
                            <InputMask id='priceMax' className="form-control border" mask='99999999' placeholder="XXXXXXXX" maskChar={''} value={filters.prixMax} onChange={handleInputChange} name="prixMax"/>
                            <span className="input-group-text">.00</span>
                        </div>
                    </div>
                </div>
            </div>
           

            <div id='rightFilters' className="container-fluid text-center flex-wrap col-md-4 bg-success">
                    <div id='chaine'>
                        <div className="text-center">
                            <label className='p-2 m-1 fw-bold text-center'>Chaîne Hôtelière</label>
                        </div>
                        <div className="text-start">
                            {nomchaines.map((item,index)=>(
                                <div key={index} className='form-check'>
                                    <input className="form-check-input" type="radio" name='chaine' checked={filters.chaine == item} onChange={handleInputChange} id={`chaine${index}`} value={item}/>
                                    <label className="form-check-label" htmlFor={`chaine${index}`}>{item}</label>
                                </div>
                            ))}
                        </div>
                       
                        
                        
                        
                    </div> 
                    <div id='classement' className=''>
                        <label className='p-2 m-1 fw-bold'>Classement</label>
                            <div className='d-md-flex flex-wrap gap-2'>
                                <div key={0} className='form-check'>
                                    <input className="form-check-input" type="radio" name='classement' checked={filters.classement == '1'} onChange={handleInputChange} id={'oneStar'} value={'1'}/>
                                    <label className="form-check-label" htmlFor={'oneStar'}>⭐</label>
                                </div>
                                <div key={1} className='form-check'>
                                    <input className="form-check-input" type="radio" name='classement' checked={filters.classement == '2'} onChange={handleInputChange} id={'twoStar'} value={'2'}/>
                                    <label className="form-check-label" htmlFor={'twoStar'}>⭐⭐</label>
                                </div>
                                <div key={2} className='form-check'>
                                    <input className="form-check-input" type="radio" name='classement' checked={filters.classement == '3'} onChange={handleInputChange} id={'threeStar'} value={'3'}/>
                                    <label className="form-check-label" htmlFor={'threeStar'}>⭐⭐⭐</label>
                                </div>
                                <div key={3} className='form-check'>
                                    <input className="form-check-input" type="radio" name='classement' checked={filters.classement == '4'} onChange={handleInputChange} id={'fourStar'} value={'4'}/>
                                    <label className="form-check-label" htmlFor={'fourStar'}>⭐⭐⭐⭐</label>
                                </div>
                                <div key={4} className='form-check'>
                                    <input className="form-check-input" type="radio" name='classement' checked={filters.classement == '5'} onChange={handleInputChange} id={'fiveStar'} value={'5'}/>
                                    <label className="form-check-label" htmlFor={'fiveStar'}>⭐⭐⭐⭐⭐</label>
                                </div>
                            </div>
                            
                        
                        
                        
                    </div> 

                    <div id='minChambre'>
                        <label htmlFor="chambreMin" className="form-label fw-bold p-2">Nombre de chambres minimum</label>
                        <div className="input-group mb-3">
                            {/* <input type="text" className="form-control" onChange={handleInputChange} aria-label="Amount (to the nearest dollar)"/> */}
                            <InputMask id='chambreMin' className="form-control border" mask='999999' placeholder="XXXXXX" maskChar={''} value={filters.chambreMin} onChange={handleInputChange} name="chambreMin"/>
                            <span className="input-group-text">chambres</span>
                        </div>
                        {/* <input type="range" className="form-range" min="0" max="5" id="price"></input> */}
		            </div>
                    <div id='maxChambre'>
                        <label htmlFor="chambreMax" className="form-label fw-bold p-2">Nombre de chambres maximum</label>
                        <div className="input-group mb-3">
                            {/* <input type="text" className="form-control" onChange={handleInputChange} aria-label="Amount (to the nearest dollar)"/> */}
                            <InputMask className="form-control border" mask='999999' placeholder="XXXXXX" maskChar={''} value={filters.chambreMax} onChange={handleInputChange} name="chambreMax"/>
                            <span className="input-group-text">chambres</span>
                        </div>
                    </div>
            </div>
        </div>
        </>

    )
}