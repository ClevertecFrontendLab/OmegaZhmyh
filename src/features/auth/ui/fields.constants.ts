export const AUTH_FIELD_NAMES = {
    LOGIN: 'login',
    PASSWORD: 'password',
    PASSWORD_CONFIRM: 'passwordConfirm',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    EMAIL: 'email',
} as const;

export const AUTH_PLACEHOLDERS = {
    LOGIN: 'Логин',
    LOGIN_ENTER: 'Введите логин',
    PASSWORD: 'Пароль',
    PASSWORD_ENTER: 'Пароль для сайта',
    PASSWORD_NEW: 'Новый пароль',
    PASSWORD_CONFIRM: 'Повторите пароль',
    FIRST_NAME: 'Имя',
    LAST_NAME: 'Фамилия',
    EMAIL: 'e-mail',
} as const;
