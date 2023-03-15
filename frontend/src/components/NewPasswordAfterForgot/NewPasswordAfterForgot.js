import {useSearchParams} from "react-router-dom";
import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";

import {passwordForgotService} from "../../services";
import {newPasswordValidator} from "../../validators";
import css from './NewPasswordAfterForgot.module.css';


const NewPasswordAfterForgot = () => {
    const [query] = useSearchParams();

    let {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            "password": null,
            "password_confirmation": null,
        },
        resolver: joiResolver(newPasswordValidator),
        mode: 'all'
    })

    const _actionTokenKey = 'action';
    let submit = async (password) => {
        try {
            localStorage.setItem(_actionTokenKey, query.get('token').toString());

            passwordForgotService.forgotPasswordAfterForgot(password);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form className={css.form} onSubmit={handleSubmit(submit)}>
            <h1>Reset your password</h1>
            <p>Enter your new password. After confirming, you will be asked to log in again.</p>
            <input type='text' placeholder={'password'} {...register('password')}/>
            {errors.password && <span>{errors.password.message}</span>}

            <input type='text' placeholder={'confirm new password'} {...register('password_confirmation')}/>
            {errors.password_confirmation && <span>{errors.password_confirmation.message}</span>}

            <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}>Reset password
            </button>
        </form>
    );
};

export {NewPasswordAfterForgot};