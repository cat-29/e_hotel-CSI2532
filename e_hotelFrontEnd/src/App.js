import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom';
import { View } from './Container/View';
import { AppShell } from './components/AppShell/AppShell';
import {SignIn} from './Container/SignIn';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./main.css";


function App() {
    // <div>Life with ford, is a luxury !</div>
    const router = createBrowserRouter(createRoutesFromElements(

      // I need an element from the first englobing Route, and the second.
      <Route path='/' element={<AppShell/>}>
  
        <Route index element={<View/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
      </Route>
    ))

    return (
      <RouterProvider router={router}/>
    );
}

export default App;
