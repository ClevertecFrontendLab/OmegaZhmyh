import { Button, Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Recipe } from '~/entities/Recipe';
import { useGetRecipesQuery } from '~/entities/Recipe/api/recipeApi';
import {
    selectCountSearchedRecipes,
    selectIsSearchActive,
} from '~/features/recipe-filters/model/slice';
import { RECIPES_LIMITS } from '~/shared/config/limits.constants';
import { SORT } from '~/shared/config/sort.constants';
import { setPageLoader } from '~/shared/store/app-slice';
import { setError } from '~/shared/store/notificationSlice';
import { RecipeCardList } from '~/shared/ui/RecipeCardList';
import { FoundRecipes } from '~/widgets/foundRecipes';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

export const JuiciestPage = () => {
    const [page, setPage] = useState(1);
    const [juiciestRecipes, setJuiciestRecipes] = useState<Recipe[]>([]);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const dispatch = useDispatch();
    const { currentData, isFetching, isError, isSuccess } = useGetRecipesQuery(
        {
            page: page,
            limit: RECIPES_LIMITS.DEFAULT,
            sortBy: SORT.BY.LIKES,
            sortOrder: SORT.ORDER.DESC,
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );

    useEffect(() => {
        if (currentData?.data && isSuccess && currentData.meta?.page === 1) {
            setJuiciestRecipes([...currentData.data]);
        } else if (currentData?.data && isSuccess) {
            setJuiciestRecipes((prev) => [...prev, ...currentData.data!]);
        }
    }, [currentData, isSuccess]);

    useEffect(() => {
        if (isError) {
            dispatch(
                setError({
                    title: 'Не удалось загрузить самые сочные рецепты',
                    message: 'Попробуйте поискать снова попозже',
                }),
            );
        }
    }, [isError, dispatch]);

    useEffect(() => {
        dispatch(setPageLoader(isFirstLoad));
    }, [isFirstLoad, dispatch]);

    useEffect(() => {
        if (!isFetching) {
            setIsFirstLoad(false);
        }
    }, [isFetching]);

    const hasMore = currentData?.meta?.totalPages ? page < currentData.meta.totalPages : false;

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const countOfSearchedRecipes = useSelector(selectCountSearchedRecipes);
    const isSearchActive = useSelector(selectIsSearchActive);

    return (
        <Flex justifyContent='center' direction='column' style={{ scrollbarGutter: 'stable' }}>
            <SearchPanel title='Самое сочное' />
            <FoundRecipes />
            {countOfSearchedRecipes === 0 || !isSearchActive ? (
                <>
                    <RecipeCardList
                        recipes={juiciestRecipes}
                        columns={{ base: 1, xl: 2, lg: 1, md: 2 }}
                        columnGap={{ base: '16px', lg: '24px' }}
                        rowGap='16px'
                    />
                    {!hasMore && !isFetching ? null : (
                        <Button
                            display='block'
                            margin='0 auto'
                            marginTop='16px'
                            bgColor='lime.400'
                            color='black'
                            _hover={{ bgColor: 'lime.50' }}
                            onClick={handleLoadMore}
                            isDisabled={isFetching}
                            data-test-id='load-more-button'
                        >
                            <Flex alignItems='center' gap='8px'>
                                {isFetching ? <Spinner boxSize='12px' /> : null}
                                {isFetching ? 'Загрузка' : 'Загрузить еще'}
                            </Flex>
                        </Button>
                    )}
                </>
            ) : null}
            <RelevantKitchen marginTop={{ base: '32px', lg: '40px' }} />
        </Flex>
    );
};
