export const PageReservation = (userInfo) => {
    return (
        <>
            {console.log("ds reservation: ", userInfo)}
            <h1>BONJOUR</h1>
        
            <div>
                <h1>{userInfo.userInfo.prenom}</h1>
                <h1>{userInfo.userInfo.nomFamille}</h1>
                <h1>{userInfo.userInfo.pays}</h1>
            </div>
            
        </>
        
    );
}