import {Logo} from "../Logo/Logo";
import css from './Footer.module.css'


const Footer = () => {

    return (
        <div className={css.footer}>
            <div>
               <Logo/>
            </div>
            <div>

            </div>
        </div>
    );
};

export {Footer};