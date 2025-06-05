import { Box, Button, HStack, Tag, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { BookmarkBtn, LikeBtn } from '~/shared/ui/mini-buttons';

import { Bloger } from '../types';

type CookingBlogProps = Pick<
    Bloger,
    'notes' | 'newRecipesCount' | 'bookmarksCount' | 'subscribersCount' | '_id'
> & {
    action?: React.ReactNode;
    user: React.ReactNode;
};

export const CookingBlog = ({
    _id,
    user,
    notes,
    newRecipesCount,
    bookmarksCount,
    subscribersCount,
    action,
}: CookingBlogProps) => {
    const { text } = notes?.[0] ?? {};

    return (
        <Box
            position='relative'
            padding={{ base: '16px', lg: '24px' }}
            bgColor='white'
            borderRadius='8px'
        >
            {newRecipesCount === undefined ? null : (
                <Tag
                    position='absolute'
                    top={{ base: '4px', lg: '8px' }}
                    right={{ base: '4px', lg: '8px' }}
                >
                    {newRecipesCount} новый рецепт
                </Tag>
            )}
            {user && user}
            <Text marginTop={{ base: '12px' }} fontSize='sm' lineHeight='21px' noOfLines={3}>
                {text}
            </Text>
            <HStack mt='16px' justifyContent='space-between'>
                <HStack>
                    {action && action}
                    <Button as={Link} to={`/blogs/${_id}`} size='xs' variant='outline'>
                        Читать
                    </Button>
                </HStack>
                <HStack spacing={2}>
                    <BookmarkBtn value={bookmarksCount} />
                    <LikeBtn value={subscribersCount} />
                </HStack>
            </HStack>
        </Box>
    );
};
