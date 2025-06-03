import { Grid, GridItem, GridProps } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectMainCategories, selectSubCategories } from '~/entities/category';
import { useGetRecipeBySubategoryQuery } from '~/entities/recipe/';
import { RECIPES_LIMITS } from '~/shared/config/limits.constants';
import { setRelevantKitchenLoader } from '~/shared/store/app-slice';
import { setError } from '~/shared/store/notificationSlice';

import { TextCard } from './TextCard';
import { TextTagDecsCard } from './TextTagDecsCard';

export const RelevantKitchen = (props: GridProps) => {
    const dispatch = useDispatch();

    const subcategories = useSelector(selectSubCategories);
    const maincategories = useSelector(selectMainCategories);

    const rundomSubcategoryIndex = useRef(Math.floor(Math.random() * subcategories.length)).current;
    const rundomSubcategory = subcategories[rundomSubcategoryIndex];

    const rootCategoryId = rundomSubcategory?.rootCategoryId;
    const rootCategory = maincategories.find((category) => category._id === rootCategoryId);

    const { data, isError, isLoading } = useGetRecipeBySubategoryQuery(
        {
            subcategoryId: rundomSubcategory?._id ?? '',
            limit: RECIPES_LIMITS.RELEVANT,
        },
        {
            skip: !rundomSubcategory,
        },
    );
    const recipes = data?.data;

    useEffect(() => {
        if (isError) {
            dispatch(
                setError({
                    title: 'Ошибка сервера',
                    message: 'Попробуйте поискать снова попозже',
                }),
            );
        }
    }, [dispatch, isError]);

    useEffect(() => {
        dispatch(setRelevantKitchenLoader(isLoading));
    }, [isLoading, dispatch]);

    if (!subcategories.length || !maincategories.length) {
        return null;
    }

    return (
        <>
            {isError || isLoading || !rootCategory ? null : (
                <Grid
                    templateColumns={{ base: '1fr', md: '1fr 1fr 1fr', xl: '1fr 1fr 2fr' }}
                    rowGap={{ base: '12px', md: '16px', lg: '24px' }}
                    columnGap={{ base: '16px', xl: '24px' }}
                    borderTop='1px solid'
                    borderColor='blackAlpha.200'
                    padding={{ base: '8px 0 16px 0', lg: '24px 0 0 0' }}
                    {...props}
                >
                    <GridItem
                        fontSize={{ base: '2xl', lg: '4xl' }}
                        fontWeight='medium'
                        colSpan={{ base: 1, md: 3, lg: 1, xl: 2 }}
                        lineHeight={{ base: '32px' }}
                    >
                        {rootCategory?.title}
                    </GridItem>
                    <GridItem
                        fontSize={{ base: 'sm', md: 'md' }}
                        fontWeight='medium'
                        lineHeight='20px'
                        colSpan={{ base: 1, md: 3, lg: 2, xl: 1 }}
                        color='blackAlpha.600'
                    >
                        {rootCategory?.description}
                    </GridItem>

                    {recipes && recipes[0] ? <TextTagDecsCard recipe={recipes[0]} /> : null}
                    {recipes && recipes[1] ? <TextTagDecsCard recipe={recipes[1]} /> : null}

                    <Grid templateRows='repeat(3, 1fr)' gap={{ base: '12px' }}>
                        {recipes && recipes[2] ? (
                            <TextCard recipe={recipes[2]} category={rootCategory} />
                        ) : null}
                        {recipes && recipes[3] ? (
                            <TextCard recipe={recipes[3]} category={rootCategory} />
                        ) : null}
                        {recipes && recipes[4] ? (
                            <TextCard recipe={recipes[4]} category={rootCategory} />
                        ) : null}
                    </Grid>
                </Grid>
            )}
        </>
    );
};
