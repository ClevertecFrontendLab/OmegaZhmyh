import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { AllergenSelect, AllergenToggle, selectSearchLoading } from '~/features/recipe-filters';
import { SearchInput } from '~/features/recipe-filters';
import { AppSpiner } from '~/shared/ui/AppSpiner';
import { AppDrawer } from '~/widgets/Drawer';

import { DrawerToggle } from './AppDrawerToggle';

interface SearchPanelProps {
    title?: string;
    desc?: string;
}

export const SearchPanel = ({ title, desc }: SearchPanelProps) => {
    const isSearchLoading = useSelector(selectSearchLoading);
    const isMobile = useBreakpointValue({ base: true, lg: false });
    return (
        <Flex
            margin='0 auto'
            marginTop={{ base: '16px', lg: '32px' }}
            paddingBottom='32px'
            marginBottom={{ lg: '24px' }}
            flexDirection='column'
            alignItems='center'
            boxShadow={{
                base: 'none',
                lg: '0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
            width={{ base: 'auto', lg: '576px', xl: '898px' }}
            borderRadius='24px'
        >
            <Heading textAlign='center' fontSize={{ base: '2xl', lg: '5xl' }}>
                {title}
            </Heading>
            {isSearchLoading ? (
                <Box data-test-id='loader-search-block'>
                    <AppSpiner />
                </Box>
            ) : (
                <>
                    {desc ? (
                        <Text
                            color='blackAlpha.600'
                            marginTop='12px'
                            textAlign='center'
                            maxWidth='696px'
                        >
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
                        {isMobile ? null : (
                            <Flex gap='16px' marginTop='16px' alignItems='start' zIndex='dropdown'>
                                <AllergenToggle data-test-id='allergens-switcher' />
                                <AllergenSelect data-test-id='allergens-menu-button' />
                            </Flex>
                        )}
                    </Flex>
                </>
            )}
        </Flex>
    );
};
