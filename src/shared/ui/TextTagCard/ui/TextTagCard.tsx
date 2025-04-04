import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';

import { KitchenTag, KitchenTagType } from '~/entities/KitchenTag';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/MiniButtons';

export interface TextTagCardProps {
    title: string;
    description: string;
    tagType: KitchenTagType;
    likeCount: number;
    repostCount: number;
}

export const TextTagCard = (recipe: TextTagCardProps) => {
    const {
        title = 'Лапша с курицей и шафраном',
        description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae sunt, eaque fugit provident minima vel quaerat dolor voluptatem quos rem atque eum, veniam asperiores odit, beatae laudantium? Iure, iste possimus.',
        tagType = 'Национальные',
        likeCount,
        repostCount,
    } = recipe;
    return (
        <VStack spacing={6} align='stretch' justifyContent='space-between' height='100%'>
            <Box>
                <Heading fontSize='xl' noOfLines={1}>
                    {title}
                </Heading>

                <Text marginTop='1.5' noOfLines={3} fontSize='sm' height={{ lg: '64px' }}>
                    {description}
                </Text>
            </Box>
            <HStack spacing={8.5} justifyContent='space-between'>
                <KitchenTag type={tagType} />
                <HStack spacing={2}>
                    <BookmarkBtn value={repostCount} />
                    <LikeBtn value={likeCount} />
                </HStack>
            </HStack>
        </VStack>
    );
};
