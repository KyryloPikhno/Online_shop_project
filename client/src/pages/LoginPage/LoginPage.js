import {useNavigate, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";

import {authService} from "../../services";


const LoginPage = () => {
    let {register, handleSubmit} = useForm()

    let navigate = useNavigate()

    let [query] = useSearchParams()

    let submit = async (user) => {
        try {
            let {data} = await authService.login(user)

            authService.setTokens(data)

            console.log(data);

            navigate('/devices')
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div>
            {query.has('expSession') && <h1>session end</h1>}

            <form onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'email'} {...register('email')}/>
                <input type='text' placeholder={'password'} {...register('password')}/>
                <button>Login</button>
            </form>
        </div>
    );
};

export {LoginPage};