export const ROUTES = {
    HOME: '/',
    CATEGORY: '/:category',
    SUBCATEGORY: '/:category/:subcategory',
    RECIPE: '/:category/:subcategory/:id',
    NEW_RECIPE: '/new-recipe',
    THE_JUICIEST: '/the-juiciest',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    VERIFICATION: '/verification',
    NOT_FOUND: '/not-found',
} as const;
