import { createSlice } from '@reduxjs/toolkit';

export type LayoutState = {
    isBurgerOpen: boolean;
};

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
        selectIsBurgerOpen: (state) => state.isBurgerOpen,
    },
});

export const { toggleBurger, closeBurger } = layoutSlice.actions;
export const { selectIsBurgerOpen } = layoutSlice.selectors;
