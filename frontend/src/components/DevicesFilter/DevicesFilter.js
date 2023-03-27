import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';
import {useForm} from "react-hook-form";
import logo from '../../img/image.png'

import {brandActions, categoryActions, colorActions} from "../../redux/slices";
import css from './DevicesFilter.module.css';
import {Box, Slider} from "@mui/material";


const DevicesFilter = () => {
    const {register, handleSubmit, setValue} = useForm({
        defaultValues: {
            "price_gte": null,
            "price_lte": null,
        }
    });


    const [query] = useSearchParams();

    useEffect(() => {
        setValue("price_gte", query.get('price_gte'));
        setValue("price_lte", query.get('price_lte'));
    }, [query]);

    const {categories, loading: categoriesLoading} = useSelector(state => state.categoryReducer);

    const {brands, loading: brandsLoading} = useSelector(state => state.brandReducer);

    const {colors, loading: colorsLoading} = useSelector(state => state.colorReducer);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const valuetext = (value) => `${value}USD`;

    const min = Number(query.get('price_gte')) / 10 || 0;
    const max = Number(query.get('price_lte')) / 40 || 100;

    const [valueRange, setValueRange] = useState([min, max]);

    const handleChangeRange = (event, newValue) => {
        setValue("price_gte", newValue[0] * 10);
        setValue("price_lte", newValue[1] * 40);
        setValueRange(newValue);
    };

    const [open, setOpen] = useState(false);

    const [checkedState, setCheckedState] = useState(
        JSON.parse(localStorage.getItem('checkbox')) || {}
    );

    useEffect(() => {
        localStorage.setItem('checkbox', JSON.stringify(checkedState));
    }, [checkedState]);

    const handleChange = e => {
        const checkboxId = e.target.id;
        setCheckedState({
            ...checkedState,
            [checkboxId]: e.target.checked
        });
    };


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
                                                   checked={checkedState[category._id] || false}
                                                   onClick={handleChange}
                                            />
                                            <span></span>
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
                                                   checked={checkedState[brand._id] || false}
                                                   onClick={handleChange}
                                            />
                                            <span></span>
                                            {brand.name}
                                        </label>
                                    ))
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
                                                   checked={checkedState[color._id] || false}
                                                   onClick={handleChange}
                                            />
                                            <span></span>
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
                            <Box sx={{width: 150}}>
                                <Slider
                                    getAriaLabel={() => 'Range'}
                                    value={valueRange}
                                    onChange={handleChangeRange}
                                    getAriaValueText={valuetext}
                                />
                            </Box>
                            <button>Submit</button>
                        </form>
                }
            </div>
        </div>
    );
};

export {DevicesFilter};