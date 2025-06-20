import { useGetBloggerByIdQuery } from '~/entities/cooking-blog';
import { useGetUserQuery } from '~/entities/user/';
import { UserCard } from '~/entities/user/';
import { selectUserId } from '~/features/auth';
import { useAppSelector } from '~/shared/store';

export const UserProfileCard = () => {
    const userId = useAppSelector(selectUserId);
    const { data: userData } = useGetUserQuery();
    const { data: blogerData } = useGetBloggerByIdQuery({
        bloggerId: userId as string,
        currentUserId: userId as string,
    });

    return (
        <UserCard
            firstName={userData?.firstName ?? ''}
            lastName={userData?.lastName ?? ''}
            login={userData?.login ?? ''}
            avatarImg={blogerData?.bloggerInfo?.photoLink ?? ''}
        />
    );
};
