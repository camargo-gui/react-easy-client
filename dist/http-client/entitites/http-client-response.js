"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClientResponse = void 0;
const class_transformer_1 = require("class-transformer");
class HttpClientResponse {
    constructor(statusCode, data) {
        this.statusCode = statusCode;
        this.data = data;
    }
    getData(DataType) {
        return (0, class_transformer_1.plainToInstance)(DataType, this.data);
    }
    getArrayData(DataType) {
        return (0, class_transformer_1.plainToInstance)(DataType, this.data);
    }
    hasStatus(status) {
        return this.statusCode === status;
    }
}
exports.HttpClientResponse = HttpClientResponse;
