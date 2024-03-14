import { Outlet } from "react-router-dom";
import { AppHeader } from "../AppHeader/AppHeader";
import { AppFooter } from "../AppFooter/AppFooter";
import "./AppShell.css"

export const AppShell=()=>{
    return(
        <div className="HeroWrapper">
            <AppHeader/>
            <Outlet/>
            <AppFooter/>
        </div>
    );
} 