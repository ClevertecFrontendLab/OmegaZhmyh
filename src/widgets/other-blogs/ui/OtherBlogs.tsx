import { Box, BoxProps, Grid } from '@chakra-ui/react';

import { CookingBlog } from '~/entities/cooking-blog';
import { Bloger } from '~/entities/cooking-blog';
import { selectUserId } from '~/features/auth';
import { SubscribeButton } from '~/features/supscription';
import { useAppSelector } from '~/shared/store/hooks';

type OtherBlogsProps = BoxProps & {
    blogers: Bloger[];
};

export const OtherBlogs = ({ blogers, ...boxProps }: OtherBlogsProps) => {
    const currentUserId = useAppSelector(selectUserId);
    return (
        <Box
            bgColor='blackAlpha.50'
            borderRadius='16px'
            p={{ base: '12px', lg: '24px' }}
            {...boxProps}
        >
            <Grid
                templateColumns={{ base: 'auto', md: '1fr 1fr' }}
                gap={4}
                mt={{ base: '12px', lg: '16px' }}
            >
                {blogers.map((bloger) => (
                    <CookingBlog
                        key={bloger._id}
                        action={
                            currentUserId &&
                            bloger._id && (
                                <SubscribeButton fromUserId={currentUserId} toUserId={bloger._id} />
                            )
                        }
                        {...bloger}
                    />
                ))}
            </Grid>
        </Box>
    );
};
