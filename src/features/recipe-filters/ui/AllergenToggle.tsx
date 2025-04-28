import { Flex, Switch, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsExcluding } from '../model/selectors/alergens/selectIsExcluding';
import { toggleAllergenExcluding } from '../model/slice';

interface AllergenToggleProps {}

export const AllergenToggle = (_props: AllergenToggleProps) => {
    const dispatch = useDispatch();
    const isExcluding = useSelector(selectIsExcluding);

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
                data-test-id='allergens-switcher'
            />
        </Flex>
    );
};
