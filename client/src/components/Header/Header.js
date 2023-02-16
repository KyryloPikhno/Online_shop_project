import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {accountActions, categoryActions} from "../../redux/slices";
import {DevicesSearchForm} from "../DevicesSearchForm/DevicesSearchForm";
import {DevicesFilter} from "../DevicesFilter/DevicesFilter";
import {authService} from "../../services";
import css from './Header.module.css'


const Header = () => {
    const navigate = useNavigate()

    const [state, setState] = useState(false)

    const {account} = useSelector(state => state.accountReducer);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [])

    const logoutAll = (_id) => {
        dispatch(accountActions.logoutAll({_id}));

        authService.deleteTokens();

        navigate('/login');
    };

    useEffect(() => {
        if (window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/password/forgot' || window.location.pathname === '/password/new') {
            setState(true)
        } else {
            setState(false)
        }
    }, [dispatch, window.location.pathname, account]);


    return (
        <div className={css.header}>
            <div className={css.wrap}>
                <div className={css.logoAndForm}>
                    <NavLink to={'/devices'}><h1>DigiStore</h1></NavLink>
                    {!state && <DevicesSearchForm/>}
                </div>
                {
                    state ?
                        <div className={css.button}>
                            <NavLink to={'/login'}>Login</NavLink>
                            <NavLink to={'/register'}>Register</NavLink>
                        </div>
                        :
                        <div className={css.button}>
                            {
                                account.isAdmin ?
                                    <div className={css.nav}>
                                        <NavLink to={'/admin'}>Admin</NavLink>
                                        <NavLink to={'/account'}>Account</NavLink>
                                        <NavLink to={'/order'}>Order</NavLink>
                                        <button onClick={() => logoutAll(account._id)}>Logout</button>
                                    </div>
                                    :
                                    <div className={css.nav}>
                                        <NavLink to={'/account'}>Account</NavLink>
                                        <NavLink to={'/order'}>Order</NavLink>
                                        <button onClick={() => logoutAll(account._id)}>Logout</button>
                                    </div>
                            }
                        </div>
                }
            </div>
            {
                !state &&
                <div className={css.filter}>
                    <DevicesFilter/>
                </div>
            }
        </div>
    );
};

export {Header};