import { Button, Icon } from '@chakra-ui/react';

import { BsPersonPlusFill } from '~/shared/ui/icon';

import { SupscriptionRequest, useGetSupscriptionMutation } from '../api/supscription';

export const SubscribeButton = ({ fromUserId, toUserId }: SupscriptionRequest) => {
    const [getSupscription] = useGetSupscriptionMutation();

    const handleSubscribe = () => {
        getSupscription({ fromUserId, toUserId });
    };

    return (
        <Button
            leftIcon={<Icon as={BsPersonPlusFill} />}
            size='xs'
            variant='solid'
            bgColor='black'
            color='white'
            onClick={handleSubscribe}
        >
            Подписаться
        </Button>
    );
};
