import {colorActions} from "../../redux/slices";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import css from './Colors.module.css';


const Colors = () => {
    const {colors} = useSelector(state => state.colorReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(colorActions.getAll())
    }, [])

    return (
        <div className={css.container}>
            <h3>All colors</h3>
            {
                colors &&
                colors.map(color => (
                    <div key={color._id}>
                        {color.name}
                        <button onClick={() => dispatch(colorActions.deleteById({colorId: color._id}))}>X</button>
                    </div>
                ))
            }
        </div>
    );
};

export {Colors};