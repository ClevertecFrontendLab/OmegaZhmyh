import { Button, Flex, Link } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router';

import { selectAllCategories, setPageCategory, setPageSubcategory } from '~/entities/Category';
import { RecipeCardList } from '~/widgets/RecipeCardList';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

export const VeganCuisinePage = () => {
    const dispatch = useDispatch();
    const params = useParams<{ category: string; subcategory: string }>();
    const { category: pageCategory = '' } = params;
    const categories = useSelector(selectAllCategories);

    useEffect(() => {
        dispatch(setPageCategory(params.category ?? ''));
        dispatch(setPageSubcategory(params.subcategory ?? ''));
        return () => {
            dispatch(setPageCategory(''));
        };
    }, [dispatch, params]);

    return (
        <Flex
            justifyContent='center'
            direction='column'
            style={{ scrollbarGutter: 'stable' }}
            paddingX={{ base: '16px', md: '24px', lg: '9px' }}
        >
            <SearchPanel
                title='Веганская кухня'
                desc='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
            />
            <Flex justifyContent='center'>
                {categories[pageCategory].subcategory.map((sbc) => (
                    <Link
                        key={sbc.name}
                        as={NavLink}
                        to={`/${pageCategory}/${sbc.name}`}
                        display='flex'
                        padding='8px 16px'
                        whiteSpace='nowrap'
                        alignItems='center'
                        justifyContent='center'
                        color='lime.800'
                        borderBottom='1px solid'
                        borderColor='blackAlpha.200'
                        fontSize='md'
                        fontWeight='medium'
                        marginTop='32px'
                        _activeLink={{
                            borderBottom: '2px solid',
                            color: 'lime.600',
                            borderColor: 'lime.600',
                        }}
                    >
                        {sbc.label}
                    </Link>
                ))}
            </Flex>
            <RecipeCardList
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
                card1={{
                    title: 'Бананово-молочное желе',
                    description:
                        'Молочное желе – это просто, вкусно и полезно, ведь для его приготовления в качестве основы используется молоко.',
                    tagType: 'Детские блюда',
                    likeCount: 1,
                    repostCount: 1,
                }}
                card2={{
                    title: 'Нежный сливочно-сырный крем для кексов',
                    description:
                        'Сливочно-сырным кремом можно украсить кексы, либо другую выпечку, а также этим кремом можно наполнить заварные пирожные.',
                    tagType: 'Детские блюда',
                    likeCount: 2,
                    repostCount: 1,
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
