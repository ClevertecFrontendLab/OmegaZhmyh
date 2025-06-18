import { isErrorResponse } from '~/features/auth';
import { HTTP_STATUS, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useErrorAlert } from '~/shared/ui/alert';

import { useBookmarkRecipeMutation } from '../../../entities/recipe/api/recipeApi';

export const useRecipeBookmark = ({ id }: { id?: string }) => {
    const { handleError } = useErrorAlert();

    const [bookmarkRecipe] = useBookmarkRecipeMutation();

    const handleBookmarkRecipe = async () => {
        if (id) {
            try {
                await bookmarkRecipe(id).unwrap();
            } catch (error) {
                if (isErrorResponse(error)) {
                    if (error.status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
                        handleError({
                            errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                            errorMessage: SERVER_ERROR_MESSAGES.SERVER_ERROR_MESSAGE,
                        });
                    }
                }
            }
        }
    };
    return { handleBookmarkRecipe };
};
