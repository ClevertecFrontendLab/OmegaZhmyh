import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetCategoriesQuery } from '~/shared/api/yeedaaApi';
import { setAppLoader, userLoadingSelector } from '~/shared/store/app-slice';
import { FullscreenSpinner } from '~/widgets/fullScreenSpiner';

export const AppLoader = () => {
    const dispatch = useDispatch();
    const categories = useGetCategoriesQuery();

    const isAppLoading = useSelector(userLoadingSelector);

    useEffect(() => {
        dispatch(setAppLoader(categories.isLoading));
    }, [categories.isLoading, dispatch]);

    if (isAppLoading) return <FullscreenSpinner />;
};
