import { joiResolver } from "@hookform/resolvers/joi/dist/joi"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { NavLink, useNavigate, useSearchParams } from "react-router-dom"

import { accountActions } from "../../redux/slices"
import { authService } from "../../services"
import { loginValidator } from "../../validators"

import css from "./Login.module.css"

const Login = () => {
  const [error, setError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: null,
      password: null,
    },
    resolver: joiResolver(loginValidator),
    mode: "all",
  })

  const [query] = useSearchParams()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  let submit = async (user) => {
    try {
      const { data } = await authService.login(user)

      authService.setTokens(data)

      dispatch(accountActions.getByAccess())

      navigate("/home")
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className={css.container}>
      {query.has("expSession") && <h1>Session end</h1>}

      <form className={css.form} onSubmit={handleSubmit(submit)}>
        <input type="text" placeholder={"email"} {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        <input type="password" placeholder={"password"} {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}

        {error && <span>Wrong email or password. {error}</span>}

        <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}>
          Login
        </button>
        <NavLink to={"/password/forgot"}>Forgot your password?</NavLink>
      </form>
    </div>
  )
}

export { Login }
