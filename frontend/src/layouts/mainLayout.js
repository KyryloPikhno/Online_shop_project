import {Outlet} from "react-router-dom";

import {Footer, Header} from "../components";
import css from './mainLayout.module.css'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {accountActions} from "../redux/slices";


const MainLayout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(accountActions.getByAccess())
    }, []);

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