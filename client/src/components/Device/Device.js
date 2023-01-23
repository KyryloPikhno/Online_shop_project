import {useNavigate} from "react-router-dom";

import {baseURL} from "../../configs";
import css from './Device.module.css';
import {useSelector} from "react-redux";


const Device = ({device, deleter}) => {
    const navigate = useNavigate()

    const {account} = useSelector(state => state.accountReducer)

    const {name, price, images, _id} = device;
    console.log(account);

    return (
        <div className={css.card}>
            <div className={css.imageBox} onClick={() => navigate(_id)}>
                <img className={css.img}
                     src={`${baseURL}/${images[0]}`}
                     alt={images[0]}/>
            </div>
            <div>Name: {name}</div>
            <div>
                <span>
               $ {price}
                </span>
            </div>
            <div className={css.button}>

            <button>Add to cart</button>
            {
                account.isAdmin &&
                <button onClick={() => deleter(_id)}>Delete</button>
            }
            </div>
        </div>
    );
};

export {Device};