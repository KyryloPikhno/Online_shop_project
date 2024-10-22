import {useEffect, useState} from "react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import {green} from "@mui/material/colors";

import img_1 from '../../img/airpods.png';
import img_2 from "../../img/25176458.jpg";
import img_3 from '../../img/watch.png';
import img_4 from '../../img/IPad.png';
import img_5 from '../../img/airpods-compare-airpods-max-202209.jpeg';
import img_6 from '../../img/imac24-digitalmat-gallery-2-202111.png';
import img_7 from '../../img/studio-display-digitalmat-gallery-1-202203.png';
import img_8 from '../../img/MQDY3ref_VW_PF+watch-49-titanium-ultra_VW_PF_WF_CO+watch-face-49-alpine-ultra_VW_PF_WF_CO.jpeg';
import img_9 from '../../img/macbook-air-digitalmat-gallery-1-202206.png';
import img_10 from '../../img/mac-mini-hero-202301.jpeg';
import img_11 from '../../img/1679585769035_2526430.jpeg';
import img_12 from '../../img/MMMQ3_AV1.jpeg';
import img_13 from '../../img/260739937.jpg';
import css from './Banner.module.css';
 

const Banner = () => {
    const images = [img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9, img_10, img_11, img_12, img_13];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex) =>
                currentIndex === images.length - 1 ? 0 : currentIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={css.block}>
            <div>
                <div className={css.box}>
                    <h1>
                            <span>
                            ELECTRIFY
                            </span>
                        <br/>
                        YOUR DAY
                    </h1>
                    <div className={css.inform}>
                        Store for electronic devices with us, guaranteed quality, fast delivery and arrived safely to
                        the destination
                    </div>
                    <div className={css.info}>
                        <div className={css.infoBox}>
                            <PriceCheckIcon sx={{color: green[400]}}/>
                            best price
                        </div>
                        <div className={css.infoBox}>
                            <WorkspacePremiumIcon sx={{color: green[400]}}/>
                            free guarantee
                        </div>
                        <div className={css.infoBox}>
                            <DeliveryDiningIcon sx={{color: green[400]}}/>
                            fast delivery
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img src={images[currentIndex]} alt={images[currentIndex]}/>
            </div>
        </div>
    );
};

export {Banner};