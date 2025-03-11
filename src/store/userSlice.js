import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetails } from "@/services/user";

// Async thunk to fetch user details
export const fetchUserDetails = createAsyncThunk("user/fetchUserDetails", async (_, thunkAPI) => {
    try {
        const data = await getUserDetails();
        // Assuming your API returns an object like { user: { ... } }
        return data.userDetails;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Called on login; ensures that loading is reset.
        setUserDetails: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        clearUserDetails: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            });
    },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
