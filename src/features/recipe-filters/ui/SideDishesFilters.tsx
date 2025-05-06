import { useDispatch, useSelector } from 'react-redux';

import { FilterGroup } from '~/shared/ui/FilterGroup';

import {
    selectSideDishesOptions,
    selectUISideDishFilter,
} from '../model/selectors/drawerUIStateSelectors';
import { toggleSideDishe } from '../model/slice';

export const SideDishesFilters = () => {
    const dispatch = useDispatch();
    const sideDishesFilters = useSelector(selectUISideDishFilter);
    const sideDishesOptions = useSelector(selectSideDishesOptions);
    const onChangeSideDishesFilter = (dishFilter: string) => {
        dispatch(toggleSideDishe(dishFilter));
    };
    return (
        <FilterGroup
            activeFilters={sideDishesFilters}
            filters={sideDishesOptions}
            onChangeFilter={onChangeSideDishesFilter}
            title='Тип гарнира:'
        />
    );
};
