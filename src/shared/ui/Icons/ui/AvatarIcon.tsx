import { Icon } from '@chakra-ui/icons';

import AvatarImg from '~/shared/assets/avatar.png';

export const AvatarIcon = ({ ...props }) => (
    <Icon viewBox='0 0 16 16' {...props}>
        <img src={AvatarImg} />
    </Icon>
);
