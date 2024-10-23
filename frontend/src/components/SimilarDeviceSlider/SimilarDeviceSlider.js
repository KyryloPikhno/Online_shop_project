import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper.min.css"

import { Device } from "../Device/Device"

import css from "./SimilarDeviceSlider.module.css"

const SimilarDeviceSlider = ({ similarDevices }) => {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      slidesPerGroup={4}
      loop={true}
      loopFillGroupWithBlank={true}
    >
      {!!similarDevices.length &&
        similarDevices.map((device) => (
          <SwiperSlide key={device.id}>
            <div className={css.device}>
              <Device device={device} />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export { SimilarDeviceSlider }
