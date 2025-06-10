import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

import { formatAccountLogin } from '../lib/formatAccountLogin';
import { formatFullName } from '../lib/formatFullName';

export type UserCardProps = {
    firstName: string;
    lastName: string;
    login: string;
    avatarImg?: string;
};

export const UserCard = ({ firstName, lastName, login, avatarImg }: UserCardProps) => (
    <Flex flex='1' gap={{ base: 2, lg: 3 }} alignItems='center' flexWrap='nowrap'>
        <Avatar name={formatFullName(firstName, lastName)} size='md' src={avatarImg} />
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
                {formatFullName(firstName, lastName)}
            </Text>
            <Text
                color='blackAlpha.700'
                fontSize={{ base: 'xs', lg: 'sm' }}
                data-test-id='blogs-card-login'
            >
                {formatAccountLogin(login)}
            </Text>
        </Box>
    </Flex>
);
