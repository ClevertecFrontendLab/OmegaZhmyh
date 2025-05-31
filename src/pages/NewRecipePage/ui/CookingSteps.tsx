import { Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { FieldArray, useFormikContext } from 'formik';

import { StepType } from '~/entities/Recipe';
import { BsPlusCircleFill } from '~/shared/ui/Icons';

import { BUTTONS, FORM_FIELDS } from './constants';
import { StepItem } from './StepItem';

type CookingStepsProps = {
    openImageUploader: (fieldName: string, inputDataTestId: string) => void;
};

export const CookingSteps = ({ openImageUploader }: CookingStepsProps) => {
    const { values } = useFormikContext<{ steps: StepType[] }>();
    const steps = values[FORM_FIELDS.STEPS] || [];

    return (
        <VStack align='stretch' gap='16px' w='100%'>
            <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight='semibold'>
                Добавьте шаги приготовления
            </Text>
            <FieldArray name={FORM_FIELDS.STEPS}>
                {({ push, remove }) => (
                    <>
                        {steps.map((step, idx) => (
                            <StepItem
                                key={idx}
                                step={step}
                                index={idx}
                                onImageClick={() =>
                                    openImageUploader(
                                        `${FORM_FIELDS.STEPS}.${idx}.image`,
                                        `recipe-steps-image-block-${idx}-input-file`,
                                    )
                                }
                                onRemove={() => remove(idx)}
                            />
                        ))}
                        <HStack justifyContent='end'>
                            <Button
                                rightIcon={<Icon as={BsPlusCircleFill} />}
                                variant='outline'
                                colorScheme='gray'
                                size='sm'
                                borderColor='black'
                                onClick={() =>
                                    push({
                                        stepNumber: steps.length + 1,
                                        description: '',
                                        image: null,
                                    })
                                }
                            >
                                {BUTTONS.NEW_STEP}
                            </Button>
                        </HStack>
                    </>
                )}
            </FieldArray>
        </VStack>
    );
};
