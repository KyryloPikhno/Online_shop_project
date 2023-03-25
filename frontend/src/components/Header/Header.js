import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
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
    }, []);

    useEffect(() => {
        dispatch(categoryActions.getAll());
    }, []);

    const location = useLocation();
    const deviceDetailsPathname = location.pathname === `/devices/${location.pathname.split('/devices/')[1]}`;
    const devicesPathname = location.pathname === '/devices';
    const homePathname = location.pathname === '/home';

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
                        (devicesPathname || homePathname || deviceDetailsPathname) && <DevicesSearchForm/>
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
                (devicesPathname || homePathname || deviceDetailsPathname) &&
                    <DevicesFilter/>
            }
        </div>
    );
};

export {Header};