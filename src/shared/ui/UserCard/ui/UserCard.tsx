import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react';

import { AvatarImages, AvatarImagesType } from '../../AvatarImages';

export interface UserCardProps {
    userName: string;
    accountName: string;
    avatarImg: AvatarImagesType;
}

export const UserCard = ({ userName, accountName, avatarImg }: UserCardProps) => (
    <Flex flex='1' gap='4' alignItems='center' flexWrap='nowrap'>
        <Avatar name={userName} size={{ base: 'sm', md: 'md' }} src={AvatarImages[avatarImg]} />
        <Box>
            <Heading size='sm' fontWeight='500' noOfLines={1}>
                {userName}
            </Heading>
            <Text color='blackAlpha.700'>{accountName}</Text>
        </Box>
    </Flex>
);
