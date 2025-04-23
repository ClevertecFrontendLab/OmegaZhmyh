import {
    Box,
    Button,
    Card,
    CardBody,
    Heading,
    Highlight,
    HStack,
    IconButton,
    Image,
    SystemProps,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import { AvatarImagesType } from '~/shared/ui/AvatarImages';
import { BsBookmarkHeart } from '~/shared/ui/Icons';
import { KitchenTag } from '~/shared/ui/KitchenTag';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/MiniButtons';
import { Recomendation } from '~/shared/ui/Recomendation';

import { selectRecipeQuery } from '../model/selectors/selectRecipeQuery';
import { RecipeType } from '../model/types';

export interface RecipeCardType {
    recipe: RecipeType;
    tagColor?: string;
    recomendationLabel?: string;
    recomendationIcon?: AvatarImagesType;
    direction?: SystemProps['flexDirection'];
}

export const RecipeCard = (props: RecipeCardType) => {
    const {
        recomendationLabel,
        recomendationIcon = 'AlexCookImg',
        direction = 'row',
        tagColor,
        recipe,
    } = props;
    const { bookmarks, category, description, id, image, likes, subcategory, title } = recipe;
    const searchQuery = useSelector(selectRecipeQuery);

    return (
        <Card direction={direction} variant='outline' overflow='hidden' borderRadius='8px'>
            <Box position='relative'>
                <Image
                    objectFit='cover'
                    src={image}
                    alt='Caffe Latte'
                    width={{ base: '158px', lg: '346px' }}
                    height={{ base: '128px', lg: '244px' }}
                />
                <KitchenTag
                    category='Воторое блюдо'
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

            <CardBody padding={{ base: '8px 8px 4px 24px', lg: '20px 24px' }}>
                <VStack
                    spacing={{ lg: 6 }}
                    align='stretch'
                    justifyContent='space-between'
                    height='100%'
                >
                    <Box>
                        <HStack spacing={8.5} justifyContent='space-between'>
                            <KitchenTag
                                category='Воторое блюдо'
                                color={tagColor}
                                display={{ lg: 'flex', base: 'none' }}
                            />
                            <HStack spacing={2}>
                                <BookmarkBtn value={bookmarks} />
                                <LikeBtn value={likes} />
                            </HStack>
                        </HStack>

                        <Heading
                            marginTop={{ lg: '24px' }}
                            fontSize={{ lg: 'xl', base: 'md' }}
                            fontWeight='medium'
                            noOfLines={{ lg: 1, base: 2 }}
                            flexGrow={{ lg: '0', base: '1' }}
                            wordBreak='break-all'
                            style={{ wordWrap: 'break-word' }}
                        >
                            <Highlight query={searchQuery} styles={{ bgColor: 'lime.150' }}>
                                {title}
                            </Highlight>
                        </Heading>
                        <Box display={{ lg: 'block', base: 'none' }}>
                            <Text
                                marginTop='1.5'
                                noOfLines={3}
                                fontSize='sm'
                                wordBreak='break-all'
                                style={{ wordWrap: 'break-word' }}
                            >
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
                            leftIcon={<BsBookmarkHeart />}
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
                            icon={<BsBookmarkHeart />}
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
                            border='1px solid black'
                            _hover={{ color: 'black', bgColor: 'white' }}
                            as={Link}
                            to={`/${category[0]}/${subcategory[0]}/${id}`}
                            data-test-id={`card-link-${id}`}
                        >
                            Готовить
                        </Button>
                    </HStack>
                </VStack>
            </CardBody>
        </Card>
    );
};
