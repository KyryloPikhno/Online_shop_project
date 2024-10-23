import { joiResolver } from "@hookform/resolvers/joi/dist/joi"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { colorActions } from "../../redux/slices"
import { colorValidator } from "../../validators"

import css from "./Forms.module.css"

const ColorForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      color: null,
    },
    resolver: joiResolver(colorValidator),
    mode: "all",
  })

  const dispatch = useDispatch()

  const submit = async (obj) => {
    try {
      if (obj) {
        await dispatch(colorActions.create({ color: obj }))
        reset()
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className={css.container}>
      <h3>Add new color</h3>
      <form className={css.formCommon} onSubmit={handleSubmit(submit)}>
        <input type="text" placeholder={"Color"} {...register("color")} />
        {errors.color && <span>{errors.color.message}</span>}
        <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}>
          Save
        </button>
      </form>
    </div>
  )
}

export { ColorForm }
