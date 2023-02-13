import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {accountReducer, brandReducer, categoryReducer, deviceReducer} from "../slices";


const rootReducer = combineReducers({
    deviceReducer,
    accountReducer,
    categoryReducer,
    brandReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer,
});


export {setupStore};