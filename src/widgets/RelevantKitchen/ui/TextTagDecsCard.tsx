import { Box, Flex, HStack, Text } from '@chakra-ui/react';

import { Recipe } from '~/entities/Recipe/types';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/MiniButtons';
import { RecipeTags } from '~/shared/ui/RecipeTags/';

export type TextTagDecsCardProps = {
    recipe: Recipe;
};

export const TextTagDecsCard = ({ recipe }: TextTagDecsCardProps) => {
    const { title, description, bookmarks, categoriesIds, likes } = recipe;
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
                <RecipeTags categoriesIds={categoriesIds} bgColor='lime.50' />
                <HStack spacing={{ base: 0, lg: 2 }}>
                    <BookmarkBtn value={bookmarks} />
                    <LikeBtn value={likes} />
                </HStack>
            </HStack>
        </Flex>
    );
};
