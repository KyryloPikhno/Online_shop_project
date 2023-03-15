import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {accountActions, orderActions} from "../../redux/slices";
import {baseURL} from "../../configs";
import css from './Order.module.css';


const Order = () => {
    const {account} = useSelector(state => state.accountReducer);

    const {deviceList, totalPrice, quantity, error, orderInfo, loading} = useSelector(state => state.orderReducer);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(accountActions.getByAccess());
    }, []);

    const orderCreator = () => {
        try {
            dispatch(orderActions.create({
                orderInfo: {
                    user: account._id,
                    deviceList,
                    totalPrice,
                }
            }));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (!error && orderInfo._id) {
            navigate(`payment/${orderInfo._id}`);
            dispatch(orderActions.reset());
        }
    }, [error, orderInfo]);

    const incrementDevice = (device) => {
        dispatch(orderActions.addDevice(device));
    };

    const decrementDevice = (_id) => {
        dispatch(orderActions.removeDevice(_id));
    };

    const deleteDevice = (_id) => {
        dispatch(orderActions.deleteDevice(_id));
    };

    const removeOrder = () => {
        dispatch(orderActions.reset());
    };

    return (
        <div className={css.container}>
            {!!deviceList.length && <h1>Order by <span className={css.username}>{account.name}</span></h1>
            } {
            !!deviceList.length ?
                deviceList.map(device => (
                    <div key={device._id} className={css.device}>
                        <div className={css.imgBox}><img src={`${baseURL}/${device.image}`} alt=""/></div>
                        <div className={css.property}>id: {device._id.slice(-4)}</div>
                        <div className={css.property}>Name: {device.name}</div>
                        <div className={css.property}>Price: {device.price}</div>
                        <div className={css.property}>Quantity: {device.quantity}
                            <div className={css.buttons}>
                                {
                                    <button onClick={() => incrementDevice(device)}>▲</button>
                                }
                                <button onClick={() => decrementDevice(device._id)}>▼</button>
                            </div>
                        </div>
                        <div className={css.property}>Price: {device.totalPrice}</div>
                        <div className={css.deleteDevice}>
                            <button onClick={() => deleteDevice(device._id)}>X</button>
                        </div>
                    </div>
                ))
                :
                <h1 className={css.empty}>It's so empty here 🤔</h1>
        }
            {
                (!!deviceList.length && totalPrice && quantity) &&
                <div className={css.total}>
                    <div>Quantity: {quantity}</div>
                    <div>Total price: {totalPrice}</div>
                    <button onClick={removeOrder}>Remove order</button>
                    <button onClick={orderCreator}>Next</button>
                </div>
            }
            {
                error && <span className={css.currentError}>{error.message}</span>
            }
        </div>
    );
};

export {Order};