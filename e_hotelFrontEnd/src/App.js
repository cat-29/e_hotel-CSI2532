import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom';
import { View } from './Views/View';
import { AppShell } from './components/AppShell/AppShell';
import {SignIn} from './Views/SignIn';
import { CreateAccountForm } from './Views/CreateAccount';
// This import of boostrap is unecessary, but let it stay here for debuggings purposes
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./main.css";
import { EmployeSignIn } from './Views/EmployeSignIn';
import { ReservationActive } from './Views/ReservationActive';
import { ManagementHotel } from './Views/ManagementHotel';


function App() {
    const router = createBrowserRouter(createRoutesFromElements(

      // I need an element from the first englobing Route, and the second.
      <Route path='/' element={<AppShell/>}>
  
        <Route index element={<View/>}/>
        <Route path='signIn' element={<SignIn/>}/>
        <Route path='createAccount' element={<CreateAccountForm/>}/>
        <Route path='employe' element={<EmployeSignIn/>}/>
        <Route path='reservationActive' element={<ReservationActive/>}/>
        <Route path='managementHotel' element={<ManagementHotel/>}/>
      </Route>
    ))

    return (
      <RouterProvider router={router}/>
    );
}

export default App;
