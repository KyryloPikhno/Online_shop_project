import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

import {accountActions, deviceActions, orderActions} from "../../redux/slices";
import {DeviceSlider} from "../DeviceSlider/DeviceSlider";
import css from './DeviceDetails.module.css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css';


const DeviceDetails = () => {
    const {id} = useParams();

    const {device} = useSelector(state => state.deviceReducer);

    const {account} = useSelector(state => state.accountReducer);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {_id, name, price, countInStock, category, brand, color, createdAt, description, images} = device;

    useEffect(() => {
        dispatch(deviceActions.getById({id}));
        dispatch(accountActions.getByAccess());
    }, []);

    const deviceAdder = () => {
        dispatch(orderActions.addDevice({_id, name, image: images[0], quantity: 1, price, countInStock}));
    };

    const deleter = () => {
        dispatch(deviceActions.deleteDevice({_id}));

        navigate('/devices');
    };

    return (
        <div className={css.container}>
            <div className={css.slider}>
                <DeviceSlider images={images}/>
            </div>
            <div className={css.box}>
                {name && <h2>{name}</h2>}
                {price && <h2 className={css.price}>$ {price}</h2>}
                <div>Free delivery in Ukraine and Kyiv with self-delivery</div>
                <hr/>
                <div className={css.info}>
                    {category && <div>category: {category.name}</div>}
                    {brand && <div>brand: {brand.name}</div>}
                    {color && <div>color: {color.name}</div>}
                    {countInStock && <div>Count in stock: {countInStock}</div>}
                    {createdAt && <div>created: {createdAt.slice(0, 10)}</div>}
                    {description && <div>{description}</div>}
                </div>
                <div className={css.buttons}>
                        <button className={countInStock !== 0 ? css.button : css.disabledButton} disabled={countInStock === 0} onClick={deviceAdder}>Add to card</button>
                    {
                        account.isAdmin &&
                        <button className={css.button} onClick={deleter}>Delete</button>
                    }
                </div>
            </div>
        </div>
    );
};

export {DeviceDetails};