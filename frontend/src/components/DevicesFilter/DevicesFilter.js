import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';
import {useForm} from "react-hook-form";
import logo from '../../img/image.png'

import {brandActions, categoryActions, colorActions} from "../../redux/slices";
import css from './DevicesFilter.module.css';


const DevicesFilter = () => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            "price_gte": null,
            "price_lte": null,
        }
    });

    const [query] = useSearchParams();

    const {categories, loading: categoriesLoading} = useSelector(state => state.categoryReducer);

    const {brands, loading: brandsLoading} = useSelector(state => state.brandReducer);

    const {colors, loading: colorsLoading} = useSelector(state => state.colorReducer);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(categoryActions.getAll());
        dispatch(brandActions.getAll());
        dispatch(colorActions.getAll());
    }, []);

    const submit = (obj) => {
        const {category, price_gte, price_lte, brand, color} = obj;

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

        if (color) {
            findObj = {
                ...findObj,
                color: color.toString()
            }
        }

        if (query.get('sort')) {
            findObj = {
                ...findObj,
                sort: query.get('sort')
            }
        }

        navigate({
            pathname: '/devices',
            search: createSearchParams(findObj).toString()
        });
    };

    return (
        <div>
            <div className={!open ? css.openFilter : css.closedFilter} onMouseOver={() => setOpen(true)}>Filter</div>
            <div className={open ? css.filter : css.closedFilter}>
                {
                    (categoriesLoading || brandsLoading || colorsLoading) ?
                        <div className={css.loader}></div>
                        :
                        <form className={css.form} onSubmit={handleSubmit(submit)}>
                            <span className={css.closerButton} onClick={() => setOpen(false)}><ClearIcon/></span>
                            <div className={css.checkBox}>
                                <div className={css.logoBox}>
                                    <img src={logo} alt={logo}/>
                                </div>
                                <p>Categories</p>
                                {
                                    categories &&
                                    categories.map(category => (
                                        <label key={category._id}>
                                            <input className={css.labelInput}
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
                                    brands.map(brand => (
                                        <label key={brand._id}>
                                            <input className={css.labelInput}
                                                   {...register("brand")}
                                                   type="checkbox"
                                                   value={brand._id}
                                                   id={brand._id}
                                            />
                                            {brand.name}
                                        </label>))
                                }
                            </div>
                            <div className={css.checkBox}>
                                <p>Colors</p>
                                {
                                    colors &&
                                    colors.map(color => (
                                        <label key={color._id}>
                                            <input className={css.labelInput}
                                                   {...register("color")}
                                                   type="checkbox"
                                                   value={color._id}
                                                   id={color._id}
                                            />
                                            {color.name}
                                        </label>))
                                }
                            </div>
                            <div className={css.price}>
                                <p>Price</p>
                                <div className={css.priceGteLte}>
                                    <input type='number' placeholder={'from'} {...register('price_gte')}/>
                                    <input type='number' placeholder={'to'} {...register('price_lte')}/>
                                </div>
                            </div>
                            <button>Submit</button>
                        </form>
                }
            </div>
        </div>
    );
};

export {DevicesFilter};