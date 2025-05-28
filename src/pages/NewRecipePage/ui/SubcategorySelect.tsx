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
import { useFormikContext } from 'formik';

import { selectSubCategories } from '~/entities/Category';
import { CreateRecipe } from '~/entities/Recipe';
import { useAppSelector } from '~/shared/store/hooks';

import { FORM_FIELDS } from './constants';

export const SubcategorySelect = () => {
    const { setFieldValue, values, errors } = useFormikContext<CreateRecipe>();
    const subcategories = useAppSelector(selectSubCategories);

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
                variant='outline'
                width={{ base: '196px', md: '232px', lg: '350px' }}
                height='none'
                paddingY='10px'
                minHeight='40px'
                fontSize='md'
                color='blackAlpha.700'
                borderColor={errors[FORM_FIELDS.CATEGORIES] ? 'red.500' : 'blackAlpha.200'}
                data-test-id='recipe-categories'
            >
                <Flex gap='8px' flexWrap='wrap'>
                    {values.categoriesIds?.length ? (
                        <>
                            {values.categoriesIds.slice(0, 2).map((categoryId) => {
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
                            {values.categoriesIds.length > 2 && (
                                <Tag
                                    variant='outline'
                                    colorScheme='lime'
                                    color='lime.600'
                                    key='more-categories'
                                >
                                    {`+${values.categoriesIds.length - 2}`}
                                </Tag>
                            )}
                        </>
                    ) : (
                        <Text>Выберите категории</Text>
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
