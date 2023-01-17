import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deviceService} from "../../services";


const initialState = {
    devices: [],
    device:{},
    loading: false,
    error: null,
};

const getAll = createAsyncThunk(
    'deviceSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await deviceService.getAll()
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const create = createAsyncThunk(
    'deviceSlice/create',
    async ({info}, {rejectWithValue}) => {
        try {
            const {data} = await deviceService.create(info)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deviceSlice = createSlice({
    name: 'deviceSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.devices = action.payload
                state.error = null
                state.loading = false
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(getAll.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(create.fulfilled, (state, action) => {
                state.device = action.payload
                state.error = null
                state.loading = false
            })
            .addCase(create.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(create.pending, (state) => {
                state.loading = true
                state.error = null
            })
});

const {reducer: deviceReducer} = deviceSlice;

const deviceActions = {
    getAll,
    create
};

export {deviceReducer, deviceActions};