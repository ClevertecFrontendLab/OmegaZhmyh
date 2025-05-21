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
import { FORM_FIELD } from '~/shared/config/chakra-variants';

type SignupStep1Values = {
    firstName: string;
    lastName: string;
    email: string;
};

export const FirstStep = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { errors, touched, validateForm, setTouched } = useFormikContext<SignupStep1Values>();
    const handleTrimBlur = useHandleTrimBlur();
    const setSecondStep = () => {
        setTouched({
            firstName: true,
            lastName: true,
            email: true,
        });
        validateForm().then((errors) => {
            if (Object.keys(errors).length < 4) {
                setCurrentStep(2);
            }
        });
    };

    return (
        <Box>
            <VStack spacing='24px'>
                <FormControl isInvalid={!!errors.firstName && touched.firstName}>
                    <FormLabel htmlFor='firstName'>Ваше имя</FormLabel>
                    <Field
                        as={Input}
                        name='firstName'
                        variant={FORM_FIELD}
                        size='lg'
                        placeholder='Имя'
                        _placeholder={{ color: 'lime.800' }}
                        data-test-id='first-name-input'
                        onBlur={handleTrimBlur}
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                    <FormLabel htmlFor='lastName'>Ваша фамилия</FormLabel>
                    <Field
                        as={Input}
                        id='lastName'
                        name='lastName'
                        variant={FORM_FIELD}
                        size='lg'
                        placeholder='Фамилия'
                        data-test-id='last-name-input'
                        onBlur={handleTrimBlur}
                    />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor='email' fontWeight='normal'>
                        Ваш e-mail
                    </FormLabel>
                    <Field
                        as={Input}
                        id='email'
                        name='email'
                        placeholder='e-mail'
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
