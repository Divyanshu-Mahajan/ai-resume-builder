import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null,
    data: null
}

export const fetchStatistics = createAsyncThunk(
    "statistics/fetchStatistics",
    async (_, thunkAPI) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/statistics/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            })

            const data = await response.json();
            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "Failed to load statistics"
            )
        }
    }
)

const statisticsSlice = createSlice({
    name: "statistics",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchStatistics.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchStatistics.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(fetchStatistics.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default statisticsSlice.reducer;