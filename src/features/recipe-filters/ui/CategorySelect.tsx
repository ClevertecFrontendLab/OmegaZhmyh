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

import { selectCategoryLabels } from '~/entities/Category';

import { selectCategoryFilter } from '../model/selectors/drawerFilters/selectCategoryFilter';
import { toggleCategory } from '../model/slice';

export const CategorySelect = () => {
    const dispatch = useDispatch();
    const categoryFilters = useSelector(selectCategoryFilter);
    const allCategories = useSelector(selectCategoryLabels);

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
                        categoryFilters.map((f) => (
                            <Tag variant='outline' colorScheme='lime' color='lime.600' key={f}>
                                {allCategories[f]}
                            </Tag>
                        ))
                    ) : (
                        <Text>Категория</Text>
                    )}
                </Flex>
            </MenuButton>
            <MenuList>
                {Object.entries(allCategories).map(([name, label], index) => (
                    <MenuItem
                        as={Checkbox}
                        isChecked={categoryFilters.includes(name)}
                        onChange={() => dispatch(toggleCategory(name))}
                        bgColor={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                        data-test-id={`checkbox-${label.toLocaleLowerCase()}`}
                        key={name}
                    >
                        {label}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
