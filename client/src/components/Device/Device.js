import {useNavigate} from "react-router-dom";

import {baseURL} from "../../configs";
import css from './Device.module.css';


const Device = ({device}) => {
    const navigate = useNavigate()

    const {name, price, category, brand, description, images, _id} = device;

    const deleter =()=>{

    }

    return (
        <div className={css.card} onClick={()=>navigate(_id)}>
           <div className={css.imageBox}>
            <img className={css.img}
                 src={`${baseURL}/${images[0]}`}
                 alt={images[0]}/>
           </div>
            <div>Name: {name}</div>
            <div>Price: {price}</div>
            {/*<div>Category: {category}</div>*/}
            {/*<div>Brand: {brand}</div>*/}
            {/*<div>Description: {description}</div>*/}
            <button onClick={()=>deleter}>Delete</button>
        </div>
    );
};

export {Device};