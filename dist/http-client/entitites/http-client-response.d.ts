export declare class HttpClientResponse {
    private readonly statusCode;
    private readonly data;
    constructor(statusCode: number, data: unknown);
    getData<TResponse>(DataType: ClassType<TResponse>): TResponse;
    getArrayData<TResponse>(DataType: ClassType<TResponse>): TResponse[];
    hasStatus(status: number): boolean;
}
type ClassType<T> = new (...args: any[]) => T;
export {};
