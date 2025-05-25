import { Center, Flex, IconButton, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { BsPencil } from '~/shared/ui/Icons';
import { BookmarkBtn, LikeBtn, RepostBtn } from '~/shared/ui/MiniButtons';

export const Sidebar = () => {
    const navigate = useNavigate();

    const handleWriteRecipe = () => {
        navigate('/new-recipe');
    };

    return (
        <Flex
            flexDirection='column'
            justifyContent='space-between'
            alignItems='end'
            display={{ base: 'none', lg: 'flex' }}
            width='var(--sidebar-width)'
            height='calc(100vh - var(--header-height))'
            flexShrink={0}
            position='fixed'
            top='var(--header-height)'
            right={0}
            as='aside'
        >
            <Flex
                width={208}
                flexDirection='column'
                alignItems='center'
                justifyContent='space-between'
                padding='16px 56px'
                right={0}
                top={0}
                gap={6}
            >
                <BookmarkBtn value={185} size={{ base: 'xs', lg: 'md' }} />
                <LikeBtn value={589} size={{ base: 'xs', lg: 'md' }} />
                <RepostBtn value={587} size={{ base: 'xs', lg: 'md' }} />
            </Flex>
            <Center
                width={208}
                height={208}
                right={0}
                bottom={0}
                flexDirection='column'
                background='radial-gradient(50% 50% at 50% 42%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%);'
            >
                <IconButton
                    aria-label='EditIcon'
                    background='black'
                    isRound={true}
                    size='lg'
                    icon={<BsPencil boxSize='24px' color='lime.50' />}
                    _hover={{}}
                    onClick={handleWriteRecipe}
                />
                <Text marginTop='12px' color='blackAlpha.700' fontSize='xs'>
                    Записать рецепт
                </Text>
            </Center>
        </Flex>
    );
};
