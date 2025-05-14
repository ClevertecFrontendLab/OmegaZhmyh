import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    login: Yup.string().required('Введите логин').max(50, 'Максимальная длина 50 символов'),
    password: Yup.string().required('Введите пароль').max(50, 'Максимальная длина 50 символов'),
});

export const signupStep1Schema = Yup.object().shape({
    firstName: Yup.string()
        .required('Введите имя')
        .matches(/^[А-Яа-я]/, 'Должно начинаться с кириллицы А-Я')
        .matches(/^[А-Яа-я-]+$/, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
    lastName: Yup.string()
        .required('Введите фамилию')
        .matches(/^[А-Яа-я]/, 'Должно начинаться с кириллицы А-Я')
        .matches(/^[А-Яа-я-]+$/, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
    email: Yup.string()
        .required('Введите e-mail')
        .email('Введите корректный e-mail')
        .max(50, 'Максимальная длина 50 символов'),
    login: Yup.string()
        .required('Введите логин')
        .min(5, 'Не соответствует формату')
        .matches(/^[A-Za-z0-9!@#$&_+.-]+$/, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
    password: Yup.string()
        .required('Введите пароль')
        .min(8, 'Не соответствует формату')
        .matches(/^[A-Za-z0-9!@#$&_+.-]+$/, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
    confirmPassword: Yup.string()
        .required('Повторите пароль')
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
});

export const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .required('Введите e-mail')
        .email('Введите корректный e-mail')
        .max(50, 'Максимальная длина 50 символов'),
});

export const resetPasswordSchema = Yup.object().shape({
    login: Yup.string()
        .required('Введите логин')
        .min(5, 'Не соответствует формату')
        .matches(/^[A-Za-z0-9!@#$&_+.-]+$/, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
    password: Yup.string()
        .required('Введите пароль')
        .min(8, 'Не соответствует формату')
        .matches(/^[A-Za-z0-9!@#$&_+.-]+$/, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
    confirmPassword: Yup.string()
        .required('Повторите пароль')
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
});
