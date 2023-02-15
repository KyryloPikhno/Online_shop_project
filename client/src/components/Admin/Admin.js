import {CreateDeviceForm} from "../CreateDeviceForm/CreateDeviceForm";
import {BrandForm, CategoryForm, ColorForm} from "../Forms";
import {Categories} from "../Categoties/Categories";
import css from './Admin.module.css';


const Admin = () => {

    return (
        <div className={css.container}>
            <Categories/>
            <CategoryForm/>
            <BrandForm/>
            <ColorForm/>
            <CreateDeviceForm/>
        </div>
    );
};

export {Admin};