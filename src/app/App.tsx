import './App.css';

import { Outlet } from 'react-router';

import { useGetCategoriesQuery } from '~/shared/api/yeedaaApi';
import { SnackbarAlert } from '~/shared/ui/SnackbarAlert';
import { FullscreenSpinner } from '~/widgets/fullScreenSpiner';

function App() {
    useGetCategoriesQuery();
    return (
        <>
            <FullscreenSpinner />
            <SnackbarAlert />
            <Outlet />
        </>
    );
}

export default App;
