import {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";

import {accountService, authService} from "../services";


const AdminRoute =  () => {
    const [state, setState] = useState(true);

    useEffect(() => {
        try {
            const access = authService.getAccessToken();

            if (access) {
                accountService.getByAccess().then(value => setState(value.data?.isAdmin));
            } else {
                setState(false);
            }
        } catch (e) {
            console.log(e.message)
        }
    }, []);

    return (
        !!state ? <Outlet/> : <Navigate to="/home"/>
    );
};

export {AdminRoute};