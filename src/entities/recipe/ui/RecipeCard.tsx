import {
    Box,
    Button,
    Card,
    CardBody,
    Heading,
    Highlight,
    HStack,
    Image,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import { selectCategoryById, selectRecipeSubCategories } from '~/entities/category/@x/recipe';
import { isErrorResponse } from '~/features/auth/';
import { selectSearch } from '~/features/recipe-filters';
import { HTTP_STATUS, SERVER_ERROR_MESSAGES } from '~/shared/config';
import { getImgUrlPath } from '~/shared/lib';
import { useErrorAlert } from '~/shared/ui/alert';
import { BsBookmarkHeart } from '~/shared/ui/icon';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/mini-buttons';
import { RecipeTags } from '~/shared/ui/recipe-tags';

import { useBookmarkRecipeMutation } from '../api/recipeApi';
import { Recipe } from '../model/recipe.types';
import { BaseCard } from './BaseCard';
export type RecipeCardProps = {
    recipe: Recipe;
    cardLinkId?: number;
};

export const RecipeCard = ({ recipe, cardLinkId }: RecipeCardProps) => {
    const { searchQuery } = useSelector(selectSearch);
    const { bookmarks, description, _id, image, likes, categoriesIds, title } = recipe;
    const subcategory = useSelector(selectRecipeSubCategories(categoriesIds));
    const category = useSelector(selectCategoryById(subcategory?.rootCategoryId));

    const isMobile = useBreakpointValue({ base: true, lg: false });

    const [bookmarkRecipe] = useBookmarkRecipeMutation();
    const { handleError } = useErrorAlert();

    const handleBookmarkRecipe = () => {
        try {
            bookmarkRecipe(recipe._id).unwrap();
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

    const _recipeCard = (
        <BaseCard
            description={description}
            image={image}
            title={title}
            cardHeader={
                <HStack spacing={8.5} justifyContent='space-between'>
                    <RecipeTags
                        categoriesIds={categoriesIds}
                        bgColor='lime.50'
                        display={{ lg: 'flex', base: 'none' }}
                    />
                    <HStack spacing={2}>
                        <BookmarkBtn value={bookmarks} />
                        <LikeBtn value={likes} />
                    </HStack>
                </HStack>
            }
            imageBox={
                <RecipeTags
                    categoriesIds={categoriesIds}
                    bgColor='lime.50'
                    position='absolute'
                    left='8px'
                    top='8px'
                    display={{ lg: 'none', base: 'flex' }}
                />
            }
        />
    );
    return (
        <Card direction='row' variant='outline' overflow='hidden' borderRadius='8px'>
            <Box position='relative'>
                <Image
                    objectFit='cover'
                    src={getImgUrlPath(image)}
                    alt='Caffe Latte'
                    width={{ base: '158px', lg: '346px' }}
                    height={{ base: '128px', lg: '244px' }}
                />
                <RecipeTags
                    categoriesIds={categoriesIds}
                    bgColor='lime.50'
                    position='absolute'
                    left='8px'
                    top='8px'
                    display={{ lg: 'none', base: 'flex' }}
                />
            </Box>

            <CardBody padding={{ base: '8px 8px 4px 24px', lg: '20px 24px' }}>
                <VStack
                    spacing={{ lg: 6 }}
                    align='stretch'
                    justifyContent='space-between'
                    height='100%'
                >
                    <Box>
                        <HStack spacing={8.5} justifyContent='space-between'>
                            <RecipeTags
                                categoriesIds={categoriesIds}
                                bgColor='lime.50'
                                display={{ lg: 'flex', base: 'none' }}
                            />
                            <HStack spacing={2}>
                                <BookmarkBtn value={bookmarks} />
                                <LikeBtn value={likes} />
                            </HStack>
                        </HStack>

                        <Heading
                            marginTop={{ lg: '24px' }}
                            fontSize={{ lg: 'xl', base: 'md' }}
                            fontWeight='medium'
                            noOfLines={{ lg: 1, base: 2 }}
                            flexGrow={{ lg: '0', base: '1' }}
                            wordBreak='break-all'
                            style={{ wordWrap: 'break-word' }}
                        >
                            <Highlight query={searchQuery} styles={{ bgColor: 'lime.150' }}>
                                {title}
                            </Highlight>
                        </Heading>
                        <Box display={{ lg: 'block', base: 'none' }}>
                            <Text
                                marginTop='1.5'
                                noOfLines={3}
                                fontSize='sm'
                                wordBreak='break-all'
                                style={{ wordWrap: 'break-word' }}
                            >
                                {description}
                            </Text>
                        </Box>
                    </Box>

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
                            to={`/${category?.category}/${subcategory?.category}/${_id}`}
                            data-test-id={`card-link-${cardLinkId}`}
                        >
                            Готовить
                        </Button>
                    </HStack>
                </VStack>
            </CardBody>
        </Card>
    );
};
