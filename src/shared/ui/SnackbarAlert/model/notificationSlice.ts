import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationState {
    error: string | null;
}

const initialState: NotificationState = {
    error: null,
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { setError, clearError } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
