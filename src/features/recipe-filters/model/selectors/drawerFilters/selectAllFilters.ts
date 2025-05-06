import { createSelector } from '@reduxjs/toolkit';

import { selectSelectedAllergens } from '../alergenSelectors';
import { selectCategoryFilter } from '../drawerUIStateSelectors';
import { selectUIAuthorFilter } from '../drawerUIStateSelectors';
import { selectUIMeatTypeFilter } from '../drawerUIStateSelectors';
import { selectUISideDishFilter } from '../drawerUIStateSelectors';

export const selectAllFilters = createSelector(
    [
        selectSelectedAllergens,
        selectUIMeatTypeFilter,
        selectUISideDishFilter,
        selectCategoryFilter,
        selectUIAuthorFilter,
    ],
    (...filters) => {
        const result: string[] = [];
        return result.concat(...filters);
    },
);
