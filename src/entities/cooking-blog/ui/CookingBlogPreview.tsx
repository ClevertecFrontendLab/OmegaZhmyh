import { Box, Text, VStack } from '@chakra-ui/react';

type CookingBlogProps = {
    user: React.ReactNode;
    text: string;
};

export const CookingBlogPreview = ({ user, text }: CookingBlogProps) => (
    <VStack
        justifyContent='space-between'
        alignItems='flex-start'
        gap='16px'
        position='relative'
        padding={{ base: '16px', lg: '24px' }}
        paddingTop='24px'
        bgColor='white'
        border='1px'
        borderColor='blackAlpha.200'
        borderRadius='8px'
        data-test-id='blogs-card'
    >
        <Box>
            {user && user}
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
    </VStack>
);
