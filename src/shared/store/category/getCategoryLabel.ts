import { createSelector } from '@reduxjs/toolkit';

import { getCategores } from '~/shared/store/category/categorySlice';

export const getCategoryLabel = createSelector(getCategores, (categores) => {
    const categoresMap: { [key: string]: string } = {};
    for (const categoryName in categores) {
        categoresMap[categoryName] = categores[categoryName].label;
    }
    return categoresMap;
});
