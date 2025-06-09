import './App.css';

import { Outlet } from 'react-router';

import { SnackbarAlert } from '~/shared/ui/alert';
import { FullscreenSpinner } from '~/widgets/fullscreen-spinner';

function App() {
    return (
        <>
            <FullscreenSpinner />
            <SnackbarAlert />
            <Outlet />
        </>
    );
}

export default App;
