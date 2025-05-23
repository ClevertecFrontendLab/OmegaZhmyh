import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    login: Yup.string().trim().required('Введите логин').max(50, 'Максимальная длина 50 символов'),
    password: Yup.string().required('Введите пароль').max(50, 'Максимальная длина 50 символов'),
});

export const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .trim()
        .required('Введите имя')
        .matches(/^[А-Яа-я]/, 'Должно начинаться с кириллицы А-Я')
        .matches(/^[А-Яа-я-]+$/, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
    lastName: Yup.string()
        .trim()
        .required('Введите фамилию')
        .matches(/^[А-Яа-я]/, 'Должно начинаться с кириллицы А-Я')
        .matches(/^[А-Яа-я-]+$/, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
    email: Yup.string()
        .trim()
        .required('Введите e-mail')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Введите корректный e-mail'),
    login: Yup.string()
        .trim()
        .required('Введите логин')
        .min(5, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^[A-Za-z0-9!@#$&_+.-]+$/, 'Не соответствует формату'),
    password: Yup.string()
        .required('Введите пароль')
        .max(50, 'Максимальная длина 50 символов')
        .min(8, 'Не соответствует формату')
        .matches(/^[A-Za-z0-9!@#$&_+.-]+$/, 'Не соответствует формату')
        .matches(/[A-Z]/, 'Не соответствует формату')
        .matches(/[0-9]/, 'Не соответствует формату'),
    passwordConfirm: Yup.string()
        .required('Повторите пароль')
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
});

export const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .required('Введите e-mail')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Введите корректный e-mail'),
});

export const resetPasswordSchema = Yup.object().shape({
    login: Yup.string()
        .trim()
        .required('Введите логин')
        .max(50, 'Максимальная длина 50 символов')
        .min(5, 'Не соответствует формату')
        .matches(/^[A-Za-z0-9!@#$&_+.-]+$/, 'Не соответствует формату'),
    password: Yup.string()
        .required('Введите пароль')
        .max(50, 'Максимальная длина 50 символов')
        .min(8, 'Не соответствует формату')
        .matches(/^[A-Za-z0-9!@#$&_+.-]+$/, 'Не соответствует формату')
        .matches(/[A-Z]/, 'Не соответствует формату')
        .matches(/[0-9]/, 'Не соответствует формату'),
    passwordConfirm: Yup.string()
        .required('Повторите пароль')
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
});
