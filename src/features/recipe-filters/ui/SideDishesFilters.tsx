import { useDispatch, useSelector } from 'react-redux';

import { FilterGroup } from '~/shared/ui/FilterGroup';

import { selectSideDishesFilters } from '../model/selectors/drawerFilters/selectSideDishesFilters';
import { toggleSideDishe } from '../model/slice';

const SIDE_DISHES = [
    'Картошка',
    'Гречка',
    'Паста',
    'Спагетти',
    'Рис',
    'Капуста',
    'Фасоль',
    'Другие овощи',
];

export const SideDishesFilters = () => {
    const dispatch = useDispatch();
    const sideDishesFilters = useSelector(selectSideDishesFilters);
    const onChangeSideDishesFilter = (dishFilter: string) => {
        dispatch(toggleSideDishe(dishFilter));
    };
    return (
        <FilterGroup
            activeFilters={sideDishesFilters}
            filters={SIDE_DISHES}
            onChangeFilter={onChangeSideDishesFilter}
        />
    );
};
