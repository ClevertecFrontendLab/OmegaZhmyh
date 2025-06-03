export const EDIT_RECIPE = '/edit-recipe';

export const ROUTES = {
    HOME: '/',
    CATEGORY: '/:category',
    SUBCATEGORY: '/:category/:subcategory',
    RECIPE: '/:category/:subcategory/:id',
    NEW_RECIPE: '/new-recipe',
    EDIT_RECIPE: `/edit-recipe/:category/:subcategory/:id`,
    THE_JUICIEST: '/the-juiciest',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    VERIFICATION: '/verification',
    NOT_FOUND: '/not-found',
    BLOGS: '/blogs',
} as const;
