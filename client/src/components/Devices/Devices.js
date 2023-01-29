import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import {green} from "@mui/material/colors";

import {accountActions, deviceActions} from "../../redux/slices";
import {PaginationDevice} from "../PaginationDevice/PaginationDevice";
import {Device} from "../Device/Device";
import img from '../../img/ios16-iphone13-pro-connect-airpods-max.png'
import css from './Devices.module.css';


const Devices = () => {
    const {devicesResponse} = useSelector(state => state.deviceReducer);

    const dispatch = useDispatch()

    const deleter = async (_id) => {
        try {
            await dispatch(deviceActions.deleteDevice({_id}))
        } catch (e) {
            console.log(e.message)
        }
    };

    useEffect(() => {
        dispatch(deviceActions.getAll({page:3}))
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
                            <div className={css.infoBox}>
                                <PriceCheckIcon sx={{color: green[400]}}/>
                                best price
                            </div>
                            <div className={css.infoBox}>
                                <WorkspacePremiumIcon sx={{color: green[400]}}/>
                                free guarantee
                            </div>
                            <div className={css.infoBox}>
                                <DeliveryDiningIcon sx={{color: green[400]}}/>
                                fast delivery
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <img className={css.img} src={img} alt="banner"/>
                </div>
            </div>
            <div className={css.devices}>
                {devicesResponse.devices && devicesResponse.devices.map(device => <Device key={device._id}
                                                                                          device={device}
                                                                                          deleter={deleter}/>)}
            </div>
            {
                (devicesResponse.total_pages && devicesResponse.page) &&
                <PaginationDevice total_pages={devicesResponse.total_pages} page={devicesResponse.page}/>
            }
        </div>
    );
};


export {Devices};