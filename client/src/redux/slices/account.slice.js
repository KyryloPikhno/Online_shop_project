import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {accountService} from "../../services";


const initialState = {
    account: {},
    loading: false,
    error: null,
};

const getByAccess = createAsyncThunk(
    'accountSlice/getByAccess',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await accountService.getByAccess()
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const accountSlice = createSlice({
    name: 'accountSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getByAccess.fulfilled, (state, action) => {
                state.account = action.payload
                state.error = null
                state.loading = false
            })
            .addCase(getByAccess.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(getByAccess.pending, (state) => {
                state.loading = true
                state.error = null
            })
});

const {reducer: accountReducer} = accountSlice;

const accountActions = {
    getByAccess,
};

export {accountReducer, accountActions};