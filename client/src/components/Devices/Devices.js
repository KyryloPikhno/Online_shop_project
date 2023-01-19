import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {deviceActions} from "../../redux/slices";
import {Device} from "../Device/Device";
import css from './Devices.module.css';


const Devices = () => {
    const {devices} = useSelector(state => state.deviceReducer);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(deviceActions.getAll())
    }, [dispatch])

    return (
        <div className={css.container}>
            {devices && devices.map(device => <Device key={device._id} device={device}/>)}
        </div>
    );
};

export {Devices};