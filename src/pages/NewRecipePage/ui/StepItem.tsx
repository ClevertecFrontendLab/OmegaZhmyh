import { Center, Flex, Icon, Image, Tag, Textarea, VStack } from '@chakra-ui/react';
import { Field } from 'formik';

import { BsFillImageFill, BsTrash } from '~/shared/ui/Icons';
import { getImgUrlPath } from '~/shared/utils/getUrlPath';

import { FORM_FIELDS, PLACEHOLDERS } from './constants';
import { StepItemProps } from './types';

export const StepItem = ({ step, index, onImageClick, onRemove }: StepItemProps) => (
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
        >
            {step.image ? (
                <Image
                    src={getImgUrlPath(step.image)}
                    alt={`Шаг ${index + 1}`}
                    maxH='140px'
                    maxW='100%'
                    objectFit='contain'
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
            />
            <Icon as={BsTrash} color='red.400' cursor='pointer' ml='auto' onClick={onRemove} />
        </VStack>
    </Flex>
);
