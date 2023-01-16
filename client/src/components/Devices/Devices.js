import {useEffect, useState} from "react";
import {deviceService} from "../../services";
import {Device} from "../Device/Device";


const Devices = () => {
    const [devices, setDevices] = useState([])

    useEffect(()=>{
        console.log(devices);
        deviceService.getAll().then((response)=>setDevices(response.data))
    },[])

    return (
        <div>
            {devices && devices.map(device=><Device key={device._id}/>)}
        </div>
    );
};

export {Devices};