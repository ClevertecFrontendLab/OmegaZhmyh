import { Box, HStack, IconButton, Text } from '@chakra-ui/react';

import { useDeleteNoteMutation } from '~/entities/user';
import { BsTrash } from '~/shared/ui/icon';

type NoteProps = {
    id: string;
    date: string;
    text: string;
    isDisplayed: boolean;
    idDeletable?: boolean;
};

export const Note = ({ id, date, text, isDisplayed, idDeletable = false }: NoteProps) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
    });
    const formattedTime = dateObj.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });
    const [deleteNote] = useDeleteNoteMutation();

    const handleDeleteNote = () => {
        deleteNote({ id });
    };

    return (
        <Box
            padding='24px'
            borderRadius='8px'
            border='1px solid'
            borderColor='blackAlpha.200'
            bgColor='white'
            display={isDisplayed ? 'block' : 'none'}
        >
            <HStack>
                <Text fontSize='sm' color='lime.600' data-test-id='notes-card-date'>
                    {formattedDate} {formattedTime}
                </Text>
                {idDeletable && (
                    <IconButton
                        aria-label='delete note'
                        icon={<BsTrash />}
                        onClick={handleDeleteNote}
                    />
                )}
            </HStack>
            <Text fontSize='sm' mt='16px' data-test-id='notes-card-text'>
                {text}
            </Text>
        </Box>
    );
};
