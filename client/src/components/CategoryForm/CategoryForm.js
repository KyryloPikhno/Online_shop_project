import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

import {categoryActions} from "../../redux/slices";
import css from "./CategoryForm.module.css";


const CategoryForm = () => {
    const {register, handleSubmit} = useForm()

    const dispatch = useDispatch()

    const submit = async (category) => {
        try {
            await dispatch(categoryActions.create({category}))

        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className={css.container}>
            <h1>Add new category</h1>
            <form className={css.formCategory} onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'category'} {...register('category')}/>
                <button>Save</button>
            </form>
        </div>
    );
};

export {CategoryForm};