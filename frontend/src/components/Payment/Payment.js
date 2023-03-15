import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {joiResolver} from "@hookform/resolvers/joi";
import {Box, Modal} from "@mui/material";
import {useForm} from "react-hook-form";

import {paymentValidator} from "../../validators";
import {orderActions} from "../../redux/slices";
import imgMaster from '../../img/mastercard.png';
import imgChip from '../../img/card.png';
import css from './Payment.module.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 34,
    p: 4,
    borderRadius:5
};

const Payment = () => {
    const {orderId} = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const {orderStatus, error} = useSelector(state => state.orderReducer);

    const {register, handleSubmit, formState: {errors, isValid}} = useForm(
        {
            resolver: joiResolver(paymentValidator),
            mode: 'all'
        }
    );

    let submit = async (orderInfo) => {
        try {
            await dispatch(orderActions.update({orderId,  orderInfo}));

            setOpen(true);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (orderStatus) {
            dispatch(orderActions.reset());
        }
    }, [orderStatus]);

    return (
        <div className={css.container}>
            <form onSubmit={handleSubmit(submit)} className={css.form}>
                <div className={css.card}>
                    <img className={css.imgChip} src={imgChip} alt={imgChip}/>
                    <img className={css.imgMaster} src={imgMaster} alt={imgMaster}/>

                    <input className={css.cardInput} type="number"
                           placeholder={'Enter card number'} {...register('card')}/>
                    {errors.card && <span>{errors.card.message}</span>}

                    <input className={css.dayInput} type="number" placeholder={'Month'} {...register('month')}/>
                    {errors.month && <span>{errors.month.message}</span>}

                    <input className={css.monthInput} type="number" placeholder={'Year'} {...register('year')}/>
                    {errors.year && <span>{errors.year.message}</span>}
                </div>

                <div className={css.box}>
                    <input className={css.inputBox} type="text" placeholder={'Country'} {...register('country')}/>
                    {errors.country && <span>{errors.country.message}</span>}

                    <input className={css.inputBox} type="text" placeholder={'City'} {...register('city')}/>
                    {errors.city && <span>{errors.city.message}</span>}

                    <input className={css.inputZip} type="text" placeholder={'Zip'} {...register('zip')}/>
                    {errors.zip && <span>{errors.zip.message}</span>}
                </div>

                <input className={css.input} type="text" placeholder={'Address'} {...register('address')}/>
                {errors.address && <span>{errors.address.message}</span>}

                <input className={css.input} type="text" placeholder={'Phone'} {...register('phone')}/>
                {errors.phone && <span>{errors.phone.message}</span>}

                <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}>Pay for it
                </button>
                {error && <span>{error.message}</span>}
            </form>
            <Modal
                keepMounted
                open={open}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className={css.modal}>
                        <h1>Success 😊</h1>
                        <div className={css.buttons}>
                            <button className={css.button} onClick={() => navigate('/account')}>Go to account</button>
                            <button className={css.button} onClick={() => navigate('/devices')}>Continue shopping
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export {Payment};