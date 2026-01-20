export interface ApiErrorResponse {
    code: number;
    message: string;
    errors?: Record<string, string[]>;
}