import {joiResolver} from "@hookform/resolvers/joi";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

import {brandValidator} from "../../validators";
import {brandActions} from "../../redux/slices";
import css from "./Forms.module.css";


const BrandForm = () => {
    const {register, reset, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            "brand": null,
        },
        resolver: joiResolver(brandValidator),
        mode: 'all',
    });

    const dispatch = useDispatch();

    const submit = async (obj) => {
        try {
            if (obj) {
                await dispatch(brandActions.create({brand: obj}));
                reset();
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className={css.container}>
            <h3>Add new brand</h3>
            <form className={css.formCommon} onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'brand'} {...register('brand')}/>
                {errors.brand && <span>{errors.brand.message}</span>}
                <button className={!isValid ? css.noValidButton : css.validButton}  disabled={!isValid}>Save</button>
            </form>
        </div>
    );
};

export {BrandForm};