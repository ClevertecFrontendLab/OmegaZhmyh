import { useDispatch, useSelector } from 'react-redux';

import { MultiSelect } from '~/shared/ui/MultiSelect';
import { selectIsDrawerOpen } from '~/widgets/Drawer';

import { selectDrawerAllergens } from '../model/selectors/drawerFilters/alergens/selectDrawerAllergens';
import { selectDrawerCustomAllergen } from '../model/selectors/drawerFilters/alergens/selectDrawerCustomAllergen';
import { selectIsDrawerExcluding } from '../model/selectors/drawerFilters/alergens/selectIsDrawerExcluding';
import {
    addDrawerCustomAllergen,
    setDrawerCustomAllergenInput,
    toggleDrawerAllergen,
} from '../model/slice';

const ALLERGEN_OPTIONS = [
    { label: 'Молочные продукты', name: 'моло' },
    { label: 'Яйцо', name: 'яйцо' },
    { label: 'Моллюски', name: '' },
    { label: 'Рыба', name: 'рыб' },
    { label: 'Орехи', name: 'орех' },
    { label: 'Томат (помидор)', name: 'томат' },
    { label: 'Цитрусовые', name: 'цитрус' },
    { label: 'Клубника (ягоды)', name: 'клубни' },
    { label: 'Шоколад', name: 'шоколад' },
];

export const DrawerAllergenSelect = () => {
    const dispatch = useDispatch();
    const isExcluding = useSelector(selectIsDrawerExcluding);
    const selectedAllergens = useSelector(selectDrawerAllergens);
    const customAllergen = useSelector(selectDrawerCustomAllergen);
    const isDrawerOpen = useSelector(selectIsDrawerOpen);

    const onToggleAllergen = (allergen: string) => dispatch(toggleDrawerAllergen(allergen));
    const onSetCustomAllergenInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setDrawerCustomAllergenInput(e.target.value));
    const onAddCustomAllergen = () => dispatch(addDrawerCustomAllergen());
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            dispatch(addDrawerCustomAllergen());
        }
    };

    return (
        <MultiSelect
            allergensOptions={ALLERGEN_OPTIONS}
            selectedAllergens={selectedAllergens}
            onToggleAllergen={onToggleAllergen}
            onSetCustomAllergenInput={onSetCustomAllergenInput}
            onAddCustomAllergen={onAddCustomAllergen}
            handleKeyDown={handleKeyDown}
            isDrawerOpen={isDrawerOpen}
            isExcluding={isExcluding}
            customAllergen={customAllergen}
            isDrawerFilter={true}
        />
    );
};
