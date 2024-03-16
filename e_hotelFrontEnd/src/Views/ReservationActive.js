import { useLocation } from "react-router-dom";

export const ReservationActive = () => {
    const {state} = useLocation();
    return (
        
        <>
        {console.log("ds reservation active: ", state)}
            {/* <h1>{employeInfo}</h1> */}
        </>
    );
}