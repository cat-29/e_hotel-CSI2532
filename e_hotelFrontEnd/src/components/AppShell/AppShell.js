import { Outlet } from "react-router-dom";
import { AppFooter } from "../AppFooter/AppFooter";
import "./AppShell.css"

export const AppShell=()=>{
    return(
        <div className="HeroWrapper">
            <Outlet/>
            <AppFooter/>
        </div>
    );
} 