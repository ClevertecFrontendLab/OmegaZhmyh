import { Center, Flex, HStack, IconButton, Image, Tag, Textarea, VStack } from '@chakra-ui/react';
import { Field, FieldProps, FormikErrors, useFormikContext } from 'formik';

import { CreateRecipe, StepType } from '~/entities/Recipe';
import { BsFillImageFill, BsTrash } from '~/shared/ui/Icons';
import { getImgUrlPath } from '~/shared/utils/getUrlPath';

import { FORM_FIELDS, PLACEHOLDERS } from './constants';

export interface StepItemProps {
    step: StepType;
    index: number;
    onImageClick: () => void;
    onRemove: () => void;
}

export const StepItem = ({ step, index, onImageClick, onRemove }: StepItemProps) => {
    const { errors } = useFormikContext<CreateRecipe>();

    return (
        <Flex
            alignItems='stretch'
            border='1px solid'
            borderColor='blackAlpha.200'
            flexDirection={{ base: 'column', md: 'row' }}
            borderRadius='8px'
        >
            <Center
                bg='rgba(0, 0, 0, 0.08)'
                w={{ base: '100%', md: '346px' }}
                h='160px'
                borderRadius='8px'
                cursor='pointer'
                onClick={onImageClick}
                position='relative'
                data-test-id={`recipe-steps-image-block-${index}`}
            >
                {step.image ? (
                    <Image
                        src={getImgUrlPath(step.image)}
                        alt={`Шаг ${index + 1}`}
                        objectFit='contain'
                        data-test-id={`recipe-steps-image-block-${index}-preview-image`}
                    />
                ) : (
                    <BsFillImageFill fontSize={32} />
                )}
            </Center>

            <VStack align='start' flexGrow={1} padding='20px' gap='16px'>
                <HStack justifyContent='space-between' w='100%'>
                    <Tag fontWeight='bold'>Шаг {index + 1}</Tag>
                    {index === 0 || (
                        <IconButton
                            aria-label='Удалить шаг'
                            icon={<BsTrash boxSize='14px' />}
                            color='lime.800'
                            h='100%'
                            variant='unstyled'
                            onClick={onRemove}
                            data-test-id={`recipe-steps-remove-button-${index}`}
                        />
                    )}
                </HStack>
                <Field
                    as={Textarea}
                    name={`${FORM_FIELDS.STEPS}[${index}].description`}
                    placeholder={PLACEHOLDERS.STEP_DESCRIPTION}
                    alignSelf='stretch'
                    resize='none'
                >
                    {({ field }: FieldProps) => (
                        <Textarea
                            {...field}
                            overflow='hidden'
                            onChange={(e) => {
                                field.onChange(e);
                                const textarea = e.target;
                                textarea.style.height = 'auto';
                                textarea.style.height = `${textarea.scrollHeight}px`;
                            }}
                            isInvalid={
                                !!(errors[FORM_FIELDS.STEPS]?.[index] as FormikErrors<StepType>)
                                    ?.description
                            }
                            data-test-id={`recipe-steps-description-${index}`}
                        />
                    )}
                </Field>
            </VStack>
        </Flex>
    );
};
