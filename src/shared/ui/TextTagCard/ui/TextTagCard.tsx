import { Box, Card, CardBody, HStack, Image, Text } from '@chakra-ui/react';

import { KitchenTag } from '~/entities/KitchenTag';
import { KitchenTagType } from '~/shared/types/KitchenTagType';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/MiniButtons';

import { DishesImages, DishesImagesType } from '../../DishesImages';

export interface TextTagCardProps {
    title: string;
    description: string;
    tagType: KitchenTagType;
    likeCount: number;
    repostCount: number;
    image?: DishesImagesType;
    tagColor?: string;
}

export const TextTagCard = (recipe: TextTagCardProps) => {
    const {
        title = 'Лапша с курицей и шафраном',
        description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae sunt, eaque fugit provident minima vel quaerat dolor voluptatem quos rem atque eum, veniam asperiores odit, beatae laudantium? Iure, iste possimus.',
        tagType = 'Национальные',
        likeCount,
        repostCount,
        image,
        tagColor,
    } = recipe;
    return (
        <Card border='1px solid' borderColor='blackAlpha.200' borderRadius='8px' overflow='hidden'>
            {image ? (
                <>
                    <KitchenTag
                        type={tagType}
                        color={tagColor}
                        position='absolute'
                        left='8px'
                        top='8px'
                        display={{ base: 'flex', lg: 'none' }}
                    />
                    <Image
                        src={DishesImages[image]}
                        width={{ base: '158px', lg: '277px' }}
                        height={{ base: '128px', lg: '230px' }}
                    />
                </>
            ) : null}
            <CardBody
                padding={{ base: '8px', xl: '24px' }}
                display='flex'
                flexDirection='column'
                gap={{ base: 2, lg: 6 }}
                alignItems='stretch'
                justifyContent='space-between'
            >
                <Box>
                    <Text
                        fontSize={{ base: 'md', lg: 'xl' }}
                        fontWeight='medium'
                        noOfLines={{ base: 2, lg: 1 }}
                    >
                        {title}
                    </Text>

                    <Text
                        marginTop='1.5'
                        noOfLines={3}
                        fontSize='sm'
                        height={{ lg: '64px' }}
                        display={{ base: 'none', lg: 'flex' }}
                    >
                        {description}
                    </Text>
                </Box>
                <HStack spacing={8.5} justifyContent='space-between'>
                    <KitchenTag
                        type={tagType}
                        color={tagColor}
                        display={{ base: 'none', lg: 'flex' }}
                    />
                    <HStack spacing={{ base: 0, lg: 2 }}>
                        {repostCount ? <BookmarkBtn value={repostCount} /> : null}
                        {likeCount ? <LikeBtn value={likeCount} /> : null}
                    </HStack>
                </HStack>
            </CardBody>
        </Card>
    );
};
