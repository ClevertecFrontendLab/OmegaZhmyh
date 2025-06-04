import { Box, Button, HStack, Tag, Text } from '@chakra-ui/react';

import { BookmarkBtn, LikeBtn } from '~/shared/ui/mini-buttons';
import { UserCard } from '~/shared/ui/user-card';

import { Bloger } from '../model/types';

type CookingBlogProps = Bloger & {
    action?: React.ReactNode;
};

export const CookingBlog = ({
    firstName = 'Имя',
    lastName = 'Фамилия',
    login = 'логин',
    notes,
    newRecipesCount = 0,
    bookmarksCount = 0,
    subscribersCount = 0,
    action,
}: CookingBlogProps) => {
    const { text } = notes?.[0] ?? {};
    const userName = `${firstName} ${lastName}`;

    return (
        <Box
            position='relative'
            padding={{ base: '16px', lg: '24px' }}
            bgColor='white'
            borderRadius='8px'
        >
            <Tag
                position='absolute'
                top={{ base: '4px', lg: '8px' }}
                right={{ base: '4px', lg: '8px' }}
            >
                {newRecipesCount} новый рецепт
            </Tag>
            <UserCard userName={userName} accountName={`@${login}`}></UserCard>
            <Text marginTop={{ base: '12px' }} fontSize='sm' lineHeight='21px' noOfLines={3}>
                {text}
            </Text>
            <HStack mt='16px' justifyContent='space-between'>
                <HStack>
                    {action && action}
                    <Button size='xs' variant='outline'>
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
