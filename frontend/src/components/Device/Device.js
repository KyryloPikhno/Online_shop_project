import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import { baseURL } from "../../configs"
import { deviceActions, orderActions } from "../../redux/slices"
import deviceDeleterSound from "../../sounds/46c6ae07207785c.mp3"
import deviceAdderSound from "../../sounds/vylet-2.mp3"

import css from "./Device.module.css"

const Device = ({ device }) => {
  const dispatch = useDispatch()

  const { account } = useSelector((state) => state.accountReducer)

  const { name, price, images, _id, countInStock } = device

  const audioAdderSound = new Audio(deviceAdderSound)
  const audioDeleterSound = new Audio(deviceDeleterSound)

  const deviceAdder = () => {
    audioAdderSound.play()

    dispatch(
      orderActions.addDevice({ _id, name, image: images[0], quantity: 1, price, countInStock }),
    )
  }

  const deviceDeleter = () => {
    audioDeleterSound.play()

    dispatch(deviceActions.deleteDevice({ _id }))
  }

  return (
    <div className={css.card}>
      <NavLink to={`/devices/${_id}`} className={css.imageBox}>
        <img className={css.img} src={`${baseURL}/${images[0]}`} alt={images[0]} />
      </NavLink>
      <div>{name}</div>
      <div>
        <span>$ {price}</span>
      </div>
      <div className={css.buttons}>
        <button
          className={countInStock !== 0 ? css.button : css.disabledButton}
          disabled={countInStock === 0}
          onClick={deviceAdder}
        >
          {countInStock !== 0 ? "Add to card" : "Out of stock"}
        </button>
        {account?.isAdmin && (
          <button className={css.button} onClick={deviceDeleter}>
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export { Device }
