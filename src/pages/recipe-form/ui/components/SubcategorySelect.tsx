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
import { memo, useCallback, useMemo } from 'react';

import { selectSubCategories } from '~/entities/category';
import { CreateRecipe } from '~/entities/recipe';
import { useAppSelector } from '~/shared/store';

import { FORM_FIELDS } from '../recipe-form.constants';

const CategoryMenuItem = memo(
    ({
        id,
        title,
        isChecked,
        onCheck,
        bgColor,
    }: {
        id: string;
        title: string;
        isChecked: boolean;
        onCheck: () => void;
        bgColor: string;
    }) => (
        <MenuItem>
            <Checkbox isChecked={isChecked} onChange={onCheck} bgColor={bgColor} key={id}>
                {title}
            </Checkbox>
        </MenuItem>
    ),
);

export const SubcategorySelect = () => {
    const { setFieldValue, values, errors } = useFormikContext<CreateRecipe>();
    const subcategories = useAppSelector(selectSubCategories);
    const tagCount = useBreakpointValue({ base: 1, lg: 2 }) ?? 1;

    const onCheckCategory = useCallback(
        (categoryId: string) => {
            const currentCategories = values.categoriesIds || [];
            const newCategories = currentCategories.includes(categoryId)
                ? currentCategories.filter((id) => id !== categoryId)
                : [...currentCategories, categoryId];
            setFieldValue(FORM_FIELDS.CATEGORIES, newCategories);
        },
        [values.categoriesIds, setFieldValue],
    );

    const categoryItems = useMemo(
        () =>
            subcategories.map(({ _id, title }, index) => (
                <CategoryMenuItem
                    key={_id}
                    id={_id}
                    title={title}
                    isChecked={values.categoriesIds?.includes(_id)}
                    onCheck={() => onCheckCategory(_id)}
                    bgColor={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                />
            )),
        [subcategories, values.categoriesIds, onCheckCategory],
    );

    return (
        <Menu closeOnSelect={false} matchWidth>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                color='blackAlpha.700'
                flexShrink={0}
                w={{ base: '185px', md: '232px', lg: '350px' }}
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
                                    <Tag variant='outline' colorScheme='lime' key={categoryId}>
                                        <Text
                                            color='lime.600'
                                            overflow='hidden'
                                            textOverflow='ellipsis'
                                            whiteSpace='nowrap'
                                        >
                                            {category?.title}
                                        </Text>
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
                            Выберите из списка...
                        </Text>
                    )}
                </Flex>
            </MenuButton>
            <MenuList maxH='336px' overflowY='auto' sx={{ scrollbarWidth: 'none' }}>
                {categoryItems}
            </MenuList>
        </Menu>
    );
};
