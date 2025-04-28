import { Box, Flex, HStack, Text } from '@chakra-ui/react';

import { KitchenTag } from '~/shared/ui/KitchenTag';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/MiniButtons';

import { ShortRecipeType } from '../model/types';

export interface TextTagDecsCardProps {
    recipe: ShortRecipeType;
    tagColor?: string;
}

export const TextTagDecsCard = ({ recipe, tagColor }: TextTagDecsCardProps) => {
    const {
        title = 'Лапша с курицей и шафраном',
        description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae sunt, eaque fugit provident minima vel quaerat dolor voluptatem quos rem atque eum, veniam asperiores odit, beatae laudantium? Iure, iste possimus.',
        bookmarks,
        category,
        likes,
    } = recipe;
    return (
        <Flex
            outline='1px solid'
            outlineColor='blackAlpha.200'
            borderRadius='8px'
            flexDirection='column'
            justifyContent='space-between'
            padding={{ base: '12px', lg: '16px', xl: '24px' }}
        >
            <Box>
                <Text
                    fontSize={{ base: 'md', lg: 'xl' }}
                    fontWeight='medium'
                    noOfLines={1}
                    wordBreak='break-all'
                    style={{ wordWrap: 'break-word' }}
                >
                    {title}
                </Text>

                <Text marginTop='1.5' noOfLines={3} fontSize='sm' height={{ lg: '64px' }}>
                    {description}
                </Text>
            </Box>
            <HStack spacing={8.5} justifyContent='space-between' marginTop='24px'>
                <KitchenTag category={category[0]} color={tagColor} />
                <HStack spacing={{ base: 0, lg: 2 }}>
                    {bookmarks ? <BookmarkBtn value={bookmarks} /> : null}
                    {likes ? <LikeBtn value={likes} /> : null}
                </HStack>
            </HStack>
        </Flex>
    );
};
