import { Action, Middleware } from '@reduxjs/toolkit';

import { ApplicationState } from '~/shared/store/configure-store';

export type TokenPayload = {
    exp: number;
    iat: number;
    userId: string;
    login: string;
};

export type TokenMiddlewareConfig = {
    refreshThreshold: number;
    checkInterval: number;
};

export type TokenMiddleware = Middleware<(action: Action) => Action, ApplicationState>;
