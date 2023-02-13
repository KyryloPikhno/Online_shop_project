import {CommonForm} from "../CommonForm/CommonForm";
import {CreateDeviceForm} from "../CreateDeviceForm/CreateDeviceForm";
import css from './Admin.module.css';


const Admin = () => {

    return (
        <div className={css.container}>
            <CommonForm/>
            <CreateDeviceForm/>
        </div>
    );
};

export {Admin};