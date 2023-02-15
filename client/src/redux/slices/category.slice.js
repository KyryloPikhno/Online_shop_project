import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {categoryService} from "../../services";


const initialState = {
    categories: [],
    category:{},
    loading: false,
    error: null,
};

const getAll = createAsyncThunk(
    'categorySlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await categoryService.getAll()
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const create = createAsyncThunk(
    'categorySlice/create',
    async ({category}, {rejectWithValue}) => {
        try {
            const {data} = await categoryService.create(category)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const update = createAsyncThunk(
    'categorySlice/update',
    async ({category}, {rejectWithValue}) => {
        try {
            const {data} = await categoryService.update(category)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'categorySlice/deleteById',
    async ({categoryId}, {rejectWithValue}) => {
        try {
            const {data} = await categoryService.delete(categoryId)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.categories = action.payload
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
                state.category = action.payload
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
                state.category = action.payload
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
                // state.category = action.payload
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

const {reducer: categoryReducer} = categorySlice;

const categoryActions = {
    getAll,
    create,
    update,
    deleteById
};

export {categoryReducer, categoryActions};