
// import "../main.css";
import "./View.css";


export const View=()=>{
    return (
        <div className="wrapper">
         
          <div className="questionTitre">
            Veuillez sélectionner ci-dessous:
          </div>

          {/* This line was just to test */}

          {/* <div className="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">TESTT</div> */}

          <div className="directBtns">
            <a className="btn btn-primary btnCustom" href="/client">Client</a>
            <a className="btn btn-primary btnCustom" href="/employe">Employé</a>
            <a className="btn btn-primary btnCustom" href="/admin">Administrateur</a>
          </div>

        </div>     
    )
}