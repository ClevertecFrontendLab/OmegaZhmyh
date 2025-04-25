import { useDispatch, useSelector } from 'react-redux';

import { FilterGroup } from '~/shared/ui/FilterGroup';

import { selectMeatTypesFilters } from '../model/selectors/drawerFilters/selectMeatTypesFilters';
import { toggleMeatType } from '../model/slice';

const MEAT_TYPES = [
    { label: 'Курица', name: 'chicken' },
    { label: 'Свинина', name: 'pork' },
    { label: 'Говядина', name: 'beef' },
    { label: 'Индейка', name: 'turkey' },
    { label: 'Утка', name: 'duck' },
];

export const MeatFilters = () => {
    const dispatch = useDispatch();
    const meatFilters = useSelector(selectMeatTypesFilters);
    const onChangeMeatFilter = (meatFilter: string) => {
        dispatch(toggleMeatType(meatFilter));
    };
    return (
        <FilterGroup
            activeFilters={meatFilters}
            filters={MEAT_TYPES}
            onChangeFilter={onChangeMeatFilter}
        />
    );
};
