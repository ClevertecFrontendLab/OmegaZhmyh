import { Button, HStack, Tag } from '@chakra-ui/react';
import { Link } from 'react-router';

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
                variant='solid'
                bgColor='black'
                color='white'
            >
                Редактировать
            </Button>
        }
    />
);
