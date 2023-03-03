import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {colorService} from "../../services";


const initialState = {
    colors: [],
    loading: false,
    error: null,
};

const getAll = createAsyncThunk(
    'colorSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await colorService.getAll();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const create = createAsyncThunk(
    'colorSlice/create',
    async ({color}, {rejectWithValue}) => {
        try {
            const {data} = await colorService.create(color);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const update = createAsyncThunk(
    'colorSlice/update',
    async ({color}, {rejectWithValue}) => {
        try {
            const {data} = await colorService.update(color);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const deleteById = createAsyncThunk(
    'colorSlice/deleteById',
    async ({colorId}, {rejectWithValue}) => {
        try {
            await colorService.delete(colorId);
            return colorId;
        } catch (e) {
            return rejectWithValue(e.response.data);
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
                state.colors.push(action.payload)
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
            .addCase(update.fulfilled, (state, action) => {
                const find = state.colors.find(color => color._id === action.payload._id)
                Object.assign(find, action.payload)
                state.error = null
                state.loading = false
            })
            .addCase(update.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(update.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteById.fulfilled, (state, action) => {
                const index = state.colors.findIndex(color => color._id === action.payload)
                state.colors.splice(index,1)
                state.error = null
                state.loading = false
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(deleteById.pending, (state) => {
                state.loading = true
                state.error = null
            })
});

const {reducer: colorReducer} = colorSlice;

const colorActions = {
    getAll,
    create,
    update,
    deleteById
};

export {colorReducer, colorActions};