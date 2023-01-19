import {NavLink} from "react-router-dom";

import css from './Header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {accountActions} from "../../redux/slices";


const Header = () => {

    const {account} = useSelector(state => state.accountReducer);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(accountActions.getByAccess())
    }, [dispatch]);

    return (
        <div className={css.header}>
            <NavLink to={'/devices'}><h1>Logo</h1></NavLink>
            {
                account ?
                    <div className={css.button}>
                        {
                            (account && account.isAdmin) ?
                                <div className={css.nav}>
                                    <NavLink to={'/admin'}>Admin</NavLink>
                                    <NavLink to={'/account'}>Account</NavLink>
                                    <NavLink to={'/order'}>Order</NavLink>
                                </div>
                                :
                                <div className={css.nav}>
                                    <NavLink to={'/account'}>Account</NavLink>
                                    <NavLink to={'/order'}>Order</NavLink>
                                </div>
                        }
                    </div>
                    :
                    <div className={css.button}>
                        <NavLink to={'/login'}>Login</NavLink>
                        <NavLink to={'/register'}>Register</NavLink>
                    </div>
            }
        </div>
    );
};

export {Header};