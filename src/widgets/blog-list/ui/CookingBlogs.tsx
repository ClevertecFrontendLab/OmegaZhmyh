import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { CookingBlog } from '~/entities/cooking-blog';
import { ROUTES } from '~/shared/config/routes.constants';

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
                as={Link}
                to={ROUTES.BLOGS}
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
                firstName='Елена'
                lastName='Высоцкая'
                login='@elenapovar'
                notes={[
                    {
                        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
                    },
                ]}
            />
            <CookingBlog
                firstName='Alex'
                lastName='Cook'
                login='@funtasticooking'
                notes={[
                    {
                        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
                    },
                ]}
            />
            <CookingBlog
                firstName='Екатерина'
                lastName='Константинопольская'
                login='@funtastbake_and_pieicooking'
                notes={[
                    {
                        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
                    },
                ]}
            />
        </Flex>
        <Button
            as={Link}
            to={ROUTES.BLOGS}
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
