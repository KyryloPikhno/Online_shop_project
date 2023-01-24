import {Swiper,SwiperSlide} from 'swiper/react'
import {Navigation, Thumbs} from "swiper";

import {baseURL} from "../../configs";
import css from './DeviceSlider.module.css';


const DeviceSlider = ({images}) => {

    return (
        <>
            <Swiper loop={true} spaceBetween={10} navigation={true} modules={[Navigation, Thumbs]} grabCursor={true}
                    className={css.slider}>
                {images && images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={`${baseURL}/${image}`} alt={`slide_${index}`}/>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper loop={true} spaceBetween={10} slidesPerView={2} modules={[Navigation, Thumbs]} grabCursor={true}
                    className={css.slider}>
                {images && images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={`${baseURL}/${image}`} alt={`slide_${index}`}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export {DeviceSlider};