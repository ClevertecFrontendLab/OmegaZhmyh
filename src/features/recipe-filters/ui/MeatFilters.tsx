import { useDispatch, useSelector } from 'react-redux';

import { FilterGroup } from '~/shared/ui/FilterGroup';

import {
    selectMeatTypeOptions,
    selectMeatTypesFilters,
} from '../model/selectors/meatTypesSelectors';
import { toggleMeatType } from '../model/slice';

export const MeatFilters = () => {
    const dispatch = useDispatch();
    const meatFilters = useSelector(selectMeatTypesFilters);
    const meatOptions = useSelector(selectMeatTypeOptions);
    const onChangeMeatFilter = (meatFilter: string) => {
        dispatch(toggleMeatType(meatFilter));
    };
    return (
        <FilterGroup
            activeFilters={meatFilters}
            filters={meatOptions}
            onChangeFilter={onChangeMeatFilter}
            title='Тип мяса:'
        />
    );
};
