
// import "../main.css";
import "./View.css";


export const View=()=>{
    return (
      // trying with container-fluid d-flex flex-row px-0
        <div className="wrapper">

          {/* <div className="col-md-7 p-3 bg-primary wrapper"></div>
          <div className="col-md-5 p-3 bg-secondary"></div> */}

          
            <div className="questionTitre">
              Veuillez sélectionner ci-dessous:
            </div>

            {/* This line was just to test */}

            {/* <div className="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">TESTT</div> */}

            <div className="directBtns">
              <a className="btn btn-primary btnCustom" href="/client">Client</a>
              <a className="btn btn-primary btnCustom" href="/employe">Employé</a>
              <a className="btn btn-primary btnCustom" href="/stats">Statistiques</a>
            </div>

        </div>     
    )
}