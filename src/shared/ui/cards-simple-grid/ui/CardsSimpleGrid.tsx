import { SimpleGrid } from '@chakra-ui/react';

export const CardSimpleGrid = ({ children }: { children: React.ReactNode }) => (
    <SimpleGrid
        mt={{ base: '24px', md: '16px', lg: '40px', xl: '56px' }}
        columns={{ base: 1, md: 2, lg: 1, xl: 2 }}
        rowGap={{ base: '12px', md: '16px' }}
        columnGap={{ base: '16px', xl: '24px' }}
        data-test-id='recipe-card-list'
    >
        {children}
    </SimpleGrid>
);
