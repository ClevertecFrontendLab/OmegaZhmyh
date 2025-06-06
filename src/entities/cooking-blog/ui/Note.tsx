import { Box, Text } from '@chakra-ui/react';

type NoteProps = {
    date: string;
    text: string;
};

export const Note = ({ date, text }: NoteProps) => {
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
        >
            <Text fontSize='sm' color='lime.600'>
                {formattedDate} {formattedTime}
            </Text>
            <Text fontSize='sm' mt='16px'>
                {text}
            </Text>
        </Box>
    );
};
