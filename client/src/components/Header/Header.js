import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {accountActions, categoryActions} from "../../redux/slices";
import {DevicesSearchForm} from "../DevicesSearchForm/DevicesSearchForm";
import {DevicesFilter} from "../DevicesFilter/DevicesFilter";
import {authService} from "../../services";
import {Logo} from "../Logo/Logo";
import css from './Header.module.css'


const Header = () => {
    const navigate = useNavigate();

    const {account} = useSelector(state => state.accountReducer);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(accountActions.getByAccess());
    }, [dispatch]);

    useEffect(() => {
        dispatch(categoryActions.getAll());
    }, [dispatch])

    const logoutAll = (_id) => {
        dispatch(accountActions.logoutAll({_id}));

        authService.deleteTokens();

        navigate('/login');
    };

    // useEffect(() => {
    //     if (window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/password/forgot' || window.location.pathname === '/password/new') {
    //     } else {
    //
    //     }
    // }, [window.location.pathname, account, dispatch]);

    return (
        <div className={css.header}>
            <div className={css.wrap}>
                <div className={css.logoAndForm}>
                    <Logo/>
                    {'' && <DevicesSearchForm/>}
                </div>
                {
                    '' ?
                        <div className={css.buttons}>
                            <NavLink to={'/login'}>Login</NavLink>
                            <NavLink to={'/register'}>Register</NavLink>
                        </div>
                        :
                        <div className={css.buttons}>
                            <div className={css.nav}>
                                {!!account?.isAdmin && <NavLink to={'/admin'}>Admin</NavLink>}
                                <NavLink to={'/account'}>Account</NavLink>
                                <NavLink to={'/order'}>Order</NavLink>
                                <button onClick={() => logoutAll(account._id)}>Logout</button>
                            </div>
                        </div>
                }
            </div>
            {
                !'state' &&
                <div className={css.filter}>
                    <DevicesFilter/>
                </div>
            }
        </div>
    );
};

export {Header};