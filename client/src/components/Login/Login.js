import {NavLink, useNavigate, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";

import {authService} from "../../services";
import css from './Login.module.css';


const Login = () => {
    const {register, handleSubmit} = useForm();

    const navigate = useNavigate();

    const [query] = useSearchParams();

    let submit = async (user) => {
        try {
            const {data} = await authService.login(user);

            authService.setTokens(data);

            navigate('/devices');
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <div className={css.container}>
            {query.has('expSession') && <h1>session end</h1>}

            <form className={css.form} onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'email'} {...register('email')}/>
                <input type='text' placeholder={'password'} {...register('password')}/>

                <button>Login</button>
                <NavLink to={'/password/forgot'}>Forgot your password?</NavLink>
            </form>
        </div>
    );
};

export {Login};