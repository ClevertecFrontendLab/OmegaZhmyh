import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { BsXCircle } from '~/shared/ui/Icons';
import { BsEyeFill } from '~/shared/ui/Icons/ui/BsEyeFill';
import { BsEyeSlashFill } from '~/shared/ui/Icons/ui/BsEyeSlashFill';
import { useErrorAlert } from '~/shared/ui/SnackbarAlert';

import { useLoginMutation } from '../api/authApi';
import { loginSchema } from '../validation/auth.validation';

const ServerErrorModal = ({
    isOpen,
    onClose,
    onRetry,
}: {
    isOpen: boolean;
    onClose: () => void;
    onRetry: () => void;
}) => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
            p='32px'
            borderRadius='16px'
            maxW={{ base: '316px', lg: '396px' }}
            textAlign='center'
        >
            <IconButton
                aria-label='Закрыть'
                icon={<BsXCircle boxSize='24px' />}
                position='absolute'
                top='24px'
                right='24px'
                size='xs'
                variant='unstyled'
                onClick={onClose}
            />
            <Image
                src='/src/shared/assets/Breakfast1.png'
                alt='breakfast'
                boxSize={{ base: '108px', lg: '206px' }}
                mx='auto'
            />
            <ModalHeader fontSize='2xl' fontWeight='bold' mt='32px' mb={0} p={0}>
                Вход не выполнен
            </ModalHeader>
            <ModalBody p={0} mt='16px'>
                <Text color='gray.600' fontSize='md'>
                    Что-то пошло не так.
                    <br />
                    Попробуйте еще раз
                </Text>
                <Button
                    mt='32px'
                    colorScheme='black'
                    bg='black'
                    color='white'
                    size='lg'
                    w='100%'
                    borderRadius='6px'
                    onClick={onRetry}
                >
                    Повторить
                </Button>
            </ModalBody>
        </ModalContent>
    </Modal>
);

export const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const [isRetryModalOpen, setIsRetryModalOpen] = useState(false);
    const [formValues, setFormValues] = useState<{ login: string; password: string } | null>(null);

    const { handleError } = useErrorAlert();

    const handleSubmit = async (values: { login: string; password: string }) => {
        try {
            await login(values).unwrap();
            navigate('/recipes');
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'status' in error && error.status === 401) {
                handleError({
                    errorTitle: 'Неверный логин или пароль',
                    errorMessage: 'Попробуйте снова.',
                });
            } else if (
                error &&
                typeof error === 'object' &&
                'status' in error &&
                error.status === 403
            ) {
                handleError({
                    errorTitle: 'E-mail не верифицирован',
                    errorMessage: 'Проверьте почту и попробуйте снова.',
                });
            } else if (
                error &&
                typeof error === 'object' &&
                'status' in error &&
                typeof error.status === 'number' &&
                error.status >= 500
            ) {
                setFormValues(values);
                setIsRetryModalOpen(true);
            }
        }
    };

    const handleRetry = async () => {
        setIsRetryModalOpen(false);
        if (formValues) {
            await handleSubmit(formValues);
        }
    };

    return (
        <>
            <Formik
                initialValues={{ login: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <VStack justifyContent='space-between' alignItems='stretch' minH='376px'>
                            <VStack spacing='24px'>
                                <FormControl isInvalid={!!errors.login && touched.login}>
                                    <FormLabel htmlFor='login' fontWeight='normal'>
                                        Логин для входа на сайт
                                    </FormLabel>
                                    <Input
                                        id='login'
                                        name='login'
                                        value={values.login}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        size='lg'
                                        bgColor='white'
                                        placeholder='Логин'
                                        data-test-id='login-input'
                                    />
                                    <FormErrorMessage>{errors.login}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.password && touched.password}>
                                    <FormLabel htmlFor='password' fontWeight='normal'>
                                        Пароль
                                    </FormLabel>
                                    <InputGroup size='lg'>
                                        <Input
                                            id='password'
                                            name='password'
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            bgColor='white'
                                            placeholder='Пароль'
                                            data-test-id='password-input'
                                        />
                                        <InputRightElement>
                                            <IconButton
                                                icon={
                                                    showPassword ? (
                                                        <BsEyeFill />
                                                    ) : (
                                                        <BsEyeSlashFill />
                                                    )
                                                }
                                                aria-label='Показать пароль'
                                                variant='unstyled'
                                                onMouseDown={() => setShowPassword(true)}
                                                onMouseUp={() => setShowPassword(false)}
                                                onMouseLeave={() => setShowPassword(false)}
                                                data-test-id='password-visibility-button'
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl>
                            </VStack>

                            <VStack spacing='16px' alignItems='stretch'>
                                <Button
                                    type='submit'
                                    bgColor='black'
                                    color='white'
                                    size='lg'
                                    data-test-id='submit-button'
                                >
                                    Войти
                                </Button>
                                <Link textAlign='center'>Забыли логин или пароль?</Link>
                            </VStack>
                        </VStack>
                    </Form>
                )}
            </Formik>
            <ServerErrorModal
                isOpen={isRetryModalOpen}
                onClose={() => setIsRetryModalOpen(false)}
                onRetry={handleRetry}
            />
        </>
    );
};
