import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {colorService} from "../../services";


const initialState = {
    colors: [],
    color:{},
    loading: false,
    error: null,
};

const getAll = createAsyncThunk(
    'colorSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await colorService.getAll()
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const create = createAsyncThunk(
    'colorSlice/create',
    async ({color}, {rejectWithValue}) => {
        try {
            const {data} = await colorService.create(color)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);



const colorSlice = createSlice({
    name: 'colorSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.colors = action.payload
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
                state.color = action.payload
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

const {reducer: colorReducer} = colorSlice;

const colorActions = {
    getAll,
    create,
};

export {colorReducer, colorActions};