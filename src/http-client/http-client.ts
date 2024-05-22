import axios, { AxiosError, AxiosInstance } from "axios";
import { HttpClientRequest } from "./entitites/http-client-request";
import { HttpClientResponse } from "./entitites/http-client-response";
import { ApiResponse } from "./entitites/api-response";
import { toast } from "react-toastify";

export default class HttpClient {

  private static instance: HttpClient;

  private client: AxiosInstance;

  private constructor(baseURL?: string){
    this.client = axios.create({
      baseURL
    })
  }

  private handleErrorWithToast(message: string[]): void {
      toast.error(
       message
          .map((message: string) => message)
          .join('\n'),
      );
  }

  private handleError(error: AxiosError): void {
    if (error.response?.data) {
      this.handleErrorWithToast((error.response?.data as {message: string[]}).message);
    }
  }

  public static getInstance(baseURL?: string): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(baseURL);
    }
    return HttpClient.instance;
  }

  public setAuthorization(token: string): void {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  public async request(
    {method, path, data, headers, params}: HttpClientRequest,
  ): Promise<HttpClientResponse | undefined> {
    try {
      const response = await this.client.request<ApiResponse<unknown>>({
        url: path,
        method: method,
        data: data,
        params: params,
        headers: headers,
      });
      return new HttpClientResponse(response.status, response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        this.handleError(error);
        throw error;
      }
    }
  }
}