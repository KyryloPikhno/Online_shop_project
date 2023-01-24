import {useParams} from "react-router-dom";


const DeviceDetails = () => {
    const {id} = useParams()

    console.log(id);

    return (
        <div>
            DeviceDetails
        </div>
    );
};

export {DeviceDetails};