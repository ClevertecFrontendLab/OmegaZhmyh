import { Box, Card, CardBody, Highlight, HStack, Image, LinkOverlay, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import { selectAllCategories } from '~/entities/Category';
import { API_BASE_IMG_URL } from '~/shared/config/constants';
import { RecipeTags } from '~/shared/ui/KitchenTag/';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/MiniButtons';

import { selectRecipeQuery } from '../model/selectors';
import { Recipe } from '../types';

interface NewRecipeCardProps {
    recipe: Recipe;
}

export const NewRecipeCard = (props: NewRecipeCardProps) => {
    const { recipe } = props;
    const { bookmarks, description, image, likes, title, categoriesIds } = recipe;
    const searchQuery = useSelector(selectRecipeQuery);
    const categories = useSelector(selectAllCategories);
    const recipeCategories = categories.filter((category) => categoriesIds.includes(category._id));
    const recipeMainCategory = recipeCategories.filter((category) => 'subCategories' in category);
    const recipeSubcategory = recipeCategories.filter((category) => !('subCategories' in category));

    return (
        <Card
            border='1px solid'
            borderColor='blackAlpha.200'
            borderRadius='8px'
            overflow='hidden'
            height={{ base: '220px', lg: '402px', xl: '414px' }}
        >
            {image ? (
                <>
                    <RecipeTags
                        categoriesIds={categoriesIds}
                        bgColor='lime.150'
                        position='absolute'
                        left='8px'
                        top='8px'
                        display={{ base: 'flex', lg: 'none' }}
                    />
                    <Image
                        src={API_BASE_IMG_URL + image}
                        width='100%'
                        height={{ base: '128px', lg: '230px' }}
                    />
                </>
            ) : null}
            <CardBody
                padding={{ base: '8px 8px 4px 8px', xl: '16px 24px 20px 24px' }}
                display='flex'
                flexDirection='column'
                gap={{ base: 2, lg: 6 }}
                alignItems='stretch'
                justifyContent='space-between'
            >
                <Box>
                    <LinkOverlay
                        as={Link}
                        to={`/${recipeMainCategory[0]}/${recipeSubcategory[0]}/${recipe._id}`}
                        fontSize={{ base: 'md', lg: 'xl' }}
                        fontWeight='medium'
                        noOfLines={{ base: 2, lg: 1 }}
                    >
                        <Highlight query={searchQuery} styles={{ bgColor: 'lime.150' }}>
                            {title}
                        </Highlight>
                    </LinkOverlay>

                    <Text
                        marginTop='1.5'
                        noOfLines={3}
                        fontSize='sm'
                        height={{ lg: '64px' }}
                        display={{ base: 'none', lg: 'flex' }}
                    >
                        {description}
                    </Text>
                </Box>
                <HStack spacing={8.5} justifyContent='space-between'>
                    <RecipeTags
                        categoriesIds={categoriesIds}
                        bgColor='lime.150'
                        display={{ base: 'none', lg: 'flex' }}
                    />
                    <HStack spacing={{ base: 0, lg: 2 }}>
                        <BookmarkBtn
                            value={bookmarks}
                            visibility={bookmarks ? 'visible' : 'hidden'}
                        />
                        <LikeBtn value={likes} visibility={likes ? 'visible' : 'hidden'} />
                    </HStack>
                </HStack>
            </CardBody>
        </Card>
    );
};
