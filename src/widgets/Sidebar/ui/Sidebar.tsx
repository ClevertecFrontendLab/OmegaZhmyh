import { EditIcon } from '@chakra-ui/icons';
import { Center, Flex, IconButton } from '@chakra-ui/react';

import { BookmarkBtn, LikeBtn, RepostBtn } from '~/shared/ui/MiniButtons';

export const Sidebar = () => (
    <Flex
        flexDirection='column'
        justifyContent='space-between'
        alignItems='end'
        display={{ base: 'none', lg: 'flex' }}
        width='280px'
        height='calc(100vh - var(--header-height))'
        flexShrink={0}
        position='fixed'
        top='var(--header-height)'
        right={0}
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
            <BookmarkBtn value={185} />
            <LikeBtn value={589} />
            <RepostBtn value={587} />
        </Flex>
        <Center
            width={208}
            height={208}
            right={0}
            bottom={0}
            background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%);'
        >
            <IconButton
                aria-label='EditIcon'
                background='black'
                isRound={true}
                size='lg'
                icon={<EditIcon color='lime.50' />}
            ></IconButton>
        </Center>
    </Flex>
);
