import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

import {brandActions, categoryActions, colorActions} from "../../redux/slices";
import css from "./CommonForm.module.css";
import {joiResolver} from "@hookform/resolvers/joi";
import {commonValidator} from "../../validators";


const CommonForm = () => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            "category": null,
            "brand": null,
            "color": null,
        },
            resolver: joiResolver(commonValidator),
            mode: 'all',
    })

    const dispatch = useDispatch()

    const submit = async (obj) => {
        const {category, brand, color} = obj

        try {
            if (category) {
                await dispatch(categoryActions.create({category: obj}))
            }

            if (brand) {
                await dispatch(brandActions.create({brand: obj}))
            }

            if (color) {
                await dispatch(colorActions.create({color: obj}))
            }

        } catch (e) {
            console.log(e.message)
        }
    };

    return (
        <div className={css.container}>
            <h3>Add new category</h3>
            <form className={css.formCommon} onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'category'} {...register('category')}/>
                {errors.category && <span>{errors.category.message}</span>}

                <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}>Save</button>
            </form>
            <h3>Add new brand</h3>
            <form className={css.formCommon} onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'brand'} {...register('brand')}/>
                {errors.brand && <span>{errors.brand.message}</span>}

                <button className={!isValid ? css.noValidButton : css.validButton}  disabled={!isValid}>Save</button>
            </form>
            <h3>Add new color</h3>
            <form className={css.formCommon} onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'color'} {...register('color')}/>
                {errors.color && <span>{errors.color.message}</span>}

                <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}>Save</button>
            </form>
        </div>
    );
};

export {CommonForm};