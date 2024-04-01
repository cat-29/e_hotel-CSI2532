import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { View } from "./Views/global/View";
import { AppShell } from "./components/AppShell/AppShell";
import { ClientSignIn } from "./Views/Client/ClientSignIn";
import { CreateAccountForm } from "./Views/Client/CreateAccount";
// This import of boostrap is unecessary, but let it stay here for debuggings purposes
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
import { EmployeSignIn } from "./Views/EmployeSignIn";
import { ReservationActive } from "./Views/ReservationActive";
import { ManagementHotel } from "./Views/ManagementHotel";
import { MethodePaiement } from "./Views/MethodePaiement";
import { EmployeAjouteLocation } from "./Views/EmployeAjouteLocation";
import {
  PageReservation,
  loaderAllRooms,
} from "./Views/Client/PageReservation";
import { NotFound } from "./NotFound";
import { EmployeTableLocation } from "./Views/EmployeTableLocation";
import { DetailChambre } from "./Views/Client/DetailChambre";
import { Reserver } from "./Views/Client/Reserver";
import { MethodePaiementClient } from "./Views/Client/MethodePaiementClient";
import { ChaineInfo } from "./Views/ChaineInfo";
import { HotelInfo } from "./Views/HotelInfo";
import { ChambreInfo } from "./Views/ChambreInfo";
import { EmployeInfo } from "./Views/EmployeInfo";
import { ChambreDommageInfo } from "./Views/ChambreDommageInfo";
import { AjoutChaine } from "./Views/AjoutChaine";
import { AjoutHotel } from "./Views/AjoutHotel";
import { AjoutChambre } from "./Views/AjoutChambre";
import { AjoutEmploye } from "./Views/AjoutEmploye";
import { AjoutChambreDommage } from "./Views/AjoutChambreDommage";
import { ChambreSubiDommage } from "./Views/ChambreSubiDommage";
import { Stats } from "./Views/global/Stats";
import { loadCountAv } from "./Views/global/Stats";
import { AjouteDommage } from "./Views/AjouteDommage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      // I need an element from the first englobing Route, and the second.
      <Route path="/" element={<AppShell />}>
        <Route index element={<View />} />
        <Route path="client" element={<ClientSignIn />} />
        <Route path="createAccount" element={<CreateAccountForm />} />
        <Route
          path="reservationChambre"
          element={<PageReservation />}
          loader={loaderAllRooms}
        />
        <Route
          path="reservationChambre/:hotId/:chambreId"
          element={<DetailChambre />}
        />
        <Route path="reserver" element={<Reserver />} />
        <Route path="payerClient" element={<MethodePaiementClient />} />
        <Route path="stats" element={<Stats/>} loader={loadCountAv}/>

        <Route path="employe" element={<EmployeSignIn />} />
        <Route path="historiqueReservation" element={<ReservationActive />} />
        <Route path="managementHotel" element={<ManagementHotel />} />
        <Route path="chaineInfo" element={<ChaineInfo />} />
        <Route path="hotelInfo" element={<HotelInfo />} />
        <Route path="chambreInfo" element={<ChambreInfo />} />
        <Route path="employeInfo" element={<EmployeInfo />} />
        <Route path="chambreDommageInfo" element={<ChambreDommageInfo />} />
        <Route path="ajoutChaine" element={<AjoutChaine />} />
        <Route path="ajoutHotel" element={<AjoutHotel />} />
        <Route path="ajoutChambre" element={<AjoutChambre />} />
        <Route path="ajoutEmploye" element={<AjoutEmploye />} />
        <Route path="ajoutChambreDommage" element={<AjoutChambreDommage />} />
        <Route path="methodePaiement" element={<MethodePaiement />} />
        <Route path="ajoutLocation" element={<EmployeAjouteLocation />} />
        <Route path="historiqueLocation" element={<EmployeTableLocation />} />
        <Route path="dommagesSubi" element={<ChambreSubiDommage/>}/>
        <Route path="ajouteDommage" element={<AjouteDommage/>}/>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
