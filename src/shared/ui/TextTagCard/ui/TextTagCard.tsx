import { Box, Card, CardBody, Heading, HStack, Image, SystemProps, Text } from '@chakra-ui/react';

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
    direction?: SystemProps['flexDirection'];
    image?: DishesImagesType;
}

export const TextTagCard = (recipe: TextTagCardProps) => {
    const {
        title = 'Лапша с курицей и шафраном',
        description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae sunt, eaque fugit provident minima vel quaerat dolor voluptatem quos rem atque eum, veniam asperiores odit, beatae laudantium? Iure, iste possimus.',
        tagType = 'Национальные',
        likeCount,
        repostCount,
        direction = 'column',
        image,
    } = recipe;
    return (
        <Card
            height='100%'
            border='1px solid'
            borderColor='blackAlpha.200'
            borderRadius='8px'
            flexDirection={direction}
            overflow='hidden'
        >
            {image ? <Image src={DishesImages[image]} maxH='230px' /> : null}
            <CardBody
                padding={{ lg: '24px', base: '12px' }}
                display='flex'
                flexDirection='column'
                gap={6}
                alignItems='stretch'
                justifyContent='space-between'
            >
                <Box>
                    <Heading fontSize='xl' fontWeight='medium' noOfLines={1}>
                        {title}
                    </Heading>

                    <Text marginTop='1.5' noOfLines={3} fontSize='sm' height={{ lg: '64px' }}>
                        {description}
                    </Text>
                </Box>
                <HStack spacing={8.5} justifyContent='space-between'>
                    <KitchenTag type={tagType} />
                    <HStack spacing={{ base: 0, lg: 2 }}>
                        {repostCount ? <BookmarkBtn value={repostCount} /> : null}
                        {likeCount ? <LikeBtn value={likeCount} /> : null}
                    </HStack>
                </HStack>
            </CardBody>
        </Card>
    );
};
