export const ROUTES = {
    HOME: '/',
    CATEGORY: '/:category',
    SUBCATEGORY: '/:category/:subcategory',
    RECIPE: '/:category/:subcategory/:id',
    THE_JUICIEST: 'the-juiciest',
    SIGN_IN: 'sign-in',
    SIGN_UP: 'sign-up',
    NOT_FOUND: 'not-found',
} as const;
