import { useDispatch, useSelector } from 'react-redux';

import { FilterGroup } from '~/shared/ui/filter-group';

import { selectFiltersOptions, selectUiState } from '../model/slice';
import { toggleMeatType } from '../model/slice';

export const MeatFilters = () => {
    const dispatch = useDispatch();
    const { meatTypeFilters } = useSelector(selectUiState);
    const { meatTypeOptions } = useSelector(selectFiltersOptions);
    const onChangeMeatFilter = (meatFilter: string) => {
        dispatch(toggleMeatType(meatFilter));
    };
    return (
        <FilterGroup
            activeFilters={meatTypeFilters}
            filters={meatTypeOptions}
            onChangeFilter={onChangeMeatFilter}
            title='Тип мяса:'
        />
    );
};
