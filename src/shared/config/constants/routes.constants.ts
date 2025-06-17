export const EDIT_RECIPE = '/edit-recipe';

export const ROUTES = {
    HOME: '/',
    CATEGORY: '/:category',
    SUBCATEGORY: '/:category/:subcategory',
    RECIPE: '/:category/:subcategory/:id',
    NEW_RECIPE: '/new-recipe',
    EDIT_RECIPE: `/edit-recipe/:category/:subcategory/:id`,
    EDIT_DRAFT: `/edit-draft/:draftId`,
    THE_JUICIEST: '/the-juiciest',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    VERIFICATION: '/verification',
    NOT_FOUND: '/not-found',
    BLOGS: '/blogs',
    BLOGGER_PROFILE: '/blogs/:bloggerId',
    USER_PROFILE: '/profile',
} as const;
