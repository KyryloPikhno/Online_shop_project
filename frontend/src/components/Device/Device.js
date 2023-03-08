import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {deviceActions, orderActions} from "../../redux/slices";
import {baseURL} from "../../configs";
import css from './Device.module.css';


const Device = ({device}) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {account} = useSelector(state => state.accountReducer);

    const {name, price, images, _id} = device;

    const deviceAdder = () => {
        dispatch(orderActions.addDevice({_id, name, image: images[0], quantity: 1, price}));
    };

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
                <button onClick={deviceAdder}>Add to cart</button>
                {
                    account.isAdmin &&
                    <button onClick={() => dispatch(deviceActions.deleteDevice({_id}))}>Delete</button>
                }
            </div>
        </div>
    );
};

export {Device};