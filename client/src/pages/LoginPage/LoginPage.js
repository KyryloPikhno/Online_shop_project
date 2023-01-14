import {useForm} from "react-hook-form";
import {authService} from "../../services";
import {useNavigate, useSearchParams} from "react-router-dom";


const LoginPage = () => {
    let {register, handleSubmit} = useForm()

    let navigate = useNavigate()

    let [query] = useSearchParams()

    console.log(query.get('expSession'));

    let submit = async (user) => {
        try {
            let {data} = await authService.login(user)
            authService.setTokens(data)
            navigate('/devices')
        } catch (e) {
            console.log(e)
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