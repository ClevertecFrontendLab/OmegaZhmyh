import { EditIcon } from '@chakra-ui/icons';
import { Center, Flex, IconButton } from '@chakra-ui/react';

import { BookmarkBtn, LikeBtn, RepostBtn } from '~/shared/ui/MiniButtons';

export const Sidebar = () => (
    <Flex
        flexDirection='column'
        justifyContent='space-between'
        display={{ base: 'none', lg: 'flex' }}
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
            <BookmarkBtn />
            <LikeBtn />
            <RepostBtn />
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
