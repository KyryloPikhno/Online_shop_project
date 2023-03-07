import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    deviceList: getDeviceListFromLocalStorage,
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        addDevice:(state,action) =>{
            state.deviceList.push(action.payload);
            state.quantity += 1;
            state.totalPrice += action.payload.price * action.payload.quantity;
        },
        reset:(state) =>{
            state = initialState;
        }
    },
});

const {reducer: orderReducer, actions: {addDevice, reset}} = orderSlice;

const orderActions = {
    addDevice,
    reset
};

export {orderReducer, orderActions};