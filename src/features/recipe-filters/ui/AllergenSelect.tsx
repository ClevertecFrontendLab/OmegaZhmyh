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
    MenuList,
    Tag,
    Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { BsPlusCircleFill } from '~/shared/ui/Icons';
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
                    data-test-id='allergens-menu-button'
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
                <MenuList data-test-id='allergens-menu'>
                    <Flex flexDirection='column'>
                        {ALLERGEN_OPTIONS.map(({ label, name }, index) => (
                            <Checkbox
                                key={name}
                                isChecked={selectedAllergens.includes(name)}
                                onChange={() => onToggleAllergen(name)}
                                bgColor={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                                data-test-id={!isDrawerOpen ? `allergen-${index}` : ''}
                            >
                                {label}
                            </Checkbox>
                        ))}
                        <InputGroup padding='8px 8px 8px 24px' alignItems='center' gap='8px'>
                            <Input
                                onChange={onSetCustomAllergenInput}
                                onKeyDown={handleKeyDown}
                                placeholder='Другой аллерген'
                                value={customAllergen}
                                size='sm'
                                data-test-id={!isDrawerOpen ? 'add-other-allergen' : ''}
                            />
                            <IconButton
                                onClick={onAddCustomAllergen}
                                aria-label='123'
                                color='lime.800'
                                size='xs'
                                variant='ghost'
                                icon={<BsPlusCircleFill color='lime.600' />}
                                data-test-id={!isDrawerOpen ? 'add-allergen-button' : ''}
                            />
                        </InputGroup>
                    </Flex>
                </MenuList>
            </Menu>
        </>
    );
};
