import {passwordForgotService} from "../../services";
import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";

import {newPasswordValidator} from "../../validators";
import css from './NewPasswordAfterForgot.module.css';


const NewPasswordAfterForgot = () => {
    let {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            "password": null,
            "password_confirmation": null,
        },
        resolver: joiResolver(newPasswordValidator),
        mode: 'all'
    })

    let submit = async (passwords) => {
        try {

            console.log(passwords);

        } catch (e) {
            console.log(e)
        }
    };

    console.log(isValid);

    return (
            <form className={css.form} onSubmit={handleSubmit(submit)}>
                <h1>Reset your password</h1>
                <p>Enter your new password. After confirming, you will be asked to log in again.</p>
                <input type='text' placeholder={'password'} {...register('password')}/>
                {errors.password && <span>{errors.password.message}</span>}

                <input type='text' placeholder={'confirm new password'} {...register('password_confirmation')}/>
                {errors.password_confirmation && <span>{errors.password_confirmation.message}</span>}

                <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}>Reset password</button>
            </form>
    );
};

export {NewPasswordAfterForgot};