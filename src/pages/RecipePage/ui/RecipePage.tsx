import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Image,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { selectAllRecipes } from '~/entities/Recipe/';
import { DishesImages } from '~/shared/ui/DishesImages';
import { BsAlarm, BsBookmarkHeart, BsEmojiHeartEyes } from '~/shared/ui/Icons';
import { KitchenTag } from '~/shared/ui/KitchenTag';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/MiniButtons';
import { NewRecipes } from '~/widgets/NewRecipes';

import { AuthorCard } from './AuthorCard';
import { CookingSteps } from './CookingSteps';
import { IngredientsList } from './IngredientsList';
import { Nutrients } from './Nutrients/';

export const RecipePage = () => {
    const { id } = useParams();
    const recipe = useSelector(selectAllRecipes).filter((recipe) => recipe.id === Number(id))[0];

    const {
        title,
        description,
        time,
        image = DishesImages['SpaghettiRollImg'],
        category,
        nutritionValue,
        ingredients,
        portions,
        likes,
        bookmarks,
        steps,
    } = recipe;
    return (
        <>
            <Flex
                flexDirection={{ base: 'column', md: 'row' }}
                gap={{ base: '16px', lg: '24px' }}
                marginTop={{ base: '16px', lg: '56px' }}
            >
                <Image
                    src={image}
                    objectFit='cover'
                    borderRadius='8px'
                    width={{ base: '328px', md: '232px', lg: '353px', xl: '553px' }}
                    height={{ base: '224px', lg: '410px' }}
                />
                <VStack alignItems='stretch' justifyContent='space-between' gap='0'>
                    <Box>
                        <HStack justifyContent='space-between' alignItems='start'>
                            <Flex gap='8px' flexDirection={{ base: 'column', md: 'row' }}>
                                {category.map((category) => (
                                    <KitchenTag category={category} key={category} />
                                ))}
                            </Flex>
                            <HStack spacing={{ base: 0, lg: 2 }}>
                                <BookmarkBtn
                                    value={bookmarks}
                                    visibility={bookmarks ? 'visible' : 'hidden'}
                                />
                                <LikeBtn value={likes} visibility={likes ? 'visible' : 'hidden'} />
                            </HStack>
                        </HStack>
                        <Heading
                            fontSize={{ base: '2xl', lg: '5xl' }}
                            marginTop='32px'
                            noOfLines={2}
                        >
                            {title}
                        </Heading>
                        <Text marginTop={{ base: '16px', lg: '24px' }}>{description}</Text>
                    </Box>
                    <Flex
                        marginTop='24px'
                        flexDirection={{ base: 'column', md: 'row' }}
                        gap='12px'
                        alignItems={{ base: 'start', md: 'end' }}
                        justifyContent='space-between'
                    >
                        <Tag>
                            <TagLeftIcon as={BsAlarm} boxSize={{ lg: '16px' }}></TagLeftIcon>
                            <TagLabel>{time}</TagLabel>
                        </Tag>
                        <Flex gap={{ base: '12px', xl: '16px' }}>
                            <Button
                                size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                                variant='outline'
                                colorScheme='black'
                                leftIcon={<BsEmojiHeartEyes />}
                            >
                                Оценить рецепт
                            </Button>
                            <Button
                                size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                                color='black'
                                bgColor='lime.400'
                                leftIcon={<BsBookmarkHeart />}
                            >
                                Сохранить в закладки
                            </Button>
                        </Flex>
                    </Flex>
                </VStack>
            </Flex>
            <Container
                maxWidth={{ base: '100%', lg: '578px', xl: '668px' }}
                paddingX={{ base: '0px' }}
            >
                <Nutrients nutritionValue={nutritionValue} />
            </Container>
            <Container
                maxWidth={{ base: '100%', md: '604px', lg: '578px', xl: '668px' }}
                paddingX={{ base: '0px' }}
            >
                <IngredientsList ingredients={ingredients} portions={portions} />
                <CookingSteps steps={steps} />
                <AuthorCard />
            </Container>
            <NewRecipes />
        </>
    );
};
