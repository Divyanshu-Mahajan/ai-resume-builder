import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    data: null,
    error: null
}

export const getUserSuggestion = createAsyncThunk(
    "suggestions/getUserSuggestion",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state?.auth?.token;
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/suggestions/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await response.json();
            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "Failed to fetch the user suggestions"
            )
        }
    }
)

const suggestionSlice = createSlice({
    name: "suggestions",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getUserSuggestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserSuggestion.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getUserSuggestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default suggestionSlice.reducer