import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {

    //Form field data
    personalInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        github: ''
    },
    summary: '',
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certification: [],
    selectedTemplate: null,

    //backend async data
    resumes: [],
    currentResume: null,
    loading: false,
    error: null,
    success: null
};

export const createResume = createAsyncThunk(
    "resume/createResume",
    async (resumeData, thunkAPI) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/resumes/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(resumeData)
            })

            const data = await response.json();

            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "Failed to create resume"
            )
        }
    }
)

export const fetchAllResume = createAsyncThunk(
    "resume/fetchAllResume",
    async (_, thunkAPI) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/resumes/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "Failed to fetch resumes");
        }
    }
)

export const fetchSingleResume = createAsyncThunk(
    "resume/fetchSingleResume",
    async (id, thunkAPI) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/resumes/${id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "Failed to fetch resume"
            )
        }
    }
)

export const updateResume = createAsyncThunk(
    "resume/updateResume",
    async ({ id, updates }, thunkAPI) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/resumes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(updates)
            })

            const data = await response.json();
            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "Failed to update resume"
            )
        }
    }
)

export const deleteSingleResume = createAsyncThunk(
    "resume/deleteSingleResume",
    async (id, thunkAPI) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/resumes/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const data = await response.json();
            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "Failed the selected resume"
            )
        }
    }
)

export const deleteResume = createAsyncThunk(
    "resume/deleteResume",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/resumes/`, {
                method: "DELETE"
            })

            const data = await response.json();
            return data.deletedCount

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "Failed to resume deletion"
            )
        }
    }
)

export const generateSummary = createAsyncThunk(
    "resume/generateSummary",
    async (summaryData, thunkAPI) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(
                `${import.meta.env.VITE_APP_API_URL}/ai/generate-summary`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(summaryData)
                }
            );

            const data = await response.json();

            if (!data?.data?.textData) {
                throw new Error("AI did not return a summary");
            }

            return data.data.textData;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "AI failed to generate summary"
            );
        }
    }
);

export const generateEducationDescription = createAsyncThunk(
    "resume/generateEducationDescription",
    async ({ degree, institution }, thunkAPI) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/ai/generate-education-description`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    degree,
                    institution
                })
            })

            const data = await response.json();
            // console.log("AI education description", data);
            return data?.data || [];
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.message || "Failed to generate education description"
            )
        }
    }
)
export const generateJobResponsibility = createAsyncThunk(
    "resume/generateJobResponsibility",
    async ({ jobTitle, company }, thunkAPI) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/ai/generate-job-responsibility`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        jobTitle,
                        company
                    })
                }
            )

            const data = await response.json();
            // console.log("AI Job responsibility", data);
            return data?.data || [];
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "Failed to generate responsibilities"
            )
        }
    }
)
export const generateProjectDescription = createAsyncThunk(
    "resume/generateProjectDescription",
    async({ projectTitle, technologies }, thunkAPI) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/ai/generate-project-description`,{
                method : "POST",
                headers : {
                    "Content-type" : "application/json",
                    Authorization : `Bearer ${accessToken}`
                },
                body : JSON.stringify({
                    projectTitle,
                    technologies
                })
            })

            const data = await response.json();
            // console.log("AI project description", data);
            return data?.data || []

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.message || "Failed to generate project description"
            )
        }
    }
) 


const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        updatePersonalInfo: (state, action) => {
            state.personalInfo = { ...state.personalInfo, ...action.payload };
        },
        updateSummary: (state, action) => {
            state.summary = action.payload;
        },

        // Education
        addEducation: (state, action) => {
            state.education.push({
                ...action.payload,
                descriptions: Array.isArray(action.payload.descriptions)
                    ? action.payload.descriptions

                    : [action.payload.descriptions || '']
            });
        },
        updateEducation: (state, action) => {
            const { index, data } = action.payload;
            if (state.education[index]) {
                state.education[index] = {
                    ...state.education[index],
                    ...data,
                    descriptions: data.descriptions || state.education[index].descriptions
                };
            }
        },
        addEducationDescription: (state, action) => {
            const { index, description } = action.payload;
            if (state.education[index]) {
                state.education[index].descriptions.push(description);
            }
        },
        removeEducationDescription: (state, action) => {
            const { index, descriptionIndex } = action.payload;
            if (state.education[index]) {
                state.education[index].descriptions = state.education[index].descriptions.filter(
                    (_, i) => i !== descriptionIndex);
            }
        },
        removeEducation: (state, action) => {
            state.education = state.education.filter((_, i) => i !== action.payload);
        },

        // Experience
        addExperience: (state, action) => {
            state.experience.push({
                ...action.payload,
                responsibilities: Array.isArray(action.payload.responsibilities)
                    ? action.payload.responsibilities
                    : [action.payload.responsibilities || '']
            });
        },
        updateExperience: (state, action) => {
            const { index, data } = action.payload;
            if (state.experience[index]) {
                state.experience[index] = {
                    ...state.experience[index],
                    ...data,
                    responsibilities: data.responsibilities || state.experience[index].responsibilities
                };
            }
        },
        addExperienceResponsibility: (state, action) => {
            const { index, responsibility } = action.payload;
            if (state.experience[index]) {
                state.experience[index].responsibilities.push(responsibility);
            }
        },
        removeExperienceResponsibility: (state, action) => {
            const { index, responsibilityIndex } = action.payload;
            if (state.experience[index]) {
                state.experience[index].responsibilities = state.experience[index].responsibilities.filter(
                    (_, i) => i !== responsibilityIndex);
            }
        },
        removeExperience: (state, action) => {
            state.experience = state.experience.filter((_, i) => i !== action.payload);
        },

        // Skills
        addSkill: (state, action) => {
            state.skills.push(action.payload);
        },
        removeSkill: (state, action) => {
            state.skills = state.skills.filter((_, i) => i !== action.payload);
        },

        // Projects
        addProject: (state, action) => {
            state.projects.push({
                ...action.payload,
                descriptions: Array.isArray(action.payload.descriptions)
                    ? action.payload.descriptions
                    : [action.payload.descriptions || '']
            });
        },
        updateProject: (state, action) => {
            const { index, data } = action.payload;
            if (state.projects[index]) {
                state.projects[index] = {
                    ...state.projects[index],
                    ...data,
                    descriptions: data.descriptions || state.projects[index].descriptions
                };
            }
        },
        addProjectDescription: (state, action) => {
            const { index, description } = action.payload;
            if (state.projects[index]) {
                state.projects[index].descriptions.push(description);
            }
        },
        removeProjectDescription: (state, action) => {
            const { index, descriptionIndex } = action.payload;
            if (state.projects[index]) {
                state.projects[index].descriptions = state.projects[index].descriptions.filter(
                    (_, i) => i !== descriptionIndex);
            }
        },
        removeProject: (state, action) => {
            state.projects = state.projects.filter((_, i) => i !== action.payload);
        },

        // Certifications
        addCertification: (state, action) => {
            state.certification.push(action.payload);
        },
        updateCertification: (state, action) => {
            const { index, data } = action.payload;
            if (state.certification[index]) {
                state.certification[index] = { ...state.certification[index], ...data };
            }
        },
        removeCertification: (state, action) => {
            state.certification = state.certification.filter((_, i) => i !== action.payload);
        },

        addTemplate: (state, action) => {
            state.selectedTemplate = action.payload;
        },

        // Reset
        resetResume: () => ({ ...initialState })
    },
    extraReducers: builder => {

        builder
            // Create Resume
            .addCase(createResume.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createResume.fulfilled, (state, action) => {
                state.loading = false;
                state.resumes.unshift(action.payload);
                state.currentResume = action.payload;
            })
            .addCase(createResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Fetch All Resume
            .addCase(fetchAllResume.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllResume.fulfilled, (state, action) => {
                state.loading = false;
                state.resumes = action.payload;
            })
            .addCase(fetchAllResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Fetch Single Resume
            .addCase(fetchSingleResume.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleResume.fulfilled, (state, action) => {
                state.loading = false;
                state.currentResume = action.payload;

                // populate form/template fields
                state.personalInfo = action.payload.personalInfo || initialState.personalInfo;
                state.summary = action.payload.summary || "";
                state.education = action.payload.education || [];
                state.experience = action.payload.experience || [];
                state.skills = action.payload.skills || [];
                state.projects = action.payload.projects || [];
                state.certification = action.payload.certification || [];
                state.selectedTemplate = action.payload.selectedTemplate || null;

            })
            .addCase(fetchSingleResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Resume
            .addCase(updateResume.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateResume.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.resumes.findIndex(resume =>
                    resume._id === action.payload._id
                )

                if (index !== -1) state.resumes[index] = action.payload;
                state.currentResume = action.payload;
            })
            .addCase(updateResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Delete single resume
            .addCase(deleteSingleResume.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSingleResume.fulfilled, (state, action) => {
                state.loading = false;
                state.resumes = state.resumes.filter(resume =>
                    resume._id !== action.payload
                )

                if (state.currentResume?._id === action.payload) state.currentResume = null;
            })
            .addCase(deleteSingleResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Delete All Resume
            .addCase(deleteResume.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteResume.fulfilled, (state, action) => {
                state.loading = false;
                state.resumes = [];
                state.currentResume = null;

                // reset form/template fields
                state.personalInfo = initialState.personalInfo;
                state.summary = "";
                state.education = [];
                state.experience = [];
                state.skills = [];
                state.projects = [];
                state.certification = [];
                state.selectedTemplate = null;
            })
            .addCase(deleteResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Generate Summary
            .addCase(generateSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.summary = action.payload;  // update summary in form
            })
            .addCase(generateSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const {
    updatePersonalInfo,
    updateSummary,

    addEducation,
    updateEducation,
    addEducationDescription,
    removeEducationDescription,
    removeEducation,

    addExperience,
    updateExperience,
    addExperienceResponsibility,
    removeExperienceResponsibility,
    removeExperience,

    addSkill,
    removeSkill,

    addProject,
    updateProject,
    addProjectDescription,
    removeProjectDescription,
    removeProject,

    addCertification,
    updateCertification,
    removeCertification,

    addTemplate,

    resetResume
} = resumeSlice.actions;

export default resumeSlice.reducer;