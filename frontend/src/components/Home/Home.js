import {createSearchParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {categoryActions} from "../../redux/slices";
import {Banner} from "../Banner/Banner";
import css from './Home.module.css';


const Home = () => {
    const {categories, loading} = useSelector(state => state.categoryReducer);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(categoryActions.getAll());

        window.scrollTo(0, 0);
    }, []);

    const navigator = (query) => {
        navigate({
            pathname: '/devices',
            search: createSearchParams(`category=${query}`).toString(),
        });
    };

    return (
        <div className={css.container}>
            <h1>Hi dear friend</h1>
            <div className={css.overwiev}>
                <p>Welcome to <span>DigiStore</span> - your reliable source for the latest tech innovations! We offer a
                    wide range of
                    products, from smartphones to laptops and drones, at affordable prices. Shop with us and stay at the
                    forefront of technology!</p>
            </div>
            <h1>Choice category</h1>
            {loading ?
                <div className={css.categories}>
                    <div className={css.loader}></div>
                    <div className={css.loader}></div>
                    <div className={css.loader}></div>
                    <div className={css.loader}></div>
                    <div className={css.loader}></div>
                </div>
                :
                <div className={css.categories}>
                    {
                        categories &&
                        categories.map(category => (
                            <div className={css.category} key={category._id}
                                 onClick={() => navigator(category._id)}>{category.name}</div>
                        ))
                    }
                </div>
            }
            <Banner/>
            <button className={css.link} onClick={() => navigate('/devices')}>View all devices</button>
        </div>
    );
};

export {Home};