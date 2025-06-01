import './App.css';

import { Outlet } from 'react-router';

import { SnackbarAlert } from '~/shared/ui/SnackbarAlert';
import { FullscreenSpinner } from '~/widgets/fullScreenSpiner';

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
