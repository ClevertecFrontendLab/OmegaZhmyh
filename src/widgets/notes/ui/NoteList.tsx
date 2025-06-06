import { Button, Center, Flex, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { Note } from '~/entities/cooking-blog';
import { Note as NoteType } from '~/entities/cooking-blog/types';

type NoteListProps = {
    limit: number;
    notes: NoteType[];
};

const NOTES_PREVIEW_LIMIT = 3;

export const NoteList = ({ notes }: NoteListProps) => {
    const [isShowMore, setIsShowMore] = useState(false);

    const handleShowMore = () => {
        setIsShowMore((prev) => !prev);
    };

    return (
        <VStack gap='16px' padding='16px' mt='24px' bgColor='blackAlpha.50' borderRadius='16px'>
            <Text alignSelf='start' fontSize={{ base: 'xl', lg: '4xl' }}>
                Заметки ({notes.length})
            </Text>
            <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: '12px', lg: '16px' }}>
                {notes.slice(0, isShowMore ? notes.length : NOTES_PREVIEW_LIMIT).map((note) => (
                    <Note key={note.date} date={String(note.date)} text={String(note.text)} />
                ))}
            </Flex>
            <Center>
                {notes.length > NOTES_PREVIEW_LIMIT && (
                    <Button variant='ghost' colorScheme='black' onClick={handleShowMore}>
                        {isShowMore ? 'Свернуть' : 'Показать больше'}
                    </Button>
                )}
            </Center>
        </VStack>
    );
};
