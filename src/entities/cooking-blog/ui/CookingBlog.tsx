import { Box, BoxProps, Text } from '@chakra-ui/react';

import { AvatarImagesType } from '~/shared/ui/AvatarImages';
import { UserCard } from '~/shared/ui/user-card';

type CookingBlogProps = BoxProps & {
    userName: string;
    accountName: string;
    avatarImg: AvatarImagesType;
    text: string;
};

export const CookingBlog = ({
    text,
    userName,
    accountName,
    avatarImg,
    ...CookingBlogProps
}: CookingBlogProps) => (
    <Box
        padding={{ base: '16px', lg: '24px' }}
        bgColor='white'
        borderRadius='8px'
        {...CookingBlogProps}
    >
        <UserCard userName={userName} accountName={accountName} avatarImg={avatarImg}></UserCard>
        <Text marginTop={{ base: '12px' }} fontSize='sm' lineHeight='21px' noOfLines={3}>
            {text}
        </Text>
    </Box>
);
