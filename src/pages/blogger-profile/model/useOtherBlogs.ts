import { useGetAllBloggersQuery } from '~/entities/cooking-blog';

export const useOtherBlogs = (currentUserId: string) => {
    const { data: blogs, isLoading: isLoadingBlogs } = useGetAllBloggersQuery(
        {
            currentUserId: currentUserId as string,
            limit: '',
        },
        { skip: !currentUserId },
    );

    return { otherBlogs: blogs?.others ?? [], isLoadingBlogs };
};
