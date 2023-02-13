import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";

import {brandActions, categoryActions} from "../../redux/slices";
import css from './DevicesFilter.module.css';


const DevicesFilter = () => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            "price_gte": null,
            "price_lte": null,
        }
    })

    const [query] = useSearchParams();

    const {categories} = useSelector(state => state.categoryReducer)

    const {brands} = useSelector(state => state.brandReducer)

    const navigate = useNavigate()


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(categoryActions.getAll())
        dispatch(brandActions.getAll())
    }, [])

    const submit = (obj) => {
        const {category, price_gte, price_lte, brand} = obj;

        let findObj = {};

        if (price_gte) {
            findObj = {
                ...findObj,
                price_gte
            }
        }

        if (price_lte) {
            findObj = {
                ...findObj,
                price_lte
            }
        }

        if (category) {
            findObj = {
                ...findObj,
                category: category.toString()
            }
        }

        if (brand) {
            findObj = {
                ...findObj,
                brand: brand.toString()
            }
        }

        navigate({
            pathname: '/devices',
            search: createSearchParams(findObj).toString()
        });
    };

    return (
        <form className={css.form} onSubmit={handleSubmit(submit)}>
            <div className={css.checkBox}>
                <p>Categories</p>
                {
                    categories &&
                    categories.map(category => (
                        <label key={category._id}>
                            <input
                                {...register("category")}
                                type="checkbox"
                                value={category._id}
                                id={category._id}
                              />
                            {category.name}
                        </label>))
                }
            </div>
            <div className={css.checkBox}>
                <p>Brands</p>
                {
                    brands &&
                    brands.map((brand) => (
                        <label key={brand._id}>
                            <input
                                {...register("brand")}
                                type="checkbox"
                                value={brand._id}
                                id={brand._id}
                            />
                            {brand.name}
                        </label>))
                }
            </div>
            <div className={css.price}>
                <p>Price</p>
                <div>
                    <input type='number' placeholder={'price_gte'} {...register('price_gte')}/>
                    <input type='number' placeholder={'price_lte'} {...register('price_lte')}/>
                </div>
            </div>
            <button>submit</button>
        </form>
    );
};

export {DevicesFilter};