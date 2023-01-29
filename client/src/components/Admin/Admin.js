import {CategoryForm} from "../CategoryForm/CategoryForm";
import {CreateDeviceForm} from "../CreateDeviceForm/CreateDeviceForm";
import css from './Admin.module.css';


const Admin = () => {

    return (
        <div className={css.container}>
            <CategoryForm/>
            <CreateDeviceForm/>
        </div>
    );
};

export {Admin};