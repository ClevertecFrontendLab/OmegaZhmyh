import { createSelector } from '@reduxjs/toolkit';

import { selectDrawerAllergens } from '../alergenSelectors';
import { selectCategoryFilter } from '../drawerStateSelectors';
import { selectAuthorsFilter } from '../drawerStateSelectors';
import { selectMeatTypesFilters } from '../meatTypesSelectors';
import { selectSideDishesFilters } from '../sideDishesSelectors';

export const selectAllFilters = createSelector(
    [
        selectDrawerAllergens,
        selectMeatTypesFilters,
        selectSideDishesFilters,
        selectCategoryFilter,
        selectAuthorsFilter,
    ],
    (...filters) => {
        const result: string[] = [];
        return result.concat(...filters);
    },
);
