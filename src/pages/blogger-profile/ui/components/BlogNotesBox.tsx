import { Button, Center, Grid, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { Note } from '~/entities/cooking-blog';
import { Note as NoteType } from '~/entities/cooking-blog/model/blog.types';
import { BLOG_NOTES_ANCHOR } from '~/shared/config';

type BlogNotesBoxProps = {
    limit: number;
    notes: NoteType[];
};

const NOTES_PREVIEW_LIMIT = 3;

export const BlogNotesBox = ({ notes }: BlogNotesBoxProps) => {
    const [isShowMore, setIsShowMore] = useState(false);

    const handleShowMore = () => {
        setIsShowMore((prev) => !prev);
    };

    return notes.length ? (
        <VStack
            id={BLOG_NOTES_ANCHOR}
            gap='16px'
            padding='16px'
            mt='24px'
            bgColor='blackAlpha.50'
            borderRadius='16px'
            sx={{
                scrollMarginTop: 'var(--header-height)',
            }}
            data-test-id='blog-notes-box'
        >
            <Text alignSelf='start' fontSize={{ base: 'xl', lg: '4xl' }}>
                Заметки <span data-test-id='blogger-user-notes-count'>({notes.length})</span>
            </Text>
            <Grid
                templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}
                gap={{ base: '12px', lg: '16px' }}
                data-test-id='blogger-user-notes-grid'
            >
                {notes.map((note, index) => (
                    <Note
                        key={note.date}
                        date={String(note.date)}
                        text={String(note.text)}
                        isDisplayed={isShowMore || index < NOTES_PREVIEW_LIMIT}
                    />
                ))}
            </Grid>
            <Center>
                {notes.length > NOTES_PREVIEW_LIMIT && (
                    <Button
                        variant='ghost'
                        colorScheme='black'
                        onClick={handleShowMore}
                        data-test-id='blogger-user-notes-button'
                    >
                        {isShowMore ? 'Свернуть' : 'Показать больше'}
                    </Button>
                )}
            </Center>
        </VStack>
    ) : null;
};
