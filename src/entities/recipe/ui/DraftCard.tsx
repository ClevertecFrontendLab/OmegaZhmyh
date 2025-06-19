import { Button, HStack, Tag } from '@chakra-ui/react';
import { Link } from 'react-router';

import { BUTTON_VARIANT } from '~/shared/config';

import { BaseCard } from './BaseCard';

type DraftCardProps = {
    image: string;
    title: string;
    description: string;
    id: string;
};

export const DraftCard = ({ image, title, description, id }: DraftCardProps) => (
    <BaseCard
        image={image}
        title={title}
        description={description}
        cardHeader={
            <HStack justifyContent='flex-end'>
                <Tag>Черновик</Tag>
            </HStack>
        }
        actions={
            <Button
                as={Link}
                to={`/edit-draft/${id}`}
                variant={BUTTON_VARIANT.BLACK_SOLID}
                size={{ base: 'xs', lg: 'sm' }}
            >
                Редактировать
            </Button>
        }
    />
);
