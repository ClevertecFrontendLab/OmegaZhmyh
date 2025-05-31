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
    useBreakpointValue,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';

import { selectSubCategories } from '~/entities/Category';
import { CreateRecipe } from '~/entities/Recipe';
import { useAppSelector } from '~/shared/store/hooks';

import { FORM_FIELDS } from './constants';

export const SubcategorySelect = () => {
    const { setFieldValue, values, errors } = useFormikContext<CreateRecipe>();
    const subcategories = useAppSelector(selectSubCategories);
    const tagCount = useBreakpointValue({ base: 1, lg: 2 }) ?? 1;

    const onCheckCategory = (categoryId: string) => {
        const currentCategories = values.categoriesIds || [];
        const newCategories = currentCategories.includes(categoryId)
            ? currentCategories.filter((id) => id !== categoryId)
            : [...currentCategories, categoryId];
        setFieldValue(FORM_FIELDS.CATEGORIES, newCategories);
    };

    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                color='blackAlpha.700'
                flexShrink={0}
                size='md'
                variant='outline'
                border={errors[FORM_FIELDS.CATEGORIES] ? '2px solid' : '1px solid'}
                borderColor={errors[FORM_FIELDS.CATEGORIES] ? 'red.500' : 'blackAlpha.200'}
                data-test-id='recipe-categories'
            >
                <Flex gap='8px' flexWrap='nowrap'>
                    {values.categoriesIds?.length ? (
                        <>
                            {values.categoriesIds.slice(0, tagCount).map((categoryId) => {
                                const category = subcategories.find((c) => c._id === categoryId);
                                return (
                                    <Tag
                                        variant='outline'
                                        colorScheme='lime'
                                        color='lime.600'
                                        key={categoryId}
                                    >
                                        {category?.title}
                                    </Tag>
                                );
                            })}
                            {values.categoriesIds.length > tagCount && (
                                <Tag
                                    variant='outline'
                                    colorScheme='lime'
                                    color='lime.600'
                                    key='more-categories'
                                >
                                    {`+${values.categoriesIds.length - tagCount}`}
                                </Tag>
                            )}
                        </>
                    ) : (
                        <Text
                            textAlign='left'
                            textOverflow='ellipsis'
                            overflow='hidden'
                            whiteSpace='nowrap'
                        >
                            Выберите категории
                        </Text>
                    )}
                </Flex>
            </MenuButton>
            <MenuList>
                {subcategories.map(({ _id, title }, index) => (
                    <MenuItem
                        as={Checkbox}
                        isChecked={values.categoriesIds?.includes(_id)}
                        onChange={() => onCheckCategory(_id)}
                        bgColor={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                        key={_id}
                    >
                        {title}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
