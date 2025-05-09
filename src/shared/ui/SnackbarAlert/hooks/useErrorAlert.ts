import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { setError } from '~/shared/ui/SnackbarAlert';

type UseErrorAlertProps = {
    errorTitle: string;
    errorMessage: string;
    redirectPath?: string | number;
};

export const useErrorAlert = ({
    errorTitle,
    errorMessage,
    redirectPath = -1,
}: UseErrorAlertProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleError = (isError: boolean) => {
        if (isError) {
            dispatch(setError({ title: errorTitle, message: errorMessage }));
            if (typeof redirectPath === 'number') {
                navigate(redirectPath);
            } else {
                navigate(redirectPath as string);
            }
        }
    };

    return { handleError };
};
