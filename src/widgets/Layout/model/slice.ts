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
    selectors: {
        isBurgerOpen: (state) => state.isBurgerOpen,
    },
});

export const { toggleBurger, closeBurger } = layoutSlice.actions;
export const { isBurgerOpen } = layoutSlice.selectors;
export default layoutSlice.reducer;
