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

import { BsPlusCircleFill } from '../../Icons';

interface MultiSelectProps {
    allergensOptions: string[];
    isExcluding: boolean;
    isDrawerOpen: boolean;
    selectedAllergens: string[];
    customAllergen: string;
    onToggleAllergen: (allergen: string) => void;
    onSetCustomAllergenInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAddCustomAllergen: () => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    isDrawerFilter?: boolean;
}

export const MultiSelect = ({
    customAllergen,
    isDrawerOpen,
    isExcluding,
    onAddCustomAllergen,
    onSetCustomAllergenInput,
    onToggleAllergen,
    handleKeyDown,
    selectedAllergens,
    allergensOptions,
    isDrawerFilter = false,
}: MultiSelectProps) => (
    <Menu closeOnSelect={false}>
        <MenuButton
            as={Button}
            isDisabled={!isExcluding}
            rightIcon={<ChevronDownIcon />}
            variant='outline'
            width='100%'
            height='none'
            paddingY='10px'
            minHeight='40px'
            fontSize='md'
            color='lime.700'
            borderColor='lime.300'
            _disabled={{ borderColor: 'blackAlpha.200', color: 'blackAlpha.700' }}
            data-test-id={isDrawerFilter ? 'allergens-menu-button-filter' : 'allergens-menu-button'}
        >
            <Flex gap='8px' flexWrap='wrap'>
                {selectedAllergens.length ? (
                    selectedAllergens.map((allergen) => (
                        <Tag key={allergen} variant='outline' colorScheme='lime' color='lime.600'>
                            {allergen}
                        </Tag>
                    ))
                ) : (
                    <Text>Выберите из списка</Text>
                )}
            </Flex>
        </MenuButton>
        <MenuList data-test-id='allergens-menu' width='234px' padding={0}>
            <Flex flexDirection='column'>
                {allergensOptions.map((allergen, index) => (
                    <Checkbox
                        key={allergen}
                        isChecked={selectedAllergens.includes(allergen)}
                        onChange={() => onToggleAllergen(allergen)}
                        padding={{ base: '6px 16px' }}
                        bgColor={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                        data-test-id={
                            (isDrawerFilter && isDrawerOpen) || (!isDrawerFilter && !isDrawerOpen)
                                ? `allergen-${index}`
                                : ''
                        }
                    >
                        {allergen}
                    </Checkbox>
                ))}
                <InputGroup padding='8px 8px 8px 24px' alignItems='center' gap='8px'>
                    <Input
                        onChange={onSetCustomAllergenInput}
                        onKeyDown={handleKeyDown}
                        placeholder='Другой аллерген'
                        value={customAllergen}
                        size='sm'
                        data-test-id={
                            (isDrawerFilter && isDrawerOpen) || (!isDrawerFilter && !isDrawerOpen)
                                ? 'add-other-allergen'
                                : ''
                        }
                    />
                    <IconButton
                        onClick={onAddCustomAllergen}
                        aria-label='123'
                        color='lime.800'
                        size='xs'
                        variant='ghost'
                        icon={<BsPlusCircleFill color='lime.600' />}
                        data-test-id={
                            (isDrawerFilter && isDrawerOpen) || (!isDrawerFilter && !isDrawerOpen)
                                ? 'add-allergen-button'
                                : ''
                        }
                    />
                </InputGroup>
            </Flex>
        </MenuList>
    </Menu>
);
