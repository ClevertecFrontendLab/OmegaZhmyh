import { createSelector } from '@reduxjs/toolkit';

import { selectCategoryLabels } from '~/entities/Category';
import { ApplicationState } from '~/shared/store/configure-store';

import { LabalState } from '../slice';

function ConvertlabelsToLabelsMap(labels: LabalState[]) {
    const map: { [key: string]: string } = {};
    labels.forEach((label) => {
        map[label.name] = label.label;
    });
    return map;
}

export const selectAllFiltersLabels = createSelector(
    [(state: ApplicationState) => state.filters.labels, selectCategoryLabels],
    (labels, categoryLabels) => {
        const meatLabels = ConvertlabelsToLabelsMap(labels.meatTypeFilters);
        const sideDishesLabels = ConvertlabelsToLabelsMap(labels.sideDishFilters);
        const allergensLabels = ConvertlabelsToLabelsMap(labels.allergenFilters);
        return {
            ...meatLabels,
            ...sideDishesLabels,
            ...allergensLabels,
            ...categoryLabels,
        };
    },
);
