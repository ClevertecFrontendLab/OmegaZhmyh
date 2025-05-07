import { Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Recipe } from '~/entities/Recipe';
import {
    selectCountSearchedRecipes,
    selectIsSearchActive,
} from '~/features/recipe-filters/model/selectors/searchSelectors';
import { useGetTheJuiciestRecipeQuery } from '~/shared/api/yeedaaApi';
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
    const { data, isLoading, isError, isSuccess } = useGetTheJuiciestRecipeQuery(page, {
        refetchOnMountOrArgChange: true,
    });

    /* useEffect(() => {
        if (data?.data && isSuccess) {
            setJuiciestRecipes([...data.data]);
        }
    }, []); */

    useEffect(() => {
        if (data?.data && isSuccess) {
            setJuiciestRecipes((prev) => [...prev, ...data.data]);
        }
    }, [data?.meta.page, data?.data.length]);

    useEffect(() => {
        if (isError) {
            dispatch(setError('Не удалось загрузить самые сочные рецепты'));
        }
    }, [isError, dispatch]);

    useEffect(() => {
        dispatch(setPageLoader(isLoading));
    }, [isLoading, dispatch]);

    const hasMore = data?.meta?.totalPages
        ? page < data.meta.totalPages || data.data.length < data.meta.limit
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
            {countOfSearchedRecipes == 0 || !isSearchActive ? (
                <>
                    <RecipeCardList
                        recipes={juiciestRecipes}
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
                            data-test-id='load-more-button'
                        >
                            Загрузка
                        </Button>
                    )}
                </>
            ) : null}
            <RelevantKitchen marginTop={{ base: '32px', lg: '40px' }} />
        </Flex>
    );
};
