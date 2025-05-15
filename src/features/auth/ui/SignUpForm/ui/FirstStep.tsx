import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { Field, useFormikContext } from 'formik';

type SignupStep1Values = {
    firstName: string;
    lastName: string;
    email: string;
};

export const FirstStep = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { errors, touched, validateForm, setTouched } = useFormikContext<SignupStep1Values>();
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
        <VStack justifyContent='space-between' alignItems='stretch' minH='376px'>
            <VStack spacing='24px'>
                <FormControl isInvalid={!!errors.firstName && touched.firstName}>
                    <FormLabel htmlFor='firstName' fontWeight='normal'>
                        Имя
                    </FormLabel>
                    <Field
                        as={Input}
                        id='firstName'
                        name='firstName'
                        size='lg'
                        bgColor='white'
                        placeholder='Имя'
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                    <FormLabel htmlFor='lastName' fontWeight='normal'>
                        Фамилия
                    </FormLabel>
                    <Field
                        as={Input}
                        id='lastName'
                        name='lastName'
                        size='lg'
                        bgColor='white'
                        placeholder='Фамилия'
                    />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor='email' fontWeight='normal'>
                        Email
                    </FormLabel>
                    <Field
                        as={Input}
                        id='email'
                        name='email'
                        size='lg'
                        bgColor='white'
                        placeholder='Email'
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
            </VStack>

            <VStack spacing='16px' alignItems='stretch'>
                <Button onClick={setSecondStep} bgColor='black' color='white' size='lg'>
                    Далее
                </Button>
            </VStack>
        </VStack>
    );
};
