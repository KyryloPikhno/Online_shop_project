import {useNavigate} from "react-router-dom";

import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className={css.container}>
            <h1>NotFoundPage 404</h1>
            <button className={css.link} onClick={() => navigate('/home')}>Back to home page</button>
        </div>
    );
};

export {NotFoundPage};