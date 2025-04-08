import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';

import { BsHouse } from '~/shared/ui/Icons';

export const MobileMainButton = () => (
    <ButtonGroup flexDirection='column' alignItems='center' spacing={0}>
        <IconButton
            width='40px'
            height='40px'
            bgColor='black'
            color='lime.50'
            aria-label='Главная'
            isRound={true}
            icon={<BsHouse />}
        ></IconButton>
        <Button size='xs' variant='ghost'>
            Главная
        </Button>
    </ButtonGroup>
);
