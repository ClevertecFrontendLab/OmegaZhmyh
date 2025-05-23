import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import { Field, useFormikContext } from 'formik';

import { useHandleTrimBlur } from '~/features/auth/lib/useHandleTrimBlur';
import { SignupRequest } from '~/features/auth/types/auth.types';
import { FORM_FIELD } from '~/shared/config/chakra-variants.constants';

import { AUTH_FIELD_NAMES, AUTH_PLACEHOLDERS } from '../../../constants/fields.constants';

export const FirstStep = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { errors, touched, validateForm, setTouched } = useFormikContext<SignupRequest>();

    const handleTrimBlur = useHandleTrimBlur();

    const setSecondStep = () => {
        setTouched({
            firstName: true,
            lastName: true,
            email: true,
        });
        validateForm().then((errors) => {
            const isFirstNameValid = !errors.firstName;
            const isLastNameValid = !errors.lastName;
            const isEmailValid = !errors.email;

            if (isFirstNameValid && isLastNameValid && isEmailValid) {
                setCurrentStep(2);
            }
        });
    };

    return (
        <Box>
            <VStack spacing='24px'>
                <FormControl isInvalid={!!errors.firstName && touched.firstName}>
                    <FormLabel htmlFor={AUTH_FIELD_NAMES.FIRST_NAME}>Ваше имя</FormLabel>
                    <Field
                        as={Input}
                        name={AUTH_FIELD_NAMES.FIRST_NAME}
                        variant={FORM_FIELD}
                        size='lg'
                        placeholder={AUTH_PLACEHOLDERS.FIRST_NAME}
                        _placeholder={{ color: 'lime.800' }}
                        data-test-id='first-name-input'
                        onBlur={handleTrimBlur}
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                    <FormLabel htmlFor={AUTH_FIELD_NAMES.LAST_NAME}>Ваша фамилия</FormLabel>
                    <Field
                        as={Input}
                        name={AUTH_FIELD_NAMES.LAST_NAME}
                        variant={FORM_FIELD}
                        size='lg'
                        placeholder={AUTH_PLACEHOLDERS.LAST_NAME}
                        data-test-id='last-name-input'
                        onBlur={handleTrimBlur}
                    />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor={AUTH_FIELD_NAMES.EMAIL} fontWeight='normal'>
                        Ваш e-mail
                    </FormLabel>
                    <Field
                        as={Input}
                        name={AUTH_FIELD_NAMES.EMAIL}
                        placeholder={AUTH_PLACEHOLDERS.EMAIL}
                        variant={FORM_FIELD}
                        size='lg'
                        data-test-id='email-input'
                        onBlur={handleTrimBlur}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
            </VStack>

            <Button
                onClick={setSecondStep}
                mt='48px'
                width='full'
                bgColor='blackAlpha.900'
                borderColor='blackAlpha.200'
                color='white'
                size='lg'
                data-test-id='submit-button'
            >
                Дальше
            </Button>
        </Box>
    );
};
