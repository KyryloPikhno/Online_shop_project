import {useDispatch, useSelector} from "react-redux";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {accountActions, categoryActions, orderActions} from "../../redux/slices";
import {DevicesSearchForm} from "../DevicesSearchForm/DevicesSearchForm";
import {DevicesFilter} from "../DevicesFilter/DevicesFilter";
import {authService} from "../../services";
import {Logo} from "../Logo/Logo";
import css from './Header.module.css'


const Header = () => {
    const navigate = useNavigate();

    const {account} = useSelector(state => state.accountReducer);

    const {quantity} = useSelector(state => state.orderReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(accountActions.getByAccess());
    }, [dispatch]);

    useEffect(() => {
        dispatch(categoryActions.getAll());
    }, [dispatch])

    const location = useLocation();
    const loginPathname = location.pathname === '/login';
    const registerPathname = location.pathname === '/register';
    const logoutAll = (_id) => {
        dispatch(orderActions.reset());

        dispatch(accountActions.logoutAll({_id}));

        authService.deleteTokens();

        navigate('/login');
    };

    return (
        <div className={css.header}>
            <div className={css.wrap}>
                <div className={css.logoAndForm}>
                    <Logo/>
                    {
                        (!loginPathname && !registerPathname) && <DevicesSearchForm/>
                    }
                </div>
                {
                    !account ?
                        <div className={css.buttons}>
                            <NavLink to={'/login'}>Login</NavLink>
                            <NavLink to={'/register'}>Register</NavLink>
                        </div>
                        :
                        <div className={css.buttons}>
                            <div className={css.nav}>
                                {!!account?.isAdmin && <NavLink to={'/admin'}>Admin</NavLink>}
                                <NavLink to={'/account'}>Account</NavLink>
                                <NavLink to={'/order'}>Order { quantity !== 0 && <div className={css.quantity}>{quantity}</div>}</NavLink>
                                <button onClick={() => logoutAll(account._id)}>Logout</button>
                            </div>
                        </div>
                }
            </div>
            {
                (!loginPathname && !registerPathname) &&
                <div className={css.filter}>
                    <DevicesFilter/>
                </div>
            }
        </div>
    );
};


export {Header};