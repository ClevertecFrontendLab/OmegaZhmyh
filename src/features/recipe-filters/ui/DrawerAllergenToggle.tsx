import { Flex, Switch, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAllergenFilters, toggleAllergenExcluding } from '../model/slice';

export const DrawerAllergenToggle = () => {
    const dispatch = useDispatch();
    const { isExcluding } = useSelector(selectAllergenFilters);

    const toggleAllergenExcludingHandler = () => dispatch(toggleAllergenExcluding());

    return (
        <Flex gap={3} flexGrow={1} minHeight='40px' alignItems='center'>
            <Text style={{ textWrap: 'nowrap' }} fontWeight='medium'>
                Исключить мои аллергены
            </Text>
            <Switch
                colorScheme='lime'
                isChecked={isExcluding}
                onChange={toggleAllergenExcludingHandler}
                data-test-id='allergens-switcher-filter'
            />
        </Flex>
    );
};
