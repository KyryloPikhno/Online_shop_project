import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {authService} from "../../services";
import css from './Register.module.css';


const Register = () => {
    let {register, handleSubmit} = useForm()

    let [error, setError] = useState(null)

    let navigate = useNavigate()

    let submit = async (user) => {
        try {
            await authService.register(user)

            navigate('/login')
        } catch (e) {
            setError(e.response?.data)
        }
    }

    return (
        <form className={css.form} onSubmit={handleSubmit(submit)}>
            <input type='text' placeholder={'name'} {...register('name')}/>
            <input type='text' placeholder={'email'} {...register('email')}/>
            <input type='text' placeholder={'password'} {...register('password')}/>
            <button>Register</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export {Register};