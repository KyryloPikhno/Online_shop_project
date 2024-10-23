import { joiResolver } from "@hookform/resolvers/joi/dist/joi"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"

import { authService } from "../../services"
import { registerValidator } from "../../validators"

import css from "./Register.module.css"

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: null,
      email: null,
      password: null,
    },
    resolver: joiResolver(registerValidator),
    mode: "all",
  })

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const submit = async (user) => {
    try {
      await authService.register(user)

      navigate("/login")
    } catch (e) {
      setError(e.response?.data)
    }
  }

  return (
    <form className={css.form} onSubmit={handleSubmit(submit)}>
      <input type="text" placeholder={"name"} {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}

      <input type="text" placeholder={"email"} {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" placeholder={"password"} {...register("password")} />
      {errors.password && <span>{errors.password.message}</span>}

      {error && <span>{error}</span>}

      <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}>
        Register
      </button>
      <div className={css.link}>
        No account yet?<NavLink to={"/register"}>Sign up</NavLink>
      </div>
    </form>
  )
}

export { Register }
