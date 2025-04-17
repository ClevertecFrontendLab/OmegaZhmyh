import { Avatar, Box, Button, Card, HStack, Text } from '@chakra-ui/react';

import SergeyImg from '~/shared/assets/avatar_img/@serge25.png';
import { BsPeopleFill, BsPersonPlusFill } from '~/shared/ui/Icons';

interface AuthorCardProps {
    image?: string;
    name?: string;
    accountName?: string;
}

export const AuthorCard = (props: AuthorCardProps) => {
    const { name = 'Сергей Разумов', image = SergeyImg, accountName = '@serge25' } = props;
    return (
        <Card
            direction='row'
            padding={{ base: '12px', md: '24px' }}
            gap={{ base: '8px', md: '16px' }}
            position='relative'
            bgColor='lime.300'
            marginTop={{ base: '24px', lg: '40px' }}
        >
            <Avatar src={image} boxSize='96px' />
            <Box flexGrow={1}>
                <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight='bold'>
                    {name}
                </Text>
                <Text
                    position='absolute'
                    right={{ base: '8px', md: '24px' }}
                    top={{ base: '8px', md: '24px' }}
                >
                    Автор рецепта
                </Text>
                <Text color='blackAlpha.700' fontSize='sm'>
                    {accountName}
                </Text>
                <HStack justifyContent='space-between'>
                    <Button size='xs' bgColor='black' color='white' leftIcon={<BsPersonPlusFill />}>
                        Подписаться
                    </Button>
                    <Button leftIcon={<BsPeopleFill />} variant='ghost'>
                        125
                    </Button>
                </HStack>
            </Box>
        </Card>
    );
};
