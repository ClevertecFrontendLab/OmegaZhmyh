import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

type LoginFormValues = {
    login: string;
    password: string;
};

const validationSchema = Yup.object().shape({
    login: Yup.string().required('Логин обязателен').max(50, 'Максимальная длинна 50 символов'),
    password: Yup.string().required('Введите пароль').max(50, 'Максимальная длинна 50 символов'),
});

const initialValues: LoginFormValues = {
    login: '',
    password: '',
};

export const SingInForm = () => {
    const [show, setShow] = useState(false);
    const _handleClick = () => setShow(!show);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={() => {
                console.log('submit');
            }}
        >
            <Form>
                <Field type='text' name='name'>
                    {({ field, form }: FieldProps<LoginFormValues['login'], LoginFormValues>) => (
                        <FormControl isInvalid={!!form.errors.login && form.touched.login}>
                            <FormLabel>Логин для входа на сайт</FormLabel>
                            <Input {...field} placeholder='Введите логин' />
                            <FormErrorMessage>{form.errors.login}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
                <Field type='password' name='password'>
                    {({
                        field,
                        form,
                    }: FieldProps<LoginFormValues['password'], LoginFormValues>) => (
                        <FormControl isInvalid={!!form.errors.password && form.touched.password}>
                            <FormLabel>Пароль для входа на сайт</FormLabel>
                            <Input {...field} placeholder='Введите пароль' />
                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Formik>
    );
};
