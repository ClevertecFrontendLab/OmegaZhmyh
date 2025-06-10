import { Box, BoxProps, Button, Grid, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { CookingBlog } from '~/entities/cooking-blog';
import { Bloger } from '~/entities/cooking-blog';
import { UserCard } from '~/entities/user';

type FavoriteBlogsProps = BoxProps & {
    blogers: Bloger[];
};

export const FavoriteBlogs = ({ blogers, ...boxProps }: FavoriteBlogsProps) => (
    <Box
        bgColor='lime.300'
        borderRadius='16px'
        p={{ base: '12px', lg: '24px' }}
        display={blogers.length > 0 ? 'block' : 'none'}
        {...boxProps}
        data-test-id='blogs-favorites-box'
    >
        <Text fontSize={{ base: '2xl', lg: '4xl' }}>Избранные блоги</Text>
        <Grid
            templateColumns={{ base: 'auto', md: '1fr 1fr' }}
            gap={4}
            mt={{ base: '12px', lg: '16px' }}
            data-test-id='blogs-favorites-grid'
        >
            {blogers.map((bloger) => {
                const { firstName, lastName, login, _id } = bloger;
                return (
                    <CookingBlog
                        key={_id}
                        _id={_id}
                        user={
                            <UserCard
                                firstName={firstName ?? 'Имя'}
                                lastName={lastName ?? 'Фамилия'}
                                login={login ?? 'Логин'}
                            />
                        }
                        isFavorite
                        action={
                            <Button
                                as={Link}
                                to={`/blogs/${_id}`}
                                size='xs'
                                variant='solid'
                                bgColor='lime.400'
                                data-test-id='blogs-card-recipes-button'
                            >
                                Рецепты
                            </Button>
                        }
                        {...bloger}
                    />
                );
            })}
        </Grid>
    </Box>
);
