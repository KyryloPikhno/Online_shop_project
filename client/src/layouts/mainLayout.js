import {Outlet} from "react-router-dom";

import {Header} from "../components";
import css from './mainLayout.module.css'


const MainLayout = () => {

    return (
        <div className={css.container}>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};