import { Button, Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Recipe } from '~/entities/Recipe';
import {
    selectCountSearchedRecipes,
    selectIsSearchActive,
} from '~/features/recipe-filters/model/slice';
import { useGetRecipesQuery } from '~/shared/api/yeedaaApi';
import { setPageLoader } from '~/shared/store/app-slice';
import { RecipeCardList } from '~/shared/ui/RecipeCardList';
import { setError } from '~/shared/ui/SnackbarAlert';
import { FoundRecipes } from '~/widgets/foundRecipes';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchPanel } from '~/widgets/SearchPanel';

export const JuiciestPage = () => {
    const [page, setPage] = useState(1);
    const [juiciestRecipes, setJuiciestRecipes] = useState<Recipe[]>([]);
    const dispatch = useDispatch();
    const { currentData, isLoading, isFetching, isError, isSuccess } = useGetRecipesQuery(
        {
            page: page,
            limit: 8,
            sortBy: 'likes',
            sortOrder: 'desc',
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );

    useEffect(() => {
        if (currentData?.data && isSuccess && currentData.meta.page === 1) {
            setJuiciestRecipes([...currentData.data]);
        } else if (currentData?.data && isSuccess) {
            setJuiciestRecipes((prev) => [...prev, ...currentData.data]);
        }
    }, [currentData?.meta.page, currentData?.data.length]);

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
        dispatch(setPageLoader(isLoading));
    }, [isLoading, dispatch]);

    const hasMore = currentData?.meta?.totalPages
        ? page < currentData.meta.totalPages || currentData.data.length < currentData.meta.limit
        : false;

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
