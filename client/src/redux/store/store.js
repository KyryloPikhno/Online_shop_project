import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {accountReducer, deviceReducer} from "../slices";


const rootReducer = combineReducers({
    deviceReducer,
    accountReducer
})

const setupStore = () => configureStore({
    reducer: rootReducer,
});


export {setupStore};