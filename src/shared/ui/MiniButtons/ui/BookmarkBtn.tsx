import BookmarkIcon from '~/shared/assets/btn-icons/bookmark-icon.svg';

import { MiniBtn } from './MiniBtn';

interface BookmarkBtnProps {
    value?: number;
}

export const BookmarkBtn = ({ value = 0 }: BookmarkBtnProps) => (
    <MiniBtn icon={BookmarkIcon} value={value} />
);
