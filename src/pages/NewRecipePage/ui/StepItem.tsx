import { Center, Flex, IconButton, Image, Tag, Textarea, VStack } from '@chakra-ui/react';
import { Field, useFormikContext } from 'formik';

import { StepType } from '~/entities/Recipe';
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
    const { isValid } = useFormikContext();
    return (
        <Flex
            alignItems='stretch'
            border='1px solid'
            borderColor='blackAlpha.200'
            h='160px'
            borderRadius='8px'
            mb={2}
        >
            <Center
                bg='rgba(0, 0, 0, 0.08)'
                w={{ base: '100%', md: '180px' }}
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
                        maxH='140px'
                        maxW='100%'
                        objectFit='contain'
                        data-test-id={`recipe-steps-image-block-${index}-preview-image`}
                    />
                ) : (
                    <BsFillImageFill fontSize={32} />
                )}
            </Center>

            <VStack align='start' flexGrow={1} padding='20px'>
                <Tag fontWeight='bold'>Шаг {index + 1}</Tag>
                <Field
                    as={Textarea}
                    name={`${FORM_FIELDS.STEPS}[${index}].description`}
                    placeholder={PLACEHOLDERS.STEP_DESCRIPTION}
                    alignSelf='stretch'
                    flexGrow={1}
                    minH='80px'
                    isInvalid={!isValid}
                    data-test-id={`recipe-steps-description-${index}`}
                />
                {index === 0 || (
                    <IconButton
                        aria-label='Удалить шаг'
                        icon={<BsTrash />}
                        color='red.400'
                        cursor='pointer'
                        ml='auto'
                        onClick={onRemove}
                        data-test-id={`recipe-steps-remove-button-${index}`}
                    />
                )}
            </VStack>
        </Flex>
    );
};
