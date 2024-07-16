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
    setCustomizedErrorHandling(customizedErrorHandling: () => void): void;
    request({ method, path, data, headers, params }: HttpClientRequest): Promise<HttpClientResponse | undefined>;
}
