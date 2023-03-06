import {joiResolver} from "@hookform/resolvers/joi";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

import {colorValidator} from "../../validators";
import {colorActions} from "../../redux/slices";
import css from "./Forms.module.css";


const ColorForm = () => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            "color": null,
        },
        resolver: joiResolver(colorValidator),
        mode: 'all',
    })

    const dispatch = useDispatch()

    const submit = async (obj) => {
        try {
            if (obj) {
                await dispatch(colorActions.create({color: obj}))
            }
        } catch (e) {
            console.log(e.message)
        }
    };

    return (
        <div className={css.container}>
            <h3>Add new color</h3>
            <form className={css.formCommon} onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'color'} {...register('color')}/>
                {errors.color && <span>{errors.color.message}</span>}
                <button className={!isValid ? css.noValidButton : css.validButton}  disabled={!isValid}>Save</button>
            </form>
        </div>
    );
};

export {ColorForm};