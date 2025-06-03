import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router';

import { selectMainCategories, selectSubCategories } from '~/entities/category';
import {
    useBookmarkRecipeMutation,
    useDeleteRecipeMutation,
    useGetRecipeByIdQuery,
    useLikeRecipeMutation,
} from '~/entities/recipe/';
import { selectUserId } from '~/features/auth';
import { isErrorResponse } from '~/features/auth/types/auth.types';
import { RECIPE_ERROR_MESSAGES } from '~/pages/recipe-page/ui/recipe-messages.constants';
import { SERVER_ERROR_MESSAGES } from '~/shared/config/form-messages.constants';
import { HTTP_STATUS } from '~/shared/config/http-status-codes.constants';
import { EDIT_RECIPE, ROUTES } from '~/shared/config/routes.constants';
import { setPageLoader } from '~/shared/store/app-slice';
import { useAppSelector } from '~/shared/store/hooks';
import { useErrorAlert } from '~/shared/ui/alert';
import { BiEditAlt, BsAlarm, BsBookmarkHeart, BsEmojiHeartEyes, BsTrash } from '~/shared/ui/icon';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/mini-buttons';
import { RecipeTags } from '~/shared/ui/recipe-tags';
import { getImgUrlPath } from '~/shared/utils/getUrlPath';
import { NewRecipes } from '~/widgets/new-recipes';

import { AuthorCard } from './components/AuthorCard';
import { CookingSteps } from './components/CookingSteps';
import { IngredientsList } from './components/IngredientsList';
import { NutrientBlock } from './components/NutrientBlock';

export const RecipePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: recipe, isError, isLoading } = useGetRecipeByIdQuery(id as string);
    const [deleteRecipe] = useDeleteRecipeMutation();
    const [likeRecipe] = useLikeRecipeMutation();
    const [bookmarkRecipe] = useBookmarkRecipeMutation();

    const dispatch = useDispatch();
    const userId = useAppSelector(selectUserId);
    const mainCategories = useAppSelector(selectMainCategories);
    const subCategories = useAppSelector(selectSubCategories);
    const { handleError } = useErrorAlert();

    useEffect(() => {
        dispatch(setPageLoader(isLoading));
    }, [isLoading, dispatch]);

    useEffect(() => {
        if (isError) {
            handleError({
                errorTitle: RECIPE_ERROR_MESSAGES.RECIPE_LOAD_ERROR_TITLE,
                errorMessage: RECIPE_ERROR_MESSAGES.RECIPE_LOAD_ERROR,
                redirectBack: true,
            });
        }
    }, [isError, handleError]);

    if (!recipe) {
        return null;
    }

    const {
        title,
        description,
        time,
        image,
        categoriesIds,
        nutritionValue,
        ingredients,
        portions,
        likes,
        bookmarks,
        steps,
        authorId,
    } = recipe;

    const subCategory = subCategories.find((sub) => sub._id === categoriesIds?.[0]);
    const mainCategory = mainCategories.find((cat) => cat._id === subCategory?.rootCategoryId);

    const handleDeleteRecipe = async () => {
        if (id) {
            try {
                await deleteRecipe(id).unwrap();
                handleError({
                    errorTitle: RECIPE_ERROR_MESSAGES.RECIPE_DELETE_SUCCESS,
                    status: 'success',
                });
                navigate(ROUTES.HOME);
            } catch (error) {
                if (isErrorResponse(error)) {
                    if (error.status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
                        handleError({
                            errorTitle: SERVER_ERROR_MESSAGES.SERVER_ERROR,
                            errorMessage: RECIPE_ERROR_MESSAGES.RECIPE_DELETE_ERROR,
                        });
                    }
                }
            }
        }
    };

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

    return (
        <>
            <Flex
                flexDirection={{ base: 'column', md: 'row' }}
                gap={{ base: '16px', lg: '24px' }}
                marginTop={{ base: '16px', lg: '56px' }}
            >
                <Image
                    src={getImgUrlPath(image)}
                    objectFit='cover'
                    borderRadius='8px'
                    width={{ base: '328px', md: '232px', lg: '353px', xl: '553px' }}
                    height={{ base: '224px', lg: '410px' }}
                />
                <VStack alignItems='stretch' justifyContent='space-between' flex='1' gap='0'>
                    <Box>
                        <HStack justifyContent='space-between' alignItems='start'>
                            <RecipeTags
                                categoriesIds={categoriesIds}
                                bgColor='lime.50'
                                gap='8px'
                                flexDirection={{ base: 'column', md: 'row' }}
                            />
                            <HStack spacing={{ base: 0, lg: 2 }}>
                                <BookmarkBtn
                                    value={bookmarks}
                                    visibility={bookmarks ? 'visible' : 'hidden'}
                                />
                                <LikeBtn value={likes} visibility={likes ? 'visible' : 'hidden'} />
                            </HStack>
                        </HStack>
                        <Heading
                            fontSize={{ base: '2xl', lg: '5xl' }}
                            marginTop='32px'
                            noOfLines={2}
                        >
                            {title}
                        </Heading>
                        <Text marginTop={{ base: '16px', lg: '24px' }}>{description}</Text>
                    </Box>
                    <Flex
                        marginTop='24px'
                        flexDirection={{ base: 'column', md: 'row' }}
                        gap='12px'
                        alignItems={{ base: 'start', md: 'end' }}
                        justifyContent='space-between'
                    >
                        <Tag>
                            <TagLeftIcon as={BsAlarm} boxSize={{ lg: '16px' }}></TagLeftIcon>
                            <TagLabel>{time + ' мин.'}</TagLabel>
                        </Tag>
                        <Flex gap={{ base: '12px', xl: '16px' }}>
                            {userId === authorId ? (
                                <>
                                    <IconButton
                                        aria-label='Удалить рецепт'
                                        icon={<BsTrash />}
                                        onClick={handleDeleteRecipe}
                                        size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                                        variant='unstyled'
                                        color='black'
                                        data-test-id='recipe-delete-button'
                                    />
                                    <Button
                                        as={Link}
                                        to={`${EDIT_RECIPE}/${mainCategory?.category}/${subCategory?.category}/${id}`}
                                        size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                                        variant='outline'
                                        colorScheme='black'
                                        leftIcon={<BiEditAlt />}
                                    >
                                        Редактировать рецепт
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                                        variant='outline'
                                        colorScheme='black'
                                        leftIcon={<BsEmojiHeartEyes />}
                                        onClick={handleLikeRecipe}
                                    >
                                        Оценить рецепт
                                    </Button>
                                    <Button
                                        size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                                        color='black'
                                        bgColor='lime.400'
                                        leftIcon={<BsBookmarkHeart />}
                                        onClick={handleBookmarkRecipe}
                                    >
                                        Сохранить в закладки
                                    </Button>
                                </>
                            )}
                        </Flex>
                    </Flex>
                </VStack>
            </Flex>
            <Container
                maxWidth={{ base: '100%', lg: '578px', xl: '668px' }}
                paddingX={{ base: '0px' }}
            >
                <NutrientBlock nutritionValue={nutritionValue} />
            </Container>
            <Container
                maxWidth={{ base: '100%', md: '604px', lg: '578px', xl: '668px' }}
                paddingX={{ base: '0px' }}
            >
                <IngredientsList ingredients={ingredients} portions={portions} />
                <CookingSteps steps={steps} />
                <AuthorCard />
            </Container>
            <Box marginTop={{ base: '40px', lg: '56px' }}>
                <NewRecipes />
            </Box>
        </>
    );
};
