import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { setError } from '~/shared/store/notificationSlice';

type UseErrorAlertProps = {
    errorTitle: string;
    errorMessage?: string;
    redirectBack?: boolean;
    status?: 'success' | 'error';
};

export const useErrorAlert = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleError = ({
        errorTitle,
        errorMessage,
        redirectBack = false,
        status,
    }: UseErrorAlertProps) => {
        dispatch(setError({ title: errorTitle, message: errorMessage, status }));
        if (redirectBack) {
            navigate(-1);
        }
    };

    return { handleError };
};
