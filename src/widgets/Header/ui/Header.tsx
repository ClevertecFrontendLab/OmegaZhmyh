import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Image } from '@chakra-ui/react';

import Logo from '~/shared/assets/logo.svg';
import { UserCard } from '~/shared/ui/UserCard';

export const Header = () => (
    <Flex
        w='100%'
        h='var(--header-height)'
        p='16px 56px 16px 16px'
        backgroundColor='lime.50'
        alignItems='center'
    >
        <Image src={Logo} />
        <Breadcrumb marginLeft={32} display={{ base: 'none', md: 'block' }}>
            <BreadcrumbItem>
                <BreadcrumbLink href='#'>Главная</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <UserCard pos='absolute' right='80px' display={{ base: 'none', md: 'flex' }} />
    </Flex>
);
