import { useLocation } from "react-router-dom";

export const ManagementHotel = () => {
    const {state} = useLocation();
    return (
        
        <>
            {console.log("ds management hotel: ", state)}
        </>
    );
}