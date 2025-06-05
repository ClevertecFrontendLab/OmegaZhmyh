import { Box, BoxProps, Grid, Text } from '@chakra-ui/react';

import { CookingBlog } from '~/entities/cooking-blog';
import { Bloger } from '~/entities/cooking-blog';
import { UserCard } from '~/entities/user';

type FavoriteBlogsProps = BoxProps & {
    blogers: Bloger[];
};

export const FavoriteBlogs = ({ blogers, ...boxProps }: FavoriteBlogsProps) => (
    <Box bgColor='lime.300' borderRadius='16px' p={{ base: '12px', lg: '24px' }} {...boxProps}>
        <Text fontSize={{ base: '2xl', lg: '4xl' }}>Избранные блоги</Text>
        <Grid
            templateColumns={{ base: 'auto', md: '1fr 1fr' }}
            gap={4}
            mt={{ base: '12px', lg: '16px' }}
        >
            {blogers.map((bloger) => {
                const { firstName, lastName, login, _id } = bloger;
                return (
                    <CookingBlog
                        key={_id}
                        _id={_id}
                        user={
                            <UserCard
                                userName={`${firstName} ${lastName}`}
                                accountName={`@${login}`}
                            />
                        }
                    />
                );
            })}
        </Grid>
    </Box>
);
