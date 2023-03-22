import {useDispatch, useSelector} from "react-redux";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {useEffect} from "react";
import moment from "moment";

import {accountActions, orderActions} from "../../redux/slices";
import {baseURL} from "../../configs";
import img from '../../img/User_Icon.png';
import css from './Account.module.css';


const Account = () => {
    const {account, error: accountError, loading: accountLoading} = useSelector(state => state.accountReducer);

    const {userOrders, error: orderError, loading: orderLoading} = useSelector(state => state.orderReducer);

    const dispatch = useDispatch();

    const {_id, name, email, isAdmin, createdAt, updatedAt} = account;

    useEffect(() => {
        dispatch(accountActions.getByAccess());
    }, []);

    useEffect(() => {
        if (account._id) {
            dispatch(orderActions.getUserOrders({userId: account._id}));
        }
    }, [account]);



    return (<div className={css.container}>
            {accountError && <span className={css.error}>{accountError.message}</span>}
            {orderError && <span className={css.error}>{orderError.message}</span>}
            {accountLoading ?
                <div className={css.accountLoader}></div>
                :
                <div className={css.userInfo}>
                    <div className={css.imgBox}><img src={img} alt="User"/></div>
                    {account &&
                        <div className={css.information}>
                            <h1><span>User information</span></h1>
                            <div>id: {_id}</div>
                            <div>Name: {name}</div>
                            <div>Email: {email}</div>
                            <div>Admin: {isAdmin.toString()}</div>
                            <div>Created: {createdAt && moment(createdAt).format("dd/mm/yy HH:mm:ss")}</div>
                            <div>Updated: {updatedAt && moment(updatedAt).format("dd/mm/yy HH:mm:ss")}</div>
                        </div>}
                </div>
            }
            <h1>Order story</h1>
            {
                orderLoading ?
                    <div className={css.orderLoading}></div>
                    :
                    <div>
                        {
                            !userOrders.length ?
                                <h2 className={css.empty}>It's so empty here 🤔</h2>
                                :
                                <div className={css.orders}>
                                    {
                                        !!userOrders.length &&
                                        userOrders.map(order => (
                                            <div key={order._id} className={css.order}>
                                                <button
                                                    onClick={() => dispatch(orderActions.deleteById({orderId: order._id}))}><HighlightOffIcon color='warning' fontSize='small'/></button>
                                                <div>id: {order._id.slice(-4)}</div>
                                                <div>Price: {order.totalPrice}</div>
                                                <div>Updated: {order.updatedAt && moment(order.updatedAt).format("dd/mm/yy HH:mm:ss")}</div>
                                                <div>Status: {order.orderStatus.toString()}</div>
                                                <div className={css.devices}>
                                                    {
                                                        !!order.deviceList.length && order.deviceList.map(item => (
                                                                <div key={item._id} className={css.device}>
                                                                    <div className={css.imgBox}>
                                                                        {(item.device && item.device.images[0]) &&
                                                                            <img src={`${baseURL}/${item.device.images[0]}`}
                                                                                 alt={item.device.images[0]}/>}
                                                                    </div>
                                                                    {(item.device && item.device._id) &&
                                                                        <div
                                                                            className={css.property}>id: {item.device._id.slice(-4)}</div>}
                                                                    {(item.device && item.device.name) &&
                                                                        <div
                                                                            className={css.property}>Name: {item.device.name}</div>}
                                                                    {(item && item.price) &&
                                                                        <div className={css.property}>Price: {item.price}</div>}
                                                                    {(item && item.quantity) &&
                                                                        <div
                                                                            className={css.property}>Quantity: {item.quantity}</div>}
                                                                </div>
                                                            )
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                    </div>
            }
        </div>
    );
};


export {Account};