import { useDispatch, useSelector } from 'react-redux';

import { MultiSelect } from '~/shared/ui/MultiSelect';
import { selectIsDrawerOpen } from '~/widgets/Drawer';

import { selectAllergenOptions, selectDrawerAllergens } from '../model/selectors/alergenSelectors';
import { selectDrawerCustomAllergen } from '../model/selectors/alergenSelectors';
import { selectIsDrawerExcluding } from '../model/selectors/alergenSelectors';
import {
    addDrawerCustomAllergen,
    setDrawerCustomAllergenInput,
    toggleDrawerAllergen,
} from '../model/slice';

export const DrawerAllergenSelect = () => {
    const dispatch = useDispatch();
    const isExcluding = useSelector(selectIsDrawerExcluding);
    const selectedAllergens = useSelector(selectDrawerAllergens);
    const customAllergen = useSelector(selectDrawerCustomAllergen);
    const isDrawerOpen = useSelector(selectIsDrawerOpen);
    const allergenOptions = useSelector(selectAllergenOptions);

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
            allergensOptions={allergenOptions}
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
