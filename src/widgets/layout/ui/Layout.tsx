import { Container, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useGetCategoriesQuery } from '~/entities/category';

import { BurgerMenu } from './BurgerMenu';
import { Header } from './header/Header';
import { MobileFooter } from './MobileFooter';
import { NavBar } from './NavBar';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }: { children: ReactNode }) => {
    useGetCategoriesQuery();
    return (
        <>
            <Header />
            <Flex justifyContent={{ base: 'center', lg: 'space-between' }}>
                <NavBar flexShrink={0} />
                <Container
                    as='main'
                    marginTop={{ base: 'var(--mobile-header-height)', lg: 'var(--header-height)' }}
                    paddingBottom={{ base: 'var(--mobile-footer-height)', lg: '0' }}
                    maxW={{
                        xl: 'container.xl',
                        lg: 'calc(100% - var(--navbar-width) - var(--sidebar-width))',
                    }}
                    paddingX={{ base: '16px', md: '20px' }}
                    overflow='hidden'
                >
                    {children}
                </Container>
                <Sidebar />
                <BurgerMenu />
            </Flex>
            <MobileFooter />
        </>
    );
};
