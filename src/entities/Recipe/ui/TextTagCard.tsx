import { Box, Card, CardBody, Highlight, HStack, Image, LinkOverlay, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import { KitchenTag } from '~/shared/ui/KitchenTag';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/MiniButtons';

import { selectRecipeQuery } from '../model/selectors/selectRecipeQuery';
import { Recipe } from '../model/types';

export const TextTagCard = (recipe: Recipe) => {
    const { bookmarks, category, description, image, likes, title } = recipe;
    const searchQuery = useSelector(selectRecipeQuery);
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
                    <KitchenTag
                        category={category[0]}
                        color='lime.150'
                        position='absolute'
                        left='8px'
                        top='8px'
                        display={{ base: 'flex', lg: 'none' }}
                    />
                    <Image src={image} width='100%' height={{ base: '128px', lg: '230px' }} />
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
                        to={`/${recipe.category[0]}/${recipe.subcategory[0]}/${recipe.id}`}
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
                    <KitchenTag category={category[0]} display={{ base: 'none', lg: 'flex' }} />
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
