import { Button, Icon, Tooltip } from '@chakra-ui/react';

import { AppSpiner } from '~/shared/ui/app-spiner';
import { BsPersonCheck, BsPersonPlusFill } from '~/shared/ui/icon';

import { SupscriptionRequest, useGetSupscriptionMutation } from '../api/supscription';

const TOOLTIP_TEXT = {
    subscribe: 'Нажмите, если хотите подписаться',
    unsubscribe: 'Нажмите, если хотите отписаться',
};

/* const TOGGLE_SUBSCRIPTION_RESPONSE_TEXT = {
    SUBSCRIBED: 'Подписка выполнена успешно',
    UNSUBSCRIBED: 'Отписка выполнена успешно',
} as const; */

type SubscribeButtonProps = SupscriptionRequest & {
    isFavorite?: boolean;
};

export const SubscribeButton = ({ fromUserId, toUserId, isFavorite }: SubscribeButtonProps) => {
    const [getSupscription, { isLoading }] = useGetSupscriptionMutation();

    const handleSubscribe = () => {
        if (fromUserId && toUserId) {
            getSupscription({ fromUserId, toUserId });
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
                {isFavorite ? (
                    <Button
                        leftIcon={<Icon as={BsPersonCheck} />}
                        size='xs'
                        variant='outline'
                        bgColor='white'
                        color='black'
                        onClick={handleSubscribe}
                        data-test-id='blog-toggle-unsubscribe'
                    >
                        Вы подписаны
                    </Button>
                ) : (
                    <Button
                        leftIcon={<Icon as={BsPersonPlusFill} />}
                        size='xs'
                        variant='solid'
                        bgColor='black'
                        color='white'
                        onClick={handleSubscribe}
                        data-test-id='blog-toggle-subscribe'
                    >
                        Подписаться
                    </Button>
                )}
            </Tooltip>
        </>
    );
};
