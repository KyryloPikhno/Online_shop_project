import {NavLink} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import css from './Header.module.css'


const Header = () => {


    return (
        <div className={css.header}>
            <NavLink to={'/home'}><h1>Logo</h1></NavLink>
            <NavLink to={'/cards'}>
                <div>
                    <ShoppingCartIcon fontSize={'medium'}/>
                </div>
            </NavLink>
        </div>
    );
};

export {Header};