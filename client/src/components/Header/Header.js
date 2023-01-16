import {NavLink} from "react-router-dom";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useSelector} from "react-redux";

import css from './Header.module.css'


const Header = () => {
    const {devices} = useSelector(state => state.deviceReducer);

    return (
        <div className={css.header}>
            <NavLink to={'/devices'}><h1>Logo</h1></NavLink>
            {
                devices.length !== 0?
            <NavLink to={'/order'}>
                Order
                {/*<div>*/}
                {/*    <ShoppingCartIcon fontSize={'medium'}/>*/}
                {/*</div>*/}
            </NavLink>
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