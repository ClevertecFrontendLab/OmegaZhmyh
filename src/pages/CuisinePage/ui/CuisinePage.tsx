import { Button, Flex, Link } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router';

import {
    selectMainCategories,
    selectSubcategories,
    setPageCategory,
    setPageSubcategory,
} from '~/entities/Category';
import { useGetRecipeBySubategoryQuery } from '~/shared/api/yeedaaApi';
import { RecipeCardList } from '~/widgets/RecipeCardList';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

export const CuisinePage = () => {
    const dispatch = useDispatch();

    const { category: urlCategory = '', subcategory: urlSubcategory = '' } = useParams<{
        category: string;
        subcategory: string;
    }>();

    const categories = useSelector(selectMainCategories);
    const subcategories = useSelector(selectSubcategories);

    const pageMainCategory = categories.find((c) => c.category === urlCategory)!;
    const pageSubcategory = subcategories.find((c) => c.category === urlSubcategory)!;

    useEffect(() => {
        dispatch(setPageCategory(pageMainCategory));
        dispatch(setPageSubcategory(pageSubcategory));
        return () => {
            dispatch(setPageCategory(null));
            dispatch(setPageSubcategory(null));
        };
    }, [dispatch, urlCategory, pageSubcategory, pageMainCategory]);

    const { data } = useGetRecipeBySubategoryQuery(pageSubcategory._id);
    const recipes = data?.data;

    return (
        <Flex justifyContent='center' direction='column' style={{ scrollbarGutter: 'stable' }}>
            <SearchPanel
                title={pageMainCategory?.title || 'Заголовок не найден'}
                desc={pageMainCategory?.description || 'Описание не найдено'}
            />
            <Flex justifyContent='center' flexWrap='wrap' marginTop='32px'>
                {pageMainCategory?.subCategories.map(({ title, category }, i) => (
                    <Link
                        variant='subCategoryTab'
                        key={category}
                        as={NavLink}
                        to={`/${urlCategory}/${category}`}
                        data-test-id={`tab-${category}-${i}`}
                        {...(location.pathname === `/${urlCategory}/${category}`
                            ? {
                                  'aria-selected': true,
                              }
                            : { 'aria-selected': false })}
                    >
                        {title}
                    </Link>
                ))}
            </Flex>
            <RecipeCardList
                recipes={recipes}
                marginTop='24px'
                columns={{ base: 1, xl: 2, lg: 1, md: 2 }}
                columnGap={{ base: '16px', lg: '24px' }}
                rowGap='16px'
            />
            <Button
                display='block'
                margin='0 auto'
                marginTop='16px'
                bgColor='lime.400'
                color='black'
            >
                Загрузить еще
            </Button>
            <RelevantKitchen
                title='Десерты, выпечка'
                description='Без них невозможно представить себе ни современную, ни традиционную кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб — рецепты изделий из теста многообразны и невероятно популярны.'
                recipe1={{
                    title: 'Бананово-молочное желе',
                    description:
                        'Молочное желе – это просто, вкусно и полезно, ведь для его приготовления в качестве основы используется молоко.',
                    category: ['Детские блюда'],
                    likes: 1,
                    bookmarks: 1,
                }}
                recipe2={{
                    title: 'Нежный сливочно-сырный крем для кексов',
                    description:
                        'Сливочно-сырным кремом можно украсить кексы, либо другую выпечку, а также этим кремом можно наполнить заварные пирожные.',
                    category: ['Детские блюда'],
                    likes: 2,
                    bookmarks: 1,
                }}
                miniCardText1='Стейк для вегетарианцев'
                miniCardIcon1='Вторые блюда'
                miniCardText2='Котлеты из гречки и фасоли'
                miniCardIcon2='Вторые блюда'
                miniCardText3='Сырный суп с лапшой и брокколи'
                miniCardIcon3='Первые блюда'
            />
        </Flex>
    );
};
