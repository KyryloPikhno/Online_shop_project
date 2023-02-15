import {CreateDeviceForm} from "../CreateDeviceForm/CreateDeviceForm";
import {BrandForm, CategoryForm, ColorForm} from "../Forms";
import {Categories} from "../Categoties/Categories";
import {Brands} from "../Brands/Brands";
import {Colors} from "../Colors/Colors";
import css from './Admin.module.css';


const Admin = () => {

    return (
        <div className={css.container}>
            <div className={css.block}>
                <Categories/>
                <Brands/>
                <Colors/>
            </div>
            <div className={css.block}>
                <div className={css.wrap}>
                    <CategoryForm/>
                    <BrandForm/>
                    <ColorForm/>
                </div>
                <div>
                    <CreateDeviceForm/>
                </div>
            </div>
        </div>
    );
};

export {Admin};