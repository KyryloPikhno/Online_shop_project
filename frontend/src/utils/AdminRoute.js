import {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";

import {accountService} from "../services";


const AdminRoute = () => {
    const [state, setState] = useState(true);

    useEffect(() => {
        accountService.getByAccess().then(value => setState(value.data?.isAdmin));
    }, []);

    return (
        !!state ? <Outlet/> : <Navigate to="/home"/>
    );
};

export {AdminRoute};