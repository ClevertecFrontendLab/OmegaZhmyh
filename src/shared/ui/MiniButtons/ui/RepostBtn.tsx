import { BsPeopleFill } from '../../Icons';
import { MiniBtn, MiniBtnProps } from './MiniBtn';

type RepostBtnProps = Omit<MiniBtnProps, 'icon'> & {
    value: number;
};

export const RepostBtn = ({ value = 0, ...othersProps }: RepostBtnProps) => (
    <MiniBtn {...othersProps} icon={<BsPeopleFill color='black' />} value={value} />
);
