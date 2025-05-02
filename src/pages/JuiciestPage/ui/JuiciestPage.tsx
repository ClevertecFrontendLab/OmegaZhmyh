import { Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Recipe } from '~/entities/Recipe';
import { useGetTheJuiciestRecipeQuery } from '~/shared/api/yeedaaApi';
import { RecipeCardList } from '~/widgets/RecipeCardList';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

export const JuiciestPage = () => {
    const [page, setPage] = useState(1);
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

    const { data, isFetching } = useGetTheJuiciestRecipeQuery(page);
    useEffect(() => {
        if (data?.data) {
            setAllRecipes((prev) => {
                const newRecipes = data.data.filter(
                    (newRecipe) => !prev.some((recipe) => recipe._id === newRecipe._id),
                );
                return [...prev, ...newRecipes];
            });
        }
    }, [data]);

    const hasMore = data?.meta?.totalPages
        ? page < data.meta.totalPages || data.data.length < data.meta.limit
        : false;

    const handleLoadMore = () => {
        if (!isFetching) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <Flex justifyContent='center' direction='column' style={{ scrollbarGutter: 'stable' }}>
            <SearchPanel title='Самое сочное' />
            <RecipeCardList
                recipes={allRecipes}
                marginTop='32px'
                columns={{ base: 1, xl: 2, lg: 1, md: 2 }}
                columnGap={{ base: '16px', lg: '24px' }}
                rowGap='16px'
            />
            {!hasMore ? null : (
                <Button
                    display='block'
                    margin='0 auto'
                    marginTop='16px'
                    bgColor='lime.400'
                    color='black'
                    _hover={{ bgColor: 'lime.50' }}
                    onClick={handleLoadMore}
                >
                    Загрузить еще
                </Button>
            )}
            <RelevantKitchen
                marginTop={{ base: '32px', lg: '40px' }}
                title='Веганская кухня'
                description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                recipe1={{
                    title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
                    description:
                        'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
                    category: ['Вторые блюда'],
                    likes: 1,
                    bookmarks: 1,
                }}
                recipe2={{
                    title: 'Капустные котлеты',
                    description:
                        'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
                    category: ['Вторые блюда'],
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
