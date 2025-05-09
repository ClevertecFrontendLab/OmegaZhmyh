import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetCategoriesQuery } from '~/shared/api/yeedaaApi';
import { setCategoriesLoading, userLoadingSelector } from '~/shared/store/app-slice';
import { FullscreenSpinner } from '~/widgets/fullScreenSpiner';

export const AppLoader = () => {
    const dispatch = useDispatch();
    const idAppLoading = useSelector(userLoadingSelector);
    const { isLoading } = useGetCategoriesQuery();

    useEffect(() => {
        dispatch(setCategoriesLoading(isLoading));
    }, [isLoading, dispatch]);

    if (idAppLoading) return <FullscreenSpinner />;
};
