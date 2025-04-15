import {
    Box,
    Button,
    Card,
    CardBody,
    Grid,
    Heading,
    HStack,
    Image,
    NumberInput,
    Square,
    Table,
    TableContainer,
    Tag,
    TagLabel,
    TagLeftIcon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack,
} from '@chakra-ui/react';

import { DishesImages } from '~/shared/ui/DishesImages';
import { BsAlarm, BsBookmarkHeart, BsEmojiHeartEyes } from '~/shared/ui/Icons';
import { KitchenTag } from '~/shared/ui/KitchenTag';
import { UserCard } from '~/shared/ui/UserCard';
import { NewRecipes } from '~/widgets/NewRecipes';

/* interface RecipePageProps {
    className?: string;
} */

// eslint-disable-next-line arrow-body-style
export const RecipePage = () => {
    const image = DishesImages['SpaghettiRollImg'];
    return (
        <>
            <Grid templateColumns='5fr 7fr' gap='24px'>
                <Image src={image} width='410px' />
                <VStack>
                    <HStack>
                        <KitchenTag type='Вторые блюда' />
                        <KitchenTag type='Национальные' />
                        <KitchenTag type='Детские блюда' />
                    </HStack>
                    <Heading>Лапша с курицей и шафраном</Heading>
                    <Text>
                        Как раз после праздников, когда мясные продукты еще остались, но никто их
                        уже не хочет, время варить солянку.
                    </Text>
                    <HStack>
                        <Tag>
                            <TagLeftIcon as={BsAlarm}></TagLeftIcon>
                            <TagLabel>20 минут</TagLabel>
                        </Tag>
                        <Button leftIcon={<BsEmojiHeartEyes />}>Оценить рецепт</Button>
                        <Button leftIcon={<BsBookmarkHeart />}>Сохранить в закладки</Button>
                    </HStack>
                </VStack>
            </Grid>
            <VStack>
                <Text>* Калорийность на 1 порцию</Text>
                <HStack>
                    <Square>
                        <VStack>
                            <Text>калорийность</Text>
                            <Text>358</Text>
                            <Text>ККАЛ</Text>
                        </VStack>
                    </Square>
                    <Square>
                        <VStack>
                            <Text>белки</Text>
                            <Text>23</Text>
                            <Text>ГРАММ</Text>
                        </VStack>
                    </Square>
                    <Square>
                        <VStack>
                            <Text>жиры</Text>
                            <Text>20</Text>
                            <Text>ГРАММ</Text>
                        </VStack>
                    </Square>
                    <Square>
                        <VStack>
                            <Text>углеводы</Text>
                            <Text>23</Text>
                            <Text>ГРАММ</Text>
                        </VStack>
                    </Square>
                </HStack>
                <TableContainer>
                    <Table variant='striped' colorScheme='teal'>
                        <Thead>
                            <Tr>
                                <Th>ИНГРЕДИЕНТЫ</Th>
                                <Th isNumeric>
                                    ПОРЦИЙ
                                    <NumberInput />
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>зелёного лука</Td>
                                <Td isNumeric>25.4</Td>
                            </Tr>
                            <Tr>
                                <Td>репчатого лука</Td>
                                <Td isNumeric>30.48</Td>
                            </Tr>
                            <Tr>
                                <Td>чеснока</Td>
                                <Td isNumeric>0.91444</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
                <Text>Шаги приготовления</Text>
                <Card>
                    <Image src={image} />
                    <CardBody>
                        <Tag>Шаг 1</Tag>
                        <Text>
                            Зелёный лук нарезать на 1 см. кружочки. Лук и чеснок на мелкие кубики.{' '}
                        </Text>
                    </CardBody>
                </Card>
                <Box>
                    <UserCard
                        accountName='@serge25'
                        avatarImg='AlexCookImg'
                        userName='Сергей Разумов'
                    />
                </Box>
                <NewRecipes />
            </VStack>
        </>
    );
};
