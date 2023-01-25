import {NavLink, useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {accountActions} from "../../redux/slices";
import {authService} from "../../services";
import css from './Header.module.css'


const Header = () => {
    const navigate = useNavigate()

    const {account, login} = useSelector(state => state.accountReducer);

    const dispatch = useDispatch()

    const logoutAll = (_id) => {
        dispatch(accountActions.logoutAll({_id}))

        authService.deleteTokens()

        navigate('/login')
    };

    return (
        <div className={css.header}>


            <NavLink to={'/devices'}><h1>DigiStore</h1></NavLink>
            {
                login ?
                    <div className={css.button}>
                        {
                            (account.isAdmin) ?
                                <div className={css.nav}>
                                    <NavLink to={'/admin'}>Admin</NavLink>
                                    <NavLink to={'/account'}>Account</NavLink>
                                    <NavLink to={'/order'}>Order</NavLink>
                                    <button  onClick={() => logoutAll(account._id)}>Logout</button>
                                </div>
                                :
                                <div className={css.nav}>
                                    <NavLink to={'/account'}>Account</NavLink>
                                    <NavLink to={'/order'}>Order</NavLink>
                                    <button  onClick={() => logoutAll(account._id)}>Logout</button>
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