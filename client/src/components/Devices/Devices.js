import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {accountActions, deviceActions} from "../../redux/slices";
import {Device} from "../Device/Device";
import img from '../../img/ios16-iphone13-pro-connect-airpods-max.png'
import css from './Devices.module.css';


const Devices = () => {
    const {devices} = useSelector(state => state.deviceReducer);

    const dispatch = useDispatch()

    const deleter = async (_id) => {
        try {
            await dispatch(deviceActions.deleteDevice({_id}))
        } catch (e) {
            console.log(e.message)
        }
    };

    useEffect(() => {
        dispatch(deviceActions.getAll())
    }, [])

    useEffect(() => {
        dispatch(accountActions.getByAccess())
    }, []);


    return (
        <div className={css.container}>
            <div className={css.block}>
                <div>
                    <div className={css.box}>
                        <h1>
                            <span>
                            ELECTRIFY
                            </span>
                            <br/>
                            YOUR DAY
                        </h1>
                        <div className={css.info}>
                            Shop for electronic devices with us, guaranteed quality, fast delivery and arrived safely to
                            the destination
                        </div>
                        <div className={css.info}>
                            <div>
                                best price
                            </div>
                            <div>
                                fast delivery
                            </div>
                            <div>
                                free guarantee
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <img className={css.img} src={img} alt="banner"/>
                </div>
            </div>
            <div className={css.devices}>
                {devices && devices.map(device => <Device key={device._id} device={device} deleter={deleter}/>)}
            </div>
        </div>
    );
};


export {Devices};