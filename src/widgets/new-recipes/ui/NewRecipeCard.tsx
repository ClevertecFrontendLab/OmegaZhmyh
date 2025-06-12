import { Box, Card, CardBody, Highlight, HStack, Image, LinkOverlay, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import { selectAllCategories } from '~/entities/category';
import { Recipe } from '~/entities/recipe';
import { selectSearch } from '~/features/recipe-filters';
import { getImgUrlPath } from '~/shared/lib';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/mini-buttons';
import { RecipeTags } from '~/shared/ui/recipe-tags';

type NewRecipeCardProps = {
    recipe: Recipe;
};

export const NewRecipeCard = (props: NewRecipeCardProps) => {
    const { recipe } = props;
    const { bookmarks, description, image, likes, title, categoriesIds } = recipe;
    const { searchQuery } = useSelector(selectSearch);
    const categories = useSelector(selectAllCategories);
    const recipeCategories = categories.filter((category) => categoriesIds.includes(category._id));
    const recipeSubcategory = recipeCategories.find((cat) => 'rootCategoryId' in cat);
    const recipeMainCategory = categories.find(
        (cat) => cat._id === recipeSubcategory?.rootCategoryId,
    );

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
                        src={getImgUrlPath(image)}
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
                        to={
                            recipeSubcategory && recipeMainCategory
                                ? `/${recipeMainCategory.category}/${recipeSubcategory.category}/${recipe._id}`
                                : `/${recipe._id}`
                        }
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
                        <BookmarkBtn value={bookmarks} />
                        <LikeBtn value={likes} />
                    </HStack>
                </HStack>
            </CardBody>
        </Card>
    );
};
