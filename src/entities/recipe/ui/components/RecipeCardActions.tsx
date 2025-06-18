import { Button, HStack, useBreakpointValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import { selectCategoryById, selectRecipeSubCategories } from '~/entities/category';
import { isErrorResponse } from '~/features/auth';
import { HTTP_STATUS, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { useErrorAlert } from '~/shared/ui/alert';
import { BsBookmarkHeart } from '~/shared/ui/icon';

import { useBookmarkRecipeMutation } from '../../api/recipeApi';

type RecipeCardActionsProps = {
    categoriesIds: string[];
    recipeId: string;
    cardLinkId: string;
};

export const RecipeCardActions = ({
    categoriesIds,
    recipeId,
    cardLinkId,
}: RecipeCardActionsProps) => {
    const subcategory = useSelector(selectRecipeSubCategories(categoriesIds));
    const category = useSelector(selectCategoryById(subcategory?.rootCategoryId));

    const isMobile = useBreakpointValue({ base: true, lg: false });

    const [bookmarkRecipe] = useBookmarkRecipeMutation();
    const { handleError } = useErrorAlert();

    const handleBookmarkRecipe = () => {
        try {
            bookmarkRecipe(recipeId).unwrap();
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
    };

    return (
        <HStack justifyContent='end' spacing={2}>
            <Button
                height={{ base: '24px', lg: '32px' }}
                minWidth='24px'
                variant='outline'
                color='blackAlpha.800'
                backgroundColor='whiteAlpha.100'
                borderColor='blackAlpha.600'
                paddingX={{ base: '6px', lg: '12px' }}
                leftIcon={<BsBookmarkHeart boxSize={{ base: '12px', lg: '14px' }} />}
                iconSpacing={{ base: '0px', lg: '8px' }}
                onClick={handleBookmarkRecipe}
            >
                {isMobile ? null : 'Сохранить'}
            </Button>

            <Button
                size={{ base: 'xs', lg: 'sm' }}
                variant='solid'
                color='white'
                backgroundColor='blackAlpha.900'
                borderColor='blackAlpha.200'
                border='1px solid black'
                _hover={{ color: 'black', bgColor: 'white' }}
                as={Link}
                to={`/${category?.category}/${subcategory?.category}/${recipeId}`}
                data-test-id={`card-link-${cardLinkId}`}
            >
                Готовить
            </Button>
        </HStack>
    );
};
