import { Button, Center, Flex, HStack, Icon, Text, Textarea, VStack } from '@chakra-ui/react';
import { Field } from 'formik';

import { BsFillImageFill, BsPlusCircleFill } from '~/shared/ui/Icons';

import { BUTTONS, FORM_FIELDS, LABELS, PLACEHOLDERS } from './constants';

export const CookingSteps = () => (
    <VStack align='stretch' gap={4} w='100%'>
        <Text fontSize='md' fontWeight='semibold'>
            {LABELS.STEPS}
        </Text>
        <Flex gap={4} alignItems='flex-start'>
            <Center
                bg='rgba(0, 0, 0, 0.08)'
                w={{ base: '100%', md: '346px' }}
                h='160px'
                borderRadius='8px'
            >
                <BsFillImageFill fontSize={32} />
            </Center>
            <VStack align='stretch'>
                <Text fontWeight='bold'>Шаг 1</Text>
                <Field
                    as={Textarea}
                    name={`${FORM_FIELDS.STEPS}[0].description`}
                    placeholder={PLACEHOLDERS.STEP_DESCRIPTION}
                    minH='80px'
                />
            </VStack>
        </Flex>
        <HStack justifyContent='end'>
            <Button
                mt={4}
                leftIcon={<Icon as={BsPlusCircleFill} />}
                variant='outline'
                colorScheme='gray'
            >
                {BUTTONS.NEW_STEP}
            </Button>
        </HStack>
    </VStack>
);
