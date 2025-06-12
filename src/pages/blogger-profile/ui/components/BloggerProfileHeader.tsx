import { Avatar, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react';

import { BsBookmarkHeart, BsPeople } from '~/shared/ui/icon';
import { StatWithIcon } from '~/shared/ui/stat-with-icon/ui/StatWithIcon';

type BloggerProfileHeaderProps = {
    userName: string;
    accountName: string;
    bookmarksCount: number;
    subscribersCount: number;
    action: React.ReactNode;
    imgUrl?: string;
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
        <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            gap='24px'
            alignItems='center'
            justifyContent='center'
            position='relative'
            w='100%'
            data-test-id='blogger-user-info-box'
        >
            <Avatar src={imgUrl} size={{ base: 'xl', lg: '2xl' }} />
            <VStack
                alignItems={{ base: 'center', md: 'flex-start' }}
                gap='12px'
                w={{ base: '100%', md: 'max-content' }}
            >
                <Text
                    fontSize={{ base: '2xl', lg: '5xl' }}
                    fontWeight='bold'
                    textAlign={{ base: 'center', md: 'left' }}
                    data-test-id='blogger-user-info-name'
                >
                    {userName}
                </Text>
                <Text fontSize='sm' color='blackAlpha.700' data-test-id='blogger-user-info-login'>
                    {accountName}
                </Text>
                <HStack justifyContent='space-between' w='100%'>
                    {action && action}{' '}
                    <HStack>
                        <StatWithIcon
                            icon={<BsBookmarkHeart />}
                            value={bookmarksCount}
                            data-test-id='blogger-followers-bookmarks'
                        />
                        <StatWithIcon
                            icon={<BsPeople />}
                            value={subscribersCount}
                            data-test-id='blogger-followers-count'
                        />
                    </HStack>
                </HStack>
            </VStack>
        </Flex>
    </Center>
);
