import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";

import {authService} from "../../services";


const RegisterPage = () => {
    let {register, handleSubmit} = useForm()

    let [error, setError] = useState(null)

    let navigate = useNavigate()

    let submit = async (user) => {
        try {
            await authService.register(user)
            navigate('/login')
        } catch (e) {
            setError(e.response.data?.name)
        }
    }


    return (
        <form onSubmit={handleSubmit(submit)}>
            <input type='text' placeholder={'name'} {...register('name')}/>
            <input type='text' placeholder={'email'} {...register('email')}/>
            <input type='text' placeholder={'password'} {...register('password')}/>
            <button>Register</button>
            {error && <h3>{error}</h3>}
        </form>
    );
};

export {RegisterPage};