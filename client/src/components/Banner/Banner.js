import css from './Banner.module.css';
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import {green} from "@mui/material/colors";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import img from "../../img/ios16-iphone13-pro-connect-airpods-max.png";

const Banner = () => {

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
                <img className={css.img} src={img} alt="banner"/>
            </div>
        </div>
    );
};

export {Banner};