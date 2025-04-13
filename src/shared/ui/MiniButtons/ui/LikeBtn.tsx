import LikeIcon from '~/shared/assets/btn-icons/like-icon-2.svg';

import { MiniBtn, MiniBtnProps } from './MiniBtn';

interface LikeBtnProps extends Omit<MiniBtnProps, 'icon'> {
    value?: number;
}

export const LikeBtn = ({ value = 0, ...othersProps }: LikeBtnProps) => (
    <MiniBtn {...othersProps} icon={LikeIcon} value={value} />
);
