import { Flex } from '@chakra-ui/react';

import { MobileTabs } from '~/shared/ui/MobileTabs';

export const MobileFooter = () => (
    <Flex
        height='var(--mobile-footer-height)'
        width='100%'
        bgColor='lime.50'
        display={{ base: 'flex', lg: 'none' }}
        justify='space-around'
        align='center'
    >
        <MobileTabs />
    </Flex>
);
