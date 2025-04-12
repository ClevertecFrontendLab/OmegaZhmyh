import { SearchIcon } from '@chakra-ui/icons';
import {
    Flex,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Switch,
    Text,
} from '@chakra-ui/react';

import { BsFilter } from '~/shared/ui/Icons';

interface SearchPanelProps {
    title: string;
    desc?: string;
}

export const SearchPanel = ({ title, desc }: SearchPanelProps) => (
    <Flex marginTop={{ base: '16px', lg: '32px' }} flexDirection='column' alignItems='center'>
        <Heading textAlign='center' fontSize={{ base: '2xl', lg: '5xl' }}>
            {title}
        </Heading>
        {desc ? (
            <Text color='blackAlpha.600' marginTop='12px' textAlign='center' maxWidth='696px'>
                {desc}
            </Text>
        ) : null}
        <Flex
            marginTop={{ base: '16px', lg: '32px' }}
            padding={0}
            flexDirection='column'
            width={{ base: '100%', md: '450px', lg: '520px' }}
        >
            <Flex gap={3}>
                <IconButton
                    aria-label='Search database'
                    minWidth={{ base: '32px', lg: '48px' }}
                    height={{ base: '32px', lg: '48px' }}
                    variant='outline'
                    icon={<BsFilter boxSize={{ base: '14px', lg: '24px' }} />}
                    borderColor='blackAlpha.600'
                />
                <InputGroup borderColor='blackAlpha.600' size={{ base: 'sm', lg: 'lg' }}>
                    <Input
                        color='lime.800'
                        focusBorderColor='lime.300'
                        fontSize={{ base: '14px', lg: '18px' }}
                        borderRadius={4}
                        placeholder='Название или ингредиент...'
                        _placeholder={{ color: 'lime.800', fontSize: { md: '14px', lg: '18px' } }}
                    />
                    <InputRightElement>
                        <IconButton
                            aria-label='Search database'
                            variant='ghost'
                            icon={<SearchIcon />}
                        />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <Flex gap={4} marginTop={4} marginBottom={4} display={{ base: 'none', lg: 'flex' }}>
                <Flex gap={3} flexGrow={1} paddingLeft='8px' alignItems='center'>
                    <Text style={{ textWrap: 'nowrap' }} fontWeight='medium'>
                        Исключить мои аллергены
                    </Text>
                    <Switch colorScheme='lime' />
                </Flex>
                <Select
                    placeholder='Выберите из списка'
                    focusBorderColor='lime.300'
                    color='blackAlpha.700'
                >
                    <option value='option1'>Молочные продукты</option>
                    <option value='option2'>Яйцо</option>
                    <option value='option3'>Рыба</option>
                    <option value='option4'>Моллюски</option>
                    <option value='option5'>Орехи</option>
                    <option value='option6'>Томат (помидор)</option>
                    <option value='option7'>Цитрусовые</option>
                    <option value='option8'>Клубника (ягоды)</option>
                    <option value='option9'>Шоколад</option>
                </Select>
            </Flex>
        </Flex>
    </Flex>
);
