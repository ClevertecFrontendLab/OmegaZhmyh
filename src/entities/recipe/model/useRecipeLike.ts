import { isErrorResponse } from '~/features/auth';
import { HTTP_STATUS, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useErrorAlert } from '~/shared/ui/alert';

import { useLikeRecipeMutation } from '../api/recipeApi';

export const useRecipeLike = ({ id }: { id?: string }) => {
    const { handleError } = useErrorAlert();

    const [likeRecipe] = useLikeRecipeMutation();

    const handleLikeRecipe = async () => {
        if (id) {
            try {
                await likeRecipe(id).unwrap();
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

    return { handleLikeRecipe };
};
