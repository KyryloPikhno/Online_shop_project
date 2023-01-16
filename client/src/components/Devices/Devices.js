import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {deviceActions} from "../../redux/slices/device.slice";
import {Device} from "../Device/Device";


const Devices = () => {
    const {devices} = useSelector(state => state.deviceReducer);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(deviceActions.getAll())
    }, [])

    return (
        <div>
            {devices && devices.map(device => <Device key={device._id}/>)}
        </div>
    );
};

export {Devices};