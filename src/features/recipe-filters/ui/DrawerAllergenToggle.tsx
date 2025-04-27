import { Flex, Switch, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsDrawerExcluding } from '../model/selectors/drawerFilters/alergens/selectIsDrawerExcluding';
import { toggleDrawerAllergenExcluding } from '../model/slice';

interface AllergenToggleProps {}

export const DrawerAllergenToggle = (_props: AllergenToggleProps) => {
    const dispatch = useDispatch();
    const isExcluding = useSelector(selectIsDrawerExcluding);

    const toggleAllergenExcludingHandler = () => dispatch(toggleDrawerAllergenExcluding());

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
