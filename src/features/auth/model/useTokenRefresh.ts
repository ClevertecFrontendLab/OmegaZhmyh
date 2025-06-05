import { useEffect, useRef } from 'react';

import { useAppDispatch } from '~/shared/store/hooks';

import { useRefreshTokenMutation } from '../api/authApi';
import { getTokenExpirationTime } from '../lib/token';
import { logout } from '../model/authSlice';

const REFRESH_THRESHOLD = 1000 * 60 * 5;

export const useTokenRefresh = () => {
    const dispatch = useAppDispatch();
    const [refreshToken] = useRefreshTokenMutation();
    const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const scheduleTokenRefresh = (token: string) => {
        if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
        }

        const expirationTime = getTokenExpirationTime(token);
        if (!expirationTime) return;

        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        if (timeUntilExpiration <= REFRESH_THRESHOLD) {
            refreshTokenNow();
        } else {
            const timeUntilRefresh = timeUntilExpiration - REFRESH_THRESHOLD;
            refreshTimeoutRef.current = setTimeout(refreshTokenNow, timeUntilRefresh);
        }
    };

    const refreshTokenNow = async () => {
        try {
            await refreshToken().unwrap();
        } catch {
            dispatch(logout());
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            scheduleTokenRefresh(token);
        }

        return () => {
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }
        };
    }, []);

    return {
        refreshTokenNow,
    };
};
