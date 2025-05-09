import { useDispatch, useSelector } from 'react-redux';

import { MultiSelect } from '~/shared/ui/MultiSelect';
import { selectIsDrawerOpen } from '~/widgets/Drawer';

import { selectAllergenFilters } from '../model/slice';
import { selectFiltersOptions } from '../model/slice';
import { addCustomAllergen, setCustomAllergenInput, toggleAllergen } from '../model/slice';

type AllergenSelectProps = {
    isDrawerFilter?: boolean;
};

export const AllergenSelect = ({ isDrawerFilter = false }: AllergenSelectProps) => {
    const dispatch = useDispatch();
    const { isExcluding, selectedAllergens, customAllergen } = useSelector(selectAllergenFilters);
    const isDrawerOpen = useSelector(selectIsDrawerOpen);
    const { allergenOptions } = useSelector(selectFiltersOptions);

    const onToggleAllergen = (allergen: string) => dispatch(toggleAllergen(allergen));
    const onSetCustomAllergenInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setCustomAllergenInput(e.target.value));
    const onAddCustomAllergen = () => dispatch(addCustomAllergen());
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            dispatch(addCustomAllergen());
        }
    };

    return (
        <MultiSelect
            allergensOptions={allergenOptions}
            selectedAllergens={selectedAllergens}
            onToggleAllergen={onToggleAllergen}
            onSetCustomAllergenInput={onSetCustomAllergenInput}
            onAddCustomAllergen={onAddCustomAllergen}
            handleKeyDown={handleKeyDown}
            isDrawerOpen={isDrawerOpen}
            isExcluding={isExcluding}
            customAllergen={customAllergen}
            isDrawerFilter={isDrawerFilter}
        />
    );
};
