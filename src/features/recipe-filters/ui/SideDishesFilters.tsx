import { useDispatch, useSelector } from 'react-redux';

import { FilterGroup } from '~/shared/ui/filter-group';

import { selectFiltersOptions, selectUiState } from '../model/slice';
import { toggleSideDishe } from '../model/slice';

export const SideDishesFilters = () => {
    const dispatch = useDispatch();
    const { sideDishFilters } = useSelector(selectUiState);
    const { sideDishOptions } = useSelector(selectFiltersOptions);
    const onChangeSideDishesFilter = (dishFilter: string) => {
        dispatch(toggleSideDishe(dishFilter));
    };
    return (
        <FilterGroup
            activeFilters={sideDishFilters}
            filters={sideDishOptions}
            onChangeFilter={onChangeSideDishesFilter}
            title='Тип гарнира:'
        />
    );
};
