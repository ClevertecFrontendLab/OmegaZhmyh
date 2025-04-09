import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    IconButton,
    Image,
} from '@chakra-ui/react';

import Logo from '~/shared/assets/logo.svg';
import MobileLogo from '~/shared/assets/mobile-logo.svg';
import { BookmarkBtn, LikeBtn, RepostBtn } from '~/shared/ui/MiniButtons';
import { UserCard } from '~/shared/ui/UserCard';

export const Header = () => (
    <Flex
        width='100%'
        height={{ base: 'var(--mobile-header-height)', md: 'var(--header-height)' }}
        paddingX='16px'
        backgroundColor='lime.50'
        alignItems='center'
        justifyContent='space-between'
        top={0}
        position='fixed'
        data-test-id='header'
    >
        <Image src={MobileLogo} display={{ base: 'block', sm: 'none' }} />
        <Image src={Logo} display={{ base: 'none', sm: 'block' }} />
        <Breadcrumb marginLeft={32} display={{ base: 'none', md: 'block' }}>
            <BreadcrumbItem>
                <BreadcrumbLink href='#'>Главная</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Box pos='absolute' right='80px' display={{ base: 'none', md: 'flex' }}>
            <UserCard
                accountName='@bake_and_pie'
                avatarImg='CatherineConstantinopleImg2'
                userName='Екатерина Константинопольская'
            />
        </Box>
        <Flex gap={{ base: 2, sm: 4 }}>
            <Flex alignItems='center' justifyContent='space-between'>
                <BookmarkBtn value={185} />
                <RepostBtn value={587} />
                <LikeBtn value={589} />
            </Flex>

            <IconButton
                aria-label='Search database'
                size='lg'
                variant='ghost'
                icon={<HamburgerIcon boxSize={5} />}
            />
        </Flex>
    </Flex>
);
