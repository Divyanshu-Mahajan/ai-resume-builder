import { createSlice } from "@reduxjs/toolkit";

const savedTheme = localStorage.getItem("theme");

const initialState = {
    darkMode: savedTheme === "dark"
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
            localStorage.setItem("theme", state.darkMode ? "dark" : "light");
        },
        setTheme: (state, action) => {
            state.darkMode = action.payload;
            localStorage.setItem("theme", state.darkMode ? "dark" : "light");
        }
    }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const selectDarkMode = (state) => state.theme.darkMode;

export default themeSlice.reducer;
