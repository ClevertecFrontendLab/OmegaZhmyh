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

import { selectMainCategories, selectSubCategories } from '~/entities/Category';
import {
    useBookmarkRecipeMutation,
    useDeleteRecipeMutation,
    useGetRecipeByIdQuery,
    useLikeRecipeMutation,
} from '~/entities/Recipe/api/recipeApi';
import { selectUserId } from '~/features/auth';
import { isErrorResponse } from '~/features/auth/types/auth.types';
import { EDIT_RECIPE, ROUTES } from '~/shared/config/routes.constants';
import { setPageLoader } from '~/shared/store/app-slice';
import { useAppSelector } from '~/shared/store/hooks';
import { BiEditAlt, BsAlarm, BsBookmarkHeart, BsEmojiHeartEyes, BsTrash } from '~/shared/ui/Icons';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/MiniButtons';
import { RecipeTags } from '~/shared/ui/RecipeTags/';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';
import { getImgUrlPath } from '~/shared/utils/getUrlPath';
import { NewRecipes } from '~/widgets/NewRecipes';

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
                errorTitle: 'Ошибка при загрузке рецепта',
                errorMessage: 'Не удалось загрузить рецепт',
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
                    errorTitle: 'Рецепт успешно удален',
                    status: 'success',
                });
                navigate(ROUTES.HOME);
            } catch (error) {
                if (isErrorResponse(error)) {
                    if (error.status === 500) {
                        handleError({
                            errorTitle: 'Ошибка сервера',
                            errorMessage: 'Не удалось удалить рецепт',
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
                    if (error.status === 500) {
                        handleError({
                            errorTitle: 'Ошибка сервера',
                            errorMessage: 'Попробуйте немного позже',
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
                    if (error.status === 500) {
                        handleError({
                            errorTitle: 'Ошибка сервера',
                            errorMessage: 'Попробуйте немного позже',
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
