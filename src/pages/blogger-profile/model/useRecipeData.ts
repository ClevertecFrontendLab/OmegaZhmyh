import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useGetRecipeByUserIdQuery } from '~/entities/recipe/api/recipeApi';
import { isErrorResponse } from '~/features/auth/';
import { BLOG_RECIPES_LIMIT, HTTP_STATUS, ROUTES, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useErrorAlert } from '~/shared/ui/alert';

export const useRecipeData = (bloggerId: string) => {
    const navigate = useNavigate();
    const { handleError } = useErrorAlert();

    const {
        data: recipesByBlogger,
        error: recipesByBloggerError,
        isFetching: isFetchingRecipes,
    } = useGetRecipeByUserIdQuery(bloggerId as string, { skip: !bloggerId });

    const [showMoreRecipes, setShowMoreRecipes] = useState(false);

    const handleShowMoreRecipes = () => {
        setShowMoreRecipes(true);
    };

    const paginatedRecipes =
        recipesByBlogger?.recipes?.slice(0, showMoreRecipes ? undefined : BLOG_RECIPES_LIMIT) ?? [];

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

    return { paginatedRecipes, isFetchingRecipes, handleShowMoreRecipes, showMoreRecipes };
};
