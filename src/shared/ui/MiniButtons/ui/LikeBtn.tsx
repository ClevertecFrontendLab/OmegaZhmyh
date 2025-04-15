import { BsEmojiHeartEyes } from '../../Icons';
import { MiniBtn, MiniBtnProps } from './MiniBtn';

interface LikeBtnProps extends Omit<MiniBtnProps, 'icon'> {
    value?: number;
}

export const LikeBtn = ({ value = 0, ...othersProps }: LikeBtnProps) => (
    <MiniBtn {...othersProps} icon={<BsEmojiHeartEyes color='black' />} value={value} />
);
