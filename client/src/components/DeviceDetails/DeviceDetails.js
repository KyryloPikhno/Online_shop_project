import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {accountActions, deviceActions} from "../../redux/slices";
import {DeviceSlider} from "../DeviceSlider/DeviceSlider";
import css from './DeviceDetails.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


const DeviceDetails = () => {
    const {id} = useParams()

    const {device} = useSelector(state => state.deviceReducer)

    const dispatch = useDispatch()

    const {name, price, category, brand, color, createdAt, description, images} = device;

    useEffect(() => {
        dispatch(deviceActions.getById({id}))

        dispatch(accountActions.getByAccess())

    }, [])
    console.log(device);

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
                    {createdAt && <div>created: {createdAt.slice(0,10)}</div>}
                    {description && <div>{description}</div>}
                </div>
                <div className={css.buttons}>
                    <button>Add to card</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
};

export {DeviceDetails};