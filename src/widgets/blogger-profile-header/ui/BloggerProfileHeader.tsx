import { Avatar, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react';

import { BookmarkBtn, RepostBtn } from '~/shared/ui/mini-buttons';

type BloggerProfileHeaderProps = {
    imgUrl: string;
    userName: string;
    accountName: string;
    bookmarksCount: number;
    subscribersCount: number;
    action: React.ReactNode;
};

export const BloggerProfileHeader = ({
    imgUrl,
    userName,
    accountName,
    action,
    bookmarksCount,
    subscribersCount,
}: BloggerProfileHeaderProps) => (
    <Center>
        <Flex flexDirection={{ base: 'column', md: 'row' }} gap='24px' alignItems='center' w='100%'>
            <Avatar src={imgUrl} size={{ base: 'xl', lg: '2xl' }} />
            <VStack gap='12px' w={{ base: '100%', md: '268px' }}>
                <Text fontSize={{ base: '2xl', lg: '5xl' }} fontWeight='bold'>
                    {userName}
                </Text>
                <Text fontSize='sm' color='blackAlpha.700'>
                    {accountName}
                </Text>
                <HStack justifyContent='space-between' w='100%'>
                    {action && action}{' '}
                    <HStack>
                        <BookmarkBtn value={bookmarksCount} />
                        <RepostBtn value={subscribersCount} />
                    </HStack>
                </HStack>
            </VStack>
        </Flex>
    </Center>
);
