import { Box, Flex, HStack, Text } from '@chakra-ui/react';

import { KitchenTag } from '~/entities/KitchenTag';
import { KitchenTagType } from '~/shared/types/KitchenTagType';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/MiniButtons';

export interface TextTagDecsCardProps {
    title: string;
    description: string;
    tagType: KitchenTagType;
    likeCount: number;
    repostCount: number;
    tagColor?: string;
}

export const TextTagDecsCard = (recipe: TextTagDecsCardProps) => {
    const {
        title = 'Лапша с курицей и шафраном',
        description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae sunt, eaque fugit provident minima vel quaerat dolor voluptatem quos rem atque eum, veniam asperiores odit, beatae laudantium? Iure, iste possimus.',
        tagType = 'Национальные',
        likeCount,
        repostCount,
        tagColor,
    } = recipe;
    return (
        <Flex
            border='1px solid'
            borderColor='blackAlpha.200'
            borderRadius='8px'
            flexDirection='column'
            padding='12px'
        >
            <Box>
                <Text fontSize={{ base: 'md', md: 'xl' }} fontWeight='medium' noOfLines={1}>
                    {title}
                </Text>

                <Text marginTop='1.5' noOfLines={3} fontSize='sm' height={{ lg: '64px' }}>
                    {description}
                </Text>
            </Box>
            <HStack spacing={8.5} justifyContent='space-between' marginTop='24px'>
                <KitchenTag type={tagType} color={tagColor} />
                <HStack spacing={{ base: 0, lg: 2 }}>
                    {repostCount ? <BookmarkBtn value={repostCount} /> : null}
                    {likeCount ? <LikeBtn value={likeCount} /> : null}
                </HStack>
            </HStack>
        </Flex>
    );
};
