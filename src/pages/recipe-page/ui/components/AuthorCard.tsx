import { Avatar, Box, Button, Card, Flex, HStack, Text } from '@chakra-ui/react';

import { BloggerInfo } from '~/entities/cooking-blog/types';
import SergeyImg from '~/shared/assets/avatar_img/@serge25.png';
import { BsPeople } from '~/shared/ui/icon';

type AuthorBlogProps = {
    blog: Pick<BloggerInfo, 'firstName' | 'lastName' | 'login' | 'subscribers'>;
    action: React.ReactNode;
};

export const AuthorBlog = ({ blog, action }: AuthorBlogProps) => {
    const { subscribers, firstName, lastName, login } = blog;
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
                        {login}
                    </Text>
                </Box>
                <HStack marginTop='16px' justifyContent='space-between'>
                    {action}
                    <Button size='xs' leftIcon={<BsPeople />} variant='ghost'>
                        {subscribers}
                    </Button>
                </HStack>
            </Flex>
        </Card>
    );
};
