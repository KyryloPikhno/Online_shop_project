import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {accountActions} from "../../redux/slices";

import css from './Account.module.css';


const Account = () => {

    const {account} = useSelector(state => state.accountReducer);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(accountActions.getByAccess())
    }, [])

    return (<div>
            {account &&
                <div className={css.container}>
                    <h1>Account</h1>
                    <div>{account.email}</div>
                    <div>{account.name}</div>
                    <div>{account.isAdmin}</div>
                </div>
            }
        </div>
    );
};

export {Account};