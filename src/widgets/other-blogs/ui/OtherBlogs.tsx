import { Box, BoxProps, Button, Center, Grid } from '@chakra-ui/react';

import { CookingBlog } from '~/entities/cooking-blog';
import { Bloger } from '~/entities/cooking-blog';
import { UserCard } from '~/entities/user';
import { selectUserId } from '~/features/auth';
import { SubscribeButton } from '~/features/supscription';
import { useAppSelector } from '~/shared/store/hooks';

type OtherBlogsProps = BoxProps & {
    blogers: Bloger[];
    setShowMore: (value: boolean | ((prev: boolean) => boolean)) => void;
    isShowMore: boolean;
    limit?: number;
};

export const OtherBlogs = ({ blogers, setShowMore, isShowMore, ...boxProps }: OtherBlogsProps) => {
    const currentUserId = useAppSelector(selectUserId);

    const handleShowMore = () => {
        setShowMore((prev) => !prev);
    };

    return (
        <Box
            bgColor='blackAlpha.50'
            borderRadius='16px'
            p={{ base: '12px', lg: '24px' }}
            {...boxProps}
            data-test-id='blogs-others-box'
        >
            <Grid
                templateColumns={{ base: 'auto', md: '1fr 1fr' }}
                gap={4}
                mt={{ base: '12px', lg: '16px' }}
                data-test-id='blogs-others-grid'
            >
                {blogers.map((bloger) => {
                    const { firstName, lastName, login } = bloger;
                    return (
                        <CookingBlog
                            key={bloger._id}
                            user={
                                <UserCard
                                    userName={`${firstName} ${lastName}`}
                                    accountName={`@${login}`}
                                />
                            }
                            action={
                                currentUserId &&
                                bloger._id && (
                                    <SubscribeButton
                                        fromUserId={currentUserId}
                                        toUserId={bloger._id}
                                    />
                                )
                            }
                            {...bloger}
                        />
                    );
                })}
            </Grid>
            <Center>
                {/* {blogers.length > BLOGS_PREVIEW_LIMIT && (
                    <Button
                        variant='ghost'
                        colorScheme='black'
                        onClick={handleShowMore}
                        data-test-id='blogs-others-button'
                    >
                        {isShowMore ? 'Свернуть' : 'Показать больше'}
                    </Button>
                )} */}
                <Button
                    variant='ghost'
                    colorScheme='black'
                    onClick={handleShowMore}
                    data-test-id='blogs-others-button'
                >
                    {isShowMore ? 'Свернуть' : 'Показать больше'}
                </Button>
            </Center>
        </Box>
    );
};
