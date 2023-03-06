import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {accountReducer, brandReducer, categoryReducer, colorReducer, deviceReducer} from "../slices";


const rootReducer = combineReducers({
    deviceReducer,
    accountReducer,
    categoryReducer,
    brandReducer,
    colorReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer,
});


export {setupStore};