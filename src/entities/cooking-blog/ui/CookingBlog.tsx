import { Box, Button, HStack, Tag, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { BLOG_NOTES_ANCHOR } from '~/shared/config';
import { BookmarkBtn, LikeBtn } from '~/shared/ui/mini-buttons';

import { Bloger } from '../model/blog.types';

type CookingBlogProps = Pick<
    Bloger,
    'notes' | 'newRecipesCount' | 'bookmarksCount' | 'subscribersCount' | '_id'
> & {
    user: React.ReactNode;
    paddingTop?: string;
    action?: React.ReactNode;
    isFavorite?: boolean;
};

export const CookingBlog = ({
    _id,
    user,
    notes,
    newRecipesCount,
    bookmarksCount,
    subscribersCount,
    isFavorite,
    action,
    paddingTop,
}: CookingBlogProps) => {
    const { text } = notes?.[0] ?? {};

    const pluralRule = new Intl.PluralRules('ru');
    const getRecipeWord = (count: number): string => {
        const word = pluralRule.select(count);
        switch (word) {
            case 'one':
                return 'рецепт';
            case 'few':
                return 'рецепта';
            case 'many':
                return 'рецептов';
            default:
                return 'рецептов';
        }
    };

    return (
        <VStack
            justifyContent='space-between'
            alignItems='flex-start'
            gap='16px'
            position='relative'
            padding={{ base: '16px', lg: '24px' }}
            paddingTop={paddingTop}
            bgColor='white'
            border='1px'
            borderColor='blackAlpha.200'
            borderRadius='8px'
            data-test-id='blogs-card'
        >
            <Box>
                {newRecipesCount && isFavorite ? (
                    <Tag
                        position='absolute'
                        top={{ base: '4px', lg: '8px' }}
                        right={{ base: '4px', lg: '8px' }}
                        data-test-id='blogs-card-new-recipes-badge'
                    >
                        {newRecipesCount} новых {getRecipeWord(newRecipesCount)}
                    </Tag>
                ) : null}
                {user}
                {text && (
                    <Text
                        marginTop={{ base: '12px' }}
                        fontSize='sm'
                        lineHeight='21px'
                        noOfLines={3}
                        data-test-id='blogs-card-notes-text'
                    >
                        {text}
                    </Text>
                )}
            </Box>

            <HStack
                justifyContent='space-between'
                flexWrap='wrap'
                gap='16px'
                w='100%'
                style={{ direction: 'rtl' }}
            >
                <HStack spacing={2} style={{ direction: 'ltr' }}>
                    <BookmarkBtn value={bookmarksCount} />
                    <LikeBtn value={subscribersCount} />
                </HStack>
                <HStack style={{ direction: 'ltr' }}>
                    {action}
                    <Button
                        as={Link}
                        to={`/blogs/${_id}#${BLOG_NOTES_ANCHOR}`}
                        size='xs'
                        variant='outline'
                        color='lime.600'
                        borderColor='lime.600'
                        data-test-id='blogs-card-notes-button'
                    >
                        Читать
                    </Button>
                </HStack>
            </HStack>
        </VStack>
    );
};
