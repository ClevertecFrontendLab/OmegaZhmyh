import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode(token);
        const expirationTime = (decoded.exp ?? 0) * 1000;
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        return timeUntilExpiration < 5 * 60 * 1000;
    } catch {
        return true;
    }
};

export const getTokenExpirationTime = (token: string): number | null => {
    try {
        const decoded = jwtDecode(token);
        return (decoded.exp ?? 0) * 1000;
    } catch {
        return null;
    }
};
