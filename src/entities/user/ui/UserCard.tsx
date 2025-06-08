import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export type UserCardProps = {
    userName?: string;
    accountName?: string;
    avatarImg?: string;
};

export const UserCard = ({
    userName = 'noname',
    accountName = 'noaccount',
    avatarImg,
}: UserCardProps) => (
    <Flex flex='1' gap={{ base: 2, lg: 3 }} alignItems='center' flexWrap='nowrap'>
        <Avatar name={userName} size='md' src={avatarImg} />
        <Box>
            <Text
                fontWeight='500'
                fontSize={{ base: 'md', lg: 'lg' }}
                display='inline'
                noOfLines={1}
                wordBreak='break-all'
                style={{ wordWrap: 'break-word' }}
                data-test-id='blogs-card-name'
            >
                {userName}
            </Text>
            <Text
                color='blackAlpha.700'
                fontSize={{ base: 'xs', lg: 'sm' }}
                data-test-id='blogs-card-login'
            >
                {accountName}
            </Text>
        </Box>
    </Flex>
);
