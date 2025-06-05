import './App.css';

import { Outlet } from 'react-router';

import { useTokenRefresh } from '~/features/auth';
import { SnackbarAlert } from '~/shared/ui/alert';
import { FullscreenSpinner } from '~/widgets/fullscreen-spinner';

function App() {
    useTokenRefresh();

    return (
        <>
            <FullscreenSpinner />
            <SnackbarAlert />
            <Outlet />
        </>
    );
}

export default App;
