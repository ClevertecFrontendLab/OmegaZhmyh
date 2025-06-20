import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Image } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { UserCard } from '~/entities/user';
import Logo from '~/shared/assets/logo.svg';
import MobileLogo from '~/shared/assets/mobile-logo.svg';
import { BookmarkBtn, LikeBtn, RepostBtn } from '~/shared/ui/mini-buttons';

import { selectIsBurgerOpen, toggleBurger } from '../model/slice';
import { Breadcrumbs } from './Breadcrumb';

export const Header = () => {
    const dispatch = useDispatch();
    const isBurgerOpen = useSelector(selectIsBurgerOpen);

    return (
        <Flex
            width='100%'
            height={{ base: 'var(--mobile-header-height)', lg: 'var(--header-height)' }}
            paddingX='16px'
            backgroundColor={isBurgerOpen ? 'white' : 'lime.50'}
            alignItems='center'
            justifyContent={{ base: 'space-between', lg: 'start' }}
            top={0}
            position='fixed'
            data-test-id='header'
            zIndex='modal'
            as='header'
        >
            <Link to='/' data-test-id='header-logo'>
                <Image src={MobileLogo} display={{ base: 'block', md: 'none' }} />
                <Image src={Logo} display={{ base: 'none', md: 'block' }} />
            </Link>
            <Breadcrumbs marginLeft={32} display={{ base: 'none', lg: 'block' }} />
            <Box pos='absolute' right='80px' display={{ base: 'none', lg: 'flex' }}>
                <UserCard
                    firstName='Екатерина'
                    lastName='Константинопольская'
                    login='bake_and_pie'
                />
            </Box>
            <Flex gap={{ base: 2, sm: 4 }} display={{ base: 'flex', lg: 'none' }}>
                <Flex alignItems='center' justifyContent='space-between'>
                    <BookmarkBtn value={185} />
                    <RepostBtn value={587} />
                    <LikeBtn value={589} />
                </Flex>
                <IconButton
                    aria-label='toggle burger menu'
                    size='lg'
                    variant='ghost'
                    icon={isBurgerOpen ? <CloseIcon boxSize={5} /> : <HamburgerIcon boxSize={5} />}
                    onClick={() => dispatch(toggleBurger())}
                    data-test-id={isBurgerOpen ? 'close-icon' : 'hamburger-icon'}
                />
            </Flex>
        </Flex>
    );
};
