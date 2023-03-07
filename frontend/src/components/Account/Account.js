import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import moment from "moment";

import {accountActions} from "../../redux/slices";
import img from '../../img/User_Icon.png';
import css from './Account.module.css';


const Account = () => {
    const {account} = useSelector(state => state.accountReducer);

    const dispatch = useDispatch();

    const {_id, name, email, isAdmin, createdAt, updatedAt} = account;

    useEffect(() => {
        dispatch(accountActions.getByAccess());
    }, []);

    return (<div>
            <div className={css.container}>
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

        </div>
    );
};

export {Account};