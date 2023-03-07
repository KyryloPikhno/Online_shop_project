import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {accountReducer, brandReducer, categoryReducer, colorReducer, deviceReducer, orderReducer} from "../slices";


const rootReducer = combineReducers({
    categoryReducer,
    accountReducer,
    deviceReducer,
    brandReducer,
    colorReducer,
    orderReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer,
});


export {setupStore};