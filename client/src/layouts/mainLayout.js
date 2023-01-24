import {Outlet} from "react-router-dom";

import {Footer, Header} from "../components";
import css from './mainLayout.module.css'


const MainLayout = () => {

    return (
        <div className={css.container}>
            <div className={css.block}>
                <Header/>
            </div>
            <div className={css.block}>
                <Outlet/>
            </div>
            <div className={css.block}>
                <Footer/>
            </div>
        </div>
    );
};

export {MainLayout};