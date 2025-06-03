import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

import { AvatarImages, AvatarImagesType } from '../../AvatarImages';

export type UserCardProps = {
    userName: string;
    accountName: string;
    avatarImg: AvatarImagesType;
};

export const UserCard = ({ userName, accountName, avatarImg }: UserCardProps) => (
    <Flex flex='1' gap={{ base: 2, lg: 3 }} alignItems='center' flexWrap='nowrap'>
        <Avatar name={userName} size={{ base: 'sm', lg: 'md' }} src={AvatarImages[avatarImg]} />
        <Box>
            <Text
                fontWeight='500'
                fontSize={{ base: 'md', lg: 'lg' }}
                display='inline'
                noOfLines={1}
                wordBreak='break-all'
                style={{ wordWrap: 'break-word' }}
            >
                {userName}
            </Text>
            <Text color='blackAlpha.700' fontSize={{ base: 'xs', lg: 'sm' }}>
                {accountName}
            </Text>
        </Box>
    </Flex>
);
