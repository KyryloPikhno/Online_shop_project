import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

import {accountActions, deviceActions} from "../../redux/slices";
import {PaginationDevice} from "../PaginationDevice/PaginationDevice";
import {Device} from "../Device/Device";
import {Banner} from "../Banner/Banner";
import css from './Devices.module.css';


const Devices = () => {
    const {devicesResponse} = useSelector(state => state.deviceReducer);

    let [query] = useSearchParams({});

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(accountActions.getByAccess())
    // }, [query]);
    const deleter = async (_id) => {
        try {
            await dispatch(deviceActions.deleteDevice({_id}))
        } catch (e) {
            console.log(e.message)
        }
    };

    useEffect(() => {
        dispatch(deviceActions.getAll({
            page: query.get('page') || 1,
            limit: query.get('limit') || 8,
            category: query.getAll('category').toString(),
            color: query.getAll('color').toString(),
            brand: query.getAll('brand').toString(),
            name: query.get('name'),
            price_gte: query.get('price_gte'),
            price_lte: query.get('price_lte'),
        }))
    }, [query]);



    return (
        <div className={css.container}>
            <Banner/>
            <div className={css.devices}>
                {devicesResponse.devices && devicesResponse.devices.map(device => <Device key={device._id}
                                                                                          device={device}
                                                                                          deleter={deleter}/>)}
            </div>
            {
                (devicesResponse.total_pages && devicesResponse.page) &&
                <PaginationDevice total_pages={devicesResponse.total_pages} page={devicesResponse.page}/>
            }
        </div>
    );
};


export {Devices};