import {
    Box,
    Button,
    Card,
    CardBody,
    Heading,
    HStack,
    IconButton,
    Image,
    SystemProps,
    Text,
    VStack,
} from '@chakra-ui/react';

import { KitchenTag } from '~/entities/KitchenTag';
import { Recomendation } from '~/entities/Recomendation';
import BookmarkIcon from '~/shared/assets/btn-icons/bookmark-icon.svg';
import { KitchenTagType } from '~/shared/types/KitchenTagType';
import { AvatarImagesType } from '~/shared/ui/AvatarImages';
import { DishesImages, DishesImagesType } from '~/shared/ui/DishesImages';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/MiniButtons';

export interface RecipeCardType {
    title: string;
    description: string;
    tagType: KitchenTagType;
    tagColor?: string;
    recomendationLabel?: string;
    recomendationIcon?: AvatarImagesType;
    image?: DishesImagesType;
    likeCount?: number;
    repostCount?: number;
    direction?: SystemProps['flexDirection'];
}

export const RecipeCard = (recipe: RecipeCardType) => {
    const {
        title = 'Лапша с курицей и шафраном',
        description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae sunt, eaque fugit provident minima vel quaerat dolor voluptatem quos rem atque eum, veniam asperiores odit, beatae laudantium? Iure, iste possimus.',
        recomendationLabel,
        recomendationIcon = 'AlexCookImg',
        image = 'SpaghettiRollImg',
        likeCount = 0,
        repostCount = 0,
        tagType = 'Национальные',
        direction = 'row',
        tagColor,
    } = recipe;
    return (
        <Card direction={direction} variant='outline' overflow='hidden' borderRadius='8px'>
            <Box position='relative'>
                <Image
                    objectFit='cover'
                    src={DishesImages[image]}
                    alt='Caffe Latte'
                    width={{ base: '158px', lg: '346px' }}
                    height={{ base: '128px', lg: '244px' }}
                />
                <KitchenTag
                    type={tagType}
                    color={tagColor}
                    position='absolute'
                    left='8px'
                    top='8px'
                    display={{ lg: 'none', base: 'flex' }}
                />
                {recomendationLabel ? (
                    <Recomendation
                        avatar={recomendationIcon}
                        userName={recomendationLabel}
                        position='absolute'
                        left='24px'
                        bottom='20px'
                        display={{ base: 'none', lg: 'inline-flex' }}
                    />
                ) : null}
            </Box>

            <CardBody padding={{ base: '8px 8px 4px 8px', lg: '20px 24px' }}>
                <VStack
                    spacing={{ lg: 6 }}
                    align='stretch'
                    justifyContent='space-between'
                    height='100%'
                >
                    <Box>
                        <HStack spacing={8.5} justifyContent='space-between'>
                            <KitchenTag
                                type={tagType}
                                color={tagColor}
                                display={{ lg: 'flex', base: 'none' }}
                            />
                            <HStack spacing={2}>
                                <BookmarkBtn value={repostCount} />
                                <LikeBtn value={likeCount} />
                            </HStack>
                        </HStack>

                        <Heading
                            marginTop={{ lg: '24px' }}
                            fontSize={{ lg: 'xl', base: 'md' }}
                            fontWeight='medium'
                            noOfLines={{ lg: 1, base: 2 }}
                            flexGrow={{ lg: '0', base: '1' }}
                        >
                            {title}
                        </Heading>
                        <Box display={{ lg: 'block', base: 'none' }}>
                            <Text marginTop='1.5' noOfLines={3} fontSize='sm'>
                                {description}
                            </Text>
                        </Box>
                    </Box>

                    <HStack justifyContent='end' spacing={2}>
                        <Button
                            size='sm'
                            display={{ lg: 'block', base: 'none' }}
                            variant='outline'
                            color='blackAlpha.800'
                            backgroundColor='whiteAlpha.100'
                            borderColor='blackAlpha.600'
                            leftIcon={<img src={BookmarkIcon} />}
                        >
                            Сохранить
                        </Button>
                        <IconButton
                            size='xs'
                            display={{ lg: 'none', base: 'flex' }}
                            variant='outline'
                            color='blackAlpha.800'
                            backgroundColor='whiteAlpha.100'
                            borderColor='blackAlpha.600'
                            icon={<img src={BookmarkIcon} />}
                            aria-label='Сохранить'
                        >
                            Сохранить
                        </IconButton>
                        <Button
                            size={{ base: 'xs', lg: 'sm' }}
                            variant='solid'
                            color='white'
                            backgroundColor='blackAlpha.900'
                            borderColor='blackAlpha.200'
                        >
                            Готовить
                        </Button>
                    </HStack>
                </VStack>
            </CardBody>
        </Card>
    );
};
