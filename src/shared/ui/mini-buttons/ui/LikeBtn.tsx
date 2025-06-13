import { BsEmojiHeartEyes } from '../../icon';
import { MiniBtn, MiniBtnProps } from './MiniBtn';

type LikeBtnProps = Omit<MiniBtnProps, 'icon'> & {
    value?: number;
};

export const LikeBtn = ({ value = 0, ...othersProps }: LikeBtnProps) => (
    <MiniBtn {...othersProps} icon={<BsEmojiHeartEyes color='black' />} value={value} />
);
