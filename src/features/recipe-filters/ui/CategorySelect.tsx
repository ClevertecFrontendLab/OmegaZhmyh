import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tag,
    Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { selectMainCategories } from '~/entities/category';

import { selectUiState } from '../model/slice';
import { toggleCategory } from '../model/slice';

export const CategorySelect = () => {
    const dispatch = useDispatch();
    const { categoryFilters } = useSelector(selectUiState);
    const mainCategories = useSelector(selectMainCategories);

    const onCheckCategory = (category: string) => {
        dispatch(toggleCategory(category));
    };

    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant='outline'
                width='100%'
                height='none'
                paddingY='10px'
                minHeight='40px'
                fontSize='md'
                color='blackAlpha.700'
                borderColor='blackAlpha.200'
                data-test-id='filter-menu-button-категория'
            >
                <Flex gap='8px' flexWrap='wrap'>
                    {categoryFilters.length ? (
                        categoryFilters.map((filter) => (
                            <Tag variant='outline' colorScheme='lime' color='lime.600' key={filter}>
                                {filter}
                            </Tag>
                        ))
                    ) : (
                        <Text>Категория</Text>
                    )}
                </Flex>
            </MenuButton>
            <MenuList>
                {mainCategories.map(({ title, category }, index) => (
                    <MenuItem
                        as={Checkbox}
                        isChecked={categoryFilters.includes(category)}
                        onChange={() => onCheckCategory(title)}
                        bgColor={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                        data-test-id={`checkbox-${title.toLocaleLowerCase()}`}
                        key={category}
                    >
                        {title}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
