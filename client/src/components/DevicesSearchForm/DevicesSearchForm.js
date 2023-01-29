import {useForm} from "react-hook-form";
import {categoryActions, deviceActions} from "../../redux/slices";
import css from './DevicesSearchForm.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";


const DevicesSearchForm = () => {
    const {categories} = useSelector(state => state.categoryReducer)

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
            console.log(obj);

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
            <input type="text"/>
        </form>
    );
};

export {DevicesSearchForm};