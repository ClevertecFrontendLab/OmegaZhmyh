import { useGetCategoriesQuery, useGetTheJuiciestRecipeQuery } from '~/shared/api/yeedaaApi';
import { ErrorAlert } from '~/widgets/ErrorAlert';
import { FullscreenSpinner } from '~/widgets/fullScreenSpiner';

export const AppLoader = ({ children }: { children: React.ReactNode }) => {
    const categories = useGetCategoriesQuery();
    const recipes = useGetTheJuiciestRecipeQuery(1);

    const isLoading = categories.isLoading || recipes.isLoading;
    const isError = categories.isError || recipes.isError;

    if (isLoading) return <FullscreenSpinner />;
    if (isError) return <ErrorAlert />;

    return <>{children}</>;
};
