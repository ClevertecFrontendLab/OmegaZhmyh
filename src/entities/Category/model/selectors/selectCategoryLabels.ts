import { createSelector } from '@reduxjs/toolkit';

import { selectAllCategories } from '~/entities/Category/model/selectors/selectAllCategories';

import { categoryLabels } from '../types';

export const selectCategoryLabels = createSelector(selectAllCategories, (categores) => {
    const categoresMap: categoryLabels = {};
    for (const categoryName in categores) {
        categoresMap[categoryName] = categores[categoryName].label;
    }
    return categoresMap;
});
