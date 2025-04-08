import { Search2Icon } from '@chakra-ui/icons';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';

export const MobileSearchButton = () => (
    <ButtonGroup flexDirection='column' alignItems='center' spacing={0}>
        <IconButton
            width='40px'
            height='40px'
            aria-label='Записать'
            icon={<Search2Icon w={6} h={6} />}
            variant='ghost'
        ></IconButton>
        <Button size='xs' variant='ghost' color='blackAlpha.700' fontWeight='normal'>
            Записать
        </Button>
    </ButtonGroup>
);
