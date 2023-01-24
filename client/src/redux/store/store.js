import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {accountReducer, categoryReducer, deviceReducer} from "../slices";


const rootReducer = combineReducers({
    deviceReducer,
    accountReducer,
    categoryReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer,
});


export {setupStore};