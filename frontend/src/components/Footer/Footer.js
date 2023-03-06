import css from './Footer.module.css'
import {Logo} from "../Logo/Logo";


const Footer = () => {

    return (
        <div className={css.footer}>
            <div className={css.logo}>
               <Logo/>
            </div>
            <div>

            </div>
        </div>
    );
};

export {Footer};