import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {deviceReducer} from "../slices/device.slice";


const rootReducer = combineReducers({
    deviceReducer,
})

const setupStore = () => configureStore({
    reducer: rootReducer,
});


export {setupStore};