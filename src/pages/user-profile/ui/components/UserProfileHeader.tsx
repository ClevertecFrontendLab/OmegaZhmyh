import { Avatar, Flex, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { formatAccountLogin, formatFullName } from '~/entities/user';
import { ROUTES } from '~/shared/config';
import { BsBookmarkHeart, BsGearFill, BsPeople } from '~/shared/ui/icon';
import { StatWithIcon } from '~/shared/ui/stat-with-icon';

type UserProfileHeaderProps = {
    firstName: string;
    lastName: string;
    login: string;
    totalBookmarks: number;
    totalSubscribers: number;
    totalRecipes: number;
    totalDrafts: number;
    avatar?: string;
};

export const UserProfileHeader = ({
    avatar,
    firstName,
    lastName,
    login,
    totalBookmarks,
    totalSubscribers,
    totalRecipes,
    totalDrafts,
}: UserProfileHeaderProps) => (
    <>
        <Flex position='relative' w='100%' flexDir={{ base: 'column', md: 'row' }} gap='24px'>
            <Avatar
                size={{ base: 'xl', lg: '2xl' }}
                src={avatar}
                name={formatFullName(firstName, lastName)}
            />
            <VStack alignItems={{ base: 'center', md: 'flex-start' }} gap='12px'>
                <Text fontSize={{ base: '2xl', lg: '5xl' }} fontWeight='bold' lineHeight='none'>
                    {formatFullName(firstName, lastName)}
                </Text>
                <Text fontSize='sm' color='blackAlpha.700'>
                    {formatAccountLogin(login)}
                </Text>
                <HStack>
                    <StatWithIcon icon={<BsBookmarkHeart />} value={totalBookmarks} />
                    <StatWithIcon icon={<BsPeople />} value={totalSubscribers} />
                </HStack>
            </VStack>
            <IconButton
                as={Link}
                to={ROUTES.USER_SETTINGS}
                position='absolute'
                right='0'
                top='0'
                variant='ghost'
                icon={<BsGearFill boxSize='24px' />}
                aria-label='Settings'
            />
        </Flex>
        <HStack fontSize={{ base: 'lg', lg: 'xl' }} mt={{ base: '24px', md: '16px', lg: '40px' }}>
            <HStack gap={{ base: '4px', lg: '8px' }}>
                <Text fontWeight='bold'>Мои рецепты</Text>
                <Text color='blackAlpha.600'>({totalRecipes})</Text>
            </HStack>
            <HStack gap={{ base: '4px', lg: '8px' }}>
                <Text fontWeight='bold'>Черновики</Text>
                <Text color='blackAlpha.600'>({totalDrafts})</Text>
            </HStack>
        </HStack>
    </>
);
