import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {brandService} from "../../services";


const initialState = {
    brands: [],
    loading: false,
    error: null,
};

const getAll = createAsyncThunk(
    'brandSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await brandService.getAll()
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const create = createAsyncThunk(
    'brandSlice/create',
    async ({brand}, {rejectWithValue}) => {
        try {
            const {data} = await brandService.create(brand)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const update = createAsyncThunk(
    'brandSlice/update',
    async ({brand}, {rejectWithValue}) => {
        try {
            const {data} = await brandService.update(brand)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'brandSlice/deleteById',
    async ({brandId}, {rejectWithValue}) => {
        try {
            const {data} = await brandService.delete(brandId)
            return brandId
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const brandSlice = createSlice({
    name: 'brandSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.brands = action.payload
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
                state.brands.push(action.payload)
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
                const find = state.brands.find(brand => brand._id === action.payload._id)
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
                const index = state.brands.findIndex(brand => brand._id === action.payload)
                state.brands.splice(index,1)
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

const {reducer: brandReducer} = brandSlice;

const brandActions = {
    getAll,
    create,
    update,
    deleteById,
};

export {brandReducer, brandActions};