import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Image } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import Logo from '~/shared/assets/logo.svg';
import MobileLogo from '~/shared/assets/mobile-logo.svg';
import { AppBreadcrumb } from '~/shared/ui/AppBreadcrumb';
import { BookmarkBtn, LikeBtn, RepostBtn } from '~/shared/ui/MiniButtons';
import { UserCard } from '~/shared/ui/UserCard';

import { selectIsBurgerOpen } from '../model/selectors/selectIsBurgerOpen';
import { toggleBurger } from '../model/slice';

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
            zIndex='popover'
            as='header'
        >
            <Link to='/'>
                <Image src={MobileLogo} display={{ base: 'block', md: 'none' }} />
                <Image src={Logo} display={{ base: 'none', md: 'block' }} />
            </Link>
            <AppBreadcrumb marginLeft={32} display={{ base: 'none', lg: 'block' }} />
            <Box pos='absolute' right='80px' display={{ base: 'none', lg: 'flex' }}>
                <UserCard
                    accountName='@bake_and_pie'
                    avatarImg='CatherineConstantinopleImg2'
                    userName='Екатерина Константинопольская'
                />
            </Box>
            <Flex gap={{ base: 2, sm: 4 }} display={{ base: 'flex', lg: 'none' }}>
                <Flex alignItems='center' justifyContent='space-between'>
                    <BookmarkBtn value={185} />
                    <RepostBtn value={587} />
                    <LikeBtn value={589} />
                </Flex>
                {isBurgerOpen ? (
                    <IconButton
                        aria-label='Search database'
                        size='lg'
                        variant='ghost'
                        icon={<CloseIcon boxSize={5} />}
                        onClick={() => dispatch(toggleBurger())}
                        data-test-id='close-icon'
                    />
                ) : (
                    <IconButton
                        aria-label='Search database'
                        size='lg'
                        variant='ghost'
                        icon={<HamburgerIcon boxSize={5} />}
                        onClick={() => dispatch(toggleBurger())}
                        data-test-id='hamburger-icon'
                    />
                )}
            </Flex>
        </Flex>
    );
};
