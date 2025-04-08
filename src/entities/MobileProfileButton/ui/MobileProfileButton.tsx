import { Avatar, Button, ButtonGroup, IconButton } from '@chakra-ui/react';

import AvatarImg from '~/shared/assets/avatar.png';

export const MobileProfileButton = () => (
    <ButtonGroup flexDirection='column' alignItems='center' spacing={0}>
        <IconButton
            width='40px'
            height='40px'
            aria-label='Записать'
            icon={<Avatar name='Segun Adebayo' src={AvatarImg} />}
            variant='ghost'
        ></IconButton>
        <Button size='xs' variant='ghost' color='blackAlpha.700' fontWeight='normal'>
            Записать
        </Button>
    </ButtonGroup>
);
