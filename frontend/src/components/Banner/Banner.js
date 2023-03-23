import {useEffect, useState} from "react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import {green} from "@mui/material/colors";

import airpodsImg from '../../img/airpods.png';
import iphoneImg from "../../img/iphone13.png";
import watchImg from '../../img/watch.png';
import ipodImg from '../../img/IPad.png';
import macImg from '../../img/mac.png';
import css from './Banner.module.css';


const images = [
    airpodsImg,
    iphoneImg,
    watchImg,
    ipodImg,
    macImg,
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex) =>
                currentIndex === images.length - 1 ? 0 : currentIndex + 1
            );
        }, 10000);
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
                    <div className={css.info}>
                        Shop for electronic devices with us, guaranteed quality, fast delivery and arrived safely to
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