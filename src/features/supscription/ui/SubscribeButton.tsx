import { Button, Icon, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';

import { AppSpiner } from '~/shared/ui/app-spiner';
import { BsPersonCheck, BsPersonPlusFill } from '~/shared/ui/icon';

import { SupscriptionRequest, useGetSupscriptionMutation } from '../api/supscription';

const TOOLTIP_TEXT = {
    subscribe: 'Нажмите, если хотите подписаться',
    unsubscribe: 'Нажмите, если хотите отписаться',
};

const TOGGLE_SUBSCRIPTION_RESPONSE_TEXT = {
    SUBSCRIBED: 'Подписка выполнена успешно',
    UNSUBSCRIBED: 'Отписка выполнена успешно',
};

type SubscribeButtonProps = SupscriptionRequest & {
    isFavorite?: boolean;
};

export const SubscribeButton = ({
    fromUserId,
    toUserId,
    isFavorite = false,
}: SubscribeButtonProps) => {
    const [isSubscribed, setIsSubscribed] = useState(isFavorite);
    const [getSupscription, { isLoading }] = useGetSupscriptionMutation();

    const handleSubscribe = async () => {
        if (fromUserId && toUserId) {
            const result = await getSupscription({ fromUserId, toUserId });
            if (result.data?.message === TOGGLE_SUBSCRIPTION_RESPONSE_TEXT.SUBSCRIBED) {
                setIsSubscribed(true);
            } else if (result.data?.message === TOGGLE_SUBSCRIPTION_RESPONSE_TEXT.UNSUBSCRIBED) {
                setIsSubscribed(false);
            }
        }
    };

    return (
        <>
            {isLoading && (
                <AppSpiner
                    position='absolute'
                    top='50%'
                    left='50%'
                    transform='translate(-50%, -50%)'
                    dataTestId='mobile-loader'
                />
            )}
            <Tooltip
                label={TOOLTIP_TEXT[isFavorite ? 'unsubscribe' : 'subscribe']}
                placement='top'
                data-test-id='blog-tooltip'
            >
                <Button
                    leftIcon={
                        isFavorite ? <Icon as={BsPersonCheck} /> : <Icon as={BsPersonPlusFill} />
                    }
                    size='xs'
                    variant={isFavorite ? 'outline' : 'solid'}
                    bgColor={isFavorite ? 'white' : 'black'}
                    color={isFavorite ? 'black' : 'white'}
                    onClick={handleSubscribe}
                    data-test-id={isFavorite ? 'blog-toggle-unsubscribe' : 'blog-toggle-subscribe'}
                >
                    {isSubscribed ? 'Вы подписаны' : 'Подписаться'}
                </Button>
            </Tooltip>
        </>
    );
};
