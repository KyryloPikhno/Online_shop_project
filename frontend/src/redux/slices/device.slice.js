import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { deviceService } from "../../services"

const initialState = {
  devicesResponse: [],
  similarDevices: [],
  device: {},
  loading: false,
  error: null,
}

const getAll = createAsyncThunk(
  "deviceSlice/getAll",
  async (
    { limit, page, name, price_lte, category, price_gte, color, brand, sort },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await deviceService.getAll(
        limit,
        page,
        name,
        price_lte,
        category,
        price_gte,
        color,
        brand,
        sort,
      )
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

const getSimilarDevices = createAsyncThunk(
  "deviceSlice/getSimilarDevices",
  async ({ categoryId, deviceId }, { rejectWithValue }) => {
    try {
      const { data } = await deviceService.getSimilarDevices(categoryId, deviceId)
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

const getById = createAsyncThunk("deviceSlice/getById", async ({ id }, { rejectWithValue }) => {
  try {
    const { data } = await deviceService.getById(id)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

const create = createAsyncThunk("deviceSlice/create", async ({ device }, { rejectWithValue }) => {
  try {
    const { data } = await deviceService.create(device)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

const uploadImage = createAsyncThunk(
  "deviceSlice/uploadImage",
  async ({ _id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await deviceService.uploadImage(_id, formData)
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

const deleteDevice = createAsyncThunk(
  "deviceSlice/delete",
  async ({ _id }, { rejectWithValue }) => {
    try {
      await deviceService.delete(_id)
      return _id
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

const deviceSlice = createSlice({
  name: "deviceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.devicesResponse = action.payload
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
      .addCase(getSimilarDevices.fulfilled, (state, action) => {
        state.similarDevices = action.payload
        state.error = null
        state.loading = false
      })
      .addCase(getSimilarDevices.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(getSimilarDevices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(create.fulfilled, (state, action) => {
        state.devicesResponse.devices.push(action.payload)
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
      .addCase(uploadImage.fulfilled, (state, action) => {
        const find = state.devicesResponse.devices.find(
          (device) => device._id === action.payload._id,
        )
        Object.assign(find, action.payload)
        state.error = null
        state.loading = false
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(uploadImage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteDevice.fulfilled, (state, action) => {
        const index = state.devicesResponse.devices.findIndex(
          (device) => device._id === action.payload,
        )
        state.devicesResponse.devices.splice(index, 1)
        state.error = null
        state.loading = false
      })
      .addCase(deleteDevice.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(deleteDevice.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.device = action.payload
        state.error = null
        state.loading = false
      })
      .addCase(getById.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(getById.pending, (state) => {
        state.loading = true
        state.error = null
      }),
})

const { reducer: deviceReducer } = deviceSlice

const deviceActions = {
  getAll,
  getSimilarDevices,
  getById,
  create,
  uploadImage,
  deleteDevice,
}

export { deviceReducer, deviceActions }
