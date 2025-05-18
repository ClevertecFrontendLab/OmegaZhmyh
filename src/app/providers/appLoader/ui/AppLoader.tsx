import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useGetCategoriesQuery } from '~/shared/api/yeedaaApi';
import { setCategoriesLoading } from '~/shared/store/app-slice';

export const AppLoader = () => {
    const dispatch = useDispatch();

    const { isLoading } = useGetCategoriesQuery();

    useEffect(() => {
        dispatch(setCategoriesLoading(isLoading));
    }, [isLoading, dispatch]);

    return null;
};
