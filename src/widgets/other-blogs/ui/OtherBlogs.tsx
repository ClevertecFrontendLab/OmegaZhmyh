import { Box, BoxProps, Button, Center, Grid } from '@chakra-ui/react';

import { CookingBlog } from '~/entities/cooking-blog';
import { Bloger } from '~/entities/cooking-blog';
import { UserCard } from '~/entities/user';
import { selectUserId } from '~/features/auth';
import { SubscribeButton } from '~/features/supscription';
import { useAppSelector } from '~/shared/store/hooks';
import { BsArrowLeft, BsArrowRight } from '~/shared/ui/icon';

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
            p={{ base: '16px', lg: '24px' }}
            {...boxProps}
            data-test-id='blogs-others-box'
        >
            <Grid
                templateColumns={{ base: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' }}
                gap={4}
                data-test-id='blogs-others-grid'
            >
                {blogers.map((bloger) => {
                    const { firstName, lastName, login } = bloger;
                    return (
                        <CookingBlog
                            key={bloger._id}
                            user={
                                <UserCard
                                    firstName={firstName ?? 'Имя'}
                                    lastName={lastName ?? 'Фамилия'}
                                    login={login ?? 'Логин'}
                                />
                            }
                            action={
                                currentUserId &&
                                bloger._id && (
                                    <SubscribeButton
                                        fromUserId={currentUserId}
                                        toUserId={bloger._id}
                                        isFavorite={!!bloger.isFavorite}
                                    />
                                )
                            }
                            {...bloger}
                        />
                    );
                })}
            </Grid>
            <Center>
                <Button
                    mt='16px'
                    fontSize='lg'
                    fontWeight='semibold'
                    variant='ghost'
                    colorScheme='black'
                    onClick={handleShowMore}
                    data-test-id='blogs-others-button'
                    leftIcon={isShowMore ? <BsArrowLeft /> : undefined}
                    rightIcon={isShowMore ? undefined : <BsArrowRight />}
                >
                    {isShowMore ? 'Свернуть' : 'Все авторы'}
                </Button>
            </Center>
        </Box>
    );
};
