import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

import {PaginationDevice} from "../PaginationDevice/PaginationDevice";
import {deviceActions} from "../../redux/slices";
import {DeviceSorter} from "../DeviceSorter/DeviceSorter";
import {Device} from "../Device/Device";
import {Banner} from "../Banner/Banner";
import css from './Devices.module.css';


const Devices = () => {
    const {devicesResponse, error, loading } = useSelector(state => state.deviceReducer);

    let [query] = useSearchParams({});

    const dispatch = useDispatch();


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
            sort: query.get('sort')
        }));

        window.scrollTo(0, 0);
    }, [query]);


    return (
        <div className={css.container}>
            {error && <span className={css.error}>{error.message}</span>}
            <Banner/>
            <DeviceSorter/>
            {
                loading ?
                    <div className={css.devices}>
                        <div className={css.loader}></div>
                        <div className={css.loader}></div>
                        <div className={css.loader}></div>
                        <div className={css.loader}></div>
                        <div className={css.loader}></div>
                        <div className={css.loader}></div>
                        <div className={css.loader}></div>
                        <div className={css.loader}></div>
                    </div>
                    :
                    <div className={css.devices}>
                        {devicesResponse.devices && devicesResponse.devices.map(device => <Device key={device._id} device={device}/>)}
                    </div>
            }
            {
                (devicesResponse.total_pages && devicesResponse.page) &&
                <PaginationDevice total_pages={devicesResponse.total_pages} page={devicesResponse.page}/>
            }
        </div>
    );
};


export {Devices};