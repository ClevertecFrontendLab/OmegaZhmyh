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
                    data-test-id='allergens-menu-button-filter'
                >
                    <Flex gap='8px' flexWrap='wrap'>
                        {selectedAllergens.length ? (
                            selectedAllergens.map((allergen) => (
                                <Tag
                                    key={allergen}
                                    variant='outline'
                                    colorScheme='lime'
                                    color='lime.600'
                                >
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
                            key={option}
                            isChecked={selectedAllergens.includes(option)}
                            onChange={() => onToggleAllergen(option)}
                            bgColor={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                            data-test-id={isDrawerOpen ? `allergen-${index}` : ''}
                        >
                            {option}
                        </MenuItem>
                    ))}
                    <MenuGroup>
                        <InputGroup padding='8px 8px 8px 24px' alignItems='center' gap='8px'>
                            <Input
                                onChange={onSetCustomAllergenInput}
                                onKeyDown={handleKeyDown}
                                placeholder='Другой аллерген'
                                value={customAllergen}
                                size='sm'
                                data-test-id={isDrawerOpen ? 'add-other-allergen' : ''}
                            />
                            <IconButton
                                onClick={onAddCustomAllergen}
                                aria-label='123'
                                color='lime.800'
                                size='xs'
                                variant='ghost'
                                icon={<BsPlusCircleFill color='lime.600' />}
                                data-test-id={isDrawerOpen ? 'add-allergen-button' : ''}
                            />
                        </InputGroup>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </>
    );
};
