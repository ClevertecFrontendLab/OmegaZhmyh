import { BsBookmarkHeart } from '../../Icons';
import { MiniBtn, MiniBtnProps } from './MiniBtn';

type BookmarkBtnProps = Omit<MiniBtnProps, 'icon'> & {
    value?: number;
};

export const BookmarkBtn = ({ value = 0, ...othersProps }: BookmarkBtnProps) => (
    <MiniBtn value={value} {...othersProps} icon={<BsBookmarkHeart color='black' />} />
);
