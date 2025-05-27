import { Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { FieldArray, useFormikContext } from 'formik';

import { StepType } from '~/entities/Recipe';
import { BsPlusCircleFill } from '~/shared/ui/Icons';

import { BUTTONS, FORM_FIELDS, LABELS } from './constants';
import { StepItem } from './StepItem';

export const CookingSteps = ({
    openImageUploader,
}: {
    openImageUploader: (fieldName: string, inputDataTestId: string) => void;
}) => {
    const { values } = useFormikContext<{ steps: StepType[] }>();
    const steps = values[FORM_FIELDS.STEPS] || [];

    return (
        <VStack align='stretch' gap={4} w='100%'>
            <Text fontSize='md' fontWeight='semibold'>
                {LABELS.STEPS}
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
                                mt={4}
                                leftIcon={<Icon as={BsPlusCircleFill} />}
                                variant='outline'
                                colorScheme='gray'
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
