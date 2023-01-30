import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {createSearchParams, useNavigate} from "react-router-dom";

import {categoryActions} from "../../redux/slices";
import css from './DevicesSearchForm.module.css';


const DevicesSearchForm = () => {
    const {categories} = useSelector(state => state.categoryReducer)

    const navigate = useNavigate();

    const {register, handleSubmit} = useForm({
        defaultValues: {
            "category": null,
            "name": null,
        }
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [])

    const submit = async (obj) => {
        try {
            const {category, name} = obj;

            let findObj = {};

            if (name) {
                findObj = {
                    ...findObj,
                    name
                }
            }

            if (category) {
                findObj = {
                    ...findObj,
                    category: category.toString()
                }
            }

            navigate({
                pathname: '/devices',
                search: createSearchParams(findObj).toString()
            });
        } catch (e) {
            console.log(e.message)
        }
    }

    const value = categories.map(category => category._id).toString()

    return (
        <form className={css.form} onSubmit={handleSubmit(submit)}>
            <select {...register('category')}>
                <option value={value} disabled hidden>All categories</option>
                {categories.map(category => <option key={category._id}
                                                    value={category._id}>{category.name}</option>)}
            </select>
            <input type='text' placeholder={'Enter name of device :)'} {...register('name')}/>
        </form>
    );
};

export {DevicesSearchForm};