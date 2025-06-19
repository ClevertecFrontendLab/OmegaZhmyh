import {
    Button,
    Center,
    Grid,
    GridItem,
    HStack,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Note } from '~/entities/cooking-blog';
import { Note as NoteType } from '~/entities/cooking-blog/model/blog.types';
import { BLOG_NOTES_ANCHOR, BUTTON_VARIANT } from '~/shared/config';
import { BsPen } from '~/shared/ui/icon';

import { NoteDrawer } from './components/NoteDrawer';

type BlogNotesBoxProps = {
    limit: number;
    notes: NoteType[];
    canAddNotes?: boolean;
};

const NOTES_PREVIEW_LIMIT = 3;

export const BlogNotesBox = ({ notes, canAddNotes = false }: BlogNotesBoxProps) => {
    const [isShowMore, setIsShowMore] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleShowMore = () => {
        setIsShowMore((prev) => !prev);
    };

    return (
        <>
            <NoteDrawer isOpen={isOpen} onClose={onClose} />
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
                <HStack justifyContent='space-between' w='100%'>
                    <HStack fontSize={{ base: 'lg', lg: 'xl' }} alignSelf='start'>
                        <Text fontWeight='bold'>Заметки</Text>
                        <Text color='blackAlpha.600' data-test-id='blogger-user-notes-count'>
                            ({notes.length})
                        </Text>
                    </HStack>
                    {canAddNotes && (
                        <Button
                            variant={BUTTON_VARIANT.WHITE_OUTLINE}
                            size='sm'
                            leftIcon={<BsPen />}
                            onClick={onOpen}
                        >
                            Новая заметка
                        </Button>
                    )}
                </HStack>
                {notes.length > 0 && (
                    <>
                        <Grid
                            templateColumns={{ base: '1fr', md: 'repeat(6, 1fr)' }}
                            gap={{ base: '12px', lg: '16px' }}
                            w='100%'
                            data-test-id='blogger-user-notes-grid'
                        >
                            {notes.map((note, index) => (
                                <GridItem
                                    key={note._id}
                                    display={
                                        isShowMore || index < NOTES_PREVIEW_LIMIT ? 'block' : 'none'
                                    }
                                    colSpan={
                                        ((index + 1) % 3 > 0 &&
                                            (index + 1) % 3 < 3 &&
                                            notes.length % 3 !== 0 &&
                                            notes.length - index < 3) ||
                                        notes.length === 4
                                            ? 3
                                            : 2
                                    }
                                >
                                    <Note
                                        id={note._id}
                                        idDeletable={canAddNotes}
                                        date={String(note.date)}
                                        text={String(note.text)}
                                        isDisplayed={isShowMore || index < NOTES_PREVIEW_LIMIT}
                                    />
                                </GridItem>
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
                    </>
                )}
            </VStack>
        </>
    );
};
