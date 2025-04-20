import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    Flex,
    IconButton,
    Input,
    InputGroup,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Tag,
    Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { BsPlusCircleFill } from '~/shared/ui/Icons';

import { selectCustomAllergen } from '../model/selectors/selectCustomAllergen';
import { selectIsExcluding } from '../model/selectors/selectIsExcluding';
import { selectSelectedAllergens } from '../model/selectors/selectSelectedAllergens';
import { addCustomAllergen, setCustomAllergenInput, toggleAllergen } from '../model/slice';

const ALLERGEN_OPTIONS = [
    'Молочные продукты',
    'Яйцо',
    'Моллюски',
    'Рыба',
    'Орехи',
    'Томат (помидор)',
    'Цитрусовые',
    'Клубника (ягоды)',
    'Шоколад',
];

export const AllergenSelect = () => {
    const dispatch = useDispatch();
    const isExcluding = useSelector(selectIsExcluding);
    const selectedAllergens = useSelector(selectSelectedAllergens);
    const customAllergen = useSelector(selectCustomAllergen);

    const toggleAllergenHandler = (allergen: string) => dispatch(toggleAllergen(allergen));
    const setCustomAllergenInputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setCustomAllergenInput(e.target.value));
    const addCustomAllergenHandler = () => dispatch(addCustomAllergen());
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addCustomAllergenHandler();
        }
    };

    return (
        <>
            <Menu closeOnSelect={false}>
                <MenuButton
                    as={Button}
                    isDisabled={!isExcluding}
                    rightIcon={<ChevronDownIcon />}
                    variant='outline'
                    width='234px'
                    height='none'
                    paddingY='10px'
                    minHeight='40px'
                    fontSize='md'
                    color='lime.700'
                    borderColor='lime.300'
                    _disabled={{ borderColor: 'blackAlpha.200', color: 'blackAlpha.700' }}
                >
                    <Flex gap='8px' flexWrap='wrap'>
                        {selectedAllergens.length ? (
                            selectedAllergens.map((allergen) => (
                                <Tag variant='outline' colorScheme='lime' color='lime.600'>
                                    {allergen}
                                </Tag>
                            ))
                        ) : (
                            <Text>Выберите из списка</Text>
                        )}
                    </Flex>
                </MenuButton>
                <MenuList>
                    {ALLERGEN_OPTIONS.map((option, index) => (
                        <MenuItem
                            as={Checkbox}
                            isChecked={selectedAllergens.includes(option)}
                            onChange={() => toggleAllergenHandler(option)}
                            bgColor={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                        >
                            {option}
                        </MenuItem>
                    ))}
                    <MenuGroup>
                        <InputGroup padding='8px 8px 8px 24px' alignItems='center' gap='8px'>
                            <Input
                                onChange={setCustomAllergenInputHandler}
                                onKeyDown={handleKeyDown}
                                placeholder='Другой аллерген'
                                value={customAllergen}
                                size='sm'
                            />
                            <IconButton
                                onClick={addCustomAllergenHandler}
                                aria-label='123'
                                color='lime.800'
                                size='xs'
                                variant='ghost'
                                icon={<BsPlusCircleFill color='lime.600' />}
                            />
                        </InputGroup>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </>
    );
};
