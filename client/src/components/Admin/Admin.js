import {CategoryForm} from "../CategoryForm/CategoryForm";
import {DeviceForm} from "../DeviceForm/DeviceForm";
import css from './Admin.module.css';


const Admin = () => {

    return (
        <div className={css.container}>
            <CategoryForm/>
            <DeviceForm/>
        </div>
    );
};

export {Admin};