import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {accountActions, orderActions} from "../../redux/slices";
import {baseURL} from "../../configs";
import css from './Order.module.css';
import {useNavigate} from "react-router-dom";


const Order = () => {
    const {account} = useSelector(state => state.accountReducer);

    const {deviceList, totalPrice, quantity} = useSelector(state => state.orderReducer);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const orderCreator = () => {
        dispatch(orderActions.create({
            orderInfo: {
                user: account._id,
                totalPrice,
                deviceList,
            }
        }));

        navigate(`payment/${account._id}`);
    };

    useEffect(() => {
        dispatch(accountActions.getByAccess());
    }, []);

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
            <h1>Order by <span>{account.name}</span></h1>
            {
                !!deviceList.length &&
                deviceList.map(device => (
                    <div key={device._id} className={css.device}>
                        <div className={css.imgBox}><img src={`${baseURL}/${device.image}`} alt=""/></div>
                        <div className={css.property}>id: {device._id.slice(-4)}</div>
                        <div className={css.property}>Name: {device.name}</div>
                        <div className={css.property}>Price: {device.price}</div>
                        <div className={css.property}>Quantity: {device.quantity}
                            <div className={css.buttons}>
                                <button onClick={() => incrementDevice(device)}>▲</button>
                                <button onClick={() => decrementDevice(device._id)}>▼</button>
                            </div>
                        </div>
                        <div className={css.property}>Total price: {device.totalPrice}</div>
                        <div className={css.deleteDevice}>
                            <button onClick={() => deleteDevice(device._id)}>X</button>
                        </div>
                    </div>
                ))
            }
            {
                (totalPrice && quantity) &&
                <div className={css.total}>
                    <div>Quantity: {quantity}</div>
                    <div>Total price: {totalPrice}</div>
                    <button onClick={removeOrder}>Remove order</button>
                    <button onClick={orderCreator}>Pay for it</button>
                </div>
            }
        </div>
    );
};


export {Order};