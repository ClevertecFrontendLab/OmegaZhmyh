import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react';

import AvatarImg from '../assets/avatar.png';

export const UserCard = ({ ...props }) => (
    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' {...props}>
        <Avatar name='Segun Adebayo' src={AvatarImg} />

        <Box>
            <Heading size='sm' fontWeight='500'>
                Екатерина Константинопольская
            </Heading>
            <Text color='blackAlpha.700'>@bake_and_pie</Text>
        </Box>
    </Flex>
);
