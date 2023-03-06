import {Outlet, Navigate} from 'react-router-dom';
import {useEffect, useState} from "react";

import {authService} from "../services";


const PrivateRoute = () => {
    const [state, setState] = useState(true);

    useEffect(() => {
        const res = authService.getAccessToken();

        if (res) {
            setState(true);
        }
        if (!res) {
            setState(false);
        }
    }, [state]);

    return (
        state ? <Outlet/> : <Navigate to="/login"/>
    );
};

export {PrivateRoute};