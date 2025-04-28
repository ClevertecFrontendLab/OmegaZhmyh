import { Flex, Heading, Text } from '@chakra-ui/react';

import { AllergenSelect, AllergenToggle } from '~/features/recipe-filters';
import { SearchInput } from '~/features/recipe-filters';
import { AppDrawer } from '~/widgets/Drawer';

import { DrawerToggle } from './AppDrawerToggle';

interface SearchPanelProps {
    title: string;
    desc?: string;
}

export const SearchPanel = ({ title, desc }: SearchPanelProps) => (
    <Flex marginTop={{ base: '16px', lg: '32px' }} flexDirection='column' alignItems='center'>
        <Heading textAlign='center' fontSize={{ base: '2xl', lg: '5xl' }}>
            {title}
        </Heading>
        {desc ? (
            <Text color='blackAlpha.600' marginTop='12px' textAlign='center' maxWidth='696px'>
                {desc}
            </Text>
        ) : null}
        <Flex
            marginTop={{ base: '16px', lg: '32px' }}
            padding={0}
            flexDirection='column'
            width={{ base: '100%', md: '450px', lg: '520px' }}
        >
            <Flex gap={3}>
                <DrawerToggle />
                <AppDrawer />
                <SearchInput />
            </Flex>
            <Flex
                gap={4}
                marginTop={4}
                marginBottom={4}
                alignItems='start'
                zIndex='dropdown'
                display={{ base: 'none', lg: 'flex' }}
            >
                <AllergenToggle data-test-id='allergens-switcher' />
                <AllergenSelect data-test-id='allergens-menu-button' />
            </Flex>
        </Flex>
    </Flex>
);
