import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {accountActions, categoryActions} from "../../redux/slices";
import {authService} from "../../services";
import css from './Header.module.css'


const Header = () => {
    const navigate = useNavigate()

    const {account, login} = useSelector(state => state.accountReducer);

    const {categories} = useSelector(state => state.categoryReducer);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [])

    const logoutAll = (_id) => {
        dispatch(accountActions.logoutAll({_id}));

        authService.deleteTokens();

        navigate('/login');
    };

    return (
        <div className={css.header}>
            <div className={css.wrap}>
                <div className={css.logoAndForm}>
                <NavLink to={'/devices'}><h1>DigiStore</h1></NavLink>
                {/*{*/}
                {/*    login &&*/}
                {/*    <form>*/}
                {/*        <input type="text"/>*/}
                {/*    </form>*/}
                {/*}*/}
                </div>
                {
                    login ?
                        <div className={css.button}>
                            {
                                (login && account.isAdmin) ?
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
                        :
                        <div className={css.button}>
                            <NavLink to={'/login'}>Login</NavLink>
                            <NavLink to={'/register'}>Register</NavLink>
                        </div>
                }
            </div>
            <div className={css.category}>
                <form>



                </form>
                {/*{*/}
                {/*    categories && categories.map(category => (<button key={category._id}>*/}
                {/*        {category.name}*/}
                {/*    </button>))*/}
                {/*}*/}
            </div>
        </div>
    );

};

export {Header};