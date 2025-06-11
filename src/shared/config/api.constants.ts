export const API_BASE_URL = 'https://marathon-api.clevertec.ru';
export const API_BASE_IMG_URL = 'https://training-api.clevertec.ru';

export const API_URLS = {
    REFRESH_TOKEN: '/auth/refresh',
    MEASURE_UNITS: '/measure-units',
    FILE_UPLOAD: '/file/upload',
    TOGGLE_SUBSCRIPTION: '/users/toggle-subscription',
    AUTH: {
        LOGIN: '/auth/login',
        SIGNUP: '/auth/signup',
        FORGOT_PASSWORD: '/auth/forgot-password',
        VERIFY_OTP: '/auth/verify-otp',
        RESET_PASSWORD: '/auth/reset-password',
    },
    RECIPES: {
        BASE: '/recipe',
        DRAFT: '/recipe/draft',
        CATEGORIES: '/recipe/category',
        USER: '/recipe/user',
        LIKE: '/like',
        BOOKMARK: '/bookmark',
    },
    BLOGGERS: '/bloggers',
    CATEGORIES: '/category',
} as const;

export const TOKEN_KEY = 'token';
