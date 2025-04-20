import { Card, CardBody, Flex, Image, Tag, Text } from '@chakra-ui/react';

import { StepType } from '~/entities/Recipe/model/types';

interface CookingStepsProps {
    steps: StepType[];
}

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
            {steps.map(({ image, stepNumber, description }) => (
                <Card direction='row' overflow='hidden'>
                    {image ? (
                        <Image
                            src={image}
                            width={{ base: '158px', lg: '346px' }}
                            height={{ base: '128px', lg: '244px' }}
                        />
                    ) : null}
                    <CardBody>
                        <Tag>Шаг {stepNumber}</Tag>
                        <Text marginTop={{ base: '12px', lg: '16px' }}>{description}</Text>
                    </CardBody>
                </Card>
            ))}
        </Flex>
    </>
);
