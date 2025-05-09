import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { CookingBlog } from '~/entities/CookingBlog';

export const CookingBlogs = () => (
    <Box
        bgColor='lime.300'
        padding={{ base: '12px', lg: '24px' }}
        marginTop={{ base: '32px', lg: '40px' }}
        borderRadius={16}
    >
        <Flex justifyContent='space-between'>
            <Text fontSize={{ base: '2xl' }} fontWeight='medium' lineHeight='32px'>
                Кулинарные блоги
            </Text>
            <Button
                rightIcon={<ArrowForwardIcon />}
                variant='ghost'
                fontSize='xl'
                fontWeight='semibold'
                display={{ base: 'none', lg: 'flex' }}
                _hover={{ bgColor: 'lime.50' }}
            >
                Все авторы
            </Button>
        </Flex>
        <Flex
            gap={{ base: '12px', lg: '16px' }}
            marginTop={{ base: '12px', lg: '24px' }}
            flexDirection={{ base: 'column', md: 'row' }}
        >
            <CookingBlog
                userName='Елена Высоцкая'
                accountName='@elenapovar'
                avatarImg='ElenaVysotskayaImg'
                text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
            />
            <CookingBlog
                userName='Alex Cook'
                accountName='@funtasticooking'
                avatarImg='AlexCookImg'
                text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
            />
            <CookingBlog
                userName='Екатерина Константинопольская'
                accountName='@bake_and_pie'
                avatarImg='CatherineConstantinopleImg'
                text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
            />
        </Flex>
        <Button
            display={{ base: 'flex', lg: 'none' }}
            margin={{ base: '12px auto 0 auto' }}
            rightIcon={<ArrowForwardIcon />}
            variant='ghost'
            fontSize='xl'
            fontWeight='semibold'
            _hover={{ bgColor: 'lime:50' }}
        >
            Все авторы
        </Button>
    </Box>
);
