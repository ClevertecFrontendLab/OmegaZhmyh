import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetCategoriesQuery, useGetTheJuiciestRecipeQuery } from '~/shared/api/yeedaaApi';
import { setCategoriesLoading } from '~/shared/store/loadingSlice';
import {
    selectCuisinePageLoading,
    selectJuiciestPageLoading,
    selectMainPageLoading,
    selectRelevantKitchenLoading,
} from '~/shared/store/selectors/loadingSelectors';
import { FullscreenSpinner } from '~/widgets/fullScreenSpiner';

export const AppLoader = () => {
    const dispatch = useDispatch();
    const categories = useGetCategoriesQuery();
    const recipes = useGetTheJuiciestRecipeQuery(1);

    const mainPageLoading = useSelector(selectMainPageLoading);
    const juiciestPageLoading = useSelector(selectJuiciestPageLoading);
    const cuisinePageLoading = useSelector(selectCuisinePageLoading);
    const relevantKitchenLoading = useSelector(selectRelevantKitchenLoading);

    useEffect(() => {
        dispatch(setCategoriesLoading(categories.isLoading));
    }, [categories.isLoading, dispatch]);

    const isLoading =
        mainPageLoading ||
        juiciestPageLoading ||
        cuisinePageLoading ||
        relevantKitchenLoading ||
        categories.isLoading ||
        recipes.isLoading;

    if (isLoading) return <FullscreenSpinner />;
};
