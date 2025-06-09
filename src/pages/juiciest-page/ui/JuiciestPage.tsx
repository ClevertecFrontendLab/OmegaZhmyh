import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetRecipesQuery } from '~/entities/recipe/';
import { Recipe } from '~/entities/recipe/';
import {
    selectCountSearchedRecipes,
    selectIsSearchActive,
} from '~/features/recipe-filters/model/slice';
import { RECIPES_LIMITS } from '~/shared/config/limits.constants';
import { SORT } from '~/shared/config/sort.constants';
import { setPageLoader } from '~/shared/store/app-slice';
import { setError } from '~/shared/store/notificationSlice';
import { LoadMoreButton } from '~/shared/ui/load-more-button';
import { RecipeCardList } from '~/shared/ui/recipe-card-list';
import { FoundRecipes } from '~/widgets/founded-recipes';
import { RelevantKitchen } from '~/widgets/relevant-kitchen';
import { SearchPanel } from '~/widgets/search-panel';

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
                        <LoadMoreButton handleLoadMore={handleLoadMore} isFetching={isFetching} />
                    )}
                </>
            ) : null}
            <RelevantKitchen marginTop={{ base: '32px', lg: '40px' }} />
        </Flex>
    );
};
