import {useDispatch, useSelector} from "react-redux";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {colorActions} from "../../redux/slices";
import {useEffect} from "react";

import css from './Colors.module.css';


const Colors = () => {
    const {colors, error, loading} = useSelector(state => state.colorReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(colorActions.getAll());
    }, []);

    return (
        <div className={css.container}>
            {error && <span className={css.error}> {error.message}</span>}
            <h3>All colors</h3>
            {
                colors &&
                colors.map(color => (
                    <div key={color._id}>
                        {color.name}
                        <button onClick={() => dispatch(colorActions.deleteById({colorId: color._id}))}><HighlightOffIcon color='warning' fontSize='small'/></button>
                    </div>
                ))
            }
        </div>
    );
};

export {Colors};