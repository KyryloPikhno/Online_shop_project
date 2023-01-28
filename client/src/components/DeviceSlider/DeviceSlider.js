import {Swiper,SwiperSlide} from 'swiper/react'

import {baseURL} from "../../configs";
import css from './DeviceSlider.module.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import {useState} from "react";
import { Navigation, Thumbs} from 'swiper'



const DeviceSlider = ({images}) => {

    const [activeThumb, setActiveThumb] = useState();


    return (
        <>
            <Swiper
                navigation={true}
                modules={[Navigation, Thumbs]}
                grabCursor={true}
                thumbs={{swiper: activeThumb}}
            >
                {
                    images && images.map((image, index) => (
                        <SwiperSlide className={css.swiperSlide} key={index}>
                            <img src={`${baseURL}/${image}`} alt={`slide_${index}`}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Swiper
                spaceBetween={10}
                slidesPerView={3}
                modules={[Navigation, Thumbs]}
                onSwiper={setActiveThumb}
            >

                {
                    images && images.map((image, index) => (
                        <SwiperSlide className={css.swiperSlideMini} key={index}>
                            {/*<div className={css.swiperSlideThumb}>*/}
                                <img src={`${baseURL}/${image}`} alt={`slide_${index}`}/>
                            {/*</div>*/}
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </>
    );
};

export {DeviceSlider};