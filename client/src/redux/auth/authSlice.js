import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/login`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) return rejectWithValue(data.message || "Login failed");

            // Store token & user in localStorage
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.data.loggedInUser));

            return data.data;
        } catch (error) {
            return rejectWithValue(error.message || "Network error");
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/register`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const data = await res.json();

            if (!res.ok) return rejectWithValue(data.message || "Registration failed");

            return data.data; // user object
        } catch (error) {
            return rejectWithValue(error.message || "Network error");
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/logout`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong during logout")
        }
    }
)

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
        },
        loadUserFromStorage: (state) => {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("accessToken");
            if (user && token) {
                state.user = user;
                state.token = token;
                state.isAuthenticated = true;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.loggedInUser;
                state.token = action.payload.accessToken;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally, you can auto-login after register by setting user & token
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = null;
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // Clear state even if API call fails
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
            })
    },
});

export const { logout, loadUserFromStorage } = authSlice.actions;

export default authSlice.reducer;
