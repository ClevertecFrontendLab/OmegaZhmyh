import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { setError } from '~/shared/ui/SnackbarAlert';

type UseErrorAlertProps = {
    errorTitle: string;
    errorMessage: string;
    redirectBack?: boolean;
};

export const useErrorAlert = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleError = ({
        errorTitle,
        errorMessage,
        redirectBack = false,
    }: UseErrorAlertProps) => {
        dispatch(setError({ title: errorTitle, message: errorMessage }));
        if (redirectBack) {
            navigate(-1);
        }
    };

    return { handleError };
};
