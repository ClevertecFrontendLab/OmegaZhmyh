import {
    Box,
    Button,
    Card,
    CardBody,
    Heading,
    HStack,
    IconButton,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';

import { KitchenTag, KitchenTagType } from '~/entities/KitchenTag';
import { Recomendation } from '~/entities/Recomendation';
import BookmarkIcon from '~/shared/assets/btn-icons/bookmark-icon.svg';
import KitchenIcon from '~/shared/assets/kitchen_icons/national.svg';
import RecipeImg from '~/shared/assets/recipe_img/Spaghetti Roll.jpg';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/MiniButtons';

export interface TRecipe {
    title?: string;
    description?: string;
    tagType?: KitchenTagType;
    recomendationLabel?: string;
    recomendationIcon?: string;
    image?: string;
    likeCount?: number;
    repostCount?: number;
}

export const RecipeCard = (recipe: TRecipe) => {
    const {
        title = 'Лапша с курицей и шафраном',
        description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae sunt, eaque fugit provident minima vel quaerat dolor voluptatem quos rem atque eum, veniam asperiores odit, beatae laudantium? Iure, iste possimus.',
        recomendationLabel,
        image = RecipeImg,
        likeCount = 0,
        repostCount = 0,
        tagType = 'Национальные',
    } = recipe;
    return (
        <Card direction='row' variant='outline'>
            <Box position='relative'>
                <Image
                    objectFit='cover'
                    src={image}
                    alt='Caffe Latte'
                    maxW={{ base: '158px', lg: '346px' }}
                />
                <KitchenTag
                    type={tagType}
                    position='absolute'
                    left='8px'
                    top='8px'
                    display={{ lg: 'none', base: 'flex' }}
                />
                {recomendationLabel ? (
                    <Recomendation
                        avatar={KitchenIcon}
                        userName={recomendationLabel}
                        position='absolute'
                        left='24px'
                        bottom='20px'
                        display={{ base: 'none', lg: 'inline-flex' }}
                    />
                ) : null}
            </Box>

            <CardBody>
                <VStack
                    spacing={{ lg: 6 }}
                    align='stretch'
                    justifyContent='space-between'
                    height='100%'
                >
                    <HStack spacing={8.5} justifyContent='space-between'>
                        <KitchenTag type={tagType} display={{ lg: 'flex', base: 'none' }} />
                        <HStack spacing={2}>
                            <BookmarkBtn value={repostCount} />
                            <LikeBtn value={likeCount} />
                        </HStack>
                    </HStack>
                    <Box>
                        <Heading
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
                            backgroundColor='blackAlpha.100'
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
                            backgroundColor='blackAlpha.100'
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
