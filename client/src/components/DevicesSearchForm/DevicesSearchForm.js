import {useForm} from "react-hook-form";
import {categoryActions, deviceActions} from "../../redux/slices";
import css from './DevicesSearchForm.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";


const DevicesSearchForm = () => {
    const {categories} = useSelector(state => state.categoryReducer)

    const [query, setQuery] = useSearchParams();

    const {register, handleSubmit} = useForm({
        defaultValues: {
            "category": null,
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
                    category:category.toString()
                }
            }

            setQuery(findObj)
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