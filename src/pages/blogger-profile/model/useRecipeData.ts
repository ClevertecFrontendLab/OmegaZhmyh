import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useGetRecipeByUserIdQuery } from '~/entities/recipe/api/recipeApi';
import { isErrorResponse } from '~/features/auth/';
import { HTTP_STATUS, ROUTES, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { setRecipesLoading } from '~/shared/store/app-slice';
import { useAppDispatch } from '~/shared/store/hooks';
import { useErrorAlert } from '~/shared/ui/alert';

export const useRecipeData = (bloggerId: string) => {
    const navigate = useNavigate();
    const { handleError } = useErrorAlert();
    const dispatch = useAppDispatch();
    const {
        data: recipesByBlogger,
        error: recipesByBloggerError,
        isFetching: isFetchingRecipes,
        isLoading: isLoadingRecipes,
    } = useGetRecipeByUserIdQuery(bloggerId as string, { skip: !bloggerId });

    useEffect(() => {
        dispatch(setRecipesLoading(isLoadingRecipes));
    }, [dispatch, isLoadingRecipes]);

    useEffect(() => {
        if (recipesByBloggerError && isErrorResponse(recipesByBloggerError)) {
            if (recipesByBloggerError.status === HTTP_STATUS.NOT_FOUND) {
                navigate(ROUTES.NOT_FOUND);
            } else {
                handleError({
                    errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                    errorMessage: SERVER_ERROR_MESSAGES.SERVER_ERROR_MESSAGE_DOT,
                });
            }
        }
    }, [handleError, navigate, recipesByBloggerError]);

    return {
        recipesByBlogger,
        isFetchingRecipes,
    };
};
