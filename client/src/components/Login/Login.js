import {useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";

import {authService} from "../../services";
import css from './Login.module.css';


const Login = () => {
    let {register, handleSubmit} = useForm()

    let navigate = useNavigate()

    let [query] = useSearchParams()

    let submit = async (user) => {
        try {
            let {data} = await authService.login(user)

            console.log(data.user);

            authService.setTokens(data)

            navigate('/devices')
        } catch (e) {
            console.log(e.message)
        }
    }
    return (
        <div className={css.container}>
            {query.has('expSession') && <h1>session end</h1>}

            <form className={css.form} onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'email'} {...register('email')}/>
                <input type='text' placeholder={'password'} {...register('password')}/>
                <button>Login</button>
            </form>
        </div>
    );
};

export {Login};