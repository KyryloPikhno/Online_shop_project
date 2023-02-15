import {CreateDeviceForm} from "../CreateDeviceForm/CreateDeviceForm";
import {BrandForm, CategoryForm, ColorForm} from "../Forms";
import css from './Admin.module.css';


const Admin = () => {

    return (
        <div className={css.container}>
           <CategoryForm/>
            <BrandForm/>
            <ColorForm/>
            <CreateDeviceForm/>
        </div>
    );
};

export {Admin};