import RepostIcon from '~/shared/assets/btn-icons/repost-icon.svg';

import { MiniBtn, MiniBtnProps } from './MiniBtn';

interface RepostBtnProps extends Omit<MiniBtnProps, 'icon'> {
    value?: number;
}

export const RepostBtn = ({ value = 0, ...othersProps }: RepostBtnProps) => (
    <MiniBtn {...othersProps} icon={RepostIcon} value={value} />
);
