import moment from "moment/moment"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { accountActions, deviceActions, orderActions } from "../../redux/slices"
import deviceDeleterSound from "../../sounds/46c6ae07207785c.mp3"
import deviceAdderSound from "../../sounds/vylet-2.mp3"
import { DeviceImgSlider } from "../DeviceImgSlider/DeviceImgSlider"
import { SimilarDeviceSlider } from "../SimilarDeviceSlider/SimilarDeviceSlider"

import css from "./DeviceImgSlide.module.css"

const DeviceDetails = () => {
  const { id } = useParams()

  const { device, similarDevices, error, loading } = useSelector((state) => state.deviceReducer)

  const { account } = useSelector((state) => state.accountReducer)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { _id, name, price, countInStock, category, brand, color, createdAt, description, images } =
    device

  useEffect(() => {
    dispatch(deviceActions.getById({ id }))

    dispatch(accountActions.getByAccess())

    window.scrollTo(0, 0)
  }, [id])

  const audioAdderSound = new Audio(deviceAdderSound)
  const audioDeleterSound = new Audio(deviceDeleterSound)

  const deviceAdder = () => {
    audioAdderSound.play()

    dispatch(
      orderActions.addDevice({ _id, name, image: images[0], quantity: 1, price, countInStock }),
    )
  }

  const deleter = () => {
    audioDeleterSound.play()

    dispatch(deviceActions.deleteDevice({ _id }))

    navigate("/devices")
  }

  useEffect(() => {
    if (category && _id) {
      dispatch(deviceActions.getSimilarDevices({ categoryId: category._id, deviceId: _id }))
    }
  }, [category, _id])

  return (
    <div className={css.container}>
      {error && <span className={css.error}>{error.message}</span>}
      {loading ? (
        <div className={css.loader}></div>
      ) : (
        <div className={css.oneMoreContainer}>
          <div className={css.slider}>
            <DeviceImgSlider images={images} />
          </div>
          <div className={css.box}>
            {name && <h2>{name}</h2>}
            {price && <h2 className={css.price}>$ {price}</h2>}
            <div>Free delivery in Ukraine and Kyiv with self-delivery</div>
            <hr />
            <div className={css.info}>
              {category && <div>Category: {category.name}</div>}
              {brand && <div>Brand: {brand.name}</div>}
              <div className={css.colorBox}>
                {color && <div>Color: {color.name}</div>}
                {color && <div className={css.color} style={{ background: color.name }}></div>}
              </div>
              {countInStock && <div>Count in stock: {countInStock} pieces</div>}
              <div>Created: {createdAt && moment(createdAt).format("dd/mm/yy HH:mm:ss")}</div>
              {description && (
                <div className={css.desc}>
                  Description:
                  <br />
                  {description}
                </div>
              )}
            </div>
            <div className={css.buttons}>
              <button
                className={countInStock !== 0 ? css.button : css.disabledButton}
                disabled={countInStock === 0}
                onClick={deviceAdder}
              >
                {countInStock !== 0 ? "Add to card" : "Device is out of stock"}
              </button>
              {account?.isAdmin && (
                <button className={css.button} onClick={deleter}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className={css.similarDevices}>
        {!!similarDevices.length && <h1>Similar devices</h1>}
        <SimilarDeviceSlider similarDevices={similarDevices} />
      </div>
    </div>
  )
}

export { DeviceDetails }
