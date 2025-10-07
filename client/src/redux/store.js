import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from './slice/resumeSlice';
import themeReducer from './theme/themeSlice';
import authReducer from './auth/authSlice';
import statReducer from './stats/statsSlice';
import suggestReducer from './suggest/suggestionSlice';

const store = configureStore({
    reducer: {
        resume: resumeReducer,
        theme : themeReducer,
        auth : authReducer,
        stats : statReducer,
        suggestions : suggestReducer
    },
})

export default store;