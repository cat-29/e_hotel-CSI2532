
// import "../main.css";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import "./View.css";


export const View=()=>{
    return (
      <>
        <AppHeader/>
        {/* Pour l'image */}
        <div className="col-6 wrapper">
            <div className="image-container">
            </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-5 my-auto titre">
          <div className="d-grid d-flex buttonGrid">
              <h1 className="pt-5" style={{color: 'white'}}>Veuillez vous connecter</h1>           
              <div className="directBtns">
                <a className="btn btn-light rounded-5" href="/client">Client</a>
                <a className="btn btn-light rounded-5" href="/employe">Employé</a>
                <div className="stats">
                  <h6 className="text-center">Voir les statistiques</h6>
                  <a className="btn btn-light rounded-5" href="/stats">Statistiques</a>
                </div>             
              </div>
            </div>          
        </div>
      </>
    )
}