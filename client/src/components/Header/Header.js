import {NavLink} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import css from './Header.module.css'


const Header = () => {


    return (
        <div className={css.header}>
            <NavLink to={'/home'}>
                <div>Logo</div>
            </NavLink>
            <NavLink to={'/cards'}>
                <div><ShoppingCartIcon/></div>
            </NavLink>
        </div>
    );
};

export {Header};