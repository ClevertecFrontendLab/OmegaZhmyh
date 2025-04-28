import { createSelector } from '@reduxjs/toolkit';

import { selectDrawerAllergens } from './drawerFilters/alergens/selectDrawerAllergens';
import { selectAuthorsFilter } from './drawerFilters/selectAuthorsFilter';
import { selectCategoryFilter } from './drawerFilters/selectCategoryFilter';
import { selectMeatTypesFilters } from './drawerFilters/selectMeatTypesFilters';
import { selectSideDishesFilters } from './drawerFilters/selectSideDishesFilters';

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
