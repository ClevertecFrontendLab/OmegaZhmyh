import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Image,
    Stack,
    Tag,
    Text,
} from '@chakra-ui/react';

import { BookmarkBtn, LikeBtn } from '~/shared/ui/MiniButtons';

interface RecipeCardProps {
    img: string;
}

export const RecipeCard = ({ img }: RecipeCardProps) => (
    <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
        <Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={img} alt='Caffe Latte' />

        <Stack>
            <CardHeader>
                <Flex>
                    <Tag>Вторые блюда</Tag>
                    <BookmarkBtn />
                    <LikeBtn />
                </Flex>
            </CardHeader>
            <CardBody>
                <Heading size='md'>Кнели со спагетти</Heading>

                <Text py='2'>
                    Как раз после праздников, когда мясные продукты еще остались, но никто их уже не
                    хочет, время варить солянку.
                </Text>
            </CardBody>

            <CardFooter>
                <Button variant='solid' colorScheme='blue'>
                    Сохранить
                </Button>
                <Button variant='solid' colorScheme='blue'>
                    Готовить
                </Button>
            </CardFooter>
        </Stack>
    </Card>
);
