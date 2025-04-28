import { createSlice } from '@reduxjs/toolkit';

export interface LayoutState {
    isBurgerOpen: boolean;
}

const initialState: LayoutState = {
    isBurgerOpen: false,
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toggleBurger: (state) => {
            state.isBurgerOpen = !state.isBurgerOpen;
        },
        closeBurger: (state) => {
            state.isBurgerOpen = false;
        },
    },
    selectors: {},
});

export const { toggleBurger, closeBurger } = layoutSlice.actions;
export default layoutSlice.reducer;
