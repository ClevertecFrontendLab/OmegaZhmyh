import { Avatar, Box, Button, Card, Flex, HStack, Text } from '@chakra-ui/react';

import { BloggerByIdResponse } from '~/entities/cooking-blog/model/blog.types';
import { formatAccountLogin } from '~/entities/user/lib/formatAccountLogin';
import SergeyImg from '~/shared/assets/avatar_img/@serge25.png';
import { BsPeople } from '~/shared/ui/icon';

type AuthorBlogProps = {
    blog: BloggerByIdResponse;
    action: React.ReactNode;
};

export const AuthorBlog = ({ blog, action }: AuthorBlogProps) => {
    const { bloggerInfo, totalSubscribers } = blog;
    const { firstName, lastName, login } = bloggerInfo;
    return (
        <Card
            direction='row'
            padding={{ base: '12px', md: '24px' }}
            gap={{ base: '8px', md: '16px' }}
            position='relative'
            bgColor='lime.300'
            marginTop={{ base: '24px', lg: '40px' }}
        >
            <Avatar src={SergeyImg} boxSize='96px' />
            <Flex direction='column' justifyContent='end' flexGrow={1}>
                <Text
                    position='absolute'
                    right={{ base: '8px', md: '24px' }}
                    top={{ base: '8px', md: '24px' }}
                    fontSize={{ base: 'xs', md: 'sm' }}
                >
                    Автор рецепта
                </Text>
                <Box>
                    <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight='bold'>
                        {firstName} {lastName}
                    </Text>
                    <Text color='blackAlpha.700' fontSize='sm'>
                        {formatAccountLogin(login)}
                    </Text>
                </Box>
                <HStack marginTop='16px' justifyContent='space-between'>
                    {action}
                    <Button
                        size='xs'
                        leftIcon={<BsPeople color='black' />}
                        variant='ghost'
                        color='lime.600'
                    >
                        {totalSubscribers}
                    </Button>
                </HStack>
            </Flex>
        </Card>
    );
};
