import {BrandForm} from "../BrandForm/BrandForm";
import {CreateDeviceForm} from "../CreateDeviceForm/CreateDeviceForm";
import css from './Admin.module.css';


const Admin = () => {

    return (
        <div className={css.container}>
            <BrandForm/>
            <CreateDeviceForm/>
        </div>
    );
};

export {Admin};