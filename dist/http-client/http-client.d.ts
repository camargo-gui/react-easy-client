import { AxiosError } from "axios";
import { HttpClientRequest } from "./entitites/http-client-request";
import { HttpClientResponse } from "./entitites/http-client-response";
export default class HttpClient {
    private static instance;
    private client;
    private customizedErrorHandling;
    private constructor();
    private handleErrorWithToast;
    private handleError;
    static getInstance(baseURL?: string): HttpClient;
    setAuthorization(token: string): void;
    setCustomizedErrorHandling(customizedErrorHandling: (error: AxiosError) => void): void;
    request({ method, path, data, headers, params }: HttpClientRequest): Promise<HttpClientResponse | undefined>;
}
