import {NavLink} from "react-router-dom";

const Logo = () => {

    return (
        <NavLink to={'/devices'}><h1>DigiStore</h1></NavLink>
    );
};

export {Logo};