export const SIGNUP_STEP_TITLES = ['Шаг 1. Личная информация', 'Шаг 2. Логин и пароль'];

export const SIGNIN_FORM_ERROR_MESSAGES = {
    USER_NOT_FOUND: 'Пользователь не найден',
    TRY_AGAIN: 'Попробуйте снова.',
    INVALID_CREDENTIALS: 'Неверный логин или пароль',
    EMAIL_NOT_VERIFIED: 'E-mail не верифицирован',
    CHECK_EMAIL: 'Проверьте почту и перейдите по ссылке.',
} as const;

export const SIGNUP_FORM_ERROR_MESSAGES = {
    LOGIN_CONFLICT: 'Пользователь с таким login уже существует.',
    EMAIL_CONFLICT: 'Пользователь с таким email уже существует.',
} as const;

export const FORGOT_PASSWORD_FORM_ERROR_MESSAGES = {
    EMAIL_NOT_FOUND: 'Такого e-mail нет',
    EMAIL_NOT_FOUND_MESSAGE: 'Попробуйте другой e-mail или проверьте правильность его написания',
} as const;

export const SERVER_ERROR_MESSAGES = {
    SERVER_ERROR: 'Ошибка сервера',
    SERVER_UNKNOWN_ERROR: 'Неизвестная ошибка',
    SERVER_ERROR_MESSAGE: 'Попробуйте немного позже',
} as const;

export const ACCOUNT_RECOVERY_FORM_SUCCESS_MESSAGES = {
    SUCCESS: 'Восстановление данных успешно',
} as const;

export const VERIFICATION_SUCCESS = 'Верификация прошла успешно';

export const SUCCESS_STATUS = 'success';
