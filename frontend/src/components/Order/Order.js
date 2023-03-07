import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {accountActions} from "../../redux/slices";

import css from './Order.module.css';


const Order = () => {
    const {account} = useSelector(state => state.accountReducer);

    const {deviceList} = useSelector(state => state.orderReducer);

    const dispatch = useDispatch();

    console.log(deviceList);


    useEffect(() => {
        dispatch(accountActions.getByAccess());
    }, []);

    return (
        <div className={css.container}>
            <h1>Order</h1>
            <div>{account.name}</div>
        </div>
    );
};

export {Order};