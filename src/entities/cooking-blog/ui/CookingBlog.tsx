import { Box, Button, HStack, Tag, Text } from '@chakra-ui/react';

import { BookmarkBtn, LikeBtn } from '~/shared/ui/mini-buttons';
import { UserCard } from '~/shared/ui/user-card';

import { Bloger } from '../model/types';

export const CookingBlog = ({
    firstName = 'Имя',
    lastName = 'Фамилия',
    login = 'логин',
    notes,
    newRecipesCount = 0,
    bookmarksCount = 0,
    subscribersCount = 0,
}: Partial<Bloger>) => {
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
                    <Button size='xs' variant='solid' bgColor='lime.400'>
                        Рецепты
                    </Button>
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
