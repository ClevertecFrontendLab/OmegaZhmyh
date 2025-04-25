import { useDispatch, useSelector } from 'react-redux';

import { FilterGroup } from '~/shared/ui/FilterGroup';

import { selectSideDishesFilters } from '../model/selectors/drawerFilters/selectSideDishesFilters';
import { toggleSideDishe } from '../model/slice';

const SIDE_DISHES = [
    { label: 'Картошка', name: 'potatoes' },
    { label: 'Гречка', name: 'buckwheat' },
    { label: 'Паста', name: 'pasta' },
    { label: 'Спагетти', name: 'spaghetti' },
    { label: 'Рис', name: 'rice' },
    { label: 'Капуста', name: 'cabbage' },
    { label: 'Фасоль', name: 'bean' },
    { label: 'Другие овощи', name: 'Другие овощи' },
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
