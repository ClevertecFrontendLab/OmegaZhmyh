import {
    Box,
    Card,
    CardBody,
    Heading,
    Highlight,
    HStack,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';

import { getImgUrlPath } from '~/shared/lib';

type BaseCardProps = {
    image: string;
    title: string;
    description: string;
    highlightQuery?: string;
    imageBox?: React.ReactNode;
    cardHeader?: React.ReactNode;
    actions?: React.ReactNode;
};

export const BaseCard = ({
    image,
    highlightQuery,
    title,
    description,
    imageBox,
    cardHeader,
    actions,
}: BaseCardProps) => (
    <Card direction='row' variant='outline' overflow='hidden' borderRadius='8px'>
        <Box position='relative'>
            <Image
                objectFit='cover'
                src={getImgUrlPath(image)}
                alt='Caffe Latte'
                width={{ base: '158px', lg: '346px' }}
                height={{ base: '128px', lg: '244px' }}
            />
            {imageBox}
        </Box>

        <CardBody padding={{ base: '8px 8px 4px 24px', lg: '20px 24px' }}>
            <VStack
                spacing={{ lg: 6 }}
                align='stretch'
                justifyContent='space-between'
                height='100%'
            >
                <Box>
                    {cardHeader}

                    <Heading
                        marginTop={{ lg: '24px' }}
                        fontSize={{ lg: 'xl', base: 'md' }}
                        fontWeight='medium'
                        noOfLines={{ lg: 1, base: 2 }}
                        flexGrow={{ lg: '0', base: '1' }}
                        wordBreak='break-all'
                        style={{ wordWrap: 'break-word' }}
                    >
                        {highlightQuery ? (
                            <Highlight query={highlightQuery} styles={{ bgColor: 'lime.150' }}>
                                {title}
                            </Highlight>
                        ) : (
                            title
                        )}
                    </Heading>
                    <Box display={{ lg: 'block', base: 'none' }}>
                        <Text
                            marginTop='1.5'
                            noOfLines={3}
                            fontSize='sm'
                            wordBreak='break-all'
                            style={{ wordWrap: 'break-word' }}
                        >
                            {description}
                        </Text>
                    </Box>
                </Box>

                <HStack justifyContent='end' spacing={2}>
                    {actions}
                </HStack>
            </VStack>
        </CardBody>
    </Card>
);
