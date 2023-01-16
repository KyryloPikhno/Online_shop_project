import {NavLink} from "react-router-dom";

import css from './Header.module.css'


const Header = () => {

    return (
        <div className={css.header}>
            <NavLink to={'/devices'}><h1>Logo</h1></NavLink>
            {
                localStorage.getItem('access') ?
                    <div className={css.button}>
                        <NavLink to={'/account'}>Account</NavLink>
                        <NavLink to={'/order'}>
                            Order
                        </NavLink>
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