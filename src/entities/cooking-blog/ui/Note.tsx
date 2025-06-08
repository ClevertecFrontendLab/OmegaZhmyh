import { Box, Text } from '@chakra-ui/react';

type NoteProps = {
    date: string;
    text: string;
    isDisplayed: boolean;
};

export const Note = ({ date, text, isDisplayed }: NoteProps) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
    });
    const formattedTime = dateObj.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return (
        <Box
            padding='24px'
            borderRadius='8px'
            border='1px solid'
            borderColor='blackAlpha.200'
            bgColor='white'
            display={isDisplayed ? 'block' : 'none'}
        >
            <Text fontSize='sm' color='lime.600' data-test-id='notes-card-date'>
                {formattedDate} {formattedTime}
            </Text>
            <Text fontSize='sm' mt='16px' data-test-id='notes-card-text'>
                {text}
            </Text>
        </Box>
    );
};
