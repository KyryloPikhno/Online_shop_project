import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

import {categoryValidator} from "../../validators";
import {categoryActions} from "../../redux/slices";
import css from "./Forms.module.css";


const CategoryForm = () => {
    const {register, reset, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            "category": null,
        },
        resolver: joiResolver(categoryValidator),
        mode: 'all',
    });

    const dispatch = useDispatch();

    const submit = async (obj) => {
        try {
            if (obj) {
                await dispatch(categoryActions.create({category: obj}));
                reset();
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className={css.container}>
            <h3>Add new category</h3>
            <form className={css.formCommon} onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'Category'} {...register('category')}/>
                {errors.category && <span>{errors.category.message}</span>}
                <button className={!isValid ? css.noValidButton : css.validButton}  disabled={!isValid}>Save</button>
            </form>
        </div>
    );
};

export {CategoryForm};