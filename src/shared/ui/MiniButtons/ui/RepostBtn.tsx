import RepostIcon from '~/shared/assets/btn-icons/repost-icon.svg';

import { MiniBtn } from './MiniBtn';

interface RepostBtnProps {
    value?: number;
}

export const RepostBtn = ({ value = 0 }: RepostBtnProps) => (
    <MiniBtn icon={RepostIcon} value={value} />
);
