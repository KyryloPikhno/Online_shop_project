import {NavLink, useNavigate, useSearchParams} from "react-router-dom";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {useForm} from "react-hook-form";

import {accountActions} from "../../redux/slices";
import {loginValidator} from "../../validators";
import {authService} from "../../services";
import css from './Login.module.css';


const Login = () => {
    const [error, setError] = useState(false);

    const {register, handleSubmit, formState: {errors, isValid}} = useForm(
        {
            defaultValues: {
                "email": null,
                "password": null,
            },
            resolver: joiResolver(loginValidator),
            mode: 'all'
        }
    );

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [query] = useSearchParams();

    let submit = async (user) => {
        try {
            const {data} = await authService.login(user);

            authService.setTokens(data);

            dispatch(accountActions.getByAccess());

            navigate('/devices');
        } catch (e) {
            setError(e.message)
        }
    }
    return (
        <div className={css.container}>
            {query.has('expSession') && <h1>session end</h1>}

            <form className={css.form} onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'email'} {...register('email')}/>
                {errors.email && <span>{errors.email.message}</span>}

                <input type='text' placeholder={'password'} {...register('password')}/>
                {errors.password && <span>{errors.password.message}</span>}

                {error && <span>Wrong email or password. {error}</span>}

                <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}>Login</button>
                <NavLink to={'/password/forgot'}>Forgot your password?</NavLink>
            </form>
        </div>
    );
};

export {Login};