import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";

import {categoryActions} from "../../redux/slices";
import css from './DevicesFilter.module.css';


const DevicesFilter = () => {
    const [query, setQuery] = useSearchParams({});

    const {register, handleSubmit} = useForm({
        defaultValues: {
            "price_gte": null,
            "price_lte": null,
        }
    })
    const {categories} = useSelector(state => state.categoryReducer)

    const [checkedState, setCheckedState] = useState(
        new Array(categories.length).fill(false)
    );

    const navigate = useNavigate()

    const dispatch = useDispatch();

    console.log(checkedState);

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [])

    const submit = (obj) => {
        const {category, price_gte, price_lte} = obj;

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
        setQuery(findObj)

        navigate({
            pathname: '/devices',
            search: createSearchParams(findObj).toString()
        });
    };

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };


    return (
        <form className={css.form} onSubmit={handleSubmit(submit)}>
            <div className={css.checkBox}>
                {
                    categories &&
                    categories.map((category, index) => (
                        <label key={category._id}>
                            <input
                                {...register("category")}
                                type="checkbox"
                                value={category._id}
                                id={category._id}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index)}
                            />
                            {category.name}
                        </label>))
                }
            </div>
            <div className={css.price}>
                <p>price</p>
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