import { Box, Card, CardBody, Flex, Image, Tag, Text } from '@chakra-ui/react';

import { StepType } from '~/entities/Recipe/types';
import { getImgUrlPath } from '~/shared/utils/getUrlPath';

type CookingStepsProps = {
    steps: StepType[];
};

export const CookingSteps = ({ steps }: CookingStepsProps) => (
    <>
        <Text
            marginTop={{ base: '24px', lg: '40px' }}
            marginBottom='20px'
            fontSize={{ base: '2xl', lg: '5xl' }}
            fontWeight='medium'
        >
            Шаги приготовления
        </Text>
        <Flex flexDirection='column' gap='20px'>
            {steps.map(({ image, stepNumber, description }, index) => (
                <Card direction='row' height={{ base: '128px', lg: '244px' }} key={stepNumber}>
                    {image ? (
                        <Image
                            src={getImgUrlPath(image)}
                            width={{ base: '158px', lg: '346px' }}
                            height={{ base: '128px', lg: '244px' }}
                        />
                    ) : null}
                    <CardBody padding={{ base: '8px', lg: '24px' }} overflow='hidden'>
                        <Tag bgColor={index === steps.length - 1 ? 'lime.50' : 'blackAlpha.100'}>
                            Шаг {stepNumber}
                        </Tag>
                        <Box marginTop={{ base: '12px', lg: '16px' }}>{description}</Box>
                    </CardBody>
                </Card>
            ))}
        </Flex>
    </>
);
