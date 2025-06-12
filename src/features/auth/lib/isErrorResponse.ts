import { ErrorResponse } from '../model/auth.types';

export const isErrorResponse = (error: unknown): error is ErrorResponse =>
    typeof error === 'object' && error !== null && 'status' in error;
