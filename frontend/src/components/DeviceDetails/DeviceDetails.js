import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import moment from "moment/moment";

import {accountActions, deviceActions, orderActions} from "../../redux/slices";
import deviceDeleterSound from '../../sounds/46c6ae07207785c.mp3'
import deviceAdderSound from '../../sounds/vylet-2.mp3'
import {DeviceSlider} from "../DeviceSlider/DeviceSlider";
import css from './DeviceDetails.module.css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css';


const DeviceDetails = () => {
    const {id} = useParams();

    const {device, error, loading} = useSelector(state => state.deviceReducer);

    const {account} = useSelector(state => state.accountReducer);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {_id, name, price, countInStock, category, brand, color, createdAt, description, images} = device;

    useEffect(() => {
        dispatch(deviceActions.getById({id}));

        dispatch(accountActions.getByAccess());

        window.scrollTo(0, 0);
    }, []);

    const audioAdderSound = new Audio(deviceAdderSound);
    const audioDeleterSound = new Audio(deviceDeleterSound);

    const deviceAdder = () => {
        audioAdderSound.play();

        dispatch(orderActions.addDevice({_id, name, image: images[0], quantity: 1, price, countInStock}));
    };


    const deleter = () => {
        audioDeleterSound.play();

        dispatch(deviceActions.deleteDevice({_id}));

        navigate('/devices');
    };


    return (
        <div className={css.container}>
            {error && <span className={css.error}>{error.message}</span>}

            <div className={css.slider}>
                <DeviceSlider images={images}/>
            </div>
            <div className={css.box}>
                {name && <h2>{name}</h2>}
                {price && <h2 className={css.price}>$ {price}</h2>}
                <div>Free delivery in Ukraine and Kyiv with self-delivery</div>
                <hr/>
                <div className={css.info}>
                    {category && <div>Category: {category.name}</div>}
                    {brand && <div>Brand: {brand.name}</div>}
                    {color && <div>Color: {color.name}</div>}
                    {countInStock && <div>Count in stock: {countInStock}</div>}
                    <div>Created: {createdAt && moment(createdAt).format("dd/mm/yy HH:mm:ss")}</div>
                    {description && <div>Description: {description}</div>}
                </div>
                <div className={css.buttons}>
                    <button className={countInStock !== 0 ? css.button : css.disabledButton}
                            disabled={countInStock === 0}
                            onClick={deviceAdder}>{countInStock !== 0 ? 'Add to card' : 'Device is out of stock'}</button>
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