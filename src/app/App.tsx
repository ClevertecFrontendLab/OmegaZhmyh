import './App.css';

import { useGetCategoriesQuery } from '~/shared/api/yeedaaApi';
import { SnackbarAlert } from '~/shared/ui/SnackbarAlert';
import { FullscreenSpinner } from '~/widgets/fullScreenSpiner';

import { AppRoutes } from './AppRoutes';

function App() {
    useGetCategoriesQuery();

    return (
        <>
            <FullscreenSpinner />
            <SnackbarAlert />
            <AppRoutes />
        </>
    );
}

export default App;
