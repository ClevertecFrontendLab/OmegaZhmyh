import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Image } from '@chakra-ui/react';

import { UserCard } from '~/entities/UserCard';
import Logo from '~/shared/assets/logo.svg';

export const Header = () => (
    <Flex
        w='100%'
        h='var(--header-height)'
        p='0 16px'
        backgroundColor='lime.50'
        alignItems='center'
    >
        <Image src={Logo} />
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink href='#'>Главная</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <UserCard />
    </Flex>
);
