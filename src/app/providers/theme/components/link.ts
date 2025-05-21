import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const subCategoryTab = defineStyle({
    display: 'flex',
    padding: '8px 16px',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'lime.800',
    borderBottom: '1px solid',
    borderColor: 'blackAlpha.200',
    fontSize: 'md',
    fontWeight: 'medium',
    _activeLink: {
        borderBottom: '2px solid',
        color: 'lime.600',
        borderColor: 'lime.600',
    },
});

const authLink = defineStyle({
    fontSize: 'lg',
    fontWeight: 'medium',
    color: 'lime.800',
    padding: '13px 24px',
    _activeLink: {
        borderBottom: '2px solid',
        color: 'lime.700',
        borderColor: 'lime.700',
    },
});

export const linkTheme = defineStyleConfig({
    variants: { subCategoryTab, authLink },
});
