import LikeIcon from '~/shared/assets/btn-icons/like-icon-2.svg';

import { MiniBtn } from './MiniBtn';

interface LikeBtnProps {
    value?: number;
}

export const LikeBtn = ({ value = 0 }: LikeBtnProps) => <MiniBtn icon={LikeIcon} value={value} />;
