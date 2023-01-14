import {NavLink} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import css from './Header.module.css'


const Header = () => {


    return (
        <div className={css.header}>
            <NavLink to={'/devices'}><h1>Logo</h1></NavLink>
            <NavLink to={'/order'}>
                <div>
                    <ShoppingCartIcon fontSize={'medium'}/>
                </div>
            </NavLink>
            <div className={css.button}>
                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/register'}>Register</NavLink>
            </div>
        </div>
    );
};

export {Header};