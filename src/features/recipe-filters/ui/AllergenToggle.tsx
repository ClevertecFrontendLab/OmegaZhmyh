import { Flex, Switch, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAllergenFilters } from '../model/slice';
import { toggleAllergenExcluding } from '../model/slice';

type AllergenToggleProps = {
    isDrawerFilter?: boolean;
};

export const AllergenToggle = ({ isDrawerFilter = false }: AllergenToggleProps) => {
    const dispatch = useDispatch();
    const { isExcluding } = useSelector(selectAllergenFilters);

    const toggleAllergenExcludingHandler = () => dispatch(toggleAllergenExcluding());

    return (
        <Flex gap={3} flexGrow={1} paddingLeft='8px' minHeight='40px' alignItems='center'>
            <Text style={{ textWrap: 'nowrap' }} fontWeight='medium'>
                Исключить мои аллергены
            </Text>
            <Switch
                colorScheme='lime'
                isChecked={isExcluding}
                onChange={toggleAllergenExcludingHandler}
                data-test-id={isDrawerFilter ? 'allergens-switcher-filter' : 'allergens-switcher'}
            />
        </Flex>
    );
};
