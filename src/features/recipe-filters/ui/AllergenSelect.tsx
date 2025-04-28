import { useDispatch, useSelector } from 'react-redux';

import { MultiSelect } from '~/shared/ui/MultiSelect';
import { selectIsDrawerOpen } from '~/widgets/Drawer';

import { selectCustomAllergen } from '../model/selectors/alergens/selectCustomAllergen';
import { selectIsExcluding } from '../model/selectors/alergens/selectIsExcluding';
import { selectSelectedAllergens } from '../model/selectors/alergens/selectSelectedAllergens';
import { addCustomAllergen, setCustomAllergenInput, toggleAllergen } from '../model/slice';

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

export const AllergenSelect = () => {
    const dispatch = useDispatch();
    const isExcluding = useSelector(selectIsExcluding);
    const selectedAllergens = useSelector(selectSelectedAllergens);
    const customAllergen = useSelector(selectCustomAllergen);
    const isDrawerOpen = useSelector(selectIsDrawerOpen);

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
            allergensOptions={ALLERGEN_OPTIONS}
            selectedAllergens={selectedAllergens}
            onToggleAllergen={onToggleAllergen}
            onSetCustomAllergenInput={onSetCustomAllergenInput}
            onAddCustomAllergen={onAddCustomAllergen}
            handleKeyDown={handleKeyDown}
            isDrawerOpen={isDrawerOpen}
            isExcluding={isExcluding}
            customAllergen={customAllergen}
            isDrawerFilter={false}
        />
    );
};
