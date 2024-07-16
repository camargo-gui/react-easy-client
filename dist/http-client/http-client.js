"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importStar(require("axios"));
const http_client_response_1 = require("./entitites/http-client-response");
const react_toastify_1 = require("react-toastify");
class HttpClient {
    constructor(baseURL) {
        this.customizedErrorHandling = () => { };
        this.client = axios_1.default.create({
            baseURL
        });
    }
    handleErrorWithToast(message) {
        react_toastify_1.toast.error(message
            .map((message) => message)
            .join('\n'));
    }
    handleError(error) {
        var _a, _b;
        if ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) {
            this.handleErrorWithToast(((_b = error.response) === null || _b === void 0 ? void 0 : _b.data).message);
        }
    }
    static getInstance(baseURL) {
        if (!HttpClient.instance) {
            HttpClient.instance = new HttpClient(baseURL);
        }
        return HttpClient.instance;
    }
    setAuthorization(token) {
        this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setCustomizedErrorHandling(customizedErrorHandling) {
        this.customizedErrorHandling = customizedErrorHandling;
    }
    request({ method, path, data, headers, params }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.request({
                    url: path,
                    method: method,
                    data: data,
                    params: params,
                    headers: headers,
                });
                return new http_client_response_1.HttpClientResponse(response.status, response.data);
            }
            catch (error) {
                if (this.customizedErrorHandling) {
                    this.customizedErrorHandling();
                }
                else if (error instanceof axios_1.AxiosError) {
                    this.handleError(error);
                    throw error;
                }
            }
        });
    }
}
exports.default = HttpClient;
