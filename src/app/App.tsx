import './App.css';

import { SnackbarAlert } from '~/shared/ui/SnackbarAlert';
import { FullscreenSpinner } from '~/widgets/fullScreenSpiner';

import { AppRoutes } from './AppRoutes';

function App() {
    return (
        <>
            <FullscreenSpinner />
            <SnackbarAlert />
            <AppRoutes />
        </>
    );
}

export default App;
